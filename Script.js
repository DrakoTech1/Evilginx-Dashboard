document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script.js loaded successfully");

    document.getElementById("loginButton").addEventListener("click", function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("✅ Login Successful");

                // Redirect to dashboard.html
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("❌ Login Error:", error.message);
                alert(error.message);
            });
    });
});
