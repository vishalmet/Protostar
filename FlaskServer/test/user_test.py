import requests

BASE_URL = 'http://localhost:5000/user'

# http://localhost:5000/user/add_user
    # payload = {
    #     "username": username,
    #     "user_wallet_address": user_wallet_address
    # }

# Function to test the /add_user endpoint
def test_add_user(username, user_wallet_address):
    url = f'{BASE_URL}/add_user'
    payload = {
        "username": username,
        "user_wallet_address": user_wallet_address
    }

    response = requests.post(url, json=payload)
    
    if response.status_code == 201:
        print("Add User Test Passed")
        print("Response:", response.json())
    else:
        print("Add User Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Function to test the /check_user endpoint
def test_check_user(username):
    url = f'{BASE_URL}/check_user'
    params = {
        "username": username
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        print("Check User Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("User Not Found Test Passed")
        print("Response:", response.json())
    else:
        print("Check User Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Test the endpoints
if __name__ == "__main__":
    # Test adding a user
    test_add_user("jane_doe", "0xabcdef123456789")
    
    # Test checking if a user exists
    test_check_user("jane_doe")
