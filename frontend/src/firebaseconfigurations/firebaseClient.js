// src/firebase/firebaseClient.js
import axios from "axios";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";

// ✅ Initialize Firebase only in browser
let app;
let auth;

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
}

export const db = getFirestore(app);
export { auth };

// ✅ Send magic link function
export async function sendMagicLink(email) {
  console.log("Email entered:", email);
  const actionCodeSettings = { url: window.location.origin, handleCodeInApp: true };

  try {
    console.log("Sending magic link...");
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    console.log("Email sent successfully");

    localStorage.setItem("emailForSignIn", email);
    console.log("Email stored in localStorage");

    toast.success("Magic link sent to email");
  } catch (err) {
    console.error("Failed to send magic link:", err);
    toast.error("Failed to send magic link");
  }
}

// ✅ Complete magic link login function
export async function completeMagicLinkLogin() {
  console.log("Checking magic link...");

  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = localStorage.getItem("emailForSignIn");
    console.log("Email from localStorage:", email);

    if (!email) {
      toast.error("Please enter your email again");
      return;
    }

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      console.log("Firebase login success:", result.user);

      // Check user login
      if (auth.currentUser) console.log(" User is logged in:", auth.currentUser.email);
      else console.log(" No user is logged in");

      // Get ID token for backend
      const token = await result.user.getIdToken();
      console.log("Firebase ID token:", token);

      // Send token to backend
      
        try {
        const backendResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth`, // Correct route
          {}, // body, if needed
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Backend response:", backendResponse.data);
      } catch (backendErr) {
        console.error("Backend API call failed:", backendErr);
      }

      localStorage.removeItem("emailForSignIn");
      toast.success(`Login successful! Welcome ${auth.currentUser.email}`);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed");
    }
  } else {
    console.log("No magic link found in URL");
  }
}
