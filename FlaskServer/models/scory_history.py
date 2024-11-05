from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']
scores_collection = db['scores_history']

def add_score_to_db(user_id, score, score_type):
    """Function to add a score document to the database with a timestamp."""
    if not user_id or score is None or not score_type:
        raise ValueError("user_id, score, and type are required")

    new_score = {
        "user_id": user_id,
        "score": score,
        "type": score_type,
        "created_at": datetime.now()  # Automatically add the current timestamp
    }

    result = scores_collection.insert_one(new_score)
    return result.inserted_id

def get_scores_by_user_id_and_type(user_id, score_type):
    """Function to retrieve all scores for a given user_id and type, sorted by created_at in ascending order."""
    scores = list(scores_collection.find(
        {"user_id": user_id, "type": score_type},
        {"_id": 0}
    ).sort("created_at", 1))  # Sort by created_at in ascending order

    return scores