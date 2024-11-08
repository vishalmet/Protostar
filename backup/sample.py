from flask import Blueprint, jsonify, request
import requests
import json
import re

api_key = "uy38yluc"
BASE_URL = "https://virtual-gf-py.vercel.app/message"
user_id = "12345"
msg_type = "notification"
score_type = "game1"
BASE_URL1 = "https://virtual-gf-py.vercel.app"

sofi_ai_message_bp = Blueprint("sofi_ai_message_bp", __name__)

# Helper functions
def test_get_scores_history(user_id, score_type):
    response = requests.get(f"{BASE_URL1}/h_score_bp/get_scores", params={"user_id": user_id, "type": score_type})
    if response.status_code == 200 and response.content:
        return response.json()
    elif response.status_code == 404:
        return {"error": "No scores found"}
    else:
        return {"error": "Failed to retrieve scores"}

def test_get_scores(user_id):
    response = requests.get(f"{BASE_URL1}/score/get_scores", params={"user_id": user_id})
    if response.status_code == 200 and response.content:
        return response.json()
    elif response.status_code == 404:
        return {"error": "Scores not found"}
    else:
        return {"error": "Failed to retrieve scores"}

def test_get_messages():
    response = requests.get(f"{BASE_URL}/get_messages", params={"user_id": user_id})
    if response.status_code == 200 and response.content:
        try:
            return response.json()
        except json.JSONDecodeError:
            return {"error": "Non-JSON response"}
    elif response.status_code == 404:
        return {"error": "No messages found"}
    else:
        return {"error": "Failed to retrieve messages"}

def test_get_recent_interacted_users():
    response = requests.get(f"{BASE_URL}/get_recent_interacted_users", params={"user_id": user_id, "type": msg_type, "timeframe": 30})
    if response.status_code == 200 and response.content:
        try:
            return response.json()
        except json.JSONDecodeError:
            return {"error": "Non-JSON response"}
    elif response.status_code == 404:
        return {"error": "No recent interactions found"}
    else:
        return {"error": "Failed to retrieve recent interactions"}

def test_get_lifetime_interacted_users():
    response = requests.get(f"{BASE_URL}/get_lifetime_interacted_users", params={"user_id": user_id, "type": msg_type})
    if response.status_code == 200 and response.content:
        try:
            return response.json()
        except json.JSONDecodeError:
            return {"error": "Non-JSON response"}
    elif response.status_code == 404:
        return {"error": "No lifetime interactions found"}
    else:
        return {"error": "Failed to retrieve lifetime interactions"}

def extract_language_tag(text):
    match = re.search(r'@tt-(\w+)', text)
    return match.group(1) if match else None

# Main conversation generation route
@sofi_ai_message_bp.route("/chat", methods=["POST"])
def generate_conversation():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    # Process user input for language translation
    if "@tt-" in user_input:
        lang = extract_language_tag(user_input)
        user_input = f"translate the content to {lang}. content: {user_input.split('@tt-'+lang)[1]}"
    
    # Construct JSON data payload
    json_data = {
        "goal": "based on user data it's like json you should only get user input data and response for that if user data need for query use this",
        "key": api_key,
        "fields": ["target"],
        "n": 1,
        "story": f"""user query: {user_input} 
            based on user data it's like json you should only get user input data and response for that if user data need for query use this.. 
            Note: dont talk about that extra content until user ask about that
            Important: if user ask about user data dont ask "can i give" like that dont ask any of the question. if they ask give them that directly. 
            ------------------------------------------------------------------------------------------------------------------
            user data:
            current user's current game score: {test_get_scores(user_id)},
            list of users recent [interactions, connections, peoples]: {test_get_recent_interacted_users()},
            list of users past lifetime [interactions, connections, peoples]: {test_get_lifetime_interacted_users()},
            current user's history of game score: {test_get_scores_history(user_id, score_type)},
            ------------------------------------------------------------------------------------------------------------------
            list of users past messages common room : {test_get_messages()},
        """
    }

    # Send the conversation data to the external API
    response = requests.post("https://authdev.xgaming.club/xquest/generate", json=json_data)
    try:
        # Parse the JSON response from the external API
        return jsonify(response.json())
    except json.JSONDecodeError:
        print("Error in generating conversation - Non-JSON response")
        return jsonify({"dialogue": "I'm not sure how to respond to that. Can you ask me something else?"})
