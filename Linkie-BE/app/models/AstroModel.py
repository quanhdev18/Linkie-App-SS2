# from pydantic import BaseModel

# class PlanetPosition(BaseModel):
#     name: str
#     longitude: float

# class HousePosition(BaseModel):
#     house: str
#     longitude: float




from pydantic import BaseModel
from typing import Dict, Any

class AstroMatchResult(BaseModel):
    score: int
    bot_response: str
    raw_data: Dict[str, Any]


