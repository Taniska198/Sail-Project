from flask import Blueprint, jsonify
from sqlalchemy import func

from models.production_model import Production

machine_bp = Blueprint("machine", __name__)


@machine_bp.route("/", methods=["GET"])
def machine_health():

    # Overall Machine Health (Average Efficiency)
    avg_efficiency = (
        Production.query.with_entities(
            func.avg(Production.efficiency)
        ).scalar() or 0
    )

    # Machine Status by Department
    production_rows = Production.query.all()

    machines = []

    for row in production_rows:

        if row.efficiency >= 90:
            status = "Excellent"
            color = "green"

        elif row.efficiency >= 75:
            status = "Good"
            color = "blue"

        elif row.efficiency >= 60:
            status = "Warning"
            color = "orange"

        else:
            status = "Critical"
            color = "red"

        machines.append({
            "machine": row.department,
            "efficiency": row.efficiency,
            "status": status,
            "color": color
        })

    # Summary Counts
    healthy = len([m for m in machines if m["status"] == "Excellent"])
    warning = len([m for m in machines if m["status"] == "Warning"])
    critical = len([m for m in machines if m["status"] == "Critical"])

    return jsonify({
        "summary": {
            "overall_health": round(avg_efficiency, 2),
            "healthy": healthy,
            "warning": warning,
            "critical": critical
        },
        "machines": machines
    })