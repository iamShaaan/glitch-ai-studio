"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send, AlertCircle, Building2, User, Mail, MessageSquare, Globe, Linkedin, MapPin, Clock, Calendar } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_ID } from "@/lib/constants";
import { toast } from "react-hot-toast";
import { GlitchText } from "@/components/ui/glitch-text";
import { CopyButton } from "./copy-button";
import { ExternalLink } from "lucide-react";

interface ContactFormInputs {
    name: string;
    email: string;
    website?: string;
    socialMedia: string;
    businessInfo: string;
    message: string;
    location: string;
    preferredTime: string;
    whatsapp?: string;
}

export function ContactForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: ContactFormInputs) => {
        setLoading(true);
        try {
            await addDoc(collection(db, `apps/${APP_ID}/leads`), {
                ...data,
                status: 'new', // Default status
                createdAt: serverTimestamp(),
                source: 'contact_form'
            });

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

                <div className="relative mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Initialize Protocol</h2>
                    <p className="text-slate-500 text-sm">Provide comprehensive data for optimal synchronization.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">

                    {/* Basic Info Group */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" /> Full Name
                            </label>
                            <input
                                {...register("name", { required: "Required" })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="Agent Name"
                            />
                            {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5" /> Email Frequency
                            </label>
                            <input
                                {...register("email", { required: "Required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="name@domain.com"
                            />
                            {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                        </div>
                    </div>

                    {/* Digital Presence */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" /> Website (Opt)
                            </label>
                            <input
                                {...register("website")}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Linkedin className="w-3.5 h-3.5" /> Social Uplink
                            </label>
                            <input
                                {...register("socialMedia", { required: "Required" })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="LinkedIn / X"
                            />
                            {errors.socialMedia && <span className="text-xs text-red-400">{errors.socialMedia.message}</span>}
                        </div>
                    </div>

                    {/* Business Info */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" /> Business Data
                        </label>
                        <textarea
                            {...register("businessInfo", { required: "Required" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700 min-h-[60px]"
                            placeholder="Brief operational overview..."
                        />
                        {errors.businessInfo && <span className="text-xs text-red-400">{errors.businessInfo.message}</span>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> Mission Objectives
                        </label>
                        <textarea
                            {...register("message", { required: "Required" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700 min-h-[60px]"
                            placeholder="What are your goals?"
                        />
                        {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
                    </div>

                    {/* Logistics */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> Location
                            </label>
                            <input
                                {...register("location", { required: "Required" })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="City"
                            />
                            {errors.location && <span className="text-xs text-red-400">{errors.location.message}</span>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> Time
                            </label>
                            <input
                                {...register("preferredTime", { required: "Required" })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="2-5 PM"
                            />
                            {errors.preferredTime && <span className="text-xs text-red-400">{errors.preferredTime.message}</span>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> WhatsApp
                            </label>
                            <input
                                {...register("whatsapp")}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
                                placeholder="+1..."
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 md:py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <span className="uppercase tracking-widest text-sm md:text-base">Execute Transmission</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Direct Links Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col space-y-4">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-slate-500">Manual Override (Email):</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-300 font-mono text-xs">glitchaistudio@gmail.com</span>
                            <CopyButton text="glitchaistudio@gmail.com" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
