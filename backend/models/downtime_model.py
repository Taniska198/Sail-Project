from .database import db


class Downtime(db.Model):
    __tablename__ = "downtime"

    id = db.Column(db.Integer, primary_key=True)

    machine = db.Column(db.String(100))

    reason = db.Column(db.String(200))

    duration = db.Column(db.Float)

    status = db.Column(db.String(50))

    date = db.Column(db.Date)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "machine": self.machine,
            "reason": self.reason,
            "duration": self.duration,
            "status": self.status,
            "date": str(self.date)
        }