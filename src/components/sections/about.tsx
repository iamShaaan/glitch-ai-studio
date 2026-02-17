"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAboutContent, AboutContent } from "@/lib/firestore";
import { GlitchText } from "@/components/ui/glitch-text";
import { User, Terminal, Globe, Zap, Check, ArrowRight } from "lucide-react";

const DEFAULT_CONTENT: AboutContent = {
    title: "AI Content Studio for AI Influencers, Avatars, and Automation",
    subtitle: "We Build AI-Powered Content Systems That Scale Brands",
    description: "Glitch AI Studio is an AI content studio helping creators, founders, and businesses grow with AI influencers, AI avatars, short-form video systems, and content automation.\n\nWe do not sell random AI visuals.\nWe build AI content systems that turn ideas into authority, attention, and revenue. Fast, scalable, and sustainable.",

    founderMessageTitle: "A Message From the Founder",
    founderMessage: "I am Shan, founder of Glitch AI Studio.\n\nI did not start this studio because AI was trending.\nI started it because I needed leverage.\n\nI came from the creator side. Limited resources. Global competition. Constant pressure to keep up. I realized early that working harder was not enough. I had to work smarter.\n\nAI was not the shortcut.\nSystems were.\n\nGlitch AI Studio exists to help creators and businesses build those systems. AI influencers that work 24/7. Content pipelines that remove burnout. Automation that replaces chaos with clarity.\n\nThis studio is built for people who want control over their brand, their time, and their growth.\n\nIf you believe AI should support human creativity, not replace it, you are in the right place.",

    originTitle: "Built From the Creator Side, Not the Agency Side",
    originDescription: "Glitch AI Studio was founded by a creator who lived the problem.\n\nInstead of chasing trends, we studied AI workflows, prompt engineering, content automation, and short-form video strategy.\n\nThat mindset turned into a full-service AI content agency focused on scalability, consistency, and conversion.",

    glitchDefinitionTitle: "What “Glitch” Means",
    glitchDefinition: "A glitch is not an error.\nIt is a system behaving differently than expected.\n\nGlitch AI Studio creates those moments by using AI tools, automation, and content systems in smarter ways.\n\nWe do not chase AI tools.\nWe design systems that last.",

    servicesTitle: "Our AI Content Services",
    services: [
        { value: "AI influencers and AI avatar creation" },
        { value: "AI avatar clones for founders and brands" },
        { value: "Short-form AI video content for Instagram, TikTok, LinkedIn, and YouTube" },
        { value: "Cinematic AI ads and brand visuals" },
        { value: "Advanced prompt engineering for image and video models" },
        { value: "AI voice generation and AI video workflows" },
        { value: "Content repurposing and automation pipelines" },
        { value: "Scalable AI storytelling for personal brands and businesses" }
    ],

    whoWeHelpTitle: "Who We Help",
    whoWeHelp: [
        { value: "Founders who do not want to be on camera" },
        { value: "Coaches and consultants building authority" },
        { value: "Businesses scaling content without large teams" },
        { value: "Creators looking for AI leverage, not hustle" }
    ],

    locationTitle: "Global AI Studio Built in Bangladesh",
    locationDescription: "Glitch AI Studio operates globally and is proudly built from Bangladesh.\n\nWe believe world-class AI content creation is no longer limited by location. Only by clarity, execution, and systems.",

    whyChooseTitle: "Why Choose Glitch AI Studio",
    whyChooseItems: [
        { value: "Because AI alone is not the advantage. The advantage is how you use it." },
        { value: "Strategy before tools" },
        { value: "Systems before volume" },
        { value: "Long-term growth over short-term hype" }
    ],

    ctaTitle: "Ready to Build Your AI Content System?",
    ctaDescription: "If you want AI influencers, AI avatars, and automated content that actually converts, let’s build it properly."
};

export function AboutSection() {
    const [content, setContent] = useState<AboutContent>(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getAboutContent();
                if (data) {
                    setContent(data);
                }
            } catch (error) {
                console.error("Failed to fetch About content:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="py-24 bg-slate-950 text-white overflow-hidden relative" id="about">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 -left-64 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10 space-y-32">

                {/* 1. HERO SECTION */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                    className="text-center max-w-5xl mx-auto"
                >
                    <motion.h4 variants={itemVariants} className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase mb-6">
                        AI Content Studio
                    </motion.h4>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        <GlitchText text={content.title} />
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white font-medium mb-8">
                        {content.subtitle}
                    </motion.p>
                    <motion.div variants={itemVariants} className="text-lg text-slate-400 space-y-4 max-w-3xl mx-auto leading-relaxed">
                        {content.description.split('\n').map((line, i) => (
                            line && <p key={i}>{line}</p>
                        ))}
                    </motion.div>
                </motion.div>

                {/* 2. FOUNDER & ORIGIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden"
                    >
                        <User className="w-12 h-12 text-emerald-500 mb-6" />
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">{content.founderMessageTitle}</motion.h3>
                        <motion.div variants={itemVariants} className="space-y-4 text-slate-300">
                            {content.founderMessage.split('\n').map((line, i) => (
                                line && <p key={i} className="leading-relaxed">{line}</p>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                        className="space-y-12"
                    >
                        <div>
                            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 text-emerald-400">{content.originTitle}</motion.h3>
                            <motion.div variants={itemVariants} className="space-y-4 text-slate-400">
                                {content.originDescription.split('\n').map((line, i) => (
                                    line && <p key={i}>{line}</p>
                                ))}
                            </motion.div>
                        </div>

                        <div className="pl-6 border-l-2 border-emerald-500/30">
                            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Terminal className="w-6 h-6 text-emerald-500" /> {content.glitchDefinitionTitle}
                            </motion.h3>
                            <motion.div variants={itemVariants} className="space-y-4 text-slate-300 italic">
                                {content.glitchDefinition.split('\n').map((line, i) => (
                                    line && <p key={i}>{line}</p>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* 3. SERVICES & CLIENTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                    >
                        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-yellow-500" /> {content.servicesTitle}
                        </h3>
                        <ul className="space-y-4">
                            {content.services.map((service, i) => (
                                <motion.li variants={itemVariants} key={i} className="flex items-start gap-3 bg-slate-900 border border-slate-800 p-4 rounded hover:border-emerald-500/30 transition-colors">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                                    <span className="text-slate-300 text-sm">{service.value}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                    >
                        <h3 className="text-3xl font-bold mb-8">{content.whoWeHelpTitle}</h3>
                        <div className="grid grid-cols-1 gap-4 mb-12">
                            {content.whoWeHelp.map((item, i) => (
                                <motion.div variants={itemVariants} key={i} className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-lg">
                                    <p className="text-white font-medium">{item.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-8">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400">
                                <Globe className="w-5 h-5" /> {content.locationTitle}
                            </h4>
                            <div className="space-y-4 text-slate-300 text-sm">
                                {content.locationDescription.split('\n').map((line, i) => (
                                    line && <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 4. WHY CHOOSE & CTA */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h3 className="text-3xl font-bold mb-12">{content.whyChooseTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {content.whyChooseItems.map((item, i) => (
                            <motion.div variants={itemVariants} key={i} className="p-6 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                                {item.value}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={itemVariants} className="bg-emerald-600 rounded-2xl p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-800" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">{content.ctaTitle}</h3>
                            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
                            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded hover:bg-emerald-50 transition-colors">
                                BOOK A CONSULTATION <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
