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

export interface CareerApplication {
    id?: string;
    fullName: string;
    email: string;
    portfolioUrl: string;
    favoriteAiTool: string;
    resumeLink?: string; // Optional: Link to CV
    roleAppliedFor: string;
    experience: string; // NEW: Long text
    messageToCeo: string; // NEW: Long text
    status: 'new' | 'reviewing' | 'interview' | 'rejected' | 'hired';
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
    let q = query(collection(db, "blog_posts")); // Removed orderBy to avoid index issues
    if (publishedOnly) {
        q = query(q, where("published", "==", true));
    }
    const snap = await getDocs(q);
    const posts = snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));

    // Sort client-side to avoid needing a composite index immediately
    return posts.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
        return dateB.getTime() - dateA.getTime();
    });
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


// Career Applications
export async function submitCareerApplication(data: Omit<CareerApplication, 'id' | 'status' | 'createdAt'>) {
    // 1. Save to Firestore
    await addDoc(collection(db, `apps/${APP_ID}/career_applications`), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp()
    });

    console.log("Application saved to Firestore (Text-Only Mode).");
}

export async function getCareerApplications() {
    const q = query(
        collection(db, `apps/${APP_ID}/career_applications`),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as CareerApplication));
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

// --- System Configuration ---

export interface SystemConfig {
    careerWebhookUrl: string;
}

export async function getSystemConfig(): Promise<SystemConfig> {
    const docRef = doc(db, `apps/${APP_ID}/config/system`);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        return snap.data() as SystemConfig;
    }
    // Default config if not set
    return {
        careerWebhookUrl: "https://up-seo-2025.app.n8n.cloud/webhook/c58a5beb-e0fe-46fa-beff-a13184f98b1c"
    };
}

export async function updateSystemConfig(config: Partial<SystemConfig>) {
    const docRef = doc(db, `apps/${APP_ID}/config/system`);
    await setDoc(docRef, config, { merge: true });
}
