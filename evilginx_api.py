from flask import Flask, request, jsonify

app = Flask(__name__)

# Fake data for testing
sessions = [{"email": "user@example.com", "ip": "192.168.1.1"}]
cookies = [{"name": "session_id", "value": "abc123"}]

@app.route("/api/generate", methods=["POST"])
def generate_link():
    return jsonify({"link": "http://YOUR_EVILGINX_DOMAIN/lure"})

@app.route("/api/sessions", methods=["GET"])
def get_sessions():
    return jsonify({"sessions": sessions})

@app.route("/api/cookies", methods=["GET"])
def get_cookies():
    return jsonify({"cookies": cookies})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
