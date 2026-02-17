"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ClientProvisioning() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (data: any) => {
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            // Create an invite record
            await addDoc(collection(db, "invites"), {
                email: data.email,
                funnelStage: data.stage,
                role: 'client',
                createdAt: serverTimestamp(),
                status: 'pending'
            });
            setSuccess(`Provisioning complete. Client ${data.email} assigned to Stage ${data.stage}.`);
            reset();
        } catch (err: any) {
            setError("Failed to provision client.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Client Provisioning</h3>

            {success && (
                <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {success}
                </div>
            )}

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Client Email</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                        placeholder="client@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Initial Stage</label>
                    <select
                        {...register("stage", { required: true })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                    >
                        <option value="Stage 1: Avatar Creation">Stage 1: Avatar Creation</option>
                        <option value="Stage 2: Voice Training">Stage 2: Voice Training</option>
                        <option value="Stage 3: Integration">Stage 3: Integration</option>
                        <option value="Stage 4: Deployment">Stage 4: Deployment</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "PROVISION ACCESS"}
                </button>
            </form>
        </div>
    );
}
