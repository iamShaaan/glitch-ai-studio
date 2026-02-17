"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle, AlertCircle, Play } from "lucide-react";
import { submitCareerApplication } from "@/lib/firestore";
import { GlitchText } from "@/components/ui/glitch-text";
import { toast } from "react-hot-toast";

interface CareerApplicationFormInputs {
    fullName: string;
    email: string;
    portfolioUrl: string;
    roleAppliedFor: string;
    favoriteAiTool: string;
    experience: string;
    messageToCeo: string;
}

const ROLES = [
    "AI Video Architect",
    "Generative Graphic Designer",
    "AI Social Media Strategist",
    "AI Automation Engineer",
    "Other"
];

export function CareerApplicationForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CareerApplicationFormInputs>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (data: CareerApplicationFormInputs) => {
        setLoading(true);
        setError("");

        try {
            // Submit directly to Firestore (Text-Only)
            await submitCareerApplication({
                ...data,
                // Optional resumeLink can be added later if needed, but for now we focus on text
                // If user puts a link in experience/message, that's fine.
            });

            setSuccess(true);
            reset();
            toast.success("Application Transmitted Successfully.");
        } catch (err: any) {
            console.error("Application Error:", err);
            setError("Transmission Failed. Please try again.");
            toast.error("Submission Failed.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-slate-900 border border-emerald-500/30 p-12 rounded-2xl text-center max-w-4xl mx-auto my-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">TRANSMISSION RECEIVED</h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                    Your data packet has been successfully uploaded to our secure mainframe.
                    Our AI Sourcing Protocol will analyze your profile. If your parameters match our mission, we will initiate contact.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-emerald-400 hover:text-emerald-300 font-mono text-sm underline decoration-emerald-500/50 underline-offset-4 hover:decoration-emerald-400 transition-all"
                >
                    INITIATE NEW TRANSMISSION
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">
                        Apply to <GlitchText text="The Core" />
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We don't care about your formatted PDF resume. We care about your raw output, your vision, and your ability to interface with AI. Tell us who you really are.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    {/* Compact Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs">Full Name</label>
                            <input
                                {...register("fullName", { required: "Required" })}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder="e.g. Neo Anderson"
                            />
                            {errors.fullName && <span className="text-red-400 text-xs">Name is required</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs">Email Address</label>
                            <input
                                {...register("email", { required: "Required", pattern: /^\S+@\S+$/i })}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder="neo@matrix.io"
                            />
                            {errors.email && <span className="text-red-400 text-xs">Valid email required</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs">Target Role</label>
                            <select
                                {...register("roleAppliedFor", { required: "Required" })}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select Protocol...</option>
                                {ROLES.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                            {errors.roleAppliedFor && <span className="text-red-400 text-xs">Role selection required</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs">Portfolio / Works</label>
                            <input
                                {...register("portfolioUrl", { required: "Required" })}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder="URL to your best work (Behance, Dribbble, GDrive)"
                            />
                            {errors.portfolioUrl && <span className="text-red-400 text-xs">Portfolio link required</span>}
                        </div>
                    </div>

                    {/* Favorite AI Tool */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs">Favorite AI Tool & Why</label>
                        <input
                            {...register("favoriteAiTool", { required: "Required" })}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                            placeholder="e.g. Midjourney because..."
                        />
                        {errors.favoriteAiTool && <span className="text-red-400 text-xs">This field is required</span>}
                    </div>

                    {/* Deep Work Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs flex items-center gap-2">
                            <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            Your Story & Experience
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            Don't just list jobs. Tell us about the hardest problem you solved, your relationship with AI tools, and why you are "AI-Native".
                        </p>
                        <textarea
                            {...register("experience", { required: "Required", minLength: 50 })}
                            rows={8}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                            placeholder="I built my first AI workflow when..."
                        />
                        {errors.experience && <span className="text-red-400 text-xs">Please provide more detail about your experience (min 50 chars).</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 uppercase tracking-wider text-xs flex items-center gap-2">
                            <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                            Message to the CEO
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            Why Glitch? Why now? What is your vision for the future of digital agency work? Be bold.
                        </p>
                        <textarea
                            {...register("messageToCeo", { required: "Required", minLength: 20 })}
                            rows={6}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                            placeholder="I believe the future of content is..."
                        />
                        {errors.messageToCeo && <span className="text-red-400 text-xs">Please write a brief message.</span>}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full group bg-white hover:bg-emerald-400 text-black font-bold py-5 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                ESTABLISHING UPLINK...
                            </>
                        ) : (
                            <>
                                TRANSMIT APPLICATION
                                <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white transition-colors" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-slate-600 mt-6">
                        Data is encrypted and stored in our private vault.
                        We do not share applicant data with third-party entities.
                    </p>
                </form>
            </div>
        </div>
    );
}
