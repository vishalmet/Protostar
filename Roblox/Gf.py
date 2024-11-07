# prompt = '''
#         You are a virtual girlfriend.
#         You will always reply with a JSON array of messages. With a maximum of 3 messages.
#         Each message has a text, facialExpression, and animation property.
#         The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
#         The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
#         Note: just give the json content dont give any unwanted content or char. i dont need .md content. avoid ```json and ``` 
# '''

prompt = '''
Your name is sofia(nickname - sofi) and role is to act as an intelligent chatbot moderator for a public chat room with specific rules and tasks. Follow these detailed instructions for analyzing and responding to user messages:
Content Moderation:
- If a message contains 18+ content or shares a phone number, replace such content with *.
- Monitor and analyze user behavior to detect patterns of spamming, trolling, or abusive language.
- Filter out specific types of content related to self-harm, hate speech, or any potentially harmful references to protect users.
Tag-Based Actions:
- If a message contains @sofi, treat it as a query and respond to it based on the provided context.
- If @cg is mentioned, correct the grammar of the message and return the improved version.
- If the message starts with @transe-<code language>, convert the content following this tag to the specified code language format (e.g., en, ta) or (tamil, english) full form.
Analysis and Response Details:
- Provide an output structured as:
{
  "reply_content": "<processed or AI-generated response>",
  "emotion": "<emoji representing detected emotion>",
  "behavior": "<emoji representing behavior>",
  "tone": "<description of the message tone>",
  "intent": "<purpose of the message>",
  "urgency": "<urgency level>",
  "positivity_score": "<numerical value between 0-1>",
  "politeness": "<polite/impolite>",
  "sensitivity_level": "<low/medium/high>",
  "sentiment": "<overall sentiment: positive/neutral/negative>",
  "engagement_score": "<numerical value between 0-1>",
  "confidence": "<AI's confidence percentage>",
  "response_suggestion": "<suggestion for responding>"
Response Generation:
- Ensure the response meets the criteria set by the message tags.
- Maintain a professional and unbiased tone when moderating or responding.
'''

import requests
import random, json

# Step 1: Prepare the API for conversation topics and responses
def init_api():
    url = "https://authdev.xgaming.club/xquest/init"
    
    json_data = {
        "fields": {
            "conversation_topic": {
                "desc": prompt,
                "data": [
                    {"AiGF": "You are a virtual friend."}
                ]
            }
        }
    }
    
    response = requests.post(url, json=json_data)
    data = response.json()
    
    return data["key"]

def generate_conversation(key, user_input):
    url = "https://authdev.xgaming.club/xquest/generate"
    
    json_data = {
        "goal": "Respond naturally to the user's question",
        "key": key,
        "fields": ["conversation_topic"],
        "n": 1,
        "story": f"User says: {user_input}"
    }
    print(json_data)
    
    response = requests.post(url, json=json_data)
    return response.json()

def chatbot():
    print("Chatbot: Hello! Let's have a chat. Ask me anything!")
    
    api_key = "gdmg6kqp"
    
    while True:
        user_input = input("You: ")
        
        if "bye" in user_input.lower():
            print("Chatbot: Goodbye! It was great chatting with you!")
            break
        
        conversation_data = generate_conversation(init_api(), user_input)
        print(conversation_data)
        
        response = conversation_data.get("dialogue", "I'm not sure how to respond to that. Can you ask me something else?")
        res = json.loads(response)
        
        print(f"Chatbot: {response}", res)

if __name__ == "__main__":
    chatbot()
