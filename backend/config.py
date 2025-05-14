import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://neondb_owner:npg_GPzQLMS2mN3E@ep-blue-hat-a4a6uiqw-pooler.us-east-1.aws.neon.tech/neondb?sslmode=verify-full')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key')  # Change this in production
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour in seconds 