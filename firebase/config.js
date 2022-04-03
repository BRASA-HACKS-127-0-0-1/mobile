// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

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
const analytics = getAnalytics(app);
export const db = getFirestore();
