from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from app.security.SecurityConfig import settings

# Cấu hình SMTP connection từ .env
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    # VALIDATE_CERTS=True
    VALIDATE_CERTS=False
)


class EmailService:
    def __init__(self):
        self.mailer = FastMail(conf)

    # async def send_simple_message(self, to: EmailStr, subject: str, text: str):
    #     message = MessageSchema(
    #         subject=subject,
    #         recipients=[to],
    #         body=text,
    #         subtype="plain"
    #     )
    #     await self.mailer.send_message(message)
    async def send_simple_message(self, to: EmailStr, subject: str, text: str):
        message = MessageSchema(
            subject=subject,
            recipients=[to],
            body=text,
            subtype="plain"
        )
        try:
            await self.mailer.send_message(message)
            print(f"✅ Email sent successfully to {to}")
        except Exception as e:
            print(f"❌ Failed to send email to {to}: {e}")


    async def send_email_otp(self, email: EmailStr, otp: int):
        subject = "Login OTP"
        text = f"Your login code is: {otp}"
        await self.send_simple_message(email, subject, text)
        
    async def send_invoice_email(self, email: EmailStr, package_name: str, amount: float):
        subject = "Linkie - Hóa đơn mua gói thành công 🎉"
        text = (
            f"Xin chào,\n\n"
            f"Cảm ơn bạn đã mua gói '{package_name}' trên Linkie.\n"
            f"Tổng tiền: {amount:,.0f} VND\n\n"
            "Chúc bạn có trải nghiệm tuyệt vời!\n"
            "— Đội ngũ Linkie ❤️"
        )
        await self.send_simple_message(email, subject, text)
