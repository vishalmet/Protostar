import requests

# Define the base URL for the Flask server
BASE_URL = "https://virtual-gf-py.vercel.app/sofi"

def test_sofi_chat():
    # Sample payload to test the chat endpoint
    payload = {
        "message": "Tell me something interesting."
    }
    
    # Send a POST request to the /sofi/chat endpoint
    response = requests.post(f"{BASE_URL}/chat", json=payload)
    
    # Check if the response is successful
    if response.status_code == 200:
        print("Test Passed: Chat response received successfully.")
        print("Response JSON:", response.json())
    else:
        print("Test Failed: Status Code:", response.status_code)
        print("Response Text:", response.text)

# Run the test
if __name__ == "__main__":
    test_sofi_chat()
