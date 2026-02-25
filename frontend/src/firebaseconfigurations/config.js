// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaLCxsydSIdlV6wB51QRnPd8hGvX2vB0c",
  authDomain: "digigold-6446a.firebaseapp.com",
  projectId: "digigold-6446a",
  storageBucket: "digigold-6446a.firebasestorage.app",
  messagingSenderId: "925293660920",
  appId: "1:925293660920:web:de04c017783b747944890d",
  measurementId: "G-P0ERNX35XG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("data getting recieved")
export const googleProvider= new GoogleAuthProvider()
export const db = getFirestore(app);
