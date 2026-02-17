"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBlogPosts, createBlogPost, BlogPost } from "@/lib/firestore";
import { Loader2, Plus, Trash2, FileText } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AboutEditor } from "./sections/about-editor";

export function CMSManager() {
    const [activeTab, setActiveTab] = useState<'blog' | 'about'>('blog');

    // Blog State
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const [creating, setCreating] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        const data = await getBlogPosts(false); // Fetch all, including drafts
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onSubmit = async (data: any) => {
        setCreating(true);
        try {
            await createBlogPost({
                title: data.title,
                slug: data.title.toLowerCase().replace(/ /g, "-"),
                excerpt: data.excerpt,
                content: data.content,
                published: true,
            });
            reset();
            fetchPosts();
        } catch (error) {
            console.error("Failed to create post", error);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            await deleteDoc(doc(db, "blog_posts", id));
            fetchPosts();
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-500" /> Content Management System
                </h3>
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                        onClick={() => setActiveTab('blog')}
                        className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${activeTab === 'blog' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Blog Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${activeTab === 'about' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        About Us
                    </button>
                </div>
            </div>

            {activeTab === 'about' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <AboutEditor />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Create Form */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">New Transmission</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input
                                {...register("title", { required: true })}
                                placeholder="Title"
                                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                            <textarea
                                {...register("excerpt", { required: true })}
                                placeholder="Brief Excerpt"
                                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500 h-20"
                            />
                            <textarea
                                {...register("content", { required: true })}
                                placeholder="Content (Markdown supported)"
                                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-emerald-500 h-40 font-mono text-sm"
                            />
                            <button
                                type="submit"
                                disabled={creating}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                PUBLISH
                            </button>
                        </form>
                    </div>

                    {/* List */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Archives</h4>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mx-auto" />
                            ) : posts.length === 0 ? (
                                <p className="text-slate-500 text-sm italic">No records found.</p>
                            ) : (
                                posts.map((post) => (
                                    <div key={post.id} className="bg-slate-950 border border-slate-800 p-3 rounded flex justify-between items-start group hover:border-emerald-500/30 transition-colors">
                                        <div>
                                            <h5 className="text-white font-medium text-sm group-hover:text-emerald-400">{post.title}</h5>
                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{post.slug}</p>
                                        </div>
                                        <button
                                            onClick={() => post.id && handleDelete(post.id)}
                                            className="text-slate-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
