from app import db
from app.model.Users import Users
from datetime import datetime

class Notes(db.Model):
    id = db.Column(db.BigInteger, primary_key = True, autoincrement = True)
    title = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey(Users.id))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("Users")
