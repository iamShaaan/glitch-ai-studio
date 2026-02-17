import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/firestore';
import { Calendar, ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { GlitchText } from '@/components/ui/glitch-text';

interface BlogCardProps {
    post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
    // Format date if available
    const formatDate = (date: Timestamp | Date | undefined) => {
        if (!date) return '';
        // Handle Firestore Timestamp or Date object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = (date as any).toDate ? (date as any).toDate() : new Date(date as Date);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(d);
    };

    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-emerald-500 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] relative">

                {/* "New" Badge or Status could go here */}

                {/* Image Container - Big & Bold */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-950 border-b border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                            <GlitchText text="GLITCH_STUDIO" />
                        </div>
                    )}
                    {/* Overlay gradient for readability if text overlay is needed, otherwise aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* content - Button-like structure */}
                <div className="p-6 flex flex-col flex-grow relative bg-slate-900 group-hover:bg-slate-800/50 transition-colors">

                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-xs text-emerald-500 font-mono bg-emerald-950/30 px-2 py-1 rounded">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                        {post.title}
                    </h3>

                    {/* Excerpt - Optional, kept for context but user emphasized Headline/Thumbnail */}
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                    </p>

                    {/* Pseudo-Button at the bottom */}
                    <div className="mt-auto w-full bg-slate-950 border border-slate-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:border-emerald-500 group-hover:text-white transition-all duration-300">
                        <span>ACCESS_DATA</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
