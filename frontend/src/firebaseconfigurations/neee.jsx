// src/lib/firebaseClient.js

import { initializeApp, getApps, getApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import toast from "react-hot-toast";

// ✅ Only initialize Firebase if running in browser
let app;

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  };

  app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);
}

// ✅ Auth
export const auth = app ? getAuth(app) : null;

// ========================
// Providers
// ========================

// Google
export const googleProvider = new GoogleAuthProvider();

// Apple
export const appleProvider = new OAuthProvider("apple.com");

// Apple scopes
appleProvider.addScope("email");
appleProvider.addScope("name");

appleProvider.setCustomParameters({
  prompt: "select_account",
});


export const appleProvider = new OAuthProvider("apple.com");

appleProvider.addScope("email");
appleProvider.addScope("name");

appleProvider.setCustomParameters({
  prompt: "select_account",
});
// ========================
// Login Functions
// ========================

// Google login
export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

// Apple login
export const signInWithApple = () =>
  signInWithPopup(auth, appleProvider);

// Email/password login
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// ========================
// Get ID Token
// ========================

export const getIdToken = async () => {
  if (!auth?.currentUser) {
    throw new Error("No user logged in");
  }

  return await auth.currentUser.getIdToken();
};

// ========================
// Send Magic Link
// ========================

export async function sendMagicLink(email) {
  if (!auth) {
    toast.error("Auth not initialized");
    return;
  }

  const actionCodeSettings = {
    url: `${window.location.origin}/login-or-create-account`,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(
      auth,
      email,
      actionCodeSettings
    );

    localStorage.setItem(
      "emailForSignIn",
      email
    );

    toast.success(
      "Magic link sent to your email"
    );
  } catch (err) {
    console.log(err);
    toast.error(
      "Failed to send magic link"
    );
  }
}

// ========================
// Complete Magic Link Login
// ========================

export async function completeMagicLinkLogin() {
  if (!auth) return null;

  if (
    isSignInWithEmailLink(
      auth,
      window.location.href
    )
  ) {
    const email =
      localStorage.getItem(
        "emailForSignIn"
      );

    if (!email) {
      toast.error(
        "Email not found. Enter again."
      );
      return null;
    }

    try {
      const result =
        await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );

      localStorage.removeItem(
        "emailForSignIn"
      );

      toast.success(
        "Login successful"
      );

      return result;
    } catch (err) {
      console.log(
        "Magic link error:",
        err
      );

      toast.error(
        "Login failed"
      );

      return null;
    }
  }

  return null;
}
