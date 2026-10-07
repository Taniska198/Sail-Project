from flask import Blueprint

recommendations_bp = Blueprint("recommendations", __name__)

@recommendations_bp.route("/", methods=["GET"])
def recommendations():
    return {"message": "Recommendations API Working"}