from flask import Blueprint, request, jsonify
from models.user import add_user_to_db, check_user_exists, get_username_by_address

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json
        username = data.get('username')
        user_wallet_address = data.get('user_wallet_address')

        # Validate that username and wallet address are provided
        if not username or not user_wallet_address:
            return jsonify({"error": "Username and user_wallet_address are required"}), 400

        # Add the user to the database
        user_id = add_user_to_db(username, user_wallet_address)

        return jsonify({"message": "User added successfully", "user_id": str(user_id)}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@user_bp.route('/check_user', methods=['GET'])
def check_user():
    try:
        username = request.args.get('username')

        if not username:
            return jsonify({"error": "Username is required"}), 400

        user_exists = check_user_exists(username)

        if user_exists:
            return jsonify({"message": "User exists", "username": username}), 200
        else:
            return jsonify({"message": "User does not exist"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@user_bp.route('/get_username_by_address', methods=['GET'])
def get_username_by_address_route():
    try:
        user_wallet_address = request.args.get('user_wallet_address')

        if not user_wallet_address:
            return jsonify({"error": "User wallet address is required"}), 400

        username = get_username_by_address(user_wallet_address)

        if username:
            return jsonify({"message": "User found", "username": username}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
