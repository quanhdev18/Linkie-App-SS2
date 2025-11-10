# app/routers/admin_controller.py
from fastapi import APIRouter, Depends
from app.security.AuthDependency import require_role
from app.models.UserModel import Account

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/dashboard")
def admin_dashboard(current_admin: Account = Depends(require_role("ADMIN"))):
    return {"message": f"Welcome admin {current_admin.email}!"}
