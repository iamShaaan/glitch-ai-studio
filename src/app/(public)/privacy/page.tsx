"use client";

import { GlitchText } from "@/components/ui/glitch-text";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    <GlitchText text="PRIVACY_PROTOCOL" />
                </h1>

                <div className="prose prose-invert prose-emerald max-w-none space-y-8 text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Data Initialization</h2>
                        <p>
                            Glitch AI Studio ("we," "our," or "us") respects your privacy. This protocol outlines how we collect, use, and protect your data when you interact with our ecosystem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information Collection</h2>
                        <p>We collect information you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Identity data (Name, Email, Company)</li>
                            <li>Communication data (Messages, Inquiries)</li>
                            <li>Technical data (IP address, Browser type)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Usage</h2>
                        <p>Your data is processed to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Execute services and deliver deliverables.</li>
                            <li>Maintain and optimize our digital infrastructure.</li>
                            <li>Communicate specific updates regarding your projects.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Security Protocols</h2>
                        <p>
                            We implement industry-standard encryption and security measures to protect your data. However, no transmission over the network is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Contact</h2>
                        <p>
                            For privacy-related inquiries, initiate a connection via our Contact page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
