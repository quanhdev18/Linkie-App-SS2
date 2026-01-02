from app.enum.package_permissions import PACKAGE_PERMISSIONS

def user_can_see_photos(package):
    if not package:
        return False  # FREE user
    package_name = package.name.lower()
    return PACKAGE_PERMISSIONS.get(package_name, {}).get("see_photos", False)
