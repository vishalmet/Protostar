from flask import Blueprint, request, jsonify
from models.scory_history import add_score_to_db, get_scores_by_user_id_and_type

# Create a Blueprint for score routes
h_score_bp = Blueprint('h_score_bp', __name__)

@h_score_bp.route('/add_score', methods=['POST'])
def add_score():
    try:
        data = request.json
        user_id = data.get('user_id')
        score = data.get('score')
        score_type = data.get('type')

        score_id = add_score_to_db(user_id, score, score_type)

        return jsonify({"message": "Score added successfully", "score_id": str(score_id)}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@h_score_bp.route('/get_scores', methods=['GET'])
def get_scores():
    try:
        user_id = request.args.get('user_id')
        score_type = request.args.get('type')

        if not user_id or not score_type:
            return jsonify({"error": "user_id and type are required"}), 400

        scores = get_scores_by_user_id_and_type(user_id, score_type)

        if not scores:
            return jsonify({"message": "No scores found for this user and type"}), 404

        return jsonify({"scores": scores}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
