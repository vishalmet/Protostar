import requests

# URL of the Flask server endpoint
# url = 'https://virtual-gf-py.vercel.app/ai/ai-chat'
url = 'https://virtual-gf-py.vercel.app/sofi/chat'

# Sample test data
test_data = {
    "message": "@sofi give me the joke"
    # "message": "@cg hlo hru"
}

# Sending a POST request to the Flask endpoint
response = requests.post(url, json=test_data)

print(response)

# Checking and printing the response
if response.status_code == 200:
    print("Response from the server:")
    print(response.json())
else:
    print(f"Failed to get a valid response. Status code: {response.status_code}")
    print(response.text)

