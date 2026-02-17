"use client";

import { GlitchText } from "@/components/ui/glitch-text";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    <GlitchText text="TERMS_OF_SERVICE" />
                </h1>

                <div className="prose prose-invert prose-emerald max-w-none space-y-8 text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using Glitch AI Studio ("Services"), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Glitch AI Studio and its licensors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                        <p>
                            You agree not to misuse our services or help anyone else do so. You are responsible for all activity that occurs under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            In no event shall Glitch AI Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
