def generate_recommendations(production, energy, downtime, machines):

    recommendations = []

    # Production
    if production:
        avg_efficiency = sum(p.efficiency for p in production) / len(production)

        if avg_efficiency < 80:
            recommendations.append({
                "title": "Improve Production Efficiency",
                "priority": "High",
                "description": f"Average production efficiency is only {avg_efficiency:.1f}%."
            })

    # Energy
    if energy:
        avg_energy = sum(e.consumption for e in energy) / len(energy)

        if avg_energy > 450:
            recommendations.append({
                "title": "Reduce Energy Consumption",
                "priority": "Medium",
                "description": f"Average energy usage is {avg_energy:.1f} kWh."
            })

    # Downtime
    if downtime:
        avg_downtime = sum(d.duration for d in downtime) / len(downtime)

        if avg_downtime > 3:
            recommendations.append({
                "title": "Reduce Machine Downtime",
                "priority": "High",
                "description": f"Average downtime is {avg_downtime:.1f} hours."
            })

    # Machine Health
    if machines:
        avg_health = sum(m.health for m in machines) / len(machines)

        if avg_health < 80:
            recommendations.append({
                "title": "Schedule Preventive Maintenance",
                "priority": "High",
                "description": f"Average machine health is {avg_health:.1f}%."
            })

    if not recommendations:
        recommendations.append({
            "title": "Excellent Performance",
            "priority": "Low",
            "description": "All monitored systems are operating within normal limits."
        })

    return recommendations