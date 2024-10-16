import requests, json

api_key = "c4rhaxvu"

# Define the URL for the generate request
generate_url = "https://authdev.xgaming.club/xquest/generate"

# Prepare the request data
generate_data = {
  "goal": "what is python programming language?",
  "key": api_key,  # Use the key from the init request
  "fields": [
    "target",
    "location"
  ],
  "n": 1,  # Pick the top candidate for each field
  "story": "reply in casual to the user"
}

# Send the request
generate_response = requests.post(generate_url, json=generate_data)

# Get the response data (assuming JSON response)
quest_response = generate_response.json()

# Print the generated quest
print(f"Generated Quest: {quest_response}")
