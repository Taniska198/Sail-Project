from flask import Blueprint, jsonify, send_file
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
from openpyxl import Workbook

import tempfile
import os
from datetime import datetime

from models.production_model import Production
from models.energy_model import Energy
from models.downtime_model import Downtime
from models.machine_model import MachineHealth

reports_bp = Blueprint("reports", __name__)


# ==========================================================
# Report Summary
# ==========================================================

@reports_bp.route("/summary", methods=["GET"])
def report_summary():

    return jsonify({

        "production": Production.query.count(),

        "energy": Energy.query.count(),

        "downtime": Downtime.query.count(),

        "machine": MachineHealth.query.count(),

        "total": (
            Production.query.count()
            + Energy.query.count()
            + Downtime.query.count()
            + MachineHealth.query.count()
        )

    })


# ==========================================================
# Report History
# ==========================================================

@reports_bp.route("/history", methods=["GET"])
def report_history():

    today = datetime.now().strftime("%d %b %Y")

    reports = [

        {
            "name": "Production Report",
            "date": today,
            "type": "PDF",
            "status": "Generated"
        },

        {
            "name": "Energy Report",
            "date": today,
            "type": "Excel",
            "status": "Generated"
        },

        {
            "name": "Machine Health Report",
            "date": today,
            "type": "PDF",
            "status": "Generated"
        },

        {
            "name": "Downtime Report",
            "date": today,
            "type": "Excel",
            "status": "Generated"
        }

    ]

    return jsonify(reports)


# ==========================================================
# PDF REPORT
# ==========================================================

@reports_bp.route("/pdf/<report_type>", methods=["GET"])
def generate_pdf(report_type):

    filename = os.path.join(
        tempfile.gettempdir(),
        f"{report_type}_report.pdf"
    )

    pdf = SimpleDocTemplate(filename)

    data = []

    # ---------------- Production ----------------

    if report_type == "production":

        data.append([
            "Department",
            "Production",
            "Target",
            "Efficiency"
        ])

        for row in Production.query.all():

            data.append([
                row.department,
                row.production,
                row.target,
                row.efficiency
            ])

    # ---------------- Energy ----------------

    elif report_type == "energy":

        data.append([
            "Plant",
            "Consumption",
            "Cost"
        ])

        for row in Energy.query.all():

            data.append([
                row.plant,
                row.consumption,
                row.cost
            ])

    # ---------------- Downtime ----------------

    elif report_type == "downtime":

        data.append([
            "Machine",
            "Reason",
            "Duration",
            "Status"
        ])

        for row in Downtime.query.all():

            data.append([
                row.machine,
                row.reason,
                row.duration,
                row.status
            ])

    # ---------------- Machine ----------------

    elif report_type == "machine":

        data.append([
            "Machine",
            "Health",
            "Temperature",
            "Vibration"
        ])

        for row in MachineHealth.query.all():

            data.append([
                row.machine,
                row.health,
                row.temperature,
                row.vibration
            ])

    else:

        return jsonify({
            "status": "error",
            "message": "Invalid report type."
        }), 400

    table = Table(data)

    table.setStyle(TableStyle([

        ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),

        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

        ("GRID", (0, 0), (-1, -1), 1, colors.black),

        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

    ]))

    pdf.build([table])

    return send_file(
        filename,
        as_attachment=True,
        download_name=f"{report_type}_report.pdf"
    )


# ==========================================================
# EXCEL REPORT
# ==========================================================

@reports_bp.route("/excel/<report_type>", methods=["GET"])
def generate_excel(report_type):

    wb = Workbook()

    ws = wb.active

    ws.title = report_type.capitalize()

    # ---------------- Production ----------------

    if report_type == "production":

        ws.append([
            "Department",
            "Production",
            "Target",
            "Efficiency"
        ])

        for row in Production.query.all():

            ws.append([
                row.department,
                row.production,
                row.target,
                row.efficiency
            ])

    # ---------------- Energy ----------------

    elif report_type == "energy":

        ws.append([
            "Plant",
            "Consumption",
            "Cost"
        ])

        for row in Energy.query.all():

            ws.append([
                row.plant,
                row.consumption,
                row.cost
            ])

    # ---------------- Downtime ----------------

    elif report_type == "downtime":

        ws.append([
            "Machine",
            "Reason",
            "Duration",
            "Status"
        ])

        for row in Downtime.query.all():

            ws.append([
                row.machine,
                row.reason,
                row.duration,
                row.status
            ])

    # ---------------- Machine ----------------

    elif report_type == "machine":

        ws.append([
            "Machine",
            "Health",
            "Temperature",
            "Vibration"
        ])

        for row in MachineHealth.query.all():

            ws.append([
                row.machine,
                row.health,
                row.temperature,
                row.vibration
            ])

    else:

        return jsonify({
            "status": "error",
            "message": "Invalid report type."
        }), 400

    filename = os.path.join(
        tempfile.gettempdir(),
        f"{report_type}_report.xlsx"
    )

    wb.save(filename)

    return send_file(
        filename,
        as_attachment=True,
        download_name=f"{report_type}_report.xlsx"
    )