# # app/services/azure_face.py
# from azure.cognitiveservices.vision.face import FaceClient
# from msrest.authentication import CognitiveServicesCredentials
# from app.core.config import settings

# if not settings.AZURE_FACE_ENDPOINT or not settings.AZURE_FACE_KEY:
#     raise Exception("Chưa cấu hình Azure API. Vui lòng kiểm tra file .env")

# # Khởi tạo client một lần duy nhất
# _face_client = FaceClient(
#     settings.AZURE_FACE_ENDPOINT,
#     CognitiveServicesCredentials(settings.AZURE_FACE_KEY)
# )

# def get_face_client():
#     """Hàm dependency để inject FaceClient vào router."""
#     return _face_client



# app/core/azure_face.py
import boto3
from app.security.SecurityConfig import settings

# Khởi tạo client một lần duy nhất
_rekognition_client = boto3.client(
    "rekognition",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

def get_rekognition_client():
    """Hàm dependency để inject Rekognition client vào router."""
    return _rekognition_client