import requests

# Base URL of the Flask application
BASE_URL = 'https://virtual-gf-py.vercel.app/score'  # Replace with your actual server URL if different



"""
Add:
https://virtual-gf-py.vercel.app/score/add_score
payload: {
    "user_id": "user1234",
    "score": 100,
    "type": "game1"
}
get:
https://virtual-gf-py.vercel.app/score/get_scores?user_id=<user_id>
set:
https://virtual-gf-py.vercel.app/score/update_score
{
        "user_id": "user1234",
        "new_score": 250,
        "type": "game1"
}

"""

# Test data
test_score = {
    "user_id": "user1234",
    "score": 100,
    "type": "game1"
}

# Function to test adding a score
def test_add_score():
    response = requests.post(f"{BASE_URL}/add_score", json=test_score)
    if response.status_code == 201:
        print("Add Score Test Passed:", response.json())
    else:
        print("Add Score Test Failed:", response.status_code, response.text)

# Function to test retrieving scores by user_id
def test_get_scores(user_id):
    response = requests.get(f"{BASE_URL}/get_scores", params={"user_id": user_id})
    if response.status_code == 200:
        print("Get Scores Test Passed:", response.json())
    elif response.status_code == 404:
        print("Scores not found:", response.json())
    else:
        print("Get Scores Test Failed:", response.status_code, response.text)

# Function to test updating a score
def test_update_score():
    update_data = {
        "user_id": "user1234",
        "new_score": 250,
        "type": "game1"
    }
    response = requests.put(f"{BASE_URL}/update_score", json=update_data)
    if response.status_code == 200:
        print("Update Score Test Passed:", response.json())
    elif response.status_code == 404:
        print("Update Score Test: No score found to update", response.json())
    else:
        print("Update Score Test Failed:", response.status_code, response.text)

# Run the tests
test_add_score()
test_get_scores("user123")
test_update_score()
