"use client";

import { useState, useEffect } from 'react';
import { BlogPost, createBlogPost, getBlogPosts } from '@/lib/firestore';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { RichTextEditor } from '@/components/blog/rich-text-editor';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export const BlogManager = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
        title: '',
        slug: '',
        excerpt: '',
        coverImage: '',
        content: '',
        published: true,
    });

    // Fetch posts
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            // Note: getBlogPosts in firestore.ts might need a flag to fetch ALL posts (published and drafts)
            // For now, I'll fetch drafts too if I modify getBlogPosts or just request them here manually if needed.
            // Let's assume getBlogPosts(false) fetches all.
            const data = await getBlogPosts(false);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load blog posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPost.title || !currentPost.content) {
            toast.error("Title and Content are required");
            return;
        }

        // Auto-generate slug if missing
        const slug = currentPost.slug || currentPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        try {
            if (currentPost.id) {
                // Update
                const docRef = doc(db, "blog_posts", currentPost.id);
                await updateDoc(docRef, {
                    ...currentPost,
                    slug,
                    updatedAt: new Date() // Firestore hook might handle this but explicit is safe
                });
                toast.success("Post updated successfully");
            } else {
                // Create
                // Ensure required fields are present
                const newPost = {
                    title: currentPost.title!,
                    slug,
                    excerpt: currentPost.excerpt || '',
                    coverImage: currentPost.coverImage,
                    content: currentPost.content!,
                    published: currentPost.published ?? true
                };

                await createBlogPost(newPost);
                toast.success("Post created successfully");
            }

            setIsEditing(false);
            setCurrentPost({ title: '', slug: '', excerpt: '', coverImage: '', content: '', published: true });
            fetchPosts();
        } catch (error) {
            console.error("Error saving post:", error);
            toast.error("Failed to save post");
        }
    };

    // Delete Post
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await deleteDoc(doc(db, "blog_posts", id));
            toast.success("Post deleted");
            fetchPosts();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete post");
        }
    };

    if (isEditing) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {currentPost.id ? 'EDIT_TRANSMISSION' : 'NEW_TRANSMISSION'}
                    </h2>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-slate-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-mono text-emerald-500">HEADLINE</label>
                            <input
                                type="text"
                                value={currentPost.title}
                                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:border-emerald-500 outline-none"
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-mono text-emerald-500">SLUG (OPTIONAL)</label>
                            <input
                                type="text"
                                value={currentPost.slug}
                                onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-400 focus:border-emerald-500 outline-none"
                                placeholder="auto-generated-slug"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-mono text-emerald-500">COVER IMAGE URL</label>
                            <input
                                type="text"
                                value={currentPost.coverImage}
                                onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-400 focus:border-emerald-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-mono text-emerald-500">STATUS</label>
                            <div className="flex items-center gap-4 mt-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={currentPost.published}
                                        onChange={() => setCurrentPost({ ...currentPost, published: true })}
                                        className="text-emerald-500"
                                    />
                                    <span className="text-white">Published</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={!currentPost.published}
                                        onChange={() => setCurrentPost({ ...currentPost, published: false })}
                                        className="text-emerald-500"
                                    />
                                    <span className="text-slate-400">Draft</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-emerald-500">EXCERPT</label>
                        <textarea
                            value={currentPost.excerpt}
                            onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-300 focus:border-emerald-500 outline-none h-24 resize-none"
                            placeholder="Brief summary for the blog card..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-emerald-500">CONTENT</label>
                        <RichTextEditor
                            value={currentPost.content || ''}
                            onChange={(val) => setCurrentPost({ ...currentPost, content: val })}
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            SAVE_TRANSMISSION
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">BLOG TRANSMISSIONS</h2>
                    <p className="text-slate-400 text-sm">Manage your broadcast frequency.</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentPost({ published: true });
                        setIsEditing(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    NEW_ENTRY
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-slate-500 animate-pulse">Scanning frequencies...</div>
            ) : (
                <div className="grid gap-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg">
                            No transmissions found.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between group hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-950 rounded overflow-hidden flex-shrink-0 relative">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs">NO IMG</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{post.title}</h3>
                                        <div className="flex items-center gap-2 text-xs mt-1">
                                            <span className={`px-2 py-0.5 rounded-full ${post.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                {post.published ? 'LIVE' : 'DRAFT'}
                                            </span>
                                            <span className="text-slate-500">
                                                {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setCurrentPost(post);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id!)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
