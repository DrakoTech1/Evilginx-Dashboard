console.log("✅ Script.js loaded successfully");

// Import Firebase Authentication
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Ensure Firebase is initialized before using authentication
if (!auth) {
    console.error("❌ Firebase Auth failed to initialize.");
} else {
    console.log("✅ Firebase is available.");
}

// LOGIN FUNCTION
document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("✅ Login successful. Redirecting...");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("loginError").innerText = error.message;
            console.error("Login Error:", error);
        });
});
