"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink, FileText, CheckCircle, XCircle, Clock, Bot, Globe, Trash2 } from "lucide-react";
import { getCareerApplications, CareerApplication } from "@/lib/firestore";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";

export function CareerManager() {
    const [applications, setApplications] = useState<CareerApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await getCareerApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, `apps/${APP_ID}/career_applications`, id));
            toast.success("Application deleted successfully");
            loadApplications(); // Refresh list
        } catch (error) {
            console.error("Failed to delete application:", error);
            toast.error("Failed to delete application");
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Career Applications</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{applications.length} Applicants</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950">
                        <tr>
                            <th className="px-6 py-3">Candidate</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Links</th>
                            <th className="px-6 py-3">AI Tool</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center bg-slate-900/50">No applications received yet.</td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {app.fullName}
                                        <div className="text-xs text-slate-500">{app.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700">
                                            {app.roleAppliedFor}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-4">
                                            {/* Top Row: Links & Meta */}
                                            <div className="flex gap-4 mb-2">
                                                <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-indigo-300">
                                                    <Globe className="w-3 h-3" /> PORTFOLIO
                                                </a>
                                                {app.resumeLink && (
                                                    <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300">
                                                        <FileText className="w-3 h-3" /> CV LINK
                                                    </a>
                                                )}
                                                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                                    <Bot className="w-3 h-3" /> {app.favoriteAiTool}
                                                </span>
                                            </div>

                                            {/* Deep Dive Content (Text Fields) */}
                                            <div className="bg-slate-950 rounded p-4 border border-slate-800 space-y-4">
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Experience / Story</h4>
                                                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{app.experience}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Message to CEO</h4>
                                                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed italic border-l-2 border-emerald-500/30 pl-3">
                                                        "{app.messageToCeo}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${app.status === 'new' ? 'bg-emerald-100 text-emerald-800' :
                                                app.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                                    app.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-slate-100 text-slate-800'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => app.id && handleDelete(app.id)}
                                            className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete Application"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        reviewing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        interview: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        rejected: "bg-red-500/10 text-red-400 border-red-500/20",
        hired: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    };

    const icons = {
        new: Clock,
        reviewing: Loader2,
        interview: Loader2,
        rejected: XCircle,
        hired: CheckCircle
    };

    const style = styles[status as keyof typeof styles] || styles.new;
    const Icon = icons[status as keyof typeof icons] || Clock;

    return (
        <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 w-fit ${style}`}>
            <Icon className="w-3 h-3" />
            {status.toUpperCase()}
        </span>
    );
}
