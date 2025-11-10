import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "@/services/api";
import defaultAvatar from "@/assets/image/image.png";

const UploadPhoto: React.FC = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<(string | null)[]>(Array(6).fill(null));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...photos];
    let insertIndex = 0;
    for (let i = 0; i < newPhotos.length && insertIndex < files.length; i++) {
      if (newPhotos[i] === null) {
        const url = URL.createObjectURL(files[insertIndex]);
        newPhotos[i] = url;
        insertIndex++;
      }
    }
    setPhotos(newPhotos);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    const filtered = newPhotos.filter((p) => p !== null);
    while (filtered.length < 6) filtered.push(null);
    setPhotos(filtered);
  };

  const handleNext = async () => {
    const validPhotos = photos.filter((p) => p !== null);
    if (validPhotos.length < 2) {
      alert("Hãy chọn ít nhất 2 ảnh!");
      return;
    }

    try {
      const profileId = localStorage.getItem("profile_id");
      if (!profileId) throw new Error("Không tìm thấy profile_id");

      await uploadProfileImage(profileId, validPhotos);
      navigate("/home");
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Không thể upload ảnh. Vui lòng thử lại.");
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ←
      </button>

      <h2 style={styles.title}>Thêm ảnh gần đây của bạn</h2>
      <p style={styles.subtitle}>Hãy thêm ít nhất 2 bức ảnh để bắt đầu.</p>

      <div style={styles.photosContainer}>
        {photos.map((photo, index) => (
          <div
            key={index}
            style={styles.photoBox}
            onClick={() => {
              if (!photo) {
                const input = document.getElementById(
                  `file-${index}`
                ) as HTMLInputElement;
                input?.click();
              }
            }}
          >
            {photo ? (
              <>
                <img src={photo} alt="uploaded" style={styles.photo} />
                <button
                  style={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                >
                  ×
                </button>
              </>
            ) : (
              <span style={styles.plusSign}>+</span>
            )}
            <input
              id={`file-${index}`}
              type="file"
              accept="image/*"
              multiple={false}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        ))}
      </div>

      <button
        style={{
          ...styles.btn,
          ...(photos.some((p) => p !== null) ? styles.activeBtn : {}),
        }}
        onClick={handleNext}
      >
        Tiếp theo
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 480,
    margin: "40px auto",
    padding: "0 16px",
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 22,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 24,
  },
  photosContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: 24,
  },
  photoBox: {
    width: "30%",
    aspectRatio: "1/1",
    backgroundColor: "#f7f7f7",
    border: "1px solid #ddd",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 32,
    color: "#999",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: "50%",
    color: "#fff",
    width: 22,
    height: 22,
    lineHeight: "22px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  btn: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    fontSize: 16,
    cursor: "not-allowed",
  },
  activeBtn: {
    backgroundColor: "#000",
    cursor: "pointer",
  },
};

export default UploadPhoto;
