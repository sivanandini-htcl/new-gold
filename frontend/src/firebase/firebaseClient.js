// src/firebase/firebaseClient.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";  // Add this import

// Initialize Firebase only in browser
let app;
let auth;
let messaging;  // Add this variable

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  messaging = getMessaging(app);  // Add this initialization
}

export const db = getFirestore(app);
export { auth };
export { app };
export { messaging };  // Add this export
export const googleprovider = new GoogleAuthProvider();
export const signInwithgoogle = () => signInWithPopup(auth, googleprovider);
export const getIdToken = async () => {
  if (!auth?.currentUser) throw new Error("No user logged in");
  return await auth.currentUser.getIdToken();
};