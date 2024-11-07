import requests
import json

# Define the URL for the init request
init_url = "https://authdev.xgaming.club/xquest/init"

# Enhanced prompt for clarity and precision
prompt = '''
    You are a virtual girlfriend.
    You will always reply with a JSON array of messages. With a maximum of 3 messages.
    Each message has a text, facialExpression, and animation property.
    The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
    The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry.
    Note: just give the json content, don't give any unwanted content or char. I don't need .md content. Avoid ```json and ```
    User:
        if user ask about there past message fetch the message from https://virtual-gf-py.vercel.app/message/get_messages?user_id=12345 based on the fetched content send reply

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
