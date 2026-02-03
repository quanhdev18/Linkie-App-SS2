import httpx
from viet_badwords_filter.filter import VNBadwordsFilter

API_USER = "7352493"
API_SECRET = "Bky8wgerRFPrNk8SAqdYTL8558pjRwFo"

vn_filter = VNBadwordsFilter()

def check_vietnamese(text: str):
    """Trả về True nếu text chứa từ tục"""
    return vn_filter.is_profane(text)

async def check_sightengine(text: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.sightengine.com/1.0/text/check.json",
                params={
                    "text": text,
                    "mode": "standard",
                    "api_user": API_USER,
                    "api_secret": API_SECRET,
                    "lang": "en"
                }
            )
            return response.json()
    except Exception as e:
        print("Sightengine error:", e)
        return None

async def moderate_text(text: str):
    """
    Trả về:
    - True  = Text sạch
    - False = Text bẩn / không cho gửi
    - reason = lý do
    """

    if check_vietnamese(text):
        return False, "Tin nhắn chứa từ ngữ không phù hợp (Tiếng Việt)."

    data = await check_sightengine(text)
    if not data:
        return True, ""  

    toxicity = data.get("toxicity", {}).get("score", 0)
    if toxicity > 0.6:
        return False, "Nội dung tin nhắn có tính xúc phạm."

    sexual_score = data.get("sexual", {}).get("sexual_score", 0)
    if sexual_score > 0.6:
        return False, "Nội dung nhạy cảm không được phép."

    profanities = data.get("profanity", {}).get("matches", [])
    if len(profanities) > 0:
        return False, "Tin nhắn chứa lời lẽ không phù hợp."

    return True, ""
