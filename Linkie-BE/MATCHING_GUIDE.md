# 🎯 Hướng dẫn sử dụng Matching System

## 📋 Tổng quan

Matching System là công cụ tự động đề xuất người dùng phù hợp dựa trên:
- Giới tính & Mục tiêu tìm kiếm (30%)
- Độ tuổi phù hợp (20%)
- Sở thích chung (35%)
- Bio tương đồng (15%)

---

## 🚀 Cài đặt

### 1. Thêm files vào project
```
app/
├── crud/
│   └── MatchingService.py          # Core matching logic
├── routers/
│   └── matching_router.py          # API endpoints
└── schemas/
    └── matching.py                 # Pydantic schemas
```

### 2. Import router vào main.py
```python
from app.routers import matching_router

app.include_router(matching_router.router)
```

### 3. Chạy migration (nếu cần)
Đảm bảo Profile model có đầy đủ các fields:
- `gender` (Enum)
- `target_type` (String) - VD: "male,female" hoặc "all"
- `date_of_birth` (Date)
- `hobby` (ARRAY of Enum)
- `bio` (Text)
- `avatar_id` (ForeignKey)

---

## 📡 API Endpoints

### 1. Lấy đề xuất người phù hợp
```http
GET /matching/recommendations/{user_id}?limit=20&min_score=30
```

**Query Parameters:**
- `limit`: Số lượng kết quả (1-50, mặc định 20)
- `min_score`: Điểm tối thiểu (0-100, mặc định 30)

**Response:**
```json
[
  {
    "account_id": 123,
    "username": "alice_nguyen",
    "age": 25,
    "gender": "FEMALE",
    "bio": "Yêu du lịch và ẩm thực...",
    "hobbies": ["TRAVEL", "COOKING", "READING"],
    "avatar": "https://...",
    "compatibility_score": 85.5,
    "image_count": 5
  }
]
```

### 2. Xem ai đã like bạn
```http
GET /matching/who-liked-me/{user_id}
```

**Response:**
```json
[
  {
    "account_id": 456,
    "username": "bob_tran",
    "age": 27,
    "gender": "MALE",
    "bio": "Software engineer...",
    "hobbies": ["SPORTS", "MUSIC"],
    "avatar": "https://...",
    "liked_at": "2025-01-15T10:30:00"
  }
]
```

### 3. User đang active gần đây
```http
GET /matching/recently-active/{user_id}?hours=24&limit=10
```

**Query Parameters:**
- `hours`: Khoảng thời gian active (1-168 giờ, mặc định 24)
- `limit`: Số lượng kết quả (1-30, mặc định 10)

### 4. Tìm theo sở thích
```http
GET /matching/by-hobby/{user_id}?hobby=TRAVEL&limit=20
```

**Query Parameters:**
- `hobby`: Tên hobby (phải match với HobbyEnum)
- `limit`: Số lượng kết quả (1-50, mặc định 20)

### 5. Debug - Kiểm tra mutual likes
```http
GET /matching/mutual-likes/{user_id}
```

Trả về các cặp đã like lẫn nhau nhưng chưa tạo Match.

### 6. Fix data - Tạo Match thiếu
```http
POST /matching/create-missing-matches/{user_id}
```

Tự động tạo Match cho các cặp mutual likes.

---

## 🔧 Thuật toán tính điểm

### Giới tính & Target Type (30 điểm)
```python
user.target_type = "female,male"  # Tìm cả nam và nữ
candidate.gender = "FEMALE"       # → +30 điểm

user.target_type = "all"          # Không giới hạn
candidate.gender = "MALE"         # → +30 điểm
```

### Độ tuổi (20 điểm)
```python
Chênh lệch ≤ 2 tuổi   → 20 điểm
Chênh lệch ≤ 5 tuổi   → 15 điểm
Chênh lệch ≤ 8 tuổi   → 10 điểm
Chênh lệch ≤ 12 tuổi  → 5 điểm
```

### Sở thích chung (35 điểm)
```python
≥ 5 hobbies chung  → 35 điểm
≥ 3 hobbies chung  → 25 điểm
≥ 2 hobbies chung  → 15 điểm
≥ 1 hobby chung    → 8 điểm
```

### Bio tương đồng (15 điểm)
```python
≥ 5 từ khóa chung  → 15 điểm
≥ 3 từ khóa chung  → 10 điểm
≥ 2 từ khóa chung  → 5 điểm
```

*Stop words (và, của, có, the, a, in...) được tự động loại bỏ*

---

## 💡 Ví dụ sử dụng

### Python/FastAPI
```python
from fastapi import Depends
from sqlalchemy.orm import Session

@router.get("/my-recommendations")
def get_my_matches(
    current_user: Account = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    matches = MatchingService.get_recommended_matches(
        db=db,
        user_id=current_user.id,
        limit=30,
        min_score=50.0  # Chỉ lấy match score ≥ 50
    )
    return matches
```

### JavaScript/React
```javascript
const fetchRecommendations = async (userId) => {
  const response = await fetch(
    `/matching/recommendations/${userId}?limit=20&min_score=40`
  );
  const data = await response.json();
  return data;
}

// Sử dụng