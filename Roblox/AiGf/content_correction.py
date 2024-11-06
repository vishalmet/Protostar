import requests
import json
import re


# Step 1: Prepare the conversation topic and response generation
prompt = '''
    You are a virtual girlfriend.
    You will always reply with a JSON array of messages. With a maximum of 3 messages.
    Each message has a text, facialExpression, and animation property.
    The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
    The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry.
    Note: just give the json content, don't give any unwanted content or char. I don't need .md content. Avoid ```json and ```
'''

# API key (you've already got it)
# api_key = "2r4x3nfm"
# api_key = "t6tzxw3n"

# api_key = "a5rt23sx"
api_key = "inc57z1o"


def extract_language_tag(text):
    # Use regex to find the language tag pattern like '@tt-<language>'
    match = re.search(r'@tt-(\w+)', text)
    if match:
        return match.group(1)
    else:
        return None

# Step 2: Generate conversation based on user input
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

def chatbot():
    print("Chatbot: Hello! Let's have a chat. Ask me anything!")
    
    while True:
        user_input = input("You: ")
        
        if "bye" in user_input.lower():
            print("Chatbot: Goodbye! It was great chatting with you!")
            break
        
        conversation_data = generate_conversation(user_input)
        
        print(conversation_data)
        response = conversation_data.get("dialogue", "I'm not sure how to respond to that. Can you ask me something else?")
        
        try:
            res = json.loads(response)
            print(res)
            # for message in res:
            #     print(f"Chatbot: {message['text']}")
            #     print(f"Facial Expression: {message['facialExpression']}, Animation: {message['animation']}")
        except json.JSONDecodeError:
            print("Chatbot: Something went wrong. Please try again.")

if __name__ == "__main__":
    chatbot()
