from .database import db


class Production(db.Model):
    __tablename__ = "production"

    id = db.Column(db.Integer, primary_key=True)

    department = db.Column(db.String(100), nullable=False)

    production = db.Column(db.Float, nullable=False)

    target = db.Column(db.Float)

    efficiency = db.Column(db.Float)

    date = db.Column(db.Date)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "department": self.department,
            "production": self.production,
            "target": self.target,
            "efficiency": self.efficiency,
            "date": str(self.date)
        }