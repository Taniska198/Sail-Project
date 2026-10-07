def predict_machine_risk(machine_data):
    """
    machine_data example

    [
        {
            "machine":"Rolling Mill",
            "health":82
        }
    ]
    """

    result = []

    for machine in machine_data:

        health = machine["health"]

        if health >= 90:

            risk = 10
            status = "Low"

        elif health >= 75:

            risk = 40
            status = "Medium"

        else:

            risk = 80
            status = "High"

        result.append({

            "machine": machine["machine"],

            "health": health,

            "risk": risk,

            "status": status

        })

    return result