from pymongo import MongoClient
from datetime import datetime, timedelta

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']
messages_collection = db['messages']

def add_message_to_db(user_id, message, msg_type):
    """Function to add a message document to the database with a timestamp."""
    if not user_id or not message or not msg_type:
        raise ValueError("user_id, message, and type are required")

    new_message = {
        "user_id": user_id,
        "message": message,
        "type": msg_type,
        "created_at": datetime.now()  # Automatically add the current timestamp
    }
    print(new_message)

    result = messages_collection.insert_one(new_message)
    return result.inserted_id

def get_messages_by_user_id(user_id):
    """Function to retrieve all messages for a given user_id."""
    messages = list(messages_collection.find({"user_id": user_id}, {"_id": 0}))
    return messages

def get_recent_interacted_users(user_id, msg_type, timeframe_minutes=30):
    """Function to get a list of users the given user has interacted with within a specified timeframe, filtered by type."""
    time_threshold = datetime.now() - timedelta(minutes=timeframe_minutes)

    # Find all unique user_ids in the specified timeframe, excluding the given user_id
    recent_messages = messages_collection.find(
        {
            "type": msg_type,
            "created_at": {"$gte": time_threshold},
            "user_id": {"$ne": user_id}
        },
        {"_id": 0, "user_id": 1}
    )

    # Create a set of unique user_ids from the recent messages
    interacted_users = {msg['user_id'] for msg in recent_messages}

    # Debug print statement to inspect the results
    print("Recent messages retrieved:", list(interacted_users))

    return list(interacted_users)

def get_lifetime_interacted_users(user_id, msg_type):
    """Function to get a list of unique users the given user has interacted with over their lifetime, based on overlapping timelines."""
    # Get all messages for the given user
    user_messages = list(messages_collection.find(
        {
            "user_id": user_id,
            "type": msg_type
        },
        {"_id": 0, "created_at": 1}
    ))

    if not user_messages:
        return []

    # Extract timestamps from the user's messages
    user_timestamps = [msg['created_at'] for msg in user_messages]

    # Find messages from other users that have timestamps within the range of the user's messages
    interacted_users = set()
    for timestamp in user_timestamps:
        overlapping_messages = messages_collection.find(
            {
                "user_id": {"$ne": user_id},  # Exclude the current user_id
                "type": msg_type,
                "created_at": {"$gte": timestamp - timedelta(minutes=30), "$lte": timestamp + timedelta(minutes=30)}
            },
            {"_id": 0, "user_id": 1}
        )

        # Add the user IDs from overlapping messages to the set
        for msg in overlapping_messages:
            interacted_users.add(msg['user_id'])

    return list(interacted_users)
