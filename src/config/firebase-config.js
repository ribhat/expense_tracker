// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDLbzoq93WQFiuyH-jvEonBeRFN4GbdHoA",
  authDomain: "expense-tracker-39993.firebaseapp.com",
  projectId: "expense-tracker-39993",
  storageBucket: "expense-tracker-39993.firebasestorage.app",
  messagingSenderId: "861609165090",
  appId: "1:861609165090:web:d094fbb765874c4d1e257b",
  measurementId: "G-E727PMWBSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)


