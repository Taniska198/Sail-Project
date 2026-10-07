import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = "sail_dashboard_secret_key"

    DATABASE = os.path.join(BASE_DIR, "database.db")

    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    REPORT_FOLDER = os.path.join(BASE_DIR, "reports")

    MAX_CONTENT_LENGTH = 20 * 1024 * 1024  # 20 MB

    ALLOWED_EXTENSIONS = {"csv"}

    JSON_SORT_KEYS = False