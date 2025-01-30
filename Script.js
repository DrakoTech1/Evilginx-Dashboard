console.log("✅ Script.js loaded successfully");

// Ensure Firebase is defined before using
if (typeof firebase !== 'undefined') {
    console.log("✅ Firebase loaded successfully.");
} else {
    console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
}

document.getElementById("loginBtn")?.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!firebase.auth) {
        console.error("❌ Firebase Auth is not available.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("loginError").innerText = error.message;
            console.error("Login Error:", error);
        });
});
