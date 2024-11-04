from flask import Blueprint, request, jsonify
from models.points import add_points, update_points, get_points_by_user_id
from bson import ObjectId

# Create a Blueprint for points routes
points_bp = Blueprint('points_bp', __name__)

@points_bp.route('/add_points', methods=['POST'])
def add_points_route():
    try:
        data = request.json
        username = data.get('username')
        gold = data.get('gold', 0)  # Default value 0
        diamond = data.get('diamond', 0)  # Default value 0

        user_id = add_points(username, gold, diamond)
        return jsonify({"message": "Points added successfully", "user_id": str(user_id)}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@points_bp.route('/update_points/<user_id>', methods=['PUT'])
def update_points_route(user_id):
    try:
        data = request.json
        gold = data.get('gold')
        diamond = data.get('diamond')

        modified_count = update_points(ObjectId(user_id), gold, diamond)

        if modified_count > 0:
            return jsonify({"message": "Points updated successfully"}), 200
        else:
            return jsonify({"message": "No records updated"}), 404

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@points_bp.route('/get_points/<user_id>', methods=['GET'])
def get_points_route(user_id):
    try:
        user_points = get_points_by_user_id(ObjectId(user_id))

        if user_points:
            return jsonify({"points": user_points}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
