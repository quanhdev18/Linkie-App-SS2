import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";

function getCroppedImg(imageSrc: string, crop: { x: number; y: number }, zoom: number) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");

      // Crop theo pixel
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      const cropWidth = naturalWidth / zoom;
      const cropHeight = naturalHeight / zoom;

      const sx = (crop.x / 100) * naturalWidth;
      const sy = (crop.y / 100) * naturalHeight;

      // Canvas đầu ra
      const outputSize = 300;
      canvas.width = outputSize;
      canvas.height = outputSize;

      ctx.drawImage(
        image,
        sx, sy, cropWidth, cropHeight,
        0, 0, outputSize, outputSize
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };

    image.onerror = () => reject("Failed to load image");
  });
}



export const CropModal = ({ imageSrc, onCancel, onConfirm }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleConfirm = async () => {
    const croppedImage = await getCroppedImg(imageSrc, crop, zoom);
    onConfirm(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-11/12 max-w-md flex flex-col items-center">
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <Button onClick={onCancel}>Huỷ</Button>
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
};
