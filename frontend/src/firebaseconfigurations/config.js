// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcLWHI3l6yY12G5z-HhlH5s1R-qywXGaU",
  authDomain: "dgigold-1.firebaseapp.com",
  projectId: "dgigold-1",
  storageBucket: "dgigold-1.firebasestorage.app",
  messagingSenderId: "386532817078",
  appId: "1:386532817078:web:ec7130bf824442bf9f8e17",
  measurementId: "G-LZ415PWNM8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("data getting recieved")
export const googleProvider= new GoogleAuthProvider()
export const db = getFirestore(app);

