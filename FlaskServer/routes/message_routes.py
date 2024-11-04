from flask import Blueprint, request, jsonify
from models.messages import add_message_to_db, get_messages_by_user_id

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
    