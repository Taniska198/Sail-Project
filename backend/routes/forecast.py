from flask import Blueprint, jsonify

from models.production_model import Production
from ai.production_forecast import forecast_production

from models.energy_model import Energy
from ai.energy_forecast import forecast_energy
from datetime import timedelta

from models.downtime_model import Downtime
from ai.downtime_forecast import forecast_downtime

from models.machine_model import MachineHealth
from ai.machine_prediction import predict_machine_risk

from ai.recommendations import generate_recommendations

forecast_bp = Blueprint("forecast", __name__)


# =====================================================
# Production Forecast
# =====================================================

@forecast_bp.route("/production", methods=["GET"])
def production_forecast():

    # Get production data ordered by date
    records = (
        Production.query
        .order_by(Production.date.asc())
        .all()
    )

    if not records:
        return jsonify({
            "status": "error",
            "message": "No production data found."
        }), 404

    history = [row.production for row in records]

    result = forecast_production(history)

    chart_history = []

    for row in records:
        chart_history.append({
            "date": row.date.strftime("%d %b"),
            "production": row.production
        })

    chart_forecast = []

    last_day = len(chart_history)

    for i, value in enumerate(result["forecast"], start=1):

        chart_forecast.append({

            "day": f"Day {last_day+i}",

            "prediction": value

        })

    return jsonify({

        "summary":{

            "confidence": result["confidence"],

            "trend": result["trend"],

            "forecast_days": len(result["forecast"])

        },

        "history": chart_history,

        "forecast": chart_forecast

    })
# =====================================================
# Energy Forecast
# =====================================================

@forecast_bp.route("/energy", methods=["GET"])
def energy_forecast():

    records = (
        Energy.query
        .order_by(Energy.date.asc())
        .all()
    )

    if not records:
        return jsonify({
            "status": "error",
            "message": "No energy data found."
        }), 404

    history = [row.consumption for row in records]

    result = forecast_energy(history)

    chart_history = []

    for row in records:

        chart_history.append({

            "date": row.date.strftime("%d %b"),

            "consumption": row.consumption,

            "cost": row.cost

        })

    chart_forecast = []

    last_date = records[-1].date

    for i, value in enumerate(result["forecast"], start=1):

        future_date = last_date + timedelta(days=i)

        chart_forecast.append({

            "day": future_date.strftime("%d %b"),

            "consumption": value,

            "cost": round(value * 6, 2)

        })

    return jsonify({

        "summary": {

            "average": result["average"],

            "expected_cost": round(sum(x["cost"] for x in chart_forecast), 2),

            "forecast_days": len(chart_forecast)

        },

        "history": chart_history,

        "forecast": chart_forecast

    })

# =====================================================
# downtime Forecast
# =====================================================


@forecast_bp.route("/downtime", methods=["GET"])
def downtime_forecast():

    records = (
        Downtime.query
        .order_by(Downtime.date.asc())
        .all()
    )

    if not records:
        return jsonify({
            "status": "error",
            "message": "No downtime data found."
        }), 404

    history = [row.duration for row in records]

    result = forecast_downtime(history)

    chart_history = []

    for row in records:
        chart_history.append({
            "date": row.date.strftime("%d %b"),
            "duration": row.duration
        })

    chart_forecast = []

    last_date = records[-1].date

    for i, value in enumerate(result["forecast"], start=1):

        future_date = last_date + timedelta(days=i)

        chart_forecast.append({
            "day": future_date.strftime("%d %b"),
            "duration": value
        })

    return jsonify({

        "summary": {
            "average": round(result["average"], 2),
            "forecast_days": len(chart_forecast)
        },

        "history": chart_history,

        "forecast": chart_forecast

    })
# =====================================================
# Machine Health Prediction
# =====================================================

@forecast_bp.route("/machine", methods=["GET"])
def machine_forecast():

    machines = MachineHealth.query.order_by(MachineHealth.id.asc()).all()

    if not machines:
        return jsonify({
            "status": "error",
            "message": "No machine health data found."
        }), 404

    machine_data = []

    for machine in machines:
        machine_data.append({
            "machine": machine.machine,
            "health": machine.health
        })

    predictions = predict_machine_risk(machine_data)

    average_health = round(
        sum(m["health"] for m in predictions) / len(predictions),
        2
    )

    average_risk = round(
        sum(m["risk"] for m in predictions) / len(predictions),
        2
    )

    return jsonify({

        "summary": {
            "total_machines": len(predictions),
            "average_health": average_health,
            "average_risk": average_risk
        },

        "machines": predictions

    })


# =====================================================
# AI Recommendations
# =====================================================

@forecast_bp.route("/recommendations", methods=["GET"])
def recommendations():

    production = Production.query.all()
    energy = Energy.query.all()
    downtime = Downtime.query.all()
    machines = MachineHealth.query.all()

    recommendations = generate_recommendations(
        production,
        energy,
        downtime,
        machines
    )

    return jsonify({
        "recommendations": recommendations
    })


# =====================================================
# AI Dashboard Summary (Future)
# =====================================================

@forecast_bp.route("/dashboard", methods=["GET"])
def ai_dashboard():

    return jsonify({

        "message": "AI Dashboard API Coming Soon"

    })