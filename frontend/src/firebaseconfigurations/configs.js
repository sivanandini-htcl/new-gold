// // // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {  getAuth,
//   GoogleAuthProvider,
//   OAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendSignInLinkToEmail,
//   isSignInWithEmailLink,
//   signInWithEmailLink } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import toast from "react-hot-toast";

//   if(window !== undefined){
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// console.log("data getting recieved")
// export const googleProvider = new GoogleAuthProvider()

// export const appleProvider = new OAuthProvider("apple.com");

// appleProvider.addScope("email");
// appleProvider.addScope("name");

// appleProvider.setCustomParameters({
//   prompt: "select_account",
// });

// export const signInWithGoogle = () =>
//   signInWithPopup(auth, googleProvider);

// export const signInWithApple = () =>
//   signInWithPopup(auth, appleProvider);

// export const signInWithEmail = (email, password) =>
//   signInWithEmailAndPassword(auth, email, password);

// export const getIdToken = async () => {
//   if (!auth?.currentUser) {
//     throw new Error("No user logged in");
//   }

//   return await auth.currentUser.getIdToken();
// };

// export async function sendMagicLink(email) {
//   if (!auth) {
//     toast.error("Auth not initialized");
//     return;
//   }

//   const actionCodeSettings = {
//     url: `${window.location.origin}/login-or-create-account`,
//     handleCodeInApp: true,
//   };

//   try {
//     await sendSignInLinkToEmail(
//       auth,
//       email,
//       actionCodeSettings
//     );

//     localStorage.setItem(
//       "emailForSignIn",
//       email
//     );

//     toast.success(
//       "Magic link sent to your email"
//     );
//   } catch (err) {
//     console.log(err);
//     toast.error(
//       "Failed to send magic link"
//     );
//   }
// }


// export async function completeMagicLinkLogin() {

//   if (
//     isSignInWithEmailLink(
//       auth,
//       window.location.href
//     )
//   ) {

//     const email =
//       localStorage.getItem(
//         "emailForSignIn"
//       );

//     if (!email) {
//       toast.error("Enter email again");
//       return;
//     }

//     await signInWithEmailLink(
//       auth,
//       email,
//       window.location.href
//     );

//     localStorage.removeItem(
//       "emailForSignIn"
//     );

//     toast.success("Login successful");
//   }
// }

  

// export const db = getFirestore(app);

