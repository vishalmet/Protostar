from flask import Blueprint, request, jsonify
from models.messages import (
    add_message_to_db,
    get_messages_by_user_id,
    get_recent_interacted_users,
    get_lifetime_interacted_users
)

# Create a Blueprint for message routes
message_bp = Blueprint('message_bp', __name__)

@message_bp.route('/add_message', methods=['POST'])
def add_message():
    try:
        data = request.json
        user_id = data.get('user_id')
        message = data.get('message')
        msg_type = data.get('type')

        message_id = add_message_to_db(user_id, message, msg_type)

        return jsonify({"message": "Message added successfully", "message_id": str(message_id)}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@message_bp.route('/get_messages', methods=['GET'])
def get_messages():
    try:
        user_id = request.args.get('user_id')

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        messages = get_messages_by_user_id(user_id)

        if not messages:
            return jsonify({"message": "No messages found for this user"}), 404

        return jsonify({"messages": messages}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@message_bp.route('/get_recent_interacted_users', methods=['GET'])
def get_recent_interacted_users_route():
    try:
        user_id = request.args.get('user_id')
        msg_type = request.args.get('type')
        timeframe_minutes = int(request.args.get('timeframe', 10))

        if not user_id or not msg_type:
            return jsonify({"error": "user_id and type are required"}), 400

        interacted_users = get_recent_interacted_users(user_id, msg_type, timeframe_minutes)

        if not interacted_users:
            return jsonify({"message": "No recent interactions found"}), 404

        return jsonify({"recent_interacted_users": interacted_users}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@message_bp.route('/get_lifetime_interacted_users', methods=['GET'])
def get_lifetime_interacted_users_route():
    try:
        user_id = request.args.get('user_id')
        msg_type = request.args.get('type')

        if not user_id or not msg_type:
            return jsonify({"error": "user_id and type are required"}), 400

        interacted_users = get_lifetime_interacted_users(user_id, msg_type)

        if not interacted_users:
            return jsonify({"message": "No lifetime interactions found"}), 404

        return jsonify({"lifetime_interacted_users": interacted_users}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
