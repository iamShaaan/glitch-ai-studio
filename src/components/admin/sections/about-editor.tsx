"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getAboutContent, updateAboutContent, AboutContent } from "@/lib/firestore";
import { Loader2, Save, AlertCircle, CheckCircle } from "lucide-react";

const DEFAULT_CONTENT: AboutContent = {
    title: "",
    subtitle: "",
    description: "",
    founderMessageTitle: "",
    founderMessage: "",
    originTitle: "",
    originDescription: "",
    glitchDefinitionTitle: "",
    glitchDefinition: "",
    servicesTitle: "",
    services: [],
    whoWeHelpTitle: "",
    whoWeHelp: [],
    locationTitle: "",
    locationDescription: "",
    whyChooseTitle: "",
    whyChooseItems: [],
    ctaTitle: "",
    ctaDescription: ""
};

export function AboutEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { register, control, handleSubmit, reset } = useForm<AboutContent>({
        defaultValues: DEFAULT_CONTENT
    });

    // Field Arrays for lists
    const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
        control,
        name: "services"
    });

    const { fields: clientFields, append: appendClient, remove: removeClient } = useFieldArray({
        control,
        name: "whoWeHelp"
    });

    const { fields: whyFields, append: appendWhy, remove: removeWhy } = useFieldArray({
        control,
        name: "whyChooseItems"
    });

    useEffect(() => {
        async function loadContent() {
            setLoading(true);
            try {
                const data = await getAboutContent();
                if (data) {
                    // Ensure arrays exist and transform string arrays to object arrays if necessary
                    const transformedData = {
                        ...data,
                        services: data.services?.map(item => typeof item === 'string' ? { value: item } : item) || [],
                        whoWeHelp: data.whoWeHelp?.map(item => typeof item === 'string' ? { value: item } : item) || [],
                        whyChooseItems: data.whyChooseItems?.map(item => typeof item === 'string' ? { value: item } : item) || []
                    };
                    reset({
                        ...DEFAULT_CONTENT,
                        ...transformedData
                    });
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
            // Transform object arrays back to string arrays for Firestore
            const dataToSave = {
                ...data,
                services: data.services?.map((item: any) => item.value) || [],
                whoWeHelp: data.whoWeHelp?.map((item: any) => item.value) || [],
                whyChooseItems: data.whyChooseItems?.map((item: any) => item.value) || []
            };
            await updateAboutContent(dataToSave as unknown as AboutContent);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl pb-12">
            {msg && (
                <div className={`p-4 rounded flex items-center gap-2 text-sm ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {msg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {msg.text}
                </div>
            )}

            {/* 1. Hero Section */}
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

            {/* 2. Founder & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Founder Message</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Title</label>
                        <input {...register("founderMessageTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Message Content</label>
                        <textarea {...register("founderMessage")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-48" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Origin & Definition</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Origin Title</label>
                        <input {...register("originTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Origin Description</label>
                        <textarea {...register("originDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-24" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">"What Glitch Means" Title</label>
                        <input {...register("glitchDefinitionTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">"What Glitch Means" Text</label>
                        <textarea {...register("glitchDefinition")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-24" />
                    </div>
                </div>
            </div>

            {/* 3. Services List */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Services</h3>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Section Title</label>
                    <input {...register("servicesTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Service List</label>
                    {serviceFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`services.${index}.value`)}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm"
                            />
                            <button type="button" onClick={() => removeService(index)} className="text-red-400 px-2">&times;</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendService({ value: "New Service" })} className="text-xs text-emerald-500">+ Add Service</button>
                </div>
            </div>

            {/* 4. Clients & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Who We Help</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Title</label>
                        <input {...register("whoWeHelpTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Client Types</label>
                        {clientFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2">
                                <input
                                    {...register(`whoWeHelp.${index}.value`)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm"
                                />
                                <button type="button" onClick={() => removeClient(index)} className="text-red-400 px-2">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => appendClient({ value: "New Client Type" })} className="text-xs text-emerald-500">+ Add Client Type</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Location</h3>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Title</label>
                        <input {...register("locationTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">Description</label>
                        <textarea {...register("locationDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm h-32" />
                    </div>
                </div>
            </div>

            {/* 5. Why Choose & CTA */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-2">Why Choose & CTA</h3>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Why Choose Title</label>
                    <input {...register("whyChooseTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400">Why Items</label>
                    {whyFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`whyChooseItems.${index}.value`)}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm"
                            />
                            <button type="button" onClick={() => removeWhy(index)} className="text-red-400 px-2">&times;</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendWhy({ value: "New Reason" })} className="text-xs text-emerald-500">+ Add Reason</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">CTA Title</label>
                        <input {...register("ctaTitle")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400">CTA Description</label>
                        <input {...register("ctaDescription")} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800 sticky bottom-0 bg-slate-900 p-4 -mx-4 rounded-b-xl">
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    SAVE ALL CHANGES
                </button>
            </div>
        </form>
    );
}
