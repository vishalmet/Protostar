import requests

# Base URL of the Flask application
BASE_URL = 'http://localhost:5000/user'  # Replace with your actual server URL if different

# Test data
test_user = {
    "username": "test_user123",
    "user_wallet_address": "wallet_address_12345"
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

# Function to test getting a username by wallet address
def test_get_username_by_address(user_wallet_address):
    response = requests.get(f"{BASE_URL}/get_username_by_address", params={"user_wallet_address": user_wallet_address})
    if response.status_code == 200:
        print("Get Username by Address Test Passed:", response.json())
    elif response.status_code == 404:
        print("User not found:", response.json())
    else:
        print("Get Username by Address Test Failed:", response.status_code, response.text)

# Run the tests
test_add_user()
test_check_user_exists(test_user['username'])
test_get_username_by_address(test_user['user_wallet_address'])
