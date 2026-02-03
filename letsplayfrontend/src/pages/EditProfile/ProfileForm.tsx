
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  uploadProfileImage,
  getProfileImage,
  getProfileById,
  updateProfile,
  deleteProfileImage,
  uploadAvatar,
  getAvatarImage,
  deleteAvatarImage,
  getVerifyStatus,
  getLocationByAccountId,
  getLocationName,
  updateLocation,
  requestPose,
} from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import qrImage from "@/assets/image/qrtest.png";

const GENDER_OPTIONS = { male: "Nam", female: "Nữ" };
const HOBBY_OPTIONS = {
  listening_to_music: "Nghe nhạc",
  singing: "Hát",
  playing_guitar: "Chơi guitar",
  running: "Chạy bộ",
  yoga: "Yoga",
  reading: "Đọc sách",
  cooking: "Nấu ăn",
  photography: "Chụp ảnh",
  traveling: "Du lịch",
  video_games: "Chơi game",
  dog_lover: "Yêu chó",
  meditation: "Thiền",
  fashion: "Thời trang",
  blogging: "Viết blog",
};

const PURPOSE_OPTIONS = [
  "Người yêu",
  "Một người bạn đời",
  "Quan hệ không ràng buộc",
  "Những người bạn mới",
  "Mình cũng chưa rõ lắm",
];

const ZODIAC_OPTIONS = {
  aries: "Bạch Dương",
  taurus: "Kim Ngưu",
  gemini: "Song Tử",
  cancer: "Cự Giải",
  leo: "Sư Tử",
  virgo: "Xử Nữ",
  libra: "Thiên Bình",
  scorpio: "Bọ Cạp",
  sagittarius: "Nhân Mã",
  capricorn: "Ma Kết",
  aquarius: "Bảo Bình",
  pisces: "Song Ngư",
};

const BasicInfoItem = ({ label, value, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
  >
    <span className="text-sm font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 truncate max-w-[140px]">
        {value || "Chưa chọn"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </div>
  </div>
);

const PhotoSlot = ({ src, onAdd, onRemove, onPreview }) => (
  <div className="relative aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
    {src ? (
      <>
        <img
          src={src}
          alt="profile"
          className="w-full h-full object-cover cursor-pointer"
          onClick={onPreview} // 👈 thêm dòng này
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 bg-white rounded-full shadow hover:bg-gray-100 flex items-center justify-center w-7 h-7"
        >
          <FontAwesomeIcon icon={faXmark} className="text-gray-600 w-4 h-4" />
        </button>
      </>
    ) : (
      <button onClick={onAdd}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    )}
  </div>
);

const ProfileForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [hobby, setHobby] = useState<string[]>([]);
  const [purpose, setPurpose] = useState("");
  const [modalField, setModalField] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  const [height, setHeight] = useState<number | "">("");
  const [zodiac, setZodiac] = useState<string>("");

  const [job, setJob] = useState("");        // chỉ text
  const [education, setEducation] = useState(""); // chỉ text
  const [profileLoaded, setProfileLoaded] = useState(false);
  const MODAL_TITLE: Record<string, string> = {
    gender: "giới tính",
    hobby: "sở thích",
    purpose: "mục đích hẹn hò",
    height: "chiều cao",
    zodiac: "cung hoàng đạo",
    job: "công việc",
    education: "học vấn",
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("profile_id");
        const accountId = localStorage.getItem("account_id");
        if (!id) throw new Error("Không tìm thấy profile_id");
        setProfileId(id);
        // if (!accountId) throw new Error("Không tìm thấy account_id");
        setAccountId(accountId);
        const data = await getProfileById(id);
        setBio(data.bio || "");
        setGender(GENDER_OPTIONS[data.gender] || "");
        setHobby((data.hobby || []).map((key) => HOBBY_OPTIONS[key]));
        setPurpose(data.target_type || "");
        setEmail(data.email);
        setHeight(data.height || "");
        setZodiac(data.zodiac_sign || "");
        setJob(data.job || "");
        setEducation(data.education || "");

        const urls = [];
        if (data.images?.length) {
          for (const img of data.images) {
            const url = await getProfileImage(img.title);
            urls.push({ uri: url, id: img.id });
          }
        }
        setPhotos([...urls, ...Array(6 - urls.length).fill(null)]);

        if (data?.avatar?.id) {
          setAvatarUri(getAvatarImage(data.avatar.id));
          setAvatarId(data.avatar.id);
        } else {
          setAvatarUri(null);
          setAvatarId(null);
        }

        const verify = await getVerifyStatus(id);
        setIsVerified(verify.is_verified);
        setProfileLoaded(true);
      } catch (e) {
        toast({
          title: "Lỗi tải hồ sơ",
          description: e.message,
          variant: "destructive",
        });

      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const accountId = localStorage.getItem("account_id");
      if (!accountId) return;
      const loc = await getLocationByAccountId(accountId);
      if (loc) {
        setLocation({ latitude: loc.latitude, longitude: loc.longitude });
        const name = await getLocationName(loc.latitude, loc.longitude);
        setLocationName(name);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (!profileLoaded) return; // đợi load xong mới check

    if (!avatarUri) {
      toast({
        title: "Chưa có ảnh đại diện",
        description: "Vui lòng thêm ảnh đại diện để xác minh tài khoản",
        variant: "warning",
      });
    }
  }, [avatarUri, profileLoaded]);

  const handleRequestPose = async () => {
    try {
      const accountId = localStorage.getItem("account_id");
      if (!accountId) throw new Error("Không tìm thấy account_id");

      // Gọi API lấy pose
      const pose = await requestPose(accountId);
      // response phải trả về { pose_key, pose_sample_image }

      navigate("/verify-camera", {
        state: {
          poseKey: pose.pose_key,
          poseImage: pose.pose_sample_image,
          accountId,
        },
      });
    } catch (err) {
      toast({
        title: "Lỗi lấy pose",
        description: err.message,
        variant: "destructive",
      });
    }
  };


  const pickAvatar = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        if (!accountId) throw new Error("Không tìm thấy profile_id");

        // Gọi API upload avatar theo account_id (sử dụng profileId)
        await uploadAvatar(accountId, file);

        toast({ title: "Tải ảnh đại diện thành công!", variant: "success" });
        window.location.reload();
      } catch (err: any) {
        toast({
          title: "Lỗi upload avatar",
          description: err.message,
          variant: "destructive",
        });
      }
    };
    input.click();
  };

  const removeAvatar = async () => {
    if (!avatarId) return;
    try {
      await deleteAvatarImage(avatarId);
      setAvatar(null);
      setAvatarId(null);
      toast({ title: "Đã xoá ảnh đại diện" });
    } catch (e) {
      toast({
        title: "Lỗi xoá ảnh đại diện",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const pickImage = async (index: number) => {
    if (!profileId) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        try {
          await uploadProfileImage(profileId, [file]);
          toast({ title: "Tải ảnh lên thành công!", variant: "success" });
          window.location.reload();
        } catch (err) {
          toast({
            title: "Lỗi upload ảnh",
            description: err.message,
            variant: "destructive",
          });
        }
      }
    };
    input.click();
  };

  const removePhoto = async (index: number) => {
    const photo = photos[index];
    if (!photo?.id) return;
    try {
      await deleteProfileImage(photo.id);
      const newList = [...photos];
      newList[index] = null;
      setPhotos(newList);
      toast({ title: "Đã xoá ảnh" });
    } catch (e) {
      toast({
        title: "Lỗi xoá ảnh",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const saveProfile = async () => {
    if (!profileId) return;
    try {
      const payload = {
        bio,
        gender: Object.keys(GENDER_OPTIONS).find(k => GENDER_OPTIONS[k] === gender),
        target_type: purpose,
        hobby: hobby.map((vi) => Object.keys(HOBBY_OPTIONS).find(k => HOBBY_OPTIONS[k] === vi)),
        // height,
        // zodiac_sign: zodiac,
        // job,
        // education
        height: height === "" ? null : height,
        zodiac_sign: zodiac === "" ? null : zodiac,
        job: job === "" ? null : job,
        education: education === "" ? null : education,

      };
      await updateProfile(profileId, payload);


      await updateProfile(profileId, payload);
      toast({ title: "Cập nhật thành công!", variant: "success" });
    } catch (e) {
      toast({
        title: "Lỗi cập nhật",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const openModal = (field: string) => {
    setModalField(field);
    setModalVisible(true);
  };

  const handleSelectValue = (value) => {
    if (modalField === "gender") setGender(value);
    if (modalField === "purpose") setPurpose(value);
    if (modalField === "hobby") {
      setHobby((prev) =>
        prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
      );
    }
    if (modalField === "height") setHeight(Number(value));
    if (modalField === "zodiac") setZodiac(value);
    if (modalField === "job") setJob(value);
    if (modalField === "education") setEducation(value);
  };

  const handleUpdateLocation = async () => {
    if (!navigator.geolocation) {
      toast({ title: "Trình duyệt không hỗ trợ vị trí", variant: "destructive" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const accountId = localStorage.getItem("account_id");
        if (!accountId) return;

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          await updateLocation(accountId, lat, lng);
          setLocation({ latitude: lat, longitude: lng });

          const name = await getLocationName(lat, lng);
          setLocationName(name);

          toast({
            title: "Cập nhật vị trí mới thành công",
            description: name,
            variant: "success",
          });
        } catch (err: any) {
          toast({
            title: "Lỗi cập nhật vị trí",
            description: err.message,
            variant: "destructive",
          });
        }
      },

    );
  };

  if (!profileLoaded) {
    return (
      // <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
      //   Đang tải nội dung...
      // </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGQxZnZubG85cjV2bHNrdDk4bWEyYXd2ejQzdDgyZDdremFjcXB0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/qutWTSucYBUOcVtD3N/giphy.gif"
          alt="loading"
          className="w-40 h-40 object-contain"
        />
        <p className="mt-4 text-gray-500 text-lg font-medium">
          Hà Nội không vội được đâu
        </p>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full h-20 flex items-center justify-center border-b bg-white">
        <div className="text-yellow-500 font-bold text-xl">Hồ sơ hẹn hò</div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:text-red-500 transition absolute right-5"
          onClick={() => navigate("/home", { state: { resetSidebar: true } })}
        />
      </header>

      <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
          {/* Ảnh */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex gap-3">
              {/* Avatar riêng */}
              <div className="flex-[2.1] ">
                <PhotoSlot
                  src={avatarUri}
                  onAdd={pickAvatar}
                  onRemove={removeAvatar}
                  onPreview={() => {
                    if (avatarUri) {
                      setPreviewIndex(-1);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
              </div>

              {/* Ảnh profile đầu tiên và thứ 2 */}
              <div className="flex-[1] grid grid-cols-1 gap-3">
                <PhotoSlot
                  src={photos[0]?.uri}
                  onAdd={() => pickImage(0)}
                  onRemove={() => removePhoto(0)}
                  onPreview={() => {
                    if (photos[0]?.uri) {
                      setPreviewIndex(0);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
                <PhotoSlot
                  src={photos[1]?.uri}
                  onAdd={() => pickImage(1)}
                  onRemove={() => removePhoto(1)}
                  onPreview={() => {
                    if (photos[1]?.uri) {
                      setPreviewIndex(1);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
              </div>
            </div>

            {/* Hàng 3 ảnh profile còn lại */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {photos.slice(2, 5).map((p, i) => (
                <PhotoSlot
                  key={i + 2}
                  src={p?.uri}
                  onAdd={() => pickImage(i + 2)}
                  onRemove={() => removePhoto(i + 2)}
                  onPreview={() => {
                    if (p?.uri) {
                      setPreviewIndex(i + 2);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
              ))}
            </div>
            <p className="text-s text-yellow-500 text-center pt-5">
    Thêm 1 ảnh đại diện và 5 ảnh hồ sơ!
  </p>


            <button
              onClick={() => navigate("/profile/preview")}
              className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50"
            >
              Xem trước hồ sơ →
            </button>

            <h2 className="text-lg font-semibold  mt-5">Xác thực</h2>

            <button
              onClick={isVerified ? undefined : handleRequestPose} // nếu đã verify thì không click được
              className={`mt-4 w-full border rounded-full py-3 font-medium 
                ${isVerified ? "bg-green-500 text-white cursor-not-allowed" : "hover:bg-gray-50"}`}
            >
              {isVerified ? "Hồ sơ đã xác thực ✔" : "Xác thực hồ sơ"}
            </button>


            <h2 className="text-lg font-semibold  mt-5">Vị trí</h2>
            {/* <button className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50">
              Cập nhật ví trị
            </button> */}
            <button
              onClick={handleUpdateLocation}
              className={`mt-4 w-full border rounded-full py-3 font-medium 
    ${location ? "bg-green-500 text-white" : "hover:bg-gray-50"}`}
            >
              {location ? `Vị trí: ${locationName}` : "Cập nhật vị trí"}
            </button>

          </div>

          {/* Bio */}
          <div className="mt-5 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-5">Giới thiệu bản thân</h2>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg"
              placeholder="Viết gì đó về bạn..."
            />
          </div>

          {/* Thông tin cơ bản */}
          <section className="mt-5 max-w-md mx-auto space-y-2">
            <h2 className="text-lg font-semibold mb-5">Thông tin cơ bản</h2>
            <BasicInfoItem
              label="Giới tính"
              value={gender}
              onClick={() => openModal("gender")}
            />
            <BasicInfoItem
              label="Sở thích"
              value={hobby.join(", ")}
              onClick={() => openModal("hobby")}
            />
            <BasicInfoItem
              label="Mục đích hẹn hò"
              value={purpose}
              onClick={() => openModal("purpose")}
            />
            <BasicInfoItem
              label="Cung hoàng đạo"
              value={ZODIAC_OPTIONS[zodiac] || "Chưa thêm"}
              onClick={() => openModal("zodiac")}
            />
            <BasicInfoItem
              label="Chiều cao (cm)"
              value={height ? `${height} cm` : "Chưa thêm"}
              onClick={() => openModal("height")}
            />

          </section>

          <section className="mt-5 max-w-md mx-auto space-y-2">
            <h2 className="text-lg font-semibold mb-5">Công việc và học vấn</h2>
            <BasicInfoItem
              label="Công việc"
              value={job || "Chưa thêm"}
              onClick={() => openModal("job")}
            />
            <BasicInfoItem
              label="Học vấn"
              value={education || "Chưa thêm"}
              onClick={() => openModal("education")}
            />
          </section>

          {/* Nút lưu */}
          <div className="mt-10 mb-4 pb-10">
            <Button
              onClick={saveProfile}
              className="w-60 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full shadow-lg flex mx-auto"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </main>

      {modalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md sm:max-w-lg md:max-w-xl shadow-xl">
            {/* <h2 className="text-xl font-semibold mb-4 capitalize text-center">
              Chọn {modalField === "gender"
                ? "giới tính"
                : modalField === "purpose"
                  ? "mục đích hẹn hò"
                  : "sở thích"}
            </h2> */}
            <h2 className="text-xl font-semibold mb-4 capitalize text-center">
              Thêm {MODAL_TITLE[modalField]}
            </h2>


            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {modalField === "gender" &&
                Object.values(GENDER_OPTIONS).map((opt) => (
                  <Button
                    key={opt}
                    onClick={() => {
                      handleSelectValue(opt);
                      setModalVisible(false);
                    }}
                    variant={gender === opt ? "default" : "outline"}
                    className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
                  >
                    {opt}
                  </Button>
                ))}

              {modalField === "purpose" &&
                PURPOSE_OPTIONS.map((opt) => (
                  <Button
                    key={opt}
                    onClick={() => {
                      handleSelectValue(opt);
                      setModalVisible(false);
                    }}
                    variant={purpose === opt ? "default" : "outline"}
                    className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
                  >
                    {opt}
                  </Button>
                ))}

              {modalField === "hobby" &&
                Object.values(HOBBY_OPTIONS).map((opt) => (
                  <Button
                    key={opt}
                    onClick={() => handleSelectValue(opt)}
                    variant={hobby.includes(opt) ? "default" : "outline"}
                    className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
                  >
                    {opt}
                  </Button>
                ))}

              {(modalField === "height") && (
                <input
                  type="number"
                  value={height || ""}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập chiều cao"
                />
              )}

              {modalField === "job" && (
                <input
                  type="text"
                  value={job || ""}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập công việc"
                />
              )}

              {modalField === "education" && (
                <input
                  type="text"
                  value={education || ""}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập học vấn"
                />
              )}


              {modalField === "zodiac" && Object.entries(ZODIAC_OPTIONS).map(([key, label]) => (
                <Button
                  key={key}
                  onClick={() => {
                    handleSelectValue(key);
                    setModalVisible(false);
                  }}
                  variant={zodiac === key ? "default" : "outline"}
                  className="w-full py-3"
                >
                  {label}
                </Button>
              ))}

            </div>

            <Button
              onClick={() => setModalVisible(false)}
              className="mt-5 w-40 py-3 text-base bg-gray-200 hover:bg-gray-300 text-gray-800 justify-center items-center mx-auto justify-self-center items-center flex"
            >
              Đóng
            </Button>
          </div>
        </div>
      )}

      {isPreviewOpen && previewIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center">
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300"
          >
            ×
          </button>

          <div className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]">
            {/* Nút trái */}
            <button
              onClick={() => setPreviewIndex((prev) =>
                prev > 0 ? prev - 1 : photos.filter(p => p?.uri).length - 1
              )}
              className="absolute left-[-60px] text-white text-3xl font-bold hover:text-gray-400"
            >
              ‹
            </button>

            {/* Ảnh chính */}
            {/* <img
              src={photos[previewIndex]?.uri}
              alt="preview"
              className="max-h-[90vh] max-w-[80vw] object-contain rounded-lg shadow-lg"
            /> */}
            <div className="aspect-[3/4] w-[400px] h-[650px] flex items-center justify-center bg-black rounded-lg overflow-hidden shadow-lg">
              {/* <img
                src={photos[previewIndex]?.uri}
                alt="preview"
                className="h-full object-cover"
              /> */}
              <img
                src={previewIndex === -1 ? avatar : photos[previewIndex]?.uri}
                alt="preview"
                className="h-full object-cover"
              />

            </div>


            {/* Nút phải */}
            <button
              onClick={() => setPreviewIndex((prev) =>
                prev < photos.filter(p => p?.uri).length - 1 ? prev + 1 : 0
              )}
              className="absolute right-[-60px] text-white text-3xl font-bold hover:text-gray-400"
            >
              ›
            </button>
          </div>

          {/* Dãy thumbnail */}
          <div className="flex mt-6 gap-2 overflow-x-auto max-w-[90vw]">
            {photos.map((p, i) =>
              p?.uri ? (
                <img
                  key={i}
                  src={p.uri}
                  onClick={() => setPreviewIndex(i)}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer ${i === previewIndex ? "ring-2 ring-yellow-400" : ""}`}
                />
              ) : null
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileForm;