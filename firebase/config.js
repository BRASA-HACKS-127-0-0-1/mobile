// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkXIft0OEGQXwB9vfzWagKb1UP7vZyO5Y",
    authDomain: "hacks22.firebaseapp.com",
    projectId: "hacks22",
    storageBucket: "hacks22.appspot.com",
    messagingSenderId: "354618591630",
    appId: "1:354618591630:web:cb9a454ed8f04481dcbcdf",
    measurementId: "G-6HC3T3K2J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
