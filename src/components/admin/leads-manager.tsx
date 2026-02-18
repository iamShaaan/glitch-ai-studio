"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Building2, MessageSquare, Check, X, Clock, Trash2, Globe, Linkedin, Facebook, AlignLeft, Calendar as CalendarIcon, MapPin, Eye, Edit2, Phone, Save } from "lucide-react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";

type LeadStatus = 'Lead Collected' | 'Meeting Scheduled' | 'Client Onboarded' | 'Dismissed';

interface UnifiedLead {
    id: string;
    // Common fields
    name: string; // leads: name, consultations: name
    email: string;
    companyName?: string; // leads: companyName, consultations: businessInfo (sometimes)
    businessInfo?: string;
    message?: string;
    status: LeadStatus;
    createdAt: Timestamp;
    source: 'lead' | 'consultation';

    // Extended fields
    website?: string;
    socialMedia?: string;
    location?: string;
    preferredTime?: string;
    whatsapp?: string;
    meetingTime?: Timestamp; // For scheduled meetings
}

export function LeadsManager() {
    const [leads, setLeads] = useState<UnifiedLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Edit Form State
    const [editForm, setEditForm] = useState<{
        email: string;
        whatsapp: string;
        meetingDate: string;
        meetingTime: string;
    }>({ email: '', whatsapp: '', meetingDate: '', meetingTime: '' });

    useEffect(() => {
        // Subscribe to Leads
        const leadsQuery = query(collection(db, `apps/${APP_ID}/leads`), orderBy("createdAt", "desc"));
        const consultationsQuery = query(collection(db, `apps/${APP_ID}/consultations`), orderBy("createdAt", "desc"));

        const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
            const leadsData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || data.companyName || 'Unknown',
                    email: data.email,
                    companyName: data.companyName,
                    businessInfo: data.businessInfo,
                    message: data.message,
                    status: mapStatus(data.status),
                    createdAt: data.createdAt,
                    source: 'lead',
                    website: data.website,
                    socialMedia: data.socialMedia,
                    location: data.location,
                    preferredTime: data.preferredTime,
                    whatsapp: data.whatsapp,
                    meetingTime: data.meetingTime
                } as UnifiedLead;
            });

            // Note: In a real app we'd merge these properly with state, but for simplicity here we'll re-fetch consultations too or just manage two lists.
            // To keep it simple and reactive, let's fetch consultations inside here? No, better to separate.
            // Actually, let's just use one state and merge. 
            // Limitation: Two snapshots updating one state might be jumpy. 
            // Let's settle for leads collection being the main one as per plan, 
            // BUT implementation plan said "Fetch from BOTH". 
            // So we need to manage two lists and merge them.

            // To avoid complex merging logic in this single file without reducer, I'll store them separately and merge on render? 
            // No, merge into 'leads' state.

            // Let's do a simple approach: Load both, then merge.
        });

        // RE-PLAN: Managing two realtime listeners merging into one state is tricky.
        // I will create two state variables and merge them for display.

        return () => {
            unsubscribeLeads();
        }
    }, []);

    // Actual Implementation with dual Listeners
    const [rawLeads, setRawLeads] = useState<UnifiedLead[]>([]);
    const [rawConsultations, setRawConsultations] = useState<UnifiedLead[]>([]);

    useEffect(() => {
        const q1 = query(collection(db, `apps/${APP_ID}/leads`), orderBy("createdAt", "desc"));
        const unsub1 = onSnapshot(q1, (snap) => {
            const data = snap.docs.map(doc => {
                const d = doc.data();
                return {
                    id: doc.id,
                    name: d.name || d.companyName || 'Unknown',
                    email: d.email,
                    companyName: d.companyName,
                    businessInfo: d.businessInfo,
                    message: d.message,
                    status: mapStatus(d.status),
                    createdAt: d.createdAt,
                    source: 'lead',
                    ...d
                } as UnifiedLead;
            });
            setRawLeads(data);
        });

        const q2 = query(collection(db, `apps/${APP_ID}/consultations`), orderBy("createdAt", "desc"));
        const unsub2 = onSnapshot(q2, (snap) => {
            const data = snap.docs.map(doc => {
                const d = doc.data();
                return {
                    id: doc.id,
                    name: d.name || 'Unknown',
                    email: d.email,
                    companyName: d.businessInfo ? 'N/A' : 'N/A', // Consultations often lack company name field specifically
                    businessInfo: d.businessInfo,
                    message: d.message,
                    status: mapStatus(d.status),
                    createdAt: d.createdAt,
                    source: 'consultation',
                    ...d
                } as UnifiedLead;
            });
            setRawConsultations(data);
        });

        return () => { unsub1(); unsub2(); };
    }, []);

    useEffect(() => {
        // Merge and Sort
        const merged = [...rawLeads, ...rawConsultations].sort((a, b) => {
            const t1 = a.createdAt?.toMillis() || 0;
            const t2 = b.createdAt?.toMillis() || 0;
            return t2 - t1;
        });
        setLeads(merged);
        setLoading(false);
    }, [rawLeads, rawConsultations]);

    const mapStatus = (status: string): LeadStatus => {
        if (!status) return 'Lead Collected';
        const s = status.toLowerCase();
        if (s === 'new') return 'Lead Collected';
        if (s === 'lead collected') return 'Lead Collected';
        if (s === 'contacted') return 'Lead Collected'; // Remap old status
        if (s === 'meeting scheduled') return 'Meeting Scheduled';
        if (s === 'client onboarded') return 'Client Onboarded';
        if (s === 'dismissed' || s === 'archived' || s === 'closed') return 'Dismissed';
        return 'Lead Collected';
    };

    const updateLeadStatus = async (lead: UnifiedLead, newStatus: LeadStatus) => {
        const collectionName = lead.source === 'lead' ? 'leads' : 'consultations';
        try {
            await updateDoc(doc(db, `apps/${APP_ID}/${collectionName}`, lead.id), { status: newStatus });
            toast.success(`Status updated: ${newStatus}`);
            if (selectedLead && selectedLead.id === lead.id) {
                setSelectedLead({ ...selectedLead, status: newStatus });
            }
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    const handleDelete = async (lead: UnifiedLead) => {
        if (!confirm("Permanently delete this record?")) return;
        const collectionName = lead.source === 'lead' ? 'leads' : 'consultations';
        try {
            await deleteDoc(doc(db, `apps/${APP_ID}/${collectionName}`, lead.id));
            toast.success("Record deleted");
            if (selectedLead?.id === lead.id) setSelectedLead(null);
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    const openModal = (lead: UnifiedLead) => {
        setSelectedLead(lead);
        setIsEditing(false);
        // Prep edit form
        let meetDate = '';
        let meetTime = '';
        if (lead.meetingTime) {
            const date = lead.meetingTime.toDate();
            meetDate = date.toISOString().split('T')[0];
            meetTime = date.toTimeString().slice(0, 5);
        }
        setEditForm({
            email: lead.email || '',
            whatsapp: lead.whatsapp || '',
            meetingDate: meetDate,
            meetingTime: meetTime
        });
    };

    const saveChanges = async () => {
        if (!selectedLead) return;
        const collectionName = selectedLead.source === 'lead' ? 'leads' : 'consultations';

        let newTimestamp = null;
        if (editForm.meetingDate && editForm.meetingTime) {
            newTimestamp = Timestamp.fromDate(new Date(`${editForm.meetingDate}T${editForm.meetingTime}`));
        }

        try {
            await updateDoc(doc(db, `apps/${APP_ID}/${collectionName}`, selectedLead.id), {
                email: editForm.email,
                whatsapp: editForm.whatsapp,
                meetingTime: newTimestamp
            });

            toast.success("Details updated successfully");
            setIsEditing(false);
            // Local update strictly for UI responsiveness until snapshot triggers
            setSelectedLead({
                ...selectedLead,
                email: editForm.email,
                whatsapp: editForm.whatsapp,
                meetingTime: newTimestamp as any
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to save changes");
        }
    };

    // Calendar Helper
    const upcomingMeetings = leads
        .filter(l => l.meetingTime && l.meetingTime.toMillis() > Date.now())
        .sort((a, b) => a.meetingTime!.toMillis() - b.meetingTime!.toMillis());

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
            {/* Main List */}
            <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-emerald-500" /> Lead Management
                    </h3>
                    <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                        Total: {leads.length}
                    </div>
                </div>

                <div className="overflow-auto flex-1">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-950 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3">Client</th>
                                <th className="px-6 py-3">Context</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {leads.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-600">No signals detected.</td></tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={`${lead.source}-${lead.id}`} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{lead.name}</div>
                                            <div className="text-xs text-slate-500">{lead.email}</div>
                                            {lead.source === 'consultation' && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1 rounded ml-0">CONSULTATION</span>}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="truncate text-slate-300" title={lead.businessInfo || lead.message}>
                                                {lead.businessInfo || lead.message || 'No details'}
                                            </div>
                                            <div className="text-xs text-slate-600 mt-0.5">{lead.location || 'Remote'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead, e.target.value as LeadStatus)}
                                                className={`bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer uppercase ${lead.status === 'Lead Collected' ? 'text-blue-400' :
                                                        lead.status === 'Meeting Scheduled' ? 'text-emerald-400' :
                                                            lead.status === 'Client Onboarded' ? 'text-purple-400' :
                                                                'text-slate-500'
                                                    }`}
                                            >
                                                <option value="Lead Collected">Collected</option>
                                                <option value="Meeting Scheduled">Meeting Set</option>
                                                <option value="Client Onboarded">Onboarded</option>
                                                <option value="Dismissed">Dismissed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-xs whitespace-nowrap">
                                            {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openModal(lead)}
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

            {/* Sidebar: Calendar & Queue */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-800 bg-slate-950">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-emerald-500" /> Upcoming Intel
                    </h3>
                </div>
                <div className="p-4 flex-1 overflow-auto space-y-4">
                    {upcomingMeetings.length === 0 ? (
                        <div className="text-center text-slate-600 text-sm py-8">No scheduled rendezvous.</div>
                    ) : (
                        upcomingMeetings.map(m => (
                            <div key={m.id} className="bg-slate-950 border border-slate-800 rounded p-3 text-sm">
                                <div className="text-emerald-400 font-bold text-xs mb-1">
                                    {m.meetingTime?.toDate().toLocaleString()}
                                </div>
                                <div className="text-white font-medium">{m.name}</div>
                                <div className="text-slate-500 text-xs truncate">{m.companyName}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950 sticky top-0 z-20">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {selectedLead.name}
                                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono uppercase">
                                        {selectedLead.source}
                                    </span>
                                </h2>
                                <p className="text-slate-400 text-sm">{selectedLead.companyName || 'Private Entity'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`p-2 rounded transition-colors ${isEditing ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'}`}
                                >
                                    {isEditing ? <Save onClick={saveChanges} className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedLead)}
                                    className="p-2 bg-slate-800 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-500 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">

                            {/* Status Bar */}
                            <div className="bg-slate-950 p-4 rounded-lg flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-400 uppercase">Current Status</span>
                                <select
                                    value={selectedLead.status}
                                    onChange={(e) => updateLeadStatus(selectedLead, e.target.value as LeadStatus)}
                                    className="bg-slate-800 border-none rounded text-sm text-white focus:ring-emerald-500"
                                >
                                    <option value="Lead Collected">Lead Collected</option>
                                    <option value="Meeting Scheduled">Meeting Scheduled</option>
                                    <option value="Client Onboarded">Client Onboarded</option>
                                    <option value="Dismissed">Dismissed</option>
                                </select>
                            </div>

                            {/* Meeting Scheduler (Edit Mode) */}
                            {isEditing && (
                                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-lg space-y-4">
                                    <h4 className="text-sm font-semibold text-emerald-400 uppercase flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" /> Schedule Meeting
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                                                value={editForm.meetingDate}
                                                onChange={e => setEditForm({ ...editForm, meetingDate: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Time</label>
                                            <input
                                                type="time"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                                                value={editForm.meetingTime}
                                                onChange={e => setEditForm({ ...editForm, meetingTime: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Conflict Warning */}
                                    {upcomingMeetings.length > 0 && (
                                        <div className="text-xs text-slate-500 mt-2 bg-slate-900 p-2 rounded">
                                            <strong>Existing Bookings:</strong>
                                            {upcomingMeetings.map(m => (
                                                <div key={m.id} className="flex justify-between mt-1">
                                                    <span>{m.meetingTime?.toDate().toLocaleString()}</span>
                                                    <span>{m.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Main Info */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Transmission Data</h4>

                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="text-xs text-slate-500">Email Address</label>
                                            {isEditing ? (
                                                <input
                                                    className="w-full bg-slate-800 border-none rounded text-white text-sm"
                                                    value={editForm.email}
                                                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                                />
                                            ) : (
                                                <div className="text-white flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-emerald-500" />
                                                    <a href={`mailto:${selectedLead.email}`} className="hover:text-emerald-400 underline decoration-slate-700">{selectedLead.email}</a>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-xs text-slate-500">Phone / WhatsApp</label>
                                            {isEditing ? (
                                                <input
                                                    className="w-full bg-slate-800 border-none rounded text-white text-sm"
                                                    value={editForm.whatsapp}
                                                    onChange={e => setEditForm({ ...editForm, whatsapp: e.target.value })}
                                                />
                                            ) : (
                                                <div className="text-white flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-emerald-500" />
                                                    {selectedLead.whatsapp || <span className="text-slate-600 italic">Not provided</span>}
                                                </div>
                                            )}
                                        </div>

                                        {(selectedLead.website || selectedLead.socialMedia) && (
                                            <div className="space-y-2 pt-2">
                                                {selectedLead.website && (
                                                    <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400">
                                                        <Globe className="w-4 h-4 text-emerald-500" /> {selectedLead.website}
                                                    </a>
                                                )}
                                                {selectedLead.socialMedia && (
                                                    <a href={selectedLead.socialMedia} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400">
                                                        <Linkedin className="w-4 h-4 text-emerald-500" /> {selectedLead.socialMedia}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Business Intelligence</h4>

                                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                        <label className="text-xs text-slate-500 block mb-2">Operational Overview</label>
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedLead.businessInfo || "No business details provided."}
                                        </p>
                                    </div>

                                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                        <label className="text-xs text-slate-500 block mb-2">Mission Parameters</label>
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedLead.message || "No message provided."}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="text-xs text-slate-500">Location</label>
                                            <div className="flex items-center gap-2 text-sm text-white mt-1">
                                                <MapPin className="w-3 h-3 text-emerald-500" />
                                                {selectedLead.location || "Unknown"}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500">Requested Time</label>
                                            <div className="flex items-center gap-2 text-sm text-white mt-1">
                                                <Clock className="w-3 h-3 text-emerald-500" />
                                                {selectedLead.preferredTime || "Any"}
                                            </div>
                                        </div>
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
