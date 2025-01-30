document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Dashboard loaded");

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log("❌ No user found, redirecting to login...");
            window.location.href = "index.html";
        }
    });

    document.getElementById("logoutButton").addEventListener("click", function () {
        firebase.auth().signOut()
            .then(() => {
                console.log("✅ User logged out");
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("❌ Logout Error:", error.message);
            });
    });
});
