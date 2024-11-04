from flask import Blueprint, request, jsonify
from models.user import add_user_to_db, check_user_exists

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json
        username = data.get('username')
        user_wallet_address = data.get('user_wallet_address')

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

