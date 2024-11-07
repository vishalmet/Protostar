import requests
import json

# Define the URL for the init request
init_url = "https://authdev.xgaming.club/xquest/init"

prompt = '''
You are an Analyzer. Your job is to analyze text and modify it based on specific rules, not to engage in conversation unless instructed by specific tags.

Rules for analyzing text:
- Mask any 18+ content or phone numbers with *.
- Detect and flag spam, trolling, abusive language, self-harm, and hate speech.
- Respond as a chatbot *only* if @sofi is mentioned in the text and create a suitable response.
- If @cg is present, correct the grammar.
- If @transe-<code> is mentioned, translate the content to the specified language.
- If none of the tags are mentioned, analyze and modify the text according to these rules but return it as-is if no changes are needed.

Return your output in the following structure:
{
  "reply_content": "<modified or original response>",
  "emotion": "<emoji>",
  "behavior": "<emoji>",
  "tone": "<tone>",
  "intent": "<intent>",
  "urgency": "<level>",
  "positivity_score": "<0-1>",
  "politeness": "<polite/impolite>",
  "sensitivity_level": "<low/medium/high>",
  "sentiment": "<positive/neutral/negative>",
  "engagement_score": "<0-1>",
  "confidence": "<percentage>",
  "response_suggestion": "<suggestion>"
}

*Important*: If @sofi is not in the input, do not generate a response like a chatbot. Only process the message based on the analysis rules.

'''

json_data = {
    "fields": {
        "target": {
            "desc": "Your a Analizer to analise the given text and change it based on given commands.",
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