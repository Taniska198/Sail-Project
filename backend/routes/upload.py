from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import pandas as pd

from config import Config
from models.database import db
from models.upload_model import Upload
from models.production_model import Production
from models.energy_model import Energy
from models.downtime_model import Downtime
from models.machine_model import MachineHealth


upload_bp = Blueprint("upload", __name__)


# --------------------------------------------------
# Check Allowed File
# --------------------------------------------------

def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in Config.ALLOWED_EXTENSIONS
    )


# --------------------------------------------------
# Production Import
# --------------------------------------------------

def import_production(df):

    # Remove old records
    Production.query.delete()

    for _, row in df.iterrows():

        production = Production(
            department=row["department"],
            production=float(row["production"]),
            target=float(row["target"]),
            efficiency=float(row["efficiency"]),
            date=pd.to_datetime(row["date"]).date()
        )

        db.session.add(production)

    db.session.commit()


# --------------------------------------------------
# Energy Import
# --------------------------------------------------

def import_energy(df):

    # Remove old records
    Energy.query.delete()

    for _, row in df.iterrows():

        energy = Energy(
            plant=row["plant"],
            consumption=float(row["consumption"]),
            cost=float(row["cost"]),
            date=pd.to_datetime(row["date"]).date()
        )

        db.session.add(energy)

    db.session.commit()


# --------------------------------------------------
# Downtime Import
# --------------------------------------------------

def import_downtime(df):

    # Remove old records
    Downtime.query.delete()

    for _, row in df.iterrows():

        downtime = Downtime(
            machine=row["machine"],
            reason=row["reason"],
            duration=float(row["duration"]),
            status=row["status"],
            date=pd.to_datetime(row["date"]).date()
        )

        db.session.add(downtime)

    db.session.commit()




# --------------------------------------------------
# Machine Health Import
# --------------------------------------------------

def import_machine_health(df):

    # Remove old records
    MachineHealth.query.delete()

    for _, row in df.iterrows():

        machine = MachineHealth(
            machine=row["machine"],
            status=row["status"],
            temperature=float(row["temperature"]),
            vibration=float(row["vibration"]),
            health=float(row["health"]),
            last_service=pd.to_datetime(row["last_service"]).date()
        )

        db.session.add(machine)

    db.session.commit()


# --------------------------------------------------
# Upload CSV
# --------------------------------------------------

@upload_bp.route("/", methods=["POST"])
def upload_csv():

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No file provided."
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "No file selected."
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "status": "error",
            "message": "Only CSV files are allowed."
        }), 400

    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        Config.UPLOAD_FOLDER,
        filename
    )

    file.save(filepath)

    try:

        df = pd.read_csv(filepath)

        # Import based on filename

        if filename.lower().startswith("production"):
            import_production(df)

        elif filename.lower().startswith("energy"):
            import_energy(df)

        elif filename.lower().startswith("downtime"):
            import_downtime(df)

        elif filename.lower().startswith("machine"):
            import_machine_health(df)

        filesize = round(
            os.path.getsize(filepath) / (1024 * 1024),
            2
        )

        upload = Upload(
            filename=filename,
            filetype="CSV",
            filesize=filesize,
            status="Uploaded"
        )

        db.session.add(upload)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "CSV uploaded successfully.",
            "filename": filename,
            "rows": len(df),
            "columns": list(df.columns)
        })

    except Exception as e:

        db.session.rollback()

        try:

            upload = Upload(
                filename=filename,
                filetype="CSV",
                filesize=0,
                status="Failed"
            )

            db.session.add(upload)
            db.session.commit()

        except Exception:
            db.session.rollback()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# --------------------------------------------------
# Delete Upload
# --------------------------------------------------

@upload_bp.route("/<int:upload_id>", methods=["DELETE"])
def delete_upload(upload_id):

    try:

        upload = Upload.query.filter_by(id=upload_id).first()

        if upload is None:
            return jsonify({
                "status": "error",
                "message": "Upload record not found."
            }), 404

        filename = upload.filename.lower()
        filepath = os.path.join(Config.UPLOAD_FOLDER, upload.filename)

        if os.path.exists(filepath):
         os.remove(filepath)

        # Delete corresponding table data
        if filename.startswith("production"):
            Production.query.delete()

        elif filename.startswith("energy"):
            Energy.query.delete()

        elif filename.startswith("downtime"):
            Downtime.query.delete()

        elif filename.startswith("machine"):
            MachineHealth.query.delete()

        # Delete upload history record
        db.session.delete(upload)

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": f"{upload.filename} deleted successfully."
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# --------------------------------------------------
# Upload History
# --------------------------------------------------

@upload_bp.route("/history", methods=["GET"])
def upload_history():

    uploads = Upload.query.order_by(
        Upload.uploaded_at.desc()
    ).all()

    history = []

    for upload in uploads:

        history.append({
            "id": upload.id,
            "file": upload.filename,
            "date": upload.uploaded_at.strftime("%d-%m-%Y"),
            "status": upload.status
        })

    stats = {

        "total": len(uploads),

        "csv": sum(
            1 for u in uploads
            if u.filetype == "CSV"
        ),

        "success": sum(
            1 for u in uploads
            if u.status == "Uploaded"
        ),

        "failed": sum(
            1 for u in uploads
            if u.status == "Failed"
        )

    }

    return jsonify({

        "stats": stats,

        "history": history

    })