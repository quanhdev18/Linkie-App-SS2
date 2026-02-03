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
