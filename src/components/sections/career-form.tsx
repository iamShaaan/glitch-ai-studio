"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { submitCareerApplication } from "@/lib/firestore";
import { GlitchText } from "@/components/ui/glitch-text";
import { toast } from "react-hot-toast";

interface CareerFormInputs {
    fullName: string;
    email: string;
    portfolioUrl: string;
    favoriteAiTool: string;
    roleAppliedFor: string;
    resumeLink?: string;
}

const ROLES = [
    "AI Video Architect",
    "Generative Graphic Designer",
    "AI Social Media Strategist",
    "AI Automation Engineer",
    "Other"
];

export function CareerForm() {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CareerFormInputs>();
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [uploadFailed, setUploadFailed] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
            setUploadFailed(false); // Reset upload error state
        }
    };

    const onSubmit = async (data: CareerFormInputs) => {
        // Validation: Require EITHER file OR link
        if (!resumeFile && !data.resumeLink) {
            setError("Please upload your resume OR provide a link.");
            toast.error("Resume required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // 1. Send to n8n Webhook via Proxy
            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("role", data.roleAppliedFor);
            formData.append("portfolio", data.portfolioUrl);
            formData.append("tool", data.favoriteAiTool);
            if (data.resumeLink) formData.append("resumeLink", data.resumeLink);
            if (resumeFile) formData.append("resume", resumeFile);

            // POST to our internal API route
            const webhookResponse = await fetch("/api/career-webhook", {
                method: "POST",
                body: formData,
            });

            if (!webhookResponse.ok) {
                const errorData = await webhookResponse.json();
                throw new Error(errorData.error || "Webhook submission failed");
            }

            // 2. Submit to Firestore (Internal Log)
            // We save a record for the dashboard, even though n8n handles the rest.
            try {
                await submitCareerApplication({
                    ...data,
                    resumeUrl: resumeFile ? "Sent via Webhook" : "",
                    resumeLink: data.resumeLink
                });
            } catch (dbError) {
                console.error("Database Log Error:", dbError);
                // Non-critical, continue since webhook succeeded
            }

            setSuccess(true);
            reset();
            setResumeFile(null);
            setUploadFailed(false);
            toast.success("Application Received. Welcome to the Protocol.");
        } catch (err: any) {
            console.error("Application Error:", err);
            setError(err.message || "Failed to submit application.");
            toast.error(err.message || "Submission Failed.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-slate-900 border border-emerald-500/30 p-8 rounded-2xl text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                <p className="text-slate-400 mb-6">
                    Your application has been logged in our secure database.
                    If your profile matches our parameters, we will initiate contact.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-emerald-400 hover:text-emerald-300 font-mono text-sm underline"
                >
                    SUBMIT ANOTHER APPLICATION
                </button>
            </div>
        );
    }

    return (
        <section id="apply" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="container px-4 mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                        Join the <GlitchText text="Singularity" />
                    </h2>
                    <p className="text-slate-400">
                        Complete the form below to enter the selection pool.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <input
                                {...register("fullName", { required: "Required" })}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="John Doe"
                            />
                            {errors.fullName && <span className="text-red-400 text-xs">Name is required</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                {...register("email", { required: "Required", pattern: /^\S+@\S+$/i })}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="john@example.com"
                            />
                            {errors.email && <span className="text-red-400 text-xs">Valid email required</span>}
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Role Applied For</label>
                        <select
                            {...register("roleAppliedFor", { required: "Required" })}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                        >
                            <option value="">Select a Role...</option>
                            {ROLES.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        {errors.roleAppliedFor && <span className="text-red-400 text-xs">Please select a role</span>}
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Portfolio Link</label>
                        <input
                            {...register("portfolioUrl", { required: "Required" })}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="https://behance.net/..."
                        />
                        {errors.portfolioUrl && <span className="text-red-400 text-xs">Portfolio link is required</span>}
                    </div>

                    {/* Favorite AI Tool */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Your Favorite AI Tool</label>
                        <input
                            {...register("favoriteAiTool", { required: "Required" })}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="e.g., Midjourney v6, Runway Gen-2"
                        />
                        {errors.favoriteAiTool && <span className="text-red-400 text-xs">Please specify a tool</span>}
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            Resume / CV {uploadFailed && <span className="text-red-400 ml-2">(Upload Failed - Link Required)</span>}
                        </label>
                        <div className={`
                            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                            ${resumeFile ? 'border-emerald-500/50 bg-emerald-500/5' : uploadFailed ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800 hover:border-slate-600 hover:bg-slate-900'}
                        `}>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer">
                                {resumeFile ? (
                                    <div className="flex flex-col items-center gap-2 text-emerald-400">
                                        <CheckCircle className="w-8 h-8" />
                                        <span className="font-medium">{resumeFile.name}</span>
                                        <span className="text-xs text-emerald-500/70">Click to change</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-slate-500">
                                        {uploadFailed ? <AlertCircle className="w-8 h-8 text-red-500" /> : <Upload className="w-8 h-8" />}
                                        <span className={uploadFailed ? "text-red-400" : "font-medium"}>
                                            {uploadFailed ? "Upload Failed. Please use Link below." : "Click to upload PDF"}
                                        </span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Resume Link Fallback */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Resume Link (Alternative)</label>
                        <input
                            {...register("resumeLink")}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="Google Drive, Dropbox, or Website link to CV"
                        />
                        <p className="text-xs text-slate-500">Use this if file upload fails.</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                PROCESSING...
                            </>
                        ) : (
                            "SUBMIT APPLICATION"
                        )}
                    </button>

                    <p className="text-center text-xs text-slate-600 mt-4">
                        By submitting, you agree to our data processing policy.
                        We only review applications that demonstrate true AI-Native capability.
                    </p>
                </form>
            </div>
        </section>
    );
}
