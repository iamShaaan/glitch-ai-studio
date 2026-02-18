"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Briefcase, FileText, Check, X, Clock, Trash2, Globe, Calendar as CalendarIcon, Eye, Save, Bot, User as UserIcon } from "lucide-react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";

// Define locally to ensure Latest types are used, mirroring firestore.ts but extending for UI state if needed
export interface CareerApplication {
    id: string;
    fullName: string;
    email: string;
    portfolioUrl: string;
    favoriteAiTool: string;
    resumeLink?: string;
    roleAppliedFor: string;
    experience: string;
    messageToCeo: string;
    status: string; // Stored as string in DB, mapped to UI type
    createdAt: Timestamp;
    meetingTime?: Timestamp;
}

type ApplicationStatus = 'Applied' | 'Screening' | 'Interview Scheduled' | 'Offer Sent' | 'Hired' | 'Rejected';

export function CareerManager() {
    const [applications, setApplications] = useState<CareerApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
    const [isScheduling, setIsScheduling] = useState(false);

    // Edit Form State for Scheduling
    const [scheduleForm, setScheduleForm] = useState<{
        meetingDate: string;
        meetingTime: string;
    }>({ meetingDate: '', meetingTime: '' });

    useEffect(() => {
        const q = query(collection(db, `apps/${APP_ID}/career_applications`), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as CareerApplication));
            setApplications(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const mapStatus = (status: string): ApplicationStatus => {
        if (!status) return 'Applied';
        const s = status.toLowerCase();
        if (s === 'new') return 'Applied';
        if (s === 'applied') return 'Applied';
        if (s === 'reviewing' || s === 'screening') return 'Screening';
        if (s === 'interview' || s === 'interview scheduled') return 'Interview Scheduled';
        if (s === 'offer' || s === 'offer sent') return 'Offer Sent';
        if (s === 'hired') return 'Hired';
        if (s === 'rejected' || s === 'dismissed') return 'Rejected';
        return 'Applied';
    };

    const updateStatus = async (app: CareerApplication, newStatus: ApplicationStatus) => {
        try {
            await updateDoc(doc(db, `apps/${APP_ID}/career_applications`, app.id), { status: newStatus });
            toast.success(`Status updated: ${newStatus}`);
            if (selectedApp?.id === app.id) {
                setSelectedApp({ ...selectedApp, status: newStatus });
            }
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    const handleDelete = async (app: CareerApplication) => {
        if (!confirm("Permanently delete this application?")) return;
        try {
            await deleteDoc(doc(db, `apps/${APP_ID}/career_applications`, app.id));
            toast.success("Application deleted");
            if (selectedApp?.id === app.id) setSelectedApp(null);
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    const openModal = (app: CareerApplication) => {
        setSelectedApp(app);
        setIsScheduling(false);
        // Prep edit form
        let meetDate = '';
        let meetTime = '';
        if (app.meetingTime) {
            const date = app.meetingTime.toDate();
            meetDate = date.toISOString().split('T')[0];
            meetTime = date.toTimeString().slice(0, 5);
        }
        setScheduleForm({
            meetingDate: meetDate,
            meetingTime: meetTime
        });
    };

    const saveSchedule = async () => {
        if (!selectedApp) return;

        let newTimestamp = null;
        if (scheduleForm.meetingDate && scheduleForm.meetingTime) {
            newTimestamp = Timestamp.fromDate(new Date(`${scheduleForm.meetingDate}T${scheduleForm.meetingTime}`));
        }

        try {
            await updateDoc(doc(db, `apps/${APP_ID}/career_applications`, selectedApp.id), {
                meetingTime: newTimestamp,
                // Auto-update status if scheduling? Optional, let's keep it manual or user decides.
                // User might schedule interview but keep status as "Screening" until confirmed.
                // But usually scheduling implies "Interview Scheduled".
                // Let's just update time for now.
                status: 'Interview Scheduled'
            });

            toast.success("Interview scheduled & status updated");
            setIsScheduling(false);
            setSelectedApp({
                ...selectedApp,
                meetingTime: newTimestamp as any,
                status: 'Interview Scheduled'
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to save schedule");
        }
    };

    // Calendar Helper
    const upcomingInterviews = applications
        .filter(a => a.meetingTime && a.meetingTime.toMillis() > Date.now())
        .sort((a, b) => a.meetingTime!.toMillis() - b.meetingTime!.toMillis());

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
            {/* Main List */}
            <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-emerald-500" /> Recruitment Pipeline
                    </h3>
                    <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                        Candidates: {applications.length}
                    </div>
                </div>

                <div className="overflow-auto flex-1">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-950 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3">Candidate</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Applied</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {applications.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-600">No applications received.</td></tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{app.fullName}</div>
                                            <div className="text-xs text-slate-500">{app.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700">
                                                {app.roleAppliedFor}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={mapStatus(app.status)}
                                                onChange={(e) => updateStatus(app, e.target.value as ApplicationStatus)}
                                                className={`bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer uppercase ${mapStatus(app.status) === 'Applied' ? 'text-blue-400' :
                                                        mapStatus(app.status) === 'Screening' ? 'text-yellow-400' :
                                                            mapStatus(app.status) === 'Interview Scheduled' ? 'text-emerald-400' :
                                                                mapStatus(app.status) === 'Offer Sent' ? 'text-purple-400' :
                                                                    mapStatus(app.status) === 'Hired' ? 'text-green-500' :
                                                                        'text-red-400'
                                                    }`}
                                            >
                                                <option value="Applied">Applied</option>
                                                <option value="Screening">Screening</option>
                                                <option value="Interview Scheduled">Interview</option>
                                                <option value="Offer Sent">Offer Sent</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-xs whitespace-nowrap">
                                            {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openModal(app)}
                                                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sidebar: Interviews */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-800 bg-slate-950">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-emerald-500" /> Interview Schedule
                    </h3>
                </div>
                <div className="p-4 flex-1 overflow-auto space-y-4">
                    {upcomingInterviews.length === 0 ? (
                        <div className="text-center text-slate-600 text-sm py-8">No interviews scheduled.</div>
                    ) : (
                        upcomingInterviews.map(app => (
                            <div key={app.id} className="bg-slate-950 border border-slate-800 rounded p-3 text-sm hover:border-emerald-500/30 transition-colors cursor-pointer" onClick={() => openModal(app)}>
                                <div className="text-emerald-400 font-bold text-xs mb-1">
                                    {app.meetingTime?.toDate().toLocaleString()}
                                </div>
                                <div className="text-white font-medium">{app.fullName}</div>
                                <div className="text-slate-500 text-xs truncate">{app.roleAppliedFor}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950 sticky top-0 z-20">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {selectedApp.fullName}
                                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono uppercase">
                                        {selectedApp.roleAppliedFor}
                                    </span>
                                </h2>
                                <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedApp.email}</span>
                                    {selectedApp.favoriteAiTool && (
                                        <span className="flex items-center gap-1 text-emerald-400"><Bot className="w-3 h-3" /> {selectedApp.favoriteAiTool}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (isScheduling) saveSchedule();
                                        setIsScheduling(!isScheduling);
                                    }}
                                    className={`p-2 rounded transition-colors ${isScheduling ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'}`}
                                    title="Schedule Interview"
                                >
                                    {isScheduling ? <Check className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedApp)}
                                    className="p-2 bg-slate-800 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-500 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">

                            {/* Status Bar */}
                            <div className="bg-slate-950 p-4 rounded-lg flex items-center justify-between border border-slate-800">
                                <span className="text-sm font-semibold text-slate-400 uppercase">Application Status</span>
                                <select
                                    value={mapStatus(selectedApp.status)}
                                    onChange={(e) => updateStatus(selectedApp, e.target.value as ApplicationStatus)}
                                    className="bg-slate-800 border-none rounded text-sm text-white focus:ring-emerald-500 cursor-pointer"
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Offer Sent">Offer Sent</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Scheduling View */}
                            {isScheduling && (
                                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-lg space-y-4 animate-in slide-in-from-top-2">
                                    <h4 className="text-sm font-semibold text-emerald-400 uppercase flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" /> Schedule Interview
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                                                value={scheduleForm.meetingDate}
                                                onChange={e => setScheduleForm({ ...scheduleForm, meetingDate: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Time</label>
                                            <input
                                                type="time"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                                                value={scheduleForm.meetingTime}
                                                onChange={e => setScheduleForm({ ...scheduleForm, meetingTime: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    {upcomingInterviews.length > 0 && (
                                        <div className="text-xs text-slate-500 mt-2 bg-slate-900 p-2 rounded">
                                            <strong>Conflicts Check:</strong>
                                            {upcomingInterviews.map(m => (
                                                <div key={m.id} className="flex justify-between mt-1 border-b border-slate-800 pb-1 last:border-0">
                                                    <span>{m.meetingTime?.toDate().toLocaleString()}</span>
                                                    <span>{m.fullName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Links Section */}
                            <div className="flex flex-wrap gap-4">
                                <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-colors text-sm text-slate-300">
                                    <Globe className="w-4 h-4" /> View Portfolio
                                </a>
                                {selectedApp.resumeLink && (
                                    <a href={selectedApp.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-colors text-sm text-slate-300">
                                        <FileText className="w-4 h-4" /> View CV/Resume
                                    </a>
                                )}
                            </div>

                            {/* Experience & Message */}
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Experience & Vision</h4>
                                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedApp.experience}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Message to CEO</h4>
                                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap italic">
                                            "{selectedApp.messageToCeo}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
