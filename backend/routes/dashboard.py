from flask import Blueprint, jsonify
from sqlalchemy import func

from models.production_model import Production
from models.energy_model import Energy
from models.machine_model import MachineHealth
from models.downtime_model import Downtime

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
def dashboard():

    # ---------------- Production ---------------- #

    production = Production.query.with_entities(
        func.sum(Production.production)
    ).scalar() or 0

    target = Production.query.with_entities(
        func.sum(Production.target)
    ).scalar() or 0

    efficiency = Production.query.with_entities(
        func.avg(Production.efficiency)
    ).scalar() or 0

    records = Production.query.count()

    # ---------------- Energy ---------------- #

    energy_consumption = Energy.query.with_entities(
        func.sum(Energy.consumption)
    ).scalar() or 0

    energy_cost = Energy.query.with_entities(
        func.sum(Energy.cost)
    ).scalar() or 0

    # ---------------- Machine Health ---------------- #

    healthy_machines = MachineHealth.query.filter(
        MachineHealth.health >= 80
    ).count()

    # ---------------- Downtime ---------------- #

    downtime_hours = Downtime.query.with_entities(
        func.sum(Downtime.duration)
    ).scalar() or 0

    return jsonify({

        # Production
        "production": round(production, 2),
        "target": round(target, 2),
        "efficiency": round(efficiency, 2),
        "records": records,

        # Energy
        "energy": round(energy_consumption, 2),
        "energy_cost": round(energy_cost, 2),

        # Machine Health
        "health": healthy_machines,

        # Downtime
        "downtime": round(downtime_hours, 2)

    })