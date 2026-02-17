"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { createUserProfile } from "@/lib/firestore";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError("");
        try {
            // 1. Create Identity
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

            // 2. Check for Invite
            let funnelStage = 'Discovery Protocol';
            let role: 'client' | 'admin' = 'client';

            const q = query(collection(db, 'invites'), where('email', '==', data.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const invite = querySnapshot.docs[0].data();
                funnelStage = invite.funnelStage;
                role = invite.role;
                // Optional: Delete invite after use
                // await deleteDoc(doc(db, 'invites', querySnapshot.docs[0].id));
            }

            // Hardcoded Admin Override
            if (data.email === "glitchaistudio@gmail.com") {
                role = "admin";
                funnelStage = "System Administrator";
            }

            // 3. Create Profile
            await createUserProfile(userCredential.user.uid, {
                email: data.email,
                role: role,
                funnelStage: funnelStage
            });

            router.push("/portal");
        } catch (err: any) {
            setError(err.message || "Failed to create identity");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    <GlitchText text="INITIATE PROTOCOL" />
                </h1>
                <p className="text-slate-400 text-sm">Create your digital twin identity.</p>
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
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
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
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "GENERATE IDENTITY"}
                </button>

                <div className="text-center text-sm text-slate-500 mt-4">
                    Already verified? <Link href="/login" className="text-emerald-400 hover:underline">Access System</Link>
                </div>
            </form>
        </div>
    );
}
