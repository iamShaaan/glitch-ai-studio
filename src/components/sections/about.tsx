"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAboutContent, AboutContent, EcosystemItem } from "@/lib/firestore";
import { GlitchText } from "@/components/ui/glitch-text";
import { Shield, Zap, Globe, Cpu, Users } from "lucide-react";

const DEFAULT_CONTENT: AboutContent = {
    title: "The Architects of Digital Identity",
    subtitle: "Revolutionizing Content Creation Through AI Innovation",
    description: "Glitch AI Studio is a premier global agency dedicated to bridging the gap between human expertise and artificial intelligence. We specialize in transforming how founders, spokespersons, and brands communicate in the digital age. By leveraging cutting-edge AI Avatar technology and bespoke automation, we empower leaders to scale their presence without the traditional constraints of content production.",
    globalReachTitle: "A Studio Without Borders",
    globalReachDescription: "Operating as a fully remote, worldwide studio, Glitch AI Studio serves a global clientele. We believe that talent and technology have no geographic boundaries. Whether you are a firm in London, a tech startup in Silicon Valley, or an enterprise in Singapore, our team provides seamless, 24/7 AI-driven solutions tailored to your specific timezone and market needs.",
    philosophyTitle: "Identity First, Scale Second",
    philosophyDescription: "Our approach is built on a proprietary strategic framework designed to ensure authenticity at scale. At Glitch AI Studio, we don't just create content; we build Digital Identities. Our process begins with the creation of high-fidelity AI Clones and Influencers, providing the foundation for a comprehensive ecosystem.",
    ecosystemItems: [
        { id: "1", title: "AI Avatar & Clone Development", description: "Creating your digital twin for effortless communication." },
        { id: "2", title: "Dynamic Content Creation", description: "High-impact video and graphic design produced at the speed of thought." },
        { id: "3", title: "Smart Automation", description: "Streamlining internal processes and content distribution." },
        { id: "4", title: "Full-Stack Digital Growth", description: "From SEO and social media management to custom application development." }
    ],
    whyChooseTitle: "Why Choose Glitch AI Studio?",
    whyChooseDescription: "In an era of generic AI tools, we stand out as a boutique studio that prioritizes human connection. We provide the technical infrastructure—built on secure, state-of-the-art stacks like Google Firebase and Next.js—to ensure your digital assets are protected and your brand remains consistent.",
    closingStatement: "We are not just a content agency; we are your partners in the AI revolution. We help you reclaim your time while ensuring your message reaches your audience with precision and flair."
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
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section className="py-24 bg-slate-950 text-white overflow-hidden relative" id="about">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 -left-64 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 max-w-4xl mx-auto"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase mb-4">About Glitch AI Studio</h2>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        <GlitchText text={content.title} />
                    </h3>
                    <p className="text-xl text-slate-400 font-light">{content.subtitle}</p>
                </motion.div>

                {/* Main Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-lg p-8 h-full flex flex-col justify-center">
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                {content.description}
                            </p>
                            <div className="flex items-center gap-4 text-emerald-400">
                                <Globe className="w-6 h-6" />
                                <span className="font-semibold">{content.globalReachTitle}</span>
                            </div>
                            <p className="text-slate-400 mt-2 text-sm">
                                {content.globalReachDescription}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-yellow-400" />
                                {content.philosophyTitle}
                            </h4>
                            <p className="text-slate-400 leading-relaxed">
                                {content.philosophyDescription}
                            </p>
                        </div>

                        {/* Ecosystem Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.ecosystemItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="bg-slate-900/50 border border-slate-800 p-4 rounded hover:border-emerald-500/50 transition-colors"
                                >
                                    <h5 className="font-semibold text-white mb-1 text-sm">{item.title}</h5>
                                    <p className="text-xs text-slate-500">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Why Choose & CTA */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 text-center max-w-5xl mx-auto"
                >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-emerald-500" />
                    </div>
                    <motion.h4 variants={itemVariants} className="text-3xl font-bold mb-6">{content.whyChooseTitle}</motion.h4>
                    <motion.p variants={itemVariants} className="text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        {content.whyChooseDescription}
                    </motion.p>
                    <motion.div variants={itemVariants} className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mb-8" />
                    <motion.p variants={itemVariants} className="text-lg font-medium text-emerald-400">
                        {content.closingStatement}
                    </motion.p>
                </motion.div>

            </div>
        </section>
    );
}
