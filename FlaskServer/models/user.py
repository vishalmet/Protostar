from pymongo import MongoClient

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']  # Replace with your actual database name
users_collection = db['users']  # Replace with your collection name

def add_user_to_db(username, user_wallet_address):
    """Function to add a new user to the database."""
    if not username or not user_wallet_address:
        raise ValueError("Username and user_wallet_address are required")
    
    new_user = {
        "username": username,
        "user_wallet_address": user_wallet_address
    }
    
    result = users_collection.insert_one(new_user)
    return result.inserted_id

def check_user_exists(username):
    """Function to check if a user exists in the database."""
    user = users_collection.find_one({"username": username})
    return user is not None