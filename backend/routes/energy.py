from flask import Blueprint, jsonify
from sqlalchemy import func

from models.energy_model import Energy

energy_bp = Blueprint("energy", __name__)


@energy_bp.route("/", methods=["GET"])
def energy():

    # ---------- Summary ----------

    total_energy = (
        Energy.query.with_entities(
            func.sum(Energy.consumption)
        ).scalar() or 0
    )

    total_cost = (
        Energy.query.with_entities(
            func.sum(Energy.cost)
        ).scalar() or 0
    )

    peak_load = (
        Energy.query.with_entities(
            func.max(Energy.consumption)
        ).scalar() or 0
    )

    average_load = (
        Energy.query.with_entities(
            func.avg(Energy.consumption)
        ).scalar() or 0
    )

    # ---------- Weekly Chart ----------

    energy_rows = (
        Energy.query
        .order_by(Energy.date.asc())
        .all()
    )

    weekly = []

    for row in energy_rows:
        weekly.append({
            "day": row.date.strftime("%a"),
            "energy": row.consumption
        })

    # ---------- Plant Wise Chart ----------

    plant_rows = (
        Energy.query.with_entities(
            Energy.plant,
            func.sum(Energy.consumption)
        )
        .group_by(Energy.plant)
        .all()
    )

    plants = []

    for plant, value in plant_rows:
        plants.append({
            "plant": plant,
            "value": round(value, 2)
        })

    # ---------- Alerts ----------

    alerts = []

    for row in energy_rows:
        if row.consumption > 5000:
            alerts.append({
                "type": "warning",
                "message": f"{row.plant} exceeded 5000 kWh on {row.date}"
            })

    return jsonify({

        "summary": {
            "total_energy": round(total_energy, 2),
            "total_cost": round(total_cost, 2),
            "peak_load": round(peak_load, 2),
            "average_load": round(average_load, 2)
        },

        "weekly": weekly,

        "plants": plants,

        "alerts": alerts

    })