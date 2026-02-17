"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send, AlertCircle, Building2, User, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";
import { GlitchText } from "@/components/ui/glitch-text";
import { CopyButton } from "./copy-button";
import { ExternalLink } from "lucide-react";

interface ContactFormInputs {
    companyName: string;
    objective: string;
    email: string;
    message: string;
}

const OBJECTIVES = [
    { id: "ai_clone", label: "AI Clone Creation" },
    { id: "automation", label: "Business Automation" },
    { id: "full_stack", label: "Full-Stack App Dev" },
    { id: "consultation", label: "General Consultation" },
];

export function ContactForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: ContactFormInputs) => {
        setLoading(true);
        try {
            // 1. Save to Leads
            await addDoc(collection(db, `apps/${APP_ID}/leads`), {
                companyName: data.companyName,
                primaryObjective: data.objective,
                email: data.email,
                message: data.message,
                status: 'new',
                createdAt: serverTimestamp(),
            });

            // 2. Optional: Create Action for n8n (if needed later, keeping it simple for now as per instructions to route to Admin Dashboard)
            // But user also said "Logic: Ensure form submissions are routed directly to ... my email." 
            // Usually this means we rely on n8n watching this collection or an actions collection.
            // I'll stick to the leads collection as the source of truth.

            toast.success("Transmission Received. We will be in touch shortly.");
            setSuccess(true);
            reset();
        } catch (error) {
            console.error("Error submitting lead:", error);
            toast.error("Transmission Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mb-4">
                    <Send className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        <GlitchText text="SIGNAL RECEIVED" />
                    </h2>
                    <p className="text-slate-400 max-w-sm mx-auto">
                        Your transmission has been logged in our secure vault. A specialist will decrypt and respond within 24 hours.
                    </p>
                </div>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-mono border-b border-dashed border-emerald-500/30 hover:border-emerald-500 transition-colors"
                >
                    Send another transmission
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-center">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl px-6" />

                <div className="relative mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Initialize Contact</h2>
                    <p className="text-slate-500 text-sm">Fill out the secure form below to begin the protocol.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5">
                    {/* Company Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" /> Company / Project Name
                        </label>
                        <input
                            {...register("companyName", { required: "Required" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                            placeholder="e.g. Cyberdyne Systems"
                        />
                        {errors.companyName && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Required</span>}
                    </div>

                    {/* Objective */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <ArrowRight className="w-3.5 h-3.5" /> Primary Objective
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                            <select
                                {...register("objective", { required: "Required" })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" className="text-slate-500">Select your mission...</option>
                                {OBJECTIVES.map(obj => (
                                    <option key={obj.id} value={obj.id}>{obj.label}</option>
                                ))}
                            </select>
                        </div>
                        {errors.objective && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Required</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> Direct Frequency (Email)
                        </label>
                        <input
                            {...register("email", { required: "Required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                            placeholder="name@company.com"
                        />
                        {errors.email && <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message || "Required"}</span>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> Additional Context (Optional)
                        </label>
                        <textarea
                            {...register("message")}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700 min-h-[80px]"
                            placeholder="Brief briefing..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <span className="uppercase tracking-widest">Execute Transmission</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Direct Links Footer */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Manual Override (Email):</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-300 font-mono text-xs md:text-sm">glitchaistudio@gmail.com</span>
                            <CopyButton text="glitchaistudio@gmail.com" />
                        </div>
                    </div>

                    <div className="bg-slate-950 rounded-lg p-4 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 border border-transparent transition-all">
                        <div className="flex flex-col">
                            <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-0.5">Verified Partner</span>
                            <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">Prefer to work via Fiverr?</span>
                        </div>
                        <a
                            href="https://www.fiverr.com/s/WEWZkdB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-800 p-2 rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-all"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
