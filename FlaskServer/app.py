from flask import Flask, request, jsonify
import requests
import json
from routes.user_routes import user_bp
from routes.message_routes import message_bp
from routes.points_routes import points_bp
from routes.score_routes import score_bp
from routes.score_history_routes import h_score_bp
from routes.sofi_main import sofi_ai_message_bp
from routes.ai_message import ai_message_bp
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(message_bp, url_prefix='/message')
app.register_blueprint(points_bp, url_prefix='/points')
app.register_blueprint(score_bp, url_prefix='/score')
app.register_blueprint(h_score_bp, url_prefix='/h_score_bp')
app.register_blueprint(ai_message_bp, url_prefix='/ai')
app.register_blueprint(sofi_ai_message_bp, url_prefix='/sofi')


api_key = "gdmg6kqp"

def generate_conversation(user_input):
    url = "https://authdev.xgaming.club/xquest/generate"
    
    json_data = {
        "goal": "Respond naturally to the user's question",
        "key": api_key,
        "fields": ["conversation_topic"],
        "n": 1,
        "story": f"User says: {user_input}"
    }

    response = requests.post(url, json=json_data)
    return response.json()

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    conversation_data = generate_conversation(user_input)
    
    response = conversation_data.get("dialogue", "I'm not sure how to respond to that. Can you ask me something else?")
    
    try:
        res = json.loads(response)
        print(res)
        return jsonify(res)
    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse the response"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
