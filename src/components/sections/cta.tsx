"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 to-emerald-950 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                    READY TO <span className="text-emerald-400">TRANSCEND</span>?
                </h2>
                <p className="max-w-xl mx-auto text-lg text-slate-300 mb-10">
                    The queue for digital immortality is growing. Secure your legacy today.
                </p>

                <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20"
                >
                    APPLY FOR ACCESS <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
