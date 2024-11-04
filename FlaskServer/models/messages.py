from pymongo import MongoClient

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']
messages_collection = db['messages'] 

def add_message_to_db(user_id, message, msg_type):
    """Function to add a message document to the database."""
    if not user_id or not message or not msg_type:
        raise ValueError("user_id, message, and type are required")

    new_message = {
        "user_id": user_id,
        "message": message,
        "type": msg_type
    }

    result = messages_collection.insert_one(new_message)
    return result.inserted_id


def get_messages_by_user_id(user_id):
    """Function to retrieve all messages for a given user_id."""
    messages = list(messages_collection.find({"user_id": user_id}, {"_id": 0}))
    return messages