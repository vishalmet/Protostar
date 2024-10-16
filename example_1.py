import requests
import json

# Define the URL for the init request
init_url = "https://authdev.xgaming.club/xquest/init"

# Prepare the JSON data
data = {
  "fields": {
    "target": {
      "desc": "Choose your target for this quest:",
      "data": [
        {"Deathclaw": "Deathclaws are formidable reptilian creatures. They are large, agile, and incredibly strong, with razor-sharp claws capable of tearing through almost anything."},
        {"Cazador": "Cazadors are large, mutated insects resembling a combination of wasps and tarantulas."},
        {"Bandits": "Bandits are individuals who have turned to a life of crime and violence in the post-apocalyptic world."}
      ]
    },
    "location": {
      "desc": "Select your quest's location:",
      "data": [
        {"Hidden Valley": "Hidden Valley is a secluded and heavily fortified bunker complex."},
        {"Nipton": "Nipton is a small town located in the southern Mojave Wasteland. Before the Great War, it was a modest settlement known for its lottery system and thriving trade with passing caravans."},
        {"Novac": "Novac is a small settlement located along the Long 15 highway in the Mojave Wasteland. It is known for its iconic dinosaur-shaped motel sign."}
      ]
    }
  }
}

# Send the request
response = requests.post(init_url, json=data)

# Get the response data (assuming JSON response)
response_data = response.json()

print(response_data)

# Extract the key from the response
api_key = response_data.get("key", "")
print(f"API Key: {api_key}")
