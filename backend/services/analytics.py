from models.energy_model import Energy
from models.production_model import Production
from models.machine_model import MachineHealth
from models.downtime_model import Downtime


def dashboard_summary():

    total_energy = sum(
        row.consumption
        for row in Energy.query.all()
    )

    total_production = sum(
        row.production
        for row in Production.query.all()
    )

    avg_health = 0

    machines = MachineHealth.query.all()

    if machines:
        avg_health = sum(
            m.health
            for m in machines
        ) / len(machines)

    total_downtime = sum(
        row.duration
        for row in Downtime.query.all()
    )

    return {
        "energy": round(total_energy, 2),
        "production": round(total_production, 2),
        "health": round(avg_health, 2),
        "downtime": round(total_downtime, 2)
    }