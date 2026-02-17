import { db } from "./firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";

// --- Types ---

export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    role: 'admin' | 'client';
    funnelStage: string; // e.g., "Avatar Creation", "Voice Training"
    createdAt: Timestamp;
}

export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string; // Markdown or HTML
    excerpt: string;
    coverImage?: string;
    published: boolean;
    createdAt: Timestamp;
}

export interface ClientAsset {
    id?: string;
    userId: string;
    title: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    createdAt: Timestamp;
}

export interface ContactSubmission {
    id?: string;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'contacted' | 'archived';
    createdAt: Timestamp;
}

// --- Helpers ---

// Users
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
    await setDoc(doc(db, "users", uid), {
        uid,
        createdAt: serverTimestamp(),
        role: 'client', // Default
        funnelStage: 'Onboarding',
        ...data
    }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
}

// Blog
export async function getBlogPosts(publishedOnly = true) {
    let q = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"));
    if (publishedOnly) {
        q = query(q, where("published", "==", true));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
}

export async function createBlogPost(post: Omit<BlogPost, "id" | "createdAt">) {
    return await addDoc(collection(db, "blog_posts"), {
        ...post,
        createdAt: serverTimestamp()
    });
}

// Assets
export async function getClientAssets(userId: string) {
    const q = query(
        collection(db, "client_assets"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ClientAsset));
}

// Leads
export async function submitContactForm(data: Omit<ContactSubmission, "id" | "status" | "createdAt">) {
    return await addDoc(collection(db, "leads"), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp()
    });
}
