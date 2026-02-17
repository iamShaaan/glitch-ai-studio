"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSystemConfig, updateSystemConfig, SystemConfig } from "@/lib/firestore";
import { Save, Loader2, AlertCircle, CheckCircle, Webhook } from "lucide-react";
import { toast } from "react-hot-toast";

export function SettingsManager() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SystemConfig>();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Fetch initial config
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const config = await getSystemConfig();
                if (config) {
                    setValue("careerWebhookUrl", config.careerWebhookUrl);
                }
            } catch (err) {
                console.error("Failed to load settings:", err);
                setError("Failed to load current configuration.");
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [setValue]);

    const onSubmit = async (data: SystemConfig) => {
        setSaving(true);
        setError("");
        try {
            await updateSystemConfig(data);
            toast.success("System configuration updated.");
        } catch (err: any) {
            console.error("Save Error:", err);
            setError("Failed to save settings.");
            toast.error("Update failed.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Webhook className="w-6 h-6 text-emerald-500" />
                    System Configuration
                </h2>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Webhook Configuration */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-slate-800 pb-2">
                            Integrations & Webhooks
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">
                                n8n Career Application Webhook URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    {...register("careerWebhookUrl", {
                                        required: "Webhook URL is required",
                                        pattern: {
                                            value: /^https?:\/\/.+/,
                                            message: "Must be a valid URL starting with http:// or https://"
                                        }
                                    })}
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
                                    placeholder="https://your-n8n-instance.com/webhook/..."
                                />
                            </div>
                            {errors.careerWebhookUrl && (
                                <span className="text-red-400 text-xs flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.careerWebhookUrl.message}
                                </span>
                            )}
                            <p className="text-xs text-slate-500">
                                All career applications (including resume files) will be forwarded to this URL via POST request.
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    SAVING...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    SAVE CONFIGURATION
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
