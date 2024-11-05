from pymongo import MongoClient, errors

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']  # Replace with your actual database name
users_collection = db['users']  # Replace with your collection name

def add_user_to_db(username, user_wallet_address):
    """Function to add a new user to the database."""
    if not username or not user_wallet_address:
        raise ValueError("Username and user_wallet_address are required")
    
    # Check for existing user with the same username or wallet address
    existing_user = users_collection.find_one({
        "$or": [
            {"username": username},
            {"user_wallet_address": user_wallet_address}
        ]
    })
    if existing_user:
        raise ValueError("User with the same username or wallet address already exists")
    
    # Insert new user into the database
    new_user = {
        "username": username,
        "user_wallet_address": user_wallet_address
    }
    result = users_collection.insert_one(new_user)
    return result.inserted_id

def check_user_exists(username):
    """Function to check if a user exists in the database."""
    user = users_collection.find_one({"user_wallet_address": username})
    return user is not None

def get_username_by_address(user_wallet_address):
    """Function to get a username by user_wallet_address."""
    user = users_collection.find_one({"user_wallet_address": user_wallet_address})
    if user:
        return user.get("username")
    return None
