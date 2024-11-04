from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
uri = "mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/"
client = MongoClient(uri)
db = client['pointsDatabase']  # Replace with your actual database name
points_collection = db['points']  # Replace with your collection name

def add_points(username, gold, diamond):
    """Function to add a points document to the database."""
    if not username:
        raise ValueError("username is required")

    new_points = {
        "username": username,
        "gold": gold,
        "diamond": diamond
    }

    result = points_collection.insert_one(new_points)
    return result.inserted_id

def update_points(user_id, gold=None, diamond=None):
    """Function to update the gold and diamond values for a given user_id."""
    update_fields = {}
    if gold is not None:
        update_fields['gold'] = gold
    if diamond is not None:
        update_fields['diamond'] = diamond

    if not update_fields:
        raise ValueError("At least one of gold or diamond must be provided for update")

    result = points_collection.update_one(
        {"_id": user_id},
        {"$set": update_fields}
    )
    return result.modified_count

def get_points_by_user_id(user_id):
    """Function to retrieve the points document for a given user_id."""
    user_points = points_collection.find_one({"_id": user_id}, {"_id": 0})
    return user_points
