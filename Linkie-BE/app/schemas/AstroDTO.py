from pydantic import BaseModel
from typing import Dict, Any

class AstroRequestDTO(BaseModel):
    lang: str = "en"

    boy_dob: str
    boy_tob: str
    boy_tz: int
    boy_lat: str
    boy_lon: str

    girl_dob: str
    girl_tob: str
    girl_tz: int
    girl_lat: str
    girl_lon: str

class AstroResponseDTO(BaseModel):
    status: int
    response: Dict[str, Any]