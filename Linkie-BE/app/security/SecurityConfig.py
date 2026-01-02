from pydantic import EmailStr
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Application settings
    APP_NAME: str = "FastAPI Auth OTP"

    # JWT config
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_HOURS: int = 5

    # Database
    DATABASE_URL: str
    
    # AZURE_FACE_ENDPOINT: str
    # AZURE_FACE_KEY: str
    
    # cloudinary_cloud_name: str
    # cloudinary_api_key: str
    # cloudinary_api_secret: str

    # Email settings
    MAIL_USERNAME: EmailStr
    MAIL_PASSWORD: str
    MAIL_FROM: EmailStr
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_FROM_NAME: Optional[str] = "Linkie"
    
    
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str
    
    stripe_secret_key: str = "sk_test_yourkey"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        
    }

# Dùng như Singleton
settings = Settings()