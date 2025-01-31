console.log("✅ firebase-config.js loaded");

// Firebase configuration – replace with your actual config values.
const firebaseConfig = {
  apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
  authDomain: "panel-auth-134b7.firebaseapp.com",
  projectId: "panel-auth-134b7",
  storageBucket: "panel-auth-134b7.firebasestorage.app",
  messagingSenderId: "892746068340",
  appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

// Initialize Firebase using the compat libraries
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase initialized successfully");

// Optionally, you can expose the auth object (if needed elsewhere)
const auth = firebase.auth();
