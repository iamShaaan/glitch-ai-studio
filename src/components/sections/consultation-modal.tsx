"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { X, Loader2, CheckCircle, Calendar, Globe, Linkedin, MessageSquare, Clock, MapPin, Building2, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { submitConsultationBooking } from '@/lib/firestore';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BookingFormInputs {
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

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormInputs>();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: BookingFormInputs) => {
        setSubmitting(true);
        try {
            await submitConsultationBooking(data);
            setSuccess(true);
            toast.success("Consultation request received!");
            setTimeout(() => {
                setSuccess(false);
                reset();
                onClose();
            }, 3000);
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 text-left align-middle shadow-xl transition-all relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {success ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                                        <p className="text-slate-400">
                                            We've received your consultation details. <br />
                                            Our team will review your profile and reach out shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold text-white mb-2"
                                        >
                                            Book a Consultation
                                        </Dialog.Title>
                                        <p className="text-slate-400 mb-8 text-sm">
                                            Let's discuss how we can immortalize your identity. Please provide detailed information to help us prepare.
                                        </p>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                            {/* Basic Info */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <User className="w-3 h-3 text-emerald-500" /> Full Name
                                                    </label>
                                                    <input
                                                        {...register("name", { required: "Name is required" })}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <MessageSquare className="w-3 h-3 text-emerald-500" /> Email Address
                                                    </label>
                                                    <input
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Invalid email address"
                                                            }
                                                        })}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="john@example.com"
                                                    />
                                                    {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                                                </div>
                                            </div>

                                            {/* Digital Presence */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <Globe className="w-3 h-3 text-emerald-500" /> Website (Optional)
                                                    </label>
                                                    <input
                                                        {...register("website")}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="https://yourbrand.com"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <Linkedin className="w-3 h-3 text-emerald-500" /> Best Social Media
                                                    </label>
                                                    <input
                                                        {...register("socialMedia", { required: "Social media link is required" })}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="LinkedIn / Twitter / Instagram URL"
                                                    />
                                                    {errors.socialMedia && <span className="text-xs text-red-400">{errors.socialMedia.message}</span>}
                                                </div>
                                            </div>

                                            {/* Business & Message */}
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                    <Building2 className="w-3 h-3 text-emerald-500" /> Business Info
                                                </label>
                                                <textarea
                                                    {...register("businessInfo", { required: "Business info is required" })}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors min-h-[80px]"
                                                    placeholder="Tell us about your company and what you do..."
                                                />
                                                {errors.businessInfo && <span className="text-xs text-red-400">{errors.businessInfo.message}</span>}
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                    <MessageSquare className="w-3 h-3 text-emerald-500" /> Message / Goals
                                                </label>
                                                <textarea
                                                    {...register("message", { required: "Message is required" })}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors min-h-[80px]"
                                                    placeholder="What are you looking to achieve with an AI Twin or Character?"
                                                />
                                                {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
                                            </div>

                                            {/* Scheduling */}
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <MapPin className="w-3 h-3 text-emerald-500" /> Location
                                                    </label>
                                                    <input
                                                        {...register("location", { required: "Location is required" })}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="City, Country"
                                                    />
                                                    {errors.location && <span className="text-xs text-red-400">{errors.location.message}</span>}
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <Clock className="w-3 h-3 text-emerald-500" /> Best Time to Call
                                                    </label>
                                                    <input
                                                        {...register("preferredTime", { required: "Preferred time is required" })}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="e.g. Weekdays 2-5PM"
                                                    />
                                                    {errors.preferredTime && <span className="text-xs text-red-400">{errors.preferredTime.message}</span>}
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                                        <Calendar className="w-3 h-3 text-emerald-500" /> WhatsApp (Optional)
                                                    </label>
                                                    <input
                                                        {...register("whatsapp")}
                                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="+1 234 567 8900"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                            >
                                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "SUBMIT REQUEST"}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
