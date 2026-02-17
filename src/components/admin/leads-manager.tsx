"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Building2, MessageSquare, CheckCircle, XCircle, Clock, Trash2, Globe } from "lucide-react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";

export interface Lead {
    id?: string;
    companyName: string;
    primaryObjective: string;
    email: string;
    message?: string;
    status: 'new' | 'contacted' | 'closed';
    createdAt: Timestamp;
}

export function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, `apps/${APP_ID}/leads`), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Lead[];
            setLeads(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching leads:", error);
            toast.error("Failed to load leads");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id: string, status: 'new' | 'contacted' | 'closed') => {
        try {
            await updateDoc(doc(db, `apps/${APP_ID}/leads`, id), { status });
            toast.success(`Status updated to ${status}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            await deleteDoc(doc(db, `apps/${APP_ID}/leads`, id));
            toast.success("Lead deleted");
        } catch (error) {
            console.error("Error deleting lead:", error);
            toast.error("Failed to delete lead");
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Incoming Leads</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{leads.length} Leads</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950">
                        <tr>
                            <th className="px-6 py-3">Company / Email</th>
                            <th className="px-6 py-3">Objective</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center bg-slate-900/50">No leads found.</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-slate-500" />
                                            {lead.companyName}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <Mail className="w-3 h-3" />
                                            {lead.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700">
                                            {lead.primaryObjective}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lead.message ? (
                                            <div className="max-w-xs truncate text-slate-300" title={lead.message}>
                                                {lead.message}
                                            </div>
                                        ) : (
                                            <span className="text-slate-600 italic">No message</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateStatus(lead.id!, e.target.value as any)}
                                            className={`bg-transparent border-none text-xs font-medium focus:ring-0 cursor-pointer ${lead.status === 'new' ? 'text-emerald-400' :
                                                    lead.status === 'contacted' ? 'text-blue-400' :
                                                        'text-slate-500'
                                                }`}
                                        >
                                            <option value="new">NEW</option>
                                            <option value="contacted">CONTACTED</option>
                                            <option value="closed">CLOSED</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => lead.id && handleDelete(lead.id)}
                                            className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete Lead"
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
