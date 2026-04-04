"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { submitConsultationBooking } from "@/lib/firestore";

interface BookingFormInputs {
  name: string;
  email: string;
  message: string;
}

export function LandingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormInputs>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: BookingFormInputs) => {
    setSubmitting(true);
    try {
      await submitConsultationBooking(data);
      setSuccess(true);
      toast.success("Call request received!");
      setTimeout(() => {
        setSuccess(false);
        reset();
      }, 5000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all duration-300";
  const labelClasses =
    "text-xs font-medium text-slate-400 flex items-center gap-2 mb-1.5";

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#0a1628_0%,#030712_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium tracking-widest text-emerald-300 uppercase">
              Let&apos;s Talk
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Book a{" "}
            <span className="text-emerald-400">Call with Us</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
            Tell us about your brand. We&apos;ll analyze your needs and show you exactly how AI can transform your business.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="glass rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden animate-border-glow">
            {/* Top accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 animate-glow-pulse">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Request Received! 🎉
                </h3>
                <p className="text-slate-400 max-w-sm">
                  We&apos;ve received your call details. Our team will
                  review your profile and reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Row 1: Name + Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>
                      <User className="w-3.5 h-3.5 text-emerald-500" /> Full
                      Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-400 mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      <Mail className="w-3.5 h-3.5 text-emerald-500" /> Email
                      Address
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={inputClasses}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400 mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Message */}
                <div>
                  <label className={labelClasses}>
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    What do you expect from us?
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className={`${inputClasses} min-h-[120px] resize-none`}
                    placeholder="Tell us what you're looking to achieve..."
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Schedule Your Call
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-600">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
