from flask import Blueprint, request, jsonify
from models.score import add_score_to_db, get_scores_by_user_id, update_score_by_user_id

score_bp = Blueprint('score_bp', __name__)

@score_bp.route('/add_score', methods=['POST'])
def add_score():
    try:
        data = request.json
        user_id = data.get('user_id')
        score = data.get('score')
        score_type = data.get('type')

        if not user_id or score is None or not score_type:
            return jsonify({"error": "user_id, score, and type are required"}), 400

        score_id = add_score_to_db(user_id, score, score_type)
        return jsonify({"message": "Score added successfully", "score_id": str(score_id)}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@score_bp.route('/get_scores', methods=['GET'])
def get_scores():
    try:
        user_id = request.args.get('user_id')

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        scores = get_scores_by_user_id(user_id)
        return jsonify({"scores": scores}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@score_bp.route('/update_score', methods=['PUT'])
def update_score():
    try:
        data = request.json
        user_id = data.get('user_id')
        new_score = data.get('new_score')
        score_type = data.get('type')

        if not user_id or new_score is None or not score_type:
            return jsonify({"error": "user_id, new_score, and type are required"}), 400

        modified_count = update_score_by_user_id(user_id, new_score, score_type)

        if modified_count > 0:
            return jsonify({"message": "Score updated successfully"}), 200
        else:
            return jsonify({"message": "No score found to update"}), 404

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
