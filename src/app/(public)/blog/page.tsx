"use client";

import { useEffect, useState } from 'react';
import { getBlogPosts, BlogPost } from '@/lib/firestore';
import { BlogCard } from '@/components/blog/blog-card';
import { GlitchText } from '@/components/ui/glitch-text';
import { Loader2 } from 'lucide-react';

export default function BlogListingPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts(true); // Fetch only published
                setPosts(data);
            } catch (error) {
                console.error("Failed to load blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        <GlitchText text="TRANSMISSIONS" />
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Insights, strategies, and updates from the Glitch Studio. Decoding the future of digital growth.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <div key={post.id} className="h-full">
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
                                <p className="text-slate-500">No transmissions received yet. Stand by.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
