# from fastapi import APIRouter
# from app.schemas.AstroDTO import SynastryRequest, SynastryResponse
# from app.crud.AstroService import calculate_synastry

# router = APIRouter()

# @router.post("/", response_model=SynastryResponse)
# def synastry(req: SynastryRequest):
#     result = calculate_synastry(req.person_a.dict(), req.person_b.dict())
#     return result

from fastapi import APIRouter, HTTPException
from app.schemas.AstroDTO import AstroRequestDTO, AstroResponseDTO
from app.crud.AstroService import AstroService

router = APIRouter(prefix="/astro", tags=["Astrology Matching"])


@router.post("/ashtakoot", response_model=AstroResponseDTO)
async def get_ashtakoot_match(dto: AstroRequestDTO):
    try:
        result = await AstroService.get_ashtakoot_match(dto)

        return AstroResponseDTO(
            status=200,
            response=result.raw_data
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
