
# app/core/azure_face.py
import boto3
from app.security.SecurityConfig import settings

_rekognition_client = boto3.client(
    "rekognition",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

def get_rekognition_client():
    """Hàm dependency để inject Rekognition client vào router."""
    return _rekognition_client