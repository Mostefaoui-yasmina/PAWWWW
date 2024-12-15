from app import db

# Modèle User pour gérer l'inscription et la connexion
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Modèle Task pour gérer les tâches
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    priority = db.Column(db.String(10), nullable=False)
    due_date = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20), default='in_progress')  # in_progress ou done
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)