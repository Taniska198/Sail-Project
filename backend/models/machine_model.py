from .database import db


class MachineHealth(db.Model):
    __tablename__ = "machine_health"

    id = db.Column(db.Integer, primary_key=True)

    machine = db.Column(db.String(100))

    status = db.Column(db.String(50))

    temperature = db.Column(db.Float)

    vibration = db.Column(db.Float)

    health = db.Column(db.Integer)

    last_service = db.Column(db.Date)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "machine": self.machine,
            "status": self.status,
            "temperature": self.temperature,
            "vibration": self.vibration,
            "health": self.health,
            "last_service": str(self.last_service)
        }