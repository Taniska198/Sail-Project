from datetime import datetime
from models.database import db

class Upload(db.Model):

    __tablename__ = "uploads"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(255), nullable=False)

    filetype = db.Column(db.String(20), nullable=False)

    filesize = db.Column(db.Float, nullable=False)

    status = db.Column(db.String(50), nullable=False)

    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "filetype": self.filetype,
            "filesize": round(self.filesize,2),
            "status": self.status,
            "uploaded_at": self.uploaded_at.strftime("%d-%m-%Y %H:%M")
        }