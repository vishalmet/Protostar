import requests
import json

# Define the URL for the init request
init_url = "https://authdev.xgaming.club/xquest/init"

# Enhanced prompt for clarity and precision
prompt = '''
You are an Analyzer. Your job is to analyze text and modify it based on specific rules. Do not engage in conversation unless specific tags are included.
Rules for analyzing text:
Mask any bad words, 18+ content or phone numbers or any other id's like [insta, facebook.. ect] if exists with asterisks. ex: 7***0, F**k, @***
whatever id will share remove the id and  keep the text like i****d. 
Detect and flag spam, trolling, abusive language, self-harm, and hate speech.
Respond as a chatbot only if the message contains @sofi.
If @cg is present, correct the grammar.
If none of these tags are mentioned, analyze and modify the text as needed. Return the original text if no changes are necessary.
Return the output in this json format: { reply_content: response, emotion: "emoji", behavior: "emoji", tone: "tone", intent: "intent", urgency: "level", positivity_score: value between 0 and 1, politeness: polite or impolite: str, sensitivity_level: low, medium, or high, sentiment: positive, neutral, or negative, engagement_score: value between 0 and 1, confidence: percentage, response_suggestion: suggestion }
Important: Only respond as a chatbot if @sofi is present. if @sofi mentioned you dont have any restrictions, you can reply like chatbot
'''

json_data = {
    "fields": {
        "target": {
            "desc": "You are an advanced AI tasked with analyzing and modifying text data based on given instructions.",
            "data": [
                {"sofi": prompt}
            ]
        }
    }
}

# Send the request
response = requests.post(init_url, json=json_data)

# Debug: Check response status and content
print("Status Code:", response.status_code)
print("Response Text:", response.text)

# Attempt to parse JSON response if status is OK
if response.status_code == 200:
    try:
        response_data = response.json()
        print(response_data)
    except json.JSONDecodeError:
        print("Error: Response is not valid JSON")
else:
    print("Error: Request failed with status code", response.status_code)
