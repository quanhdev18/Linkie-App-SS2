# from pydantic import BaseModel
# from typing import List, Dict

# class Person(BaseModel):
#     day: int
#     month: int
#     year: int
#     hour: int
#     minute: int
#     lat: float
#     lon: float

# class Aspect(BaseModel):
#     planet_a: str
#     planet_b: str
#     type: str
#     orb: float
#     strength: float

# class SynastryRequest(BaseModel):
#     person_a: Person
#     person_b: Person

# class SynastryResponse(BaseModel):
#     person_a: Dict[str, Dict[str, float]]
#     person_b: Dict[str, Dict[str, float]]
#     aspects: List[Aspect]
#     compatibility_score: int
#     analysis_report: str


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