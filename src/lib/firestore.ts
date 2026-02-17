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
import { APP_ID } from "./constants";

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
    excerpt: string;
    coverImage?: string;
    content: string; // HTML content from Rich Text Editor
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

export interface AboutContent {
    // Hero
    title: string;
    subtitle: string;
    description: string;

    // Founder
    founderMessageTitle: string;
    founderMessage: string;

    // Origin
    originTitle: string;
    originDescription: string;

    // Definition
    glitchDefinitionTitle: string;
    glitchDefinition: string;

    // Services
    servicesTitle: string;
    services: { value: string }[];

    // Clients
    whoWeHelpTitle: string;
    whoWeHelp: { value: string }[];

    // Location
    locationTitle: string;
    locationDescription: string;

    // Why Choose
    whyChooseTitle: string;
    whyChooseItems: { value: string }[];

    // CTA
    ctaTitle: string;
    ctaDescription: string;
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

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, "blog_posts"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPost;
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
// About Us Content
export async function getAboutContent(): Promise<AboutContent | null> {
    const docRef = doc(db, `apps/${APP_ID}/content/about_us`);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as AboutContent) : null;
}

export async function updateAboutContent(content: AboutContent) {
    const docRef = doc(db, `apps/${APP_ID}/content/about_us`);
    await setDoc(docRef, content, { merge: true });
}
