import requests

# Base URL of the Flask application
BASE_URL = 'https://virtual-gf-py.vercel.app/user'  # Replace with your actual server URL if different
# BASE_URL = 'https://virtual-gf-py.vercel.app/user/add_user'  # Replace with your actual server URL if different
# https://virtual-gf-py.vercel.app/user/get_username_by_address
# https://virtual-gf-py.vercel.app/user/check_user
# Test data
test_user = {
    "username": "sunil2",
    "user_wallet_address": "0xebA2E8791585Cb1e20E40192c716E025A94DAb642"
}

# Function to test adding a user
def test_add_user():
    response = requests.post(f"{BASE_URL}/add_user", json=test_user)
    if response.status_code == 201:
        print("Add User Test Passed:", response.json())
    else:
        print("Add User Test Failed:", response.status_code, response.text)

# Function to test checking if a user exists
def test_check_user_exists(username):
    response = requests.get(f"{BASE_URL}/check_user", params={"username": username})
    if response.status_code == 200:
        print("Check User Exists Test Passed:", response.json())
    elif response.status_code == 404:
        print("User does not exist:", response.json())
    else:
        print("Check User Exists Test Failed:", response.status_code, response.text)

def test_get_username_by_address(user_wallet_address):
    response = requests.get(f"{BASE_URL}/get_username_by_address", params={"user_wallet_address": user_wallet_address})
    print("Raw Response:", response.text)  # Log the raw response
    
    try:
        json_data = response.json()
        if response.status_code == 200:
            print("Get Username by Address Test Passed:", json_data)
        elif response.status_code == 404:
            print("User not found:", json_data)
        else:
            print("Get Username by Address Test Failed:", response.status_code, response.text)
    except requests.exceptions.JSONDecodeError:
        print("Failed to decode JSON. Response content might not be JSON:", response.text)

# Run the tests
test_add_user()
test_check_user_exists(test_user['user_wallet_address'])
test_get_username_by_address(test_user['user_wallet_address'])
