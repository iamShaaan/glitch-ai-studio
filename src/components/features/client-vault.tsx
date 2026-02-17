"use client";

import { useEffect, useState } from "react";
import { GlitchWrapper } from "@/components/ui/glitch-wrapper";
import { GlitchText } from "@/components/ui/glitch-text";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { getUserProfile, getClientAssets, UserProfile, ClientAsset } from "@/lib/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2, File, Video, Image as ImageIcon, Music, Download } from "lucide-react";

export function ClientVault() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [assets, setAssets] = useState<ClientAsset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userProfile = await getUserProfile(user.uid);
                    setProfile(userProfile);
                    const userAssets = await getClientAssets(user.uid);
                    setAssets(userAssets);
                } catch (error) {
                    console.error("Error fetching vault data:", error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] p-4 pt-12">
            <GlitchWrapper className="max-w-5xl w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-800 pb-6">
                    <div>
                        <div className="mb-2 text-emerald-500 font-mono text-xs tracking-widest animate-pulse">
              /// SECURE CONNECTION ESTABLISHED
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                            <GlitchText text="CLIENT VAULT" />
                        </h1>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Current Protocol Status</p>
                        <div className="text-xl md:text-2xl font-bold text-emerald-400">
                            {profile?.funnelStage || "INITIALIZING..."}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl backdrop-blur-md">
                        <h3 className="text-lg font-bold text-white mb-4">Identity Matrix</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Subject ID</span>
                                <span className="text-slate-300 font-mono truncate max-w-[150px]">{profile?.uid}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Contact</span>
                                <span className="text-slate-300">{profile?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Clearance</span>
                                <span className="text-emerald-500 font-bold uppercase">{profile?.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Assets Grid */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                            <span>Digital Assets</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{assets.length} FILES</span>
                        </h3>

                        {assets.length === 0 ? (
                            <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-xl p-12 text-center">
                                <p className="text-slate-500">No assets currently propagated to this sector.</p>
                                <p className="text-slate-600 text-sm mt-2">Awaiting upload from Central Command.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assets.map((asset) => (
                                    <AssetCard key={asset.id} asset={asset} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </GlitchWrapper>
        </div>
    );
}

function AssetCard({ asset }: { asset: ClientAsset }) {
    const Icon = {
        image: ImageIcon,
        video: Video,
        audio: Music,
        document: File
    }[asset.type] || File;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-lg hover:border-emerald-500/30 transition-all group flex items-start gap-4"
        >
            <div className="p-3 bg-slate-900 rounded text-emerald-500">
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">{asset.title}</h4>
                <p className="text-xs text-slate-500 uppercase mt-1">{asset.type}</p>
            </div>
            <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
                <Download className="w-4 h-4" />
            </a>
        </motion.div>
    );
}
