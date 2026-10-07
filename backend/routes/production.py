from flask import Blueprint, jsonify
from sqlalchemy import func

from models.database import db
from models.production_model import Production

production_bp = Blueprint("production", __name__)


@production_bp.route("/", methods=["GET"])
def get_production():

    # ==========================
    # Summary
    # ==========================

    total_production = db.session.query(
        func.sum(Production.production)
    ).scalar() or 0

    total_target = db.session.query(
        func.sum(Production.target)
    ).scalar() or 0

    average_efficiency = db.session.query(
        func.avg(Production.efficiency)
    ).scalar() or 0

    departments_count = db.session.query(
        func.count(func.distinct(Production.department))
    ).scalar() or 0

    # ==========================
    # Daily Production
    # ==========================

    daily_result = (
        db.session.query(
            Production.date,
            func.sum(Production.production),
            func.sum(Production.target)
        )
        .group_by(Production.date)
        .order_by(Production.date)
        .all()
    )

    daily = []

    for date, production, target in daily_result:

        daily.append({
            "day": date.strftime("%d %b"),
            "production": round(production, 2),
            "target": round(target, 2)
        })

    # ==========================
    # Department Summary
    # ==========================

    department_result = (
        db.session.query(
            Production.department,
            func.sum(Production.production),
            func.sum(Production.target),
            func.avg(Production.efficiency)
        )
        .group_by(Production.department)
        .all()
    )

    departments = []

    for department, production, target, efficiency in department_result:

        departments.append({

            "department": department,

            "production": round(production, 2),

            "target": round(target, 2),

            "efficiency": round(efficiency, 2)

        })

    return jsonify({

        "summary": {

            "total_production": round(total_production, 2),

            "total_target": round(total_target, 2),

            "average_efficiency": round(
                average_efficiency,
                2
            ),

            "departments": departments_count

        },

        "daily": daily,

        "departments": departments

    })