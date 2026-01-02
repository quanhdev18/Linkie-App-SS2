import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import { requestVerification } from "@/services/api";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const VerifyCamera: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { poseKey, poseImage, accountId } = state || {};

  const capture = () => {
    const imgSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imgSrc || null);
  };

  const submitVerification = async () => {
    if (!capturedImage) return;

    // Convert base64 → file
    const blob = await fetch(capturedImage).then((res) => res.blob());
    const file = new File([blob], "verify.jpg", { type: "image/jpeg" });

    await requestVerification(accountId, poseKey, file);

    alert("Gửi xác thực thành công!");
    navigate("/profile");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ảnh pose mẫu */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3">Hãy tạo dáng giống ảnh mẫu</h3>
          <img
            src={poseImage}
            alt="pose"
            className="w-80 h-80 object-cover rounded-xl border"
          />
        </div>

        {/* Camera */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3">Camera</h3>

          {!capturedImage ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-xl border w-80 h-80 object-cover"
            />
          ) : (
            <img
              src={capturedImage}
              className="rounded-xl border w-80 h-80 object-cover"
            />
          )}

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            {!capturedImage ? (
              <button
                onClick={capture}
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full"
              >
                Chụp hình
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCapturedImage(null)}
                  className="px-6 py-3 bg-gray-300 rounded-full"
                >
                  Chụp lại
                </button>

                <button
                  onClick={submitVerification}
                  className="px-6 py-3 bg-green-600 text-white rounded-full"
                >
                  Gửi xác thực
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifyCamera;
