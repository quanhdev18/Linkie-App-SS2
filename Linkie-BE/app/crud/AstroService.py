# import swisseph as swe
# import math
# from typing import Dict, List

# swe.set_ephe_path(".")  # thư mục chứa ephemeris

# PLANETS = {
#     "Sun": swe.SUN,
#     "Moon": swe.MOON,
#     "Mercury": swe.MERCURY,
#     "Venus": swe.VENUS,
#     "Mars": swe.MARS,
#     "Jupiter": swe.JUPITER,
#     "Saturn": swe.SATURN,
#     "Uranus": swe.URANUS,
#     "Neptune": swe.NEPTUNE,
#     "Pluto": swe.PLUTO,
# }

# ASPECTS = {
#     "Conjunction": 0,
#     "Sextile": 60,
#     "Square": 90,
#     "Trine": 120,
#     "Opposition": 180
# }

# # def calc_julian(day, month, year, hour, minute):
# #     return swe.julday(year, month, day, hour + minute/60)
# def calc_julian(day, month, year, hour, minute, **kwargs):
#     return swe.julday(year, month, day, hour + minute/60)

# def calc_planets(jd) -> Dict[str, float]:
#     data = {}
#     for name, code in PLANETS.items():
#         pos, _ = swe.calc_ut(jd, code)
#         data[name] = pos[0]
#     return data

# # def calc_houses(jd, lat, lon) -> Dict[str, float]:
# #     ascendant, houses = swe.houses(jd, lat, lon)
# #     return {
# #         # "Ascendant": ascendant,
# #         {f"House{i+1}": h for i, h in enumerate(houses)}
# #     }
# def calc_houses(jd, lat, lon) -> Dict[str, float]:
#     ascendant, houses = swe.houses(jd, lat, lon)
#     return {
#         "Ascendant": float(ascendant[0]),
#         **{f"House{i+1}": h for i, h in enumerate(houses)}
#     }


# def angle_difference(a, b):
#     diff = abs(a - b) % 360
#     return diff if diff <= 180 else 360 - diff

# def detect_aspect(angle):
#     for asp_name, asp_angle in ASPECTS.items():
#         if abs(angle - asp_angle) < 6:  # orb
#             orb = abs(angle - asp_angle)
#             strength = max(0, 1 - orb/6)
#             return asp_name, orb, round(strength,2)
#     return None, None, None

# # def calculate_synastry(person_a, person_b):
# #     jd_a = calc_julian(**person_a)
# #     jd_b = calc_julian(**person_b)

# #     planets_a = calc_planets(jd_a)
# #     planets_b = calc_planets(jd_b)

# #     houses_a = calc_houses(jd_a, person_a['lat'], person_a['lon'])
# #     houses_b = calc_houses(jd_b, person_b['lat'], person_b['lon'])

# #     aspects = []
# #     score = 0
# #     for pa, deg_a in planets_a.items():
# #         for pb, deg_b in planets_b.items():
# #             angle = angle_difference(deg_a, deg_b)
# #             asp, orb, strength = detect_aspect(angle)
# #             if asp:
# #                 aspects.append({
# #                     "planet_a": pa,
# #                     "planet_b": pb,
# #                     "type": asp,
# #                     "orb": orb,
# #                     "strength": strength
# #                 })
# #                 score += strength   # cơ chế đơn giản
                
# #     score = int(score / len(planets_a) * 10)  
# #     score = min(100, int(score))
# #     analysis_report = f"Found {len(aspects)} aspects. Compatibility score: {score}/100."
# #     return {
# #         "person_a": {"planets": planets_a, "houses": houses_a},
# #         "person_b": {"planets": planets_b, "houses": houses_b},
# #         "aspects": aspects,
# #         "compatibility_score": score,
# #         "analysis_report": analysis_report
# #     }

# # def calculate_synastry(person_a, person_b):
# #     jd_a = calc_julian(**person_a)
# #     jd_b = calc_julian(**person_b)

# #     planets_a = calc_planets(jd_a)
# #     planets_b = calc_planets(jd_b)

# #     houses_a = calc_houses(jd_a, person_a['lat'], person_a['lon'])
# #     houses_b = calc_houses(jd_b, person_b['lat'], person_b['lon'])

# #     aspects = []
# #     score = 0
# #     for pa, deg_a in planets_a.items():
# #         for pb, deg_b in planets_b.items():
# #             angle = angle_difference(deg_a, deg_b)
# #             asp, orb, strength = detect_aspect(angle)
# #             if asp:
# #                 aspects.append({
# #                     "planet_a": pa,
# #                     "planet_b": pb,
# #                     "type": asp,
# #                     "orb": orb,
# #                     "strength": strength
# #                 })
# #                 score += strength   # cơ chế đơn giản

# #     # chuẩn hóa điểm số
# #     # score = int(score / len(planets_a) * 10)
# #     # score = min(100, int(score))
# #     max_possible_aspects = len(planets_a) * len(planets_b)
# #     score = int(score / max_possible_aspects * 100)
# #     score = min(100, score)

# #     analysis_report = f"Found {len(aspects)} aspects. Compatibility score: {score}/100."

# #     # -----------------------
# #     # Tạo báo cáo chi tiết
# #     # -----------------------
# #     PLANET_MEANING = {
# #         "Sun": "Cái tôi, bản ngã, mục tiêu sống",
# #         "Moon": "Cảm xúc, trực giác, bản năng",
# #         "Mercury": "Giao tiếp, tư duy, học hỏi",
# #         "Venus": "Tình yêu, sự hấp dẫn, giá trị cá nhân",
# #         "Mars": "Năng lượng, hành động, tham vọng",
# #         "Jupiter": "Phát triển, may mắn, học hỏi",
# #         "Saturn": "Kỷ luật, giới hạn, trách nhiệm",
# #         "Uranus": "Đổi mới, bất ngờ, tự do",
# #         "Neptune": "Trực giác, mơ mộng, tâm linh",
# #         "Pluto": "Biến đổi, sức mạnh, tái sinh"
# #     }

# #     ASPECT_MEANING = {
# #         "Conjunction": "Hợp nhất, tăng cường năng lượng hành tinh",
# #         "Sextile": "Cơ hội, thuận lợi, dễ phối hợp",
# #         "Square": "Thách thức, căng thẳng, xung đột",
# #         "Trine": "Hài hòa, suôn sẻ, tài năng tự nhiên",
# #         "Opposition": "Đối lập, cần cân bằng"
# #     }

# #     HOUSES_MEANING = {
# #         "House1": "Bản thân, ngoại hình, cách bạn xuất hiện",
# #         "House2": "Tài chính, giá trị cá nhân, của cải",
# #         "House3": "Giao tiếp, anh chị em, môi trường gần",
# #         "House4": "Gia đình, gốc gác, nơi ở",
# #         "House5": "Tình yêu, sự sáng tạo, sở thích",
# #         "House6": "Sức khỏe, công việc, thói quen",
# #         "House7": "Hôn nhân, đối tác, mối quan hệ công việc",
# #         "House8": "Tài sản chung, chuyển hóa, tâm linh"
# #     }

# #     report = []
# #     report.append(analysis_report + "\n")
# #     report.append("Chi tiết các khía cạnh hành tinh:\n")
# #     for asp in aspects:
# #         pa = asp["planet_a"]
# #         pb = asp["planet_b"]
# #         type_ = asp["type"]
# #         strength = asp["strength"]
# #         report.append(f"- {pa} ({PLANET_MEANING.get(pa,'')}) {type_} {pb} ({PLANET_MEANING.get(pb,'')}), "
# #                       f"ảnh hưởng: {strength*100:.0f}%")

# #     for person_key in ["person_a", "person_b"]:
# #         person = {"planets": planets_a if person_key=="person_a" else planets_b,
# #                   "houses": houses_a if person_key=="person_a" else houses_b}
# #         report.append(f"\nNhà chiếu của {person_key.replace('_',' ')}:")
# #         for house, lon in person["houses"].items():
# #             meaning = HOUSES_MEANING.get(house, "")
# #             report.append(f"- {house} ({meaning}): {lon:.2f} độ")

# #     detailed_report = "\n".join(report)

# #     return {
# #         "person_a": {"planets": planets_a, "houses": houses_a},
# #         "person_b": {"planets": planets_b, "houses": houses_b},
# #         "aspects": aspects,
# #         "compatibility_score": score,
# #         "analysis_report": analysis_report,
# #         "detailed_report": detailed_report
# #     }
# def calculate_synastry(person_a, person_b):
#     jd_a = calc_julian(**person_a)
#     jd_b = calc_julian(**person_b)

#     planets_a = calc_planets(jd_a)
#     planets_b = calc_planets(jd_b)

#     houses_a = calc_houses(jd_a, person_a['lat'], person_a['lon'])
#     houses_b = calc_houses(jd_b, person_b['lat'], person_b['lon'])

#     aspects = []
#     score = 0
#     for pa, deg_a in planets_a.items():
#         for pb, deg_b in planets_b.items():
#             angle = angle_difference(deg_a, deg_b)
#             asp, orb, strength = detect_aspect(angle)
#             if asp:
#                 aspects.append({
#                     "planet_a": pa,
#                     "planet_b": pb,
#                     "type": asp,
#                     "orb": orb,
#                     "strength": strength
#                 })
#                 score += strength

#     max_possible_aspects = len(planets_a) * len(planets_b)
#     score = int(score / max_possible_aspects * 100)
#     score = min(100, score)

#     # -----------------------
#     # Báo cáo ngắn gọn
#     # -----------------------
#     analysis_report = f"Found {len(aspects)} aspects. Compatibility score: {score}/100."

#     # -----------------------
#     # Báo cáo chi tiết
#     # -----------------------
#     PLANET_MEANING = {
#         "Sun": "Cái tôi, bản ngã, mục tiêu sống",
#         "Moon": "Cảm xúc, trực giác, bản năng",
#         "Mercury": "Giao tiếp, tư duy, học hỏi",
#         "Venus": "Tình yêu, sự hấp dẫn, giá trị cá nhân",
#         "Mars": "Năng lượng, hành động, tham vọng",
#         "Jupiter": "Phát triển, may mắn, học hỏi",
#         "Saturn": "Kỷ luật, giới hạn, trách nhiệm",
#         "Uranus": "Đổi mới, bất ngờ, tự do",
#         "Neptune": "Trực giác, mơ mộng, tâm linh",
#         "Pluto": "Biến đổi, sức mạnh, tái sinh"
#     }

#     ASPECT_MEANING = {
#         "Conjunction": "Hợp nhất, tăng cường năng lượng hành tinh",
#         "Sextile": "Cơ hội, thuận lợi, dễ phối hợp",
#         "Square": "Thách thức, căng thẳng, xung đột",
#         "Trine": "Hài hòa, suôn sẻ, tài năng tự nhiên",
#         "Opposition": "Đối lập, cần cân bằng"
#     }

#     HOUSES_MEANING = {
#         "House1": "Bản thân, ngoại hình, cách bạn xuất hiện",
#         "House2": "Tài chính, giá trị cá nhân, của cải",
#         "House3": "Giao tiếp, anh chị em, môi trường gần",
#         "House4": "Gia đình, gốc gác, nơi ở",
#         "House5": "Tình yêu, sự sáng tạo, sở thích",
#         "House6": "Sức khỏe, công việc, thói quen",
#         "House7": "Hôn nhân, đối tác, mối quan hệ công việc",
#         "House8": "Tài sản chung, chuyển hóa, tâm linh"
#     }

#     report = []
#     report.append(analysis_report + "\n")
#     report.append("Chi tiết các khía cạnh hành tinh:\n")
#     for asp in aspects:
#         pa = asp["planet_a"]
#         pb = asp["planet_b"]
#         type_ = asp["type"]
#         strength = asp["strength"]
#         report.append(f"- {pa} ({PLANET_MEANING.get(pa,'')}) {type_} {pb} ({PLANET_MEANING.get(pb,'')}), "
#                       f"ảnh hưởng: {strength*100:.0f}% ({ASPECT_MEANING.get(type_,'')})")

#     for person_key in ["person_a", "person_b"]:
#         person = {"planets": planets_a if person_key=="person_a" else planets_b,
#                   "houses": houses_a if person_key=="person_a" else houses_b}
#         report.append(f"\nNhà chiếu của {person_key.replace('_',' ')}:")
#         for house, lon in person["houses"].items():
#             meaning = HOUSES_MEANING.get(house, "")
#             report.append(f"- {house} ({meaning}): {lon:.2f} độ")

#     # -----------------------
#     # Nhận xét tổng quan
#     # -----------------------
#     if score > 75:
#         summary = "Mối quan hệ rất hợp, dễ phối hợp, nhiều tiềm năng hạnh phúc và phát triển chung."
#     elif score > 50:
#         summary = "Mối quan hệ khá hợp, có cả thuận lợi và thách thức cần cân bằng."
#     elif score > 25:
#         summary = "Mối quan hệ cần nỗ lực, nhiều xung đột và khác biệt cần điều chỉnh."
#     else:
#         summary = "Mối quan hệ khó khăn, nhiều thách thức, cần thấu hiểu và kiên nhẫn."

#     report.append("\nNhận xét tổng quan về tính cách, cuộc sống, hợp nhau:\n" + summary)

#     detailed_report = "\n".join(report)

#     return {
#         "person_a": {"planets": planets_a, "houses": houses_a},
#         "person_b": {"planets": planets_b, "houses": houses_b},
#         "aspects": aspects,
#         "compatibility_score": score,
#         "analysis_report": analysis_report,   # ngắn gọn
#         "detailed_report": detailed_report   # dài chi tiết + nhận xét
#     }







import httpx
from datetime import datetime
from app.schemas.AstroDTO import AstroRequestDTO
from app.models.AstroModel import AstroMatchResult
from app.core.astro_config import VEDIC_ASTRO_API_KEY  # api key trực tiếp

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
