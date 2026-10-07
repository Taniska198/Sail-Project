def generate_recommendations(
        energy,
        downtime,
        health):

    recommendations = []

    if energy > 5000:

        recommendations.append({
            "priority": "High",
            "title": "Reduce Energy Consumption",
            "description":
            "Plant energy consumption exceeds recommended threshold."
        })

    if downtime > 5:

        recommendations.append({
            "priority": "High",
            "title": "Preventive Maintenance",
            "description":
            "Machine downtime is increasing."
        })

    if health < 80:

        recommendations.append({
            "priority": "Medium",
            "title": "Inspect Machines",
            "description":
            "Machine health score is low."
        })

    if len(recommendations) == 0:

        recommendations.append({

            "priority": "Low",

            "title": "System Healthy",

            "description":
            "No major issues detected."
        })

    return recommendations