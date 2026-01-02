// Tệp: src/pages/VerificationPage.tsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// Import hàm API bạn vừa tạo
import { requestVerification } from "@/services/api";

// --- CÁC TƯ THẾ YÊU CẦU ---
// Bạn có thể thêm ảnh mẫu (ví dụ: /images/poses/peace.png) nếu muốn
const POSES = [
  {
    key: "peace_sign",
    instruction: "Giơ 2 ngón tay (dấu V)",
  },
  {
    key: "hand_on_chin",
    instruction: "Đặt tay lên cằm",
  },
  {
    key: "wave_hand",
    instruction: "Vẫy tay",
  },
];

// --- HÀM HELPER CHUYỂN DATA URL (từ canvas) SANG BLOB ---
const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid data URL");

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const VerificationPage = () => {
  // Chọn 1 tư thế ngẫu nhiên khi tải trang
  const [pose] = useState(POSES[Math.floor(Math.random() * POSES.length)]);
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Khởi động camera khi trang được tải
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Lỗi mở camera:", err);
        setError("Không thể truy cập camera. Vui lòng cấp quyền.");
      }
    };
    startCamera();

    // Tắt camera khi rời khỏi trang
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Chụp ảnh
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Đặt kích thước canvas bằng kích thước video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Lật ngược ảnh (camera selfie thường bị ngược)
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      // Vẽ video vào canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Lấy ảnh dưới dạng data URL (định dạng JPEF)
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
    }
  };

  // 3. Gửi ảnh lên backend
  const handleSubmit = async () => {
    if (!capturedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Lấy account_id từ localStorage (Dựa theo AuthResponse của bạn)
      const accountId = localStorage.getItem("account_id"); 
      if (!accountId) {
        throw new Error("Không tìm thấy account_id. Vui lòng đăng nhập lại.");
      }

      // Chuyển ảnh từ data URL (Base64) sang File
      const blob = dataURLtoBlob(capturedImage);
      const file = new File([blob], "verification.jpg", { type: "image/jpeg" });

      // Gọi API
      await requestVerification(accountId, pose.key, file);
      
      toast({
        title: "Gửi xác thực thành công!",
        description: "Vui lòng chờ admin duyệt hồ sơ của bạn.",
        variant: "success",
      });

      // Quay lại trang profile
      navigate(-1); 

    } catch (err: any) {
      console.error("Lỗi gửi xác thực:", err);
      const errMessage = err.response?.data?.detail || err.message || "Gửi ảnh thất bại. Vui lòng thử lại.";
      setError(errMessage);
      toast({
        title: "Gửi xác thực thất bại",
        description: errMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Xác thực hồ sơ
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* --- GIAI ĐOẠN 1: CHỤP ẢNH --- */}
        {!capturedImage && (
          <>
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
              <p className="font-semibold">Yêu cầu:</p>
              <p className="text-gray-700 text-lg">
                Hãy bắt chước tư thế: **{pose.instruction}**
              </p>
            </div>

            <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
                style={{ transform: "scaleX(-1)" }} // Lật video cho giống gương
              />
              {/* Canvas dùng để chụp, được ẩn đi */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <Button
              onClick={handleCapture}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold mt-6 h-12 text-base"
            >
              Chụp ảnh
            </Button>
          </>
        )}

        {/* --- GIAI ĐOẠN 2: XÁC NHẬN --- */}
        {capturedImage && (
          <>
            <p className="text-center text-lg mb-4">Ảnh bạn vừa chụp:</p>
            <img 
              src={capturedImage} 
              alt="Preview" 
              className="w-full aspect-square object-cover rounded-lg" 
            />
            
            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => setCapturedImage(null)} // Quay lại để chụp
                disabled={isLoading}
                variant="outline"
                className="w-1/2 py-3 rounded-lg font-semibold h-12 text-base"
              >
                Chụp lại
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-1/2 bg-green-500 text-white py-3 rounded-lg font-semibold h-12 text-base"
              >
                {isLoading ? "Đang xử lý..." : "Gửi đi"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;