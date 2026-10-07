from .database import db


class Energy(db.Model):
    __tablename__ = "energy"

    id = db.Column(db.Integer, primary_key=True)

    plant = db.Column(db.String(100), nullable=False)

    consumption = db.Column(db.Float, nullable=False)

    cost = db.Column(db.Float, nullable=False)

    date = db.Column(db.Date, nullable=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "plant": self.plant,
            "consumption": self.consumption,
            "cost": self.cost,
            "date": str(self.date)
        }