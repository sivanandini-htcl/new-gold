// src/firebase/firebaseClient.js

import api from "../api/axiosInstance";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,GoogleAuthProvider, signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
// console.log("ENV DATA:", import.meta.env);
// console.log("BACKEND URL:", import.meta.env.VITE_API_BASE_URL);
// console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);

//  Initialize Firebase only in browser
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
export const googleprovider= new GoogleAuthProvider();
export const signInwithgoogle = () => signInWithPopup(auth, googleprovider);

//  Send magic link function
export async function sendMagicLink(email) {
  console.log("Email entered:", email);
  const actionCodeSettings = { url: `${window.location.origin}/login`,
   handleCodeInApp: true };
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

//  Complete magic link login function
export async function completeMagicLinkLogin() {
  console.log("Checking magic link...");

  if (!isSignInWithEmailLink(auth, window.location.href)) {
    console.log("No magic link found in URL");
    return false;
  }

  const email = localStorage.getItem("emailForSignIn");
  console.log("Email from localStorage:", email);

  if (!email) {
    toast.error("Please enter your email again");
    return false;
  }

  try {
    // Firebase login
    const result = await signInWithEmailLink(auth, email, window.location.href);
    console.log("Firebase login success:", result.user);

    if (!auth.currentUser) {
      console.log("No user logged in");
      return false;
    }

    console.log("User logged in:", auth.currentUser.email);

    // Get token (Axios wrapper will attach automatically)
    // const token = await result.user.getIdToken();
    // console.log("Firebase ID token:", token);
    const token = await result.user.getIdToken();
    
      console.log("Firebase ID token:", token);
    try {
     const backendResponse = await api.post(
    "/auth/firebase-login",
    {
      provider: "email",
      credential: token,
      tenantId: "vendor_abc",
    },
    
   
  );


      console.log("Backend response:", backendResponse.data);

      // Save in Zustand
    useAuthStore.getState().setAuth({
  user: backendResponse.data.data.user,
  accessToken: backendResponse.data.data.accessToken,
  refreshToken: backendResponse.data.data.refreshToken,
});

      localStorage.removeItem("emailForSignIn");

      toast.success(`Login successful! Welcome ${auth.currentUser.email}`);

      return true;
    } catch (backendErr) {
      console.error("FULL ERROR:", backendErr);
      console.error("BACKEND MESSAGE:", backendErr.response?.data);
      return false;
    }
  } catch (err) {
    console.error("Login failed:", err);
    toast.error("Login failed");
    return false;
  }
}




//Google Login  



// export async function googleLogin(){
//   try{
//   const provider= new GoogleAuthProvider();
//   const result=await signInWithPopup(auth,provider);
  
//   console.log("Google login success:", result.user);

//   console.log(result.user);
//   const token= await result.user.getIdToken();
//     console.log("Firebase token:", token);
//     console.log("Backend URL:", import.meta.env.VITE_API_BASE_URL);
//     console.log("Calling backend"); 
//   await axios.post(
//     `${import.meta.env.VITE_API_BASE_URL}/auth/firebase-login`,
//     {},
//     {
//       headers:{
//         Authorization:`Bearer ${token}`,
//          "Content-Type": "application/json",
//       }
//     }
//   );
  
//     console.log("Backend success"); 
//     return true;
// }
//   catch(err){
    
//   console.error("Google login failed:", err);
//    return false;
//   }
  
  
// }
export const getIdToken = async () => {
  if (!auth?.currentUser) throw new Error("No user logged in");
  return await auth.currentUser.getIdToken();
};