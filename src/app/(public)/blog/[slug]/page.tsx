"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogPostBySlug, BlogPost } from '@/lib/firestore';
import { ConsultationCTA } from '@/components/blog/consultation-cta';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles for public display

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchPost = async () => {
            try {
                const data = await getBlogPostBySlug(slug);
                if (!data) {
                    setLoading(false);
                    return;
                }
                setPost(data);
            } catch (error) {
                console.error("Failed to load blog post", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
                <h1 className="text-2xl font-bold mb-4">Transmission Lost</h1>
                <Link href="/blog" className="text-emerald-500 hover:underline">Return to Signal</Link>
            </div>
        );
    }

    // Sanitize HTML - Allow iframes for video, styles for color/align, class for Quill
    const sanitizedContent = DOMPurify.sanitize(post.content, {
        ADD_TAGS: ['iframe', 'video'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'class', 'style'],
    });

    return (
        <article className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-slate-400 hover:text-emerald-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    BACK_TO_ARCHIVE
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {post.createdAt?.toDate
                                ? new Date(post.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Unknown Date'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                        {post.title}
                    </h1>
                </header>

                {post.coverImage && (
                    <div className="mb-12 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video relative">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                    </div>
                )}

                {/* Content Container - specialized for Quill output with prose fallback */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-white 
                    prose-p:text-slate-300 prose-a:text-emerald-500 
                    prose-strong:text-white prose-li:text-slate-300 
                    prose-img:rounded-lg 
                    break-words overflow-x-hidden
                    ql-snow" /* Enable Quill Snow theme overrides */
                >
                    <div
                        className="ql-editor !p-0 !overflow-visible" /* Match Quill editor class for styles, remove default padding/overflow */
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                </div>

                <hr className="my-12 border-slate-800" />

                <ConsultationCTA />
            </div>
        </article>
    );
}
