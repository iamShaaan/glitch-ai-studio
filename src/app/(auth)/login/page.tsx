"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            // Determine redirect based on email or custom claim (simplified for now)
            if (data.email.includes("admin")) { // Rudimentary check, real check in AuthGuard
                router.push("/admin");
            } else {
                router.push("/portal");
            }
        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    <GlitchText text="SYSTEM ACCESS" />
                </h1>
                <p className="text-slate-400 text-sm">Enter credentials to decrypt vault.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Identity (Email)</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="agent@glitch.ai"
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Passcode</label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-400 text-xs">{errors.password.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "AUTHENTICATE"}
                </button>

                <div className="text-center text-sm text-slate-500 mt-4">
                    Need access? <Link href="/signup" className="text-emerald-400 hover:underline">Request Identity</Link>
                </div>
            </form>
        </div>
    );
}
