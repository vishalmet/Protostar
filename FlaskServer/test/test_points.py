import requests

BASE_URL = 'http://localhost:5000/points'

# Function to test the /add_points endpoint
def test_add_points(username, gold, diamond):
    url = f'{BASE_URL}/add_points'
    payload = {
        "username": username,
        "gold": gold,
        "diamond": diamond
    }

    response = requests.post(url, json=payload)

    if response.status_code == 201:
        print("Add Points Test Passed")
        print("Response:", response.json())
        return response.json().get("user_id")
    else:
        print("Add Points Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())
        return None

# Function to test the /update_points endpoint
def test_update_points(user_id, gold=None, diamond=None):
    url = f'{BASE_URL}/update_points/{user_id}'
    payload = {}
    if gold is not None:
        payload["gold"] = gold
    if diamond is not None:
        payload["diamond"] = diamond

    response = requests.put(url, json=payload)

    if response.status_code == 200:
        print("Update Points Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("Update Points Test Passed - No records updated")
        print("Response:", response.json())
    else:
        print("Update Points Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Function to test the /get_points endpoint
def test_get_points(user_id):
    url = f'{BASE_URL}/get_points/{user_id}'

    response = requests.get(url)

    if response.status_code == 200:
        print("Get Points Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("Get Points Test Passed - User not found")
        print("Response:", response.json())
    else:
        print("Get Points Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.json())

# Run the tests
if __name__ == "__main__":
    # Step 1: Add points for a user and get the user ID
    user_id = test_add_points("john_doe", 100, 50)

    # Step 2: Update the points for the user if user_id is valid
    if user_id:
        test_update_points(user_id, gold=150, diamond=75)

        # Step 3: Get the points for the user to verify the update
        test_get_points(user_id)
