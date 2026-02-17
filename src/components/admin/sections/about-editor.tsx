"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getAboutContent, updateAboutContent, AboutContent } from "@/lib/firestore";
import { Loader2, Save, AlertCircle, CheckCircle } from "lucide-react";

const DEFAULT_CONTENT: AboutContent = {
    title: "",
    subtitle: "",
    description: "",
    globalReachTitle: "",
    globalReachDescription: "",
    philosophyTitle: "",
    philosophyDescription: "",
    ecosystemItems: [],
    whyChooseTitle: "",
    whyChooseDescription: "",
    closingStatement: ""
};

export function AboutEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { register, control, handleSubmit, reset } = useForm<AboutContent>({
        defaultValues: DEFAULT_CONTENT
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ecosystemItems"
    });

    useEffect(() => {
        async function loadContent() {
            setLoading(true);
            try {
                const data = await getAboutContent();
                if (data) {
                    reset(data);
                }
            } catch (error) {
                console.error("Failed to load content", error);
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, [reset]);

    const onSubmit = async (data: AboutContent) => {
        setSaving(true);
        setMsg(null);
        try {
            await updateAboutContent(data);
            setMsg({ type: 'success', text: "Content updated successfully!" });
        } catch (error: any) {
            setMsg({ type: 'error', text: "Failed to save: " + error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
            {msg && (
                <div className={`p-4 rounded flex items-center gap-2 text-sm ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {msg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {msg.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Hero Section</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Title</label>
                        <input {...register("title")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Subtitle</label>
                        <input {...register("subtitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Main Description</label>
                        <textarea {...register("description")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-32" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Global Reach</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Section Title</label>
                        <input {...register("globalReachTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Description</label>
                        <textarea {...register("globalReachDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-32" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Philosophy & Ecosystem</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Philosophy Title</label>
                        <input {...register("philosophyTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Philosophy Description</label>
                        <textarea {...register("philosophyDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-24" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Ecosystem Items</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start mb-2">
                            <div className="flex-1 space-y-2">
                                <input
                                    {...register(`ecosystemItems.${index}.title` as const)}
                                    placeholder="Item Title"
                                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm"
                                />
                                <input
                                    {...register(`ecosystemItems.${index}.description` as const)}
                                    placeholder="Item Description"
                                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-red-400 hover:bg-slate-800 rounded"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ id: Date.now().toString(), title: "", description: "" })}
                        className="text-xs text-emerald-500 hover:text-emerald-400"
                    >
                        + Add Ecosystem Item
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Why Choose & Closing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Why Choose Title</label>
                        <input {...register("whyChooseTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Closing Statement</label>
                        <input {...register("closingStatement")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Why Choose Description</label>
                    <textarea {...register("whyChooseDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-24" />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded flex items-center gap-2 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    SAVE CHANGES
                </button>
            </div>
        </form>
    );
}
