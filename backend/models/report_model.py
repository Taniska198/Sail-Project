from .database import db


class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    report_name = db.Column(db.String(150))

    report_type = db.Column(db.String(30))

    generated_on = db.Column(db.Date)

    file_path = db.Column(db.String(300))

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "report_name": self.report_name,
            "report_type": self.report_type,
            "generated_on": str(self.generated_on),
            "file_path": self.file_path
        }