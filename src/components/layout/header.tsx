"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact Us", href: "/contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                            src="/logo.png"
                            alt="Glitch AI"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-lg md:text-xl tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                        GLITCH AI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/portal"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 rounded hover:bg-emerald-600 hover:text-white transition-all text-sm font-medium group"
                    >
                        Client Login
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-slate-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-slate-300 hover:text-emerald-400 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/portal"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 rounded hover:bg-emerald-600 hover:text-white transition-all font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Client Login <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
