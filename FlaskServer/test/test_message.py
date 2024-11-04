import requests

BASE_URL = 'https://virtual-gf-py.vercel.app/message'

# Function to test the /add_message endpoint
def test_add_message(user_id, message, msg_type):
    url = f'{BASE_URL}/add_message'
    payload = {
        "user_id": user_id,
        "message": message,
        "type": msg_type
    }

    response = requests.post(url, json=payload)
    
    if response.status_code == 201:
        print("Add Message Test Passed")
        print("Response:", response.json())
    else:
        print("Add Message Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Function to test the /get_messages endpoint
def test_get_messages(user_id):
    url = f'{BASE_URL}/get_messages'
    params = {
        "user_id": user_id
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        print("Get Messages Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No Messages Found Test Passed")
        print("Response:", response.json())
    else:
        print("Get Messages Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Test the endpoints
if __name__ == "__main__":
    # Test adding a message
    test_add_message("12345", "Hello, this is a test message!", "notification")
    
    # Test retrieving messages
    test_get_messages("12345")
