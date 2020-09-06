from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Users(db.Model):
    id = db.Column(db.BigInteger, primary_key = True, autoincrement = True)
    user_name = db.Column(db.String(16),  unique=True, nullable=False)
    name = db.Column(db.String(230), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)


    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)