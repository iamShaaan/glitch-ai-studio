"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { getCareerApplications, CareerApplication } from "@/lib/firestore";
import Link from "next/link";

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
        } finally {
            setLoading(false);
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
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center bg-slate-900/50">No applications received yet.</td>
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
                                        <div className="flex gap-2">
                                            <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20"
                                            >
                                                <FileText className="w-3 h-3" /> Resume
                                            </a>
                                            <a
                                                href={app.portfolioUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20"
                                            >
                                                <ExternalLink className="w-3 h-3" /> Portfolio
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-[150px]" title={app.favoriteAiTool}>
                                        {app.favoriteAiTool}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={app.status} />
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'N/A'}
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
