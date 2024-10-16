import requests, json

api_key = "c4rhaxvu"


# Define the URL for checking the status
view_data_url = f"https://authdev.xgaming.club/xquest/view_data/{api_key}"

# Send the GET request
status_response = requests.get(view_data_url)

# Get the response data (assuming JSON response)
status_data = status_response.json()

# Print the status and data
print(f"Quest Status: {status_data['status']}")
print(f"Quest Data: {json.dumps(status_data, indent=2)}")
