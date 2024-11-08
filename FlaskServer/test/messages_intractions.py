import requests

BASE_URL = 'http://localhost:5000/message'
BASE_URL = 'https://virtual-gf-py.vercel.app/message'
# BASE_URL = 'http://localhost:5000/message/get_messages'

# Test data
user_id = "12345"
msg_type = "notification"

def test_add_message():
    payload = {
        "user_id": user_id,
        "message": "Hello, this is a test message with timestamp!",
        "type": msg_type
    }
    response = requests.post(f"{BASE_URL}/add_message", json=payload)
    if response.status_code == 201:
        print("Add Message Test Passed")
        print("Response:", response.json())
    else:
        print("Add Message Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

def test_get_messages():
    response = requests.get(f"{BASE_URL}/get_messages", params={"user_id": user_id})
    if response.status_code == 200:
        print("Get Messages Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No messages found:", response.json())
    else:
        print("Get Messages Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

# Function to test getting recent interacted users
def test_get_recent_interacted_users():
    response = requests.get(f"{BASE_URL}/get_recent_interacted_users", params={"user_id": user_id, "type": msg_type, "timeframe": 30})
    if response.status_code == 200:
        print("Get Recent Interacted Users Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No recent interactions found:", response.json())
    else:
        print("Get Recent Interacted Users Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

# Function to test getting lifetime interacted users
def test_get_lifetime_interacted_users():
    response = requests.get(f"{BASE_URL}/get_lifetime_interacted_users", params={"user_id": user_id, "type": msg_type})
    if response.status_code == 200:
        print("Get Lifetime Interacted Users Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No lifetime interactions found:", response.json())
    else:
        print("Get Lifetime Interacted Users Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

# Run the tests
test_add_message()
test_get_messages()
test_get_recent_interacted_users()
test_get_lifetime_interacted_users()
