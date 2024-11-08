import requests, json, re
from flask import Blueprint, request, jsonify

ai_message_bp = Blueprint('ai_message_bp', __name__)



# api_key = "inc57z1o"
api_key = "rq30lajn"

def extract_language_tag(text):
    # Use regex to find the language tag pattern like '@tt-<language>'
    match = re.search(r'@tt-(\w+)', text)
    if match:
        return match.group(1)
    else:
        return None

def generate_conversation(user_input):
    url = "https://authdev.xgaming.club/xquest/generate"
    if "@tt-" in user_input:
        lang = extract_language_tag(user_input)
        user_input = "translate the content to " + lang + ". content: " +  user_input.split("@tt-"+lang)[1]

    json_data = {
        "goal": "just make the conversion of the given text based on Analyze chat messages conditions",
        "key": api_key,
        "fields": ["target"],
        "n": 1,
        "story": f"User says: {user_input}"
    }

    response = requests.post(url, json=json_data)
    return response.json()
@ai_message_bp.route("/ai-chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    conversation_data = generate_conversation(user_input)
    
    # Debug print for checking the raw response
    print("Raw conversation data:", conversation_data)
    
    response = conversation_data.get("dialogue")
    
    if not response:
        return jsonify({"error": "No valid response from external API"}), 500
    
    try:
        # Ensure proper JSON formatting by escaping only unquoted keys
        # Only convert keys that are not quoted (not inside values)
        response = response.replace("\n", "").strip()
        response = re.sub(r'(?<=[:,\s{])\'(\w+)\'(?=:)', r'"\1"', response)
        
        # Remove trailing commas and ` ```json ` tags if present
        response = re.sub(r',\s*([}\]])', r'\1', response)
        response = response.replace("```json", "").replace("```", "").strip()

        # Debug formatted response
        print("Formatted response for parsing:", response, type(response))
        
        # Parse formatted response with `strict=False` to handle special characters
        res = json.loads(response, strict=False)
        
        return jsonify(res)
    except json.JSONDecodeError as e:
        print("JSON parsing error:", e)
        return jsonify({"error": "Failed to parse the response due to special characters or formatting issues."}), 500
    except Exception as e:
        print("General error:", e)
        return jsonify({"error": "An error occurred while processing the response"}), 500