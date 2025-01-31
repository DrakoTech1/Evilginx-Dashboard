// Ensure Firebase SDK loads correctly
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
    authDomain: "panel-auth-134b7.firebaseapp.com",
    projectId: "panel-auth-134b7",
    storageBucket: "panel-auth-134b7.firebasestorage.app",
    messagingSenderId: "892746068340",
    appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("✅ Firebase initialized successfully.");
export { auth };
