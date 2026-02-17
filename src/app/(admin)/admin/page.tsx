"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { LeadManager } from "@/components/admin/lead-manager";
import { ClientProvisioning } from "@/components/admin/client-provisioning";
import { CMSManager } from "@/components/admin/cms-manager";
import { Users, Database, Globe, Loader2, Lock, AlertCircle } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";
import { useForm } from "react-hook-form";

const TABS = [
    { id: "leads", label: "Lead Manager", icon: Database, component: LeadManager },
    { id: "clients", label: "Provisioning", icon: Users, component: ClientProvisioning },
    { id: "cms", label: "Content System", icon: Globe, component: CMSManager },
];

export default function AdminDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("leads");
    const router = useRouter();

    // Check Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // --- Admin Login Form Logic ---
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const onLogin = async (data: any) => {
        setLoginLoading(true);
        setLoginError("");
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            // Auth state listener will update 'user' and show dashboard
        } catch (err: any) {
            setLoginError(err.message || "Access Denied");
        } finally {
            setLoginLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    // --- RENDER LOGIN FORM IF NOT AUTHENTICATED ---
    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
                    <div className="text-center mb-8">
                        <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white mb-2">
                            <GlitchText text="ADMIN CLEARANCE" />
                        </h1>
                        <p className="text-slate-400 text-sm">Restricted Area. Authorized Personnel Only.</p>
                    </div>

                    <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
                        {loginError && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {loginError}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Admin Identity</label>
                            <input
                                {...register("email", { required: "Required" })}
                                type="email"
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Security Key</label>
                            <input
                                {...register("password", { required: "Required" })}
                                type="password"
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "VERIFY CREDENTIALS"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- RENDER DASHBOARD IF AUTHENTICATED ---
    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1">
                        <GlitchText text="ADMIN CONTROL PLANE" />
                    </h1>
                    <p className="text-slate-400 text-sm">System Status: <span className="text-emerald-500">OPTIMAL</span> | User: {user.email}</p>
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
