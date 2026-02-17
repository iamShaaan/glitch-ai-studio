import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfKMdxrJhfS114ThCFXyYzFT73mmoQayQ",
  authDomain: "glitch-ai-studio-33c3e.firebaseapp.com",
  projectId: "glitch-ai-studio-33c3e",
  storageBucket: "glitch-ai-studio-33c3e.firebasestorage.app",
  messagingSenderId: "1016496868948",
  appId: "1:1016496868948:web:8a326697df224011a967c1",
  measurementId: "G-V6H1LZDPLH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
