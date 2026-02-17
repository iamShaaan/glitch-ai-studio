"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ContactSubmission } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

export function LeadManager() {
    const [leads, setLeads] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ContactSubmission[];
            setLeads(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Lead Database</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{leads.length} Records</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950">
                        <tr>
                            <th className="px-6 py-3">Name / Email</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center bg-slate-900/50">No leads found. SYSTEM IDLE.</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {lead.name}
                                        <div className="text-xs text-slate-500">{lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-xs">{lead.message}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${lead.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-300'
                                            }`}>
                                            {lead.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lead.createdAt?.toDate().toLocaleDateString()}
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
