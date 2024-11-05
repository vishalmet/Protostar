import requests

# Base URL of the Flask application
BASE_URL = 'http://localhost:5000/h_score_bp'  # Replace with your actual server URL if different

# Test data for adding a score
test_score = {
    "user_id": "user123",
    "score": 150,
    "type": "game1"
}

# Function to test adding a score
def test_add_score():
    response = requests.post(f"{BASE_URL}/add_score", json=test_score)
    if response.status_code == 201:
        print("Add Score Test Passed")
        print("Response:", response.json())
    else:
        print("Add Score Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

# Function to test getting scores by user_id and type
def test_get_scores(user_id, score_type):
    response = requests.get(f"{BASE_URL}/get_scores", params={"user_id": user_id, "type": score_type})
    if response.status_code == 200:
        print("Get Scores Test Passed")
        print("Response:", response.json())
    elif response.status_code == 404:
        print("No scores found:", response.json())
    else:
        print("Get Scores Test Failed")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

# Run the tests
print("Testing Add Score Route:")
test_add_score()

print("\nTesting Get Scores Route:")
test_get_scores("user123", "game1")
