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
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                            <GlitchText text="GLITCH_STUDIO" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-emerald-500 mb-3 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm font-medium text-emerald-500 mt-auto">
                        <span className="mr-2">READ_TRANSMISSION</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
