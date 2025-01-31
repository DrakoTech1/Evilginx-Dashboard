window.onload = function() {
    if (!firebase) {
        console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
        return;
    }
    console.log("✅ Script.js loaded successfully");
};

// ✅ Login function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Login successful:", userCredential.user);
            window.location.href = "dashboard.html"; // Redirect to dashboard
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
        window.location.href = "index.html"; // Redirect to login
    }).catch((error) => {
        console.error("❌ Logout error:", error);
    });
}
