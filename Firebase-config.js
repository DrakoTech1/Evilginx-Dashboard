console.log("✅ firebase-config.js loaded");

// Firebase configuration – update with your actual configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
  authDomain: "panel-auth-134b7.firebaseapp.com",
  projectId: "panel-auth-134b7",
  storageBucket: "panel-auth-134b7.firebasestorage.app",
  messagingSenderId: "892746068340",
  appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

// Initialize Firebase using compat libraries
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase initialized successfully");

// Set persistence so login state is maintained (LOCAL persists across sessions)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("✅ Firebase Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("❌ Error setting persistence:", error);
  });
