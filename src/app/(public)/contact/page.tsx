"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { OriginStory } from "@/components/contact/origin-story";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 py-8 max-w-7xl w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Story */}
                    <div className="order-2 lg:order-1 animate-in slide-in-from-left-8 duration-700 delay-150">
                        <OriginStory />
                    </div>

                    {/* Right Column: Form */}
                    <div className="order-1 lg:order-2 h-full flex flex-col justify-center animate-in slide-in-from-right-8 duration-700">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
