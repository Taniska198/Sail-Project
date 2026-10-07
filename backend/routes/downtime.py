from flask import Blueprint, jsonify
from sqlalchemy import func

from models.database import db
from models.downtime_model import Downtime

downtime_bp = Blueprint("downtime", __name__)


@downtime_bp.route("/", methods=["GET"])
def get_downtime():

    # =========================
    # Summary
    # =========================

    total_hours = db.session.query(
        func.sum(Downtime.duration)
    ).scalar() or 0

    incidents = Downtime.query.count()

    average = db.session.query(
        func.avg(Downtime.duration)
    ).scalar() or 0

    # =========================
    # Machine-wise Downtime
    # =========================

    machine_result = (
        db.session.query(
            Downtime.machine,
            func.sum(Downtime.duration)
        )
        .group_by(Downtime.machine)
        .all()
    )

    machines = []

    for machine, hours in machine_result:
        machines.append({
            "machine": machine,
            "hours": round(hours, 2)
        })

    # =========================
    # Daily Downtime
    # =========================

    daily_result = (
        db.session.query(
            Downtime.date,
            func.sum(Downtime.duration)
        )
        .group_by(Downtime.date)
        .order_by(Downtime.date)
        .all()
    )

    daily = []

    for date, hours in daily_result:
        daily.append({
            "day": date.strftime("%d %b"),
            "hours": round(hours, 2)
        })

    # =========================
    # Downtime Reasons
    # =========================

    reason_result = (
        db.session.query(
            Downtime.reason,
            func.count(Downtime.id)
        )
        .group_by(Downtime.reason)
        .all()
    )

    reasons = []

    for reason, count in reason_result:
        reasons.append({
            "reason": reason,
            "count": count
        })

    return jsonify({

        "summary": {
            "total_hours": round(total_hours, 2),
            "incidents": incidents,
            "average": round(average, 2)
        },

        "machines": machines,

        "daily": daily,

        "reasons": reasons

    })