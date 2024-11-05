from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['gameDatabase']
scores_collection = db['scores']

def add_score_to_db(user_id, score, score_type):
    """Function to add a new game score to the database."""
    if not user_id or score is None or not score_type:
        raise ValueError("user_id, score, and type are required")
    
    # Check if an entry already exists for this user and game type
    existing_score = scores_collection.find_one({"user_id": user_id, "type": score_type})
    if existing_score:
        raise ValueError("A score entry for this user and game type already exists. Consider updating it instead.")
    
    # Insert new score if no duplicate is found
    new_score = {
        "user_id": user_id,
        "score": score,
        "type": score_type
    }

    result = scores_collection.insert_one(new_score)
    return result.inserted_id

def get_scores_by_user_id(user_id):
    """Function to retrieve scores by user_id."""
    scores = scores_collection.find({"user_id": user_id})
    scores_list = []
    for score in scores:
        score['_id'] = str(score['_id'])  # Convert ObjectId to string
        scores_list.append(score)
    return scores_list

def update_score_by_user_id(user_id, new_score, score_type):
    """Function to update a user's score."""
    result = scores_collection.update_one(
        {"user_id": user_id, "type": score_type},
        {"$set": {"score": new_score}}
    )
    return result.modified_count
