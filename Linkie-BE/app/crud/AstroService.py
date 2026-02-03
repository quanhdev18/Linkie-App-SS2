import httpx
from datetime import datetime
from app.schemas.AstroDTO import AstroRequestDTO
from app.models.AstroModel import AstroMatchResult
from app.core.astro_config import VEDIC_ASTRO_API_KEY  

class AstroService:

    API_URL = "https://api.vedicastroapi.com/v3-json/matching/ashtakoot-with-astro-details"

    @staticmethod
    def format_dob(dob: str) -> str:
        """Chuyển DOB từ DD/MM/YYYY sang YYYY-MM-DD"""
        return datetime.strptime(dob, "%d/%m/%Y").strftime("%Y-%m-%d")

    @staticmethod
    async def get_ashtakoot_match(data: AstroRequestDTO) -> AstroMatchResult:
        # Format DOB
        boy_dob = AstroService.format_dob(data.boy_dob)
        girl_dob = AstroService.format_dob(data.girl_dob)

        payload = {
            "lang": data.lang,
            "api_key": VEDIC_ASTRO_API_KEY,
            "boy_dob": boy_dob,
            "boy_tob": data.boy_tob,
            "boy_tz": data.boy_tz,
            "boy_lat": data.boy_lat,
            "boy_lon": data.boy_lon,
            "girl_dob": girl_dob,
            "girl_tob": data.girl_tob,
            "girl_tz": data.girl_tz,
            "girl_lat": data.girl_lat,
            "girl_lon": data.girl_lon,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(AstroService.API_URL, json=payload)

        data = response.json()

        if response.status_code != 200:
            raise Exception(data.get("message", "Astro API Error"))

        return AstroMatchResult(
            score=data["response"].get("score", 0),
            bot_response=data["response"].get("bot_response", ""),
            raw_data=data["response"]
        )
