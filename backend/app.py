from flask import Flask
from flask_cors import CORS

from config import Config

# Database
from models.database import db

# Import Models
from models.energy_model import Energy
from models.production_model import Production
from models.machine_model import MachineHealth
from models.downtime_model import Downtime
from models.report_model import Report
from models.upload_model import Upload

# Import Routes
from routes.dashboard import dashboard_bp
from routes.energy import energy_bp
from routes.production import production_bp
from routes.machine import machine_bp
from routes.downtime import downtime_bp
from routes.forecast import forecast_bp
from routes.recommendations import recommendations_bp
from routes.reports import reports_bp
from routes.upload import upload_bp

# ======================================================
# Create Flask App
# ======================================================

app = Flask(__name__)

# ======================================================
# Configuration
# ======================================================

app.config.from_object(Config)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{Config.DATABASE}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ======================================================
# Enable CORS
# ======================================================

CORS(app)

# ======================================================
# Initialize Database
# ======================================================

db.init_app(app)

# ======================================================
# Create Tables
# ======================================================

with app.app_context():
    db.create_all()

# ======================================================
# Register Blueprints
# ======================================================

app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

app.register_blueprint(upload_bp, url_prefix="/api/upload")

app.register_blueprint(production_bp, url_prefix="/api/production")

app.register_blueprint(energy_bp, url_prefix="/api/energy")

app.register_blueprint(machine_bp, url_prefix="/api/machine")

app.register_blueprint(downtime_bp, url_prefix="/api/downtime")

app.register_blueprint(forecast_bp, url_prefix="/api/forecast")

app.register_blueprint(recommendations_bp, url_prefix="/api/recommendations")

app.register_blueprint(reports_bp, url_prefix="/api/reports")

# ======================================================
# Home
# ======================================================

@app.route("/")
def home():

    return {
        "project": "Industrial Analytics Dashboard",
        "version": "1.0.0",
        "status": "Running",
        "developer": "Akash Kumar"
    }


# ======================================================
# Health Check
# ======================================================

@app.route("/api/health")
def health():

    return {
        "status": "Healthy",
        "database": "Connected",
        "server": "Running",
        "message": "Backend is running successfully."
    }


# ======================================================
# Start Server
# ======================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )