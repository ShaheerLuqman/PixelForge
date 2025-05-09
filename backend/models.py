from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        salt = bcrypt.gensalt()
        self.password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class ProductShowcase(db.Model):
    __tablename__ = 'product_showcases'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    rating = db.Column(db.Integer, default=5)
    
    # Post details
    background_url = db.Column(db.String(500))
    final_image_url = db.Column(db.String(500))
    product_name = db.Column(db.String(200))
    product_description = db.Column(db.Text)
    product_slogan = db.Column(db.String(200))
    caption_generated = db.Column(db.Text)
    product_nonbg_url = db.Column(db.String(500))
    product_org_url = db.Column(db.String(500))
    model_type = db.Column(db.String(100))
    
    # Video details
    video_url = db.Column(db.String(500))
    video_duration = db.Column(db.String(20))
    video_resolution = db.Column(db.String(20))
    
    # Relationship
    user = db.relationship('User', backref=db.backref('showcases', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'created_at': self.created_at.isoformat(),
            'rating': self.rating,
            'post': {
                'background': self.background_url,
                'final_image': self.final_image_url,
                'product_details': {
                    'name': self.product_name,
                    'description': self.product_description,
                    'Slogan': self.product_slogan,
                    'Caption_generated': self.caption_generated
                },
                'product_nonbg': self.product_nonbg_url,
                'product_org': self.product_org_url,
                'model_type': self.model_type
            },
            'video': {
                'videoUrl': self.video_url,
                'metadata': {
                    'duration': self.video_duration,
                    'resolution': self.video_resolution
                }
            }
        } 