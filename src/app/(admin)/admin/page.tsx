"use client";

import { useState } from "react";
import { LeadManager } from "@/components/admin/lead-manager";
import { ClientProvisioning } from "@/components/admin/client-provisioning";
import { CMSManager } from "@/components/admin/cms-manager";
import { Users, Database, Globe } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

const TABS = [
    { id: "leads", label: "Lead Manager", icon: Database, component: LeadManager },
    { id: "clients", label: "Provisioning", icon: Users, component: ClientProvisioning },
    { id: "cms", label: "Content System", icon: Globe, component: CMSManager },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("leads");

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1">
                        <GlitchText text="ADMIN CONTROL PLANE" />
                    </h1>
                    <p className="text-slate-400 text-sm">System Status: <span className="text-emerald-500">OPTIMAL</span></p>
                </div>
                <div className="text-xs font-mono text-slate-500 border border-slate-800 px-3 py-1 rounded">
                    BUILD V2.0.0
                </div>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-800 pb-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                                ? "border-emerald-500 text-emerald-400"
                                : "border-transparent text-slate-400 hover:text-white"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {TABS.map((tab) => {
                    if (tab.id !== activeTab) return null;
                    const Component = tab.component;
                    return <Component key={tab.id} />;
                })}
            </div>
        </div>
    );
}
