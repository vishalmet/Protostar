import requests
import json
import re

api_key = "uy38yluc"
BASE_URL = "https://virtual-gf-py.vercel.app/message"
user_id = "12345"
msg_type = "notification"
score_type = "game1"
BASE_URL1 = "https://virtual-gf-py.vercel.app"

def test_get_scores_history(user_id, score_type):
    response = requests.get(f"{BASE_URL1}/h_score_bp/get_scores", params={"user_id": user_id, "type": score_type})
    if response.status_code == 200 and response.content:
        print("Get Scores Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No scores found")
    else:
        print("Get Scores Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

def test_get_scores(user_id):
    response = requests.get(f"{BASE_URL1}/score/get_scores", params={"user_id": user_id})
    if response.status_code == 200 and response.content:
        print("Get Scores Test Passed:", response.json())
    elif response.status_code == 404:
        print("Scores not found")
    else:
        print("Get Scores Test Failed:", response.status_code, response.text)

def test_get_messages():
    response = requests.get(f"{BASE_URL}/get_messages", params={"user_id": user_id})
    if response.status_code == 200 and response.content:
        try:
            print("Get Messages Test Passed")
            return response.json()
        except json.JSONDecodeError:
            print("Get Messages Test Failed - Non-JSON response")
            return {}
    elif response.status_code == 404:
        print("No messages found")
        return {}
    else:
        print("Error:", response.status_code)
        return {}

def test_get_recent_interacted_users():
    response = requests.get(f"{BASE_URL}/get_recent_interacted_users", params={"user_id": user_id, "type": msg_type, "timeframe": 30})
    if response.status_code == 200 and response.content:
        try:
            print("Get Recent Interacted Users Test Passed")
            return response.json()
        except json.JSONDecodeError:
            print("Get Recent Interacted Users Test Failed - Non-JSON response")
            return {}
    elif response.status_code == 404:
        print("No recent interactions found")
        return {}
    else:
        print("Error:", response.status_code)
        return {}

def test_get_lifetime_interacted_users():
    response = requests.get(f"{BASE_URL}/get_lifetime_interacted_users", params={"user_id": user_id, "type": msg_type})
    if response.status_code == 200 and response.content:
        try:
            print("Get Lifetime Interacted Users Test Passed")
            return response.json()
        except json.JSONDecodeError:
            print("Get Lifetime Interacted Users Test Failed - Non-JSON response")
            return {}
    elif response.status_code == 404:
        print("No lifetime interactions found")
        return {}
    else:
        print("Error:", response.status_code)
        return {}

def extract_language_tag(text):
    match = re.search(r'@tt-(\w+)', text)
    return match.group(1) if match else None

def generate_conversation(user_input):
    url = "https://authdev.xgaming.club/xquest/generate"

    if "@tt-" in user_input:
        lang = extract_language_tag(user_input)
        user_input = f"translate the content to {lang}. content: {user_input.split('@tt-'+lang)[1]}"

    json_data = {
        "goal": "based on user data it's like json you should only get user input data and response for that if user data need for query use this",
        "key": api_key,
        "fields": ["target"],
        "n": 1,
        "story": f"""user query: {user_input} 
            based on user data it's like json you should only get user input data and response for that if user data need for query use this.. 
            Note: dont talk about that extra content until user ask about that
            Impotent: if user ask about user data dont ask "can i give" like that dont ask any of the question. if they ask give them that directly. 
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

    response = requests.post(url, json=json_data)
    try:
        return response.json()
    except json.JSONDecodeError:
        print("Error in generating conversation - Non-JSON response")
        return {"dialogue": "I'm not sure how to respond to that. Can you ask me something else?"}

def chatbot():
    print("Chatbot: Hello! Let's have a chat. Ask me anything!")

    while True:
        user_input = input("You: ")
        
        if "bye" in user_input.lower():
            print("Chatbot: Goodbye! It was great chatting with you!")
            break
        
        conversation_data = generate_conversation(user_input)
        response = conversation_data.get("dialogue", "I'm not sure how to respond to that. Can you ask me something else?")
        
        try:
            res = json.loads(response)
            print(res)
        except json.JSONDecodeError:
            print("Chatbot:", response)

if __name__ == "__main__":
    chatbot()
