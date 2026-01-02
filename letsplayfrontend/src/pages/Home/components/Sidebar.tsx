import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatchQueue from "./MatchQueue";
import MessageList from "./MessageList";
import { getProfileById, getAvatarImage, getUserDailyStatus } from "../../../services/api";
import userAvatar from "../../../assets/image/image.png";
import { ArrowLeft } from "lucide-react";
import DailyStatusBubble from "../components/DailyStatusBubble";
import DailyStatusModal from "../components/DailyStatusModal";


const Sidebar: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [dailyStatus, setDailyStatus] = useState<any>(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const userId = localStorage.getItem("account_id");
        console.log("🔥 user_id from localStorage =", userId);

        if (!userId) {
          console.warn("❌ Không có user_id trong localStorage");
          return;
        }

        const data = await getUserDailyStatus(Number(userId));
        console.log("🔥 daily status API result =", data);

        if (data && data.content) {
          setDailyStatus(data);
        } else {
          setDailyStatus(null);
        }
      } catch (err) {
        console.error("❌ fetchStatus error", err);
        setDailyStatus(null);
      }
    };


    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const idStr = localStorage.getItem("profile_id");
        if (!idStr) throw new Error("Chưa có profile_id trong localStorage");
        const profileId = parseInt(idStr, 10);
        const data = await getProfileById(profileId);
        setProfile(data);

        if (data?.avatar?.id) {
          setAvatarUri(getAvatarImage(data.avatar.id));
        } else {
          setAvatarUri(null);
        }
      } catch (err) {
        console.error("Lỗi khi tải profile:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    // Danh sách các trang cần hiển thị Sidebar kiểu Menu Profile
    const profileRoutes = ["/profile", "/settings", "/contact"];

    if (profileRoutes.includes(currentPath)) {
      // Nếu đang ở profile, settings, contact -> Bật Menu Profile
      setIsProfileMenu(true);
    } else if (currentPath === "/home") {
      // Nếu ở Home -> Tắt Menu Profile (về mặc định)
      setIsProfileMenu(false);
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   // Kiểm tra nếu điều hướng đến /home và có state resetSidebar
  //   if (location.pathname === "/home" && location.state?.resetSidebar) {
  //     setIsProfileMenu(false);
  //   }
  // }, [location]);

  // 👉 Khi click avatar: mở giao diện menu profile
  const handleAvatarClick = () => {
    setIsProfileMenu(true);
    navigate("/profile");
  };

  // 👉 Khi nhấn back: trở về sidebar gốc
  const handleBack = () => {
    setIsProfileMenu(false);
    navigate("/home");
  };

  // 👉 Nếu đang trong giao diện Profile menu
  if (isProfileMenu) {
    return (
      <aside className="flex flex-col h-screen bg-white border-r items-center  w-[320px]">
        {/* Back + Avatar */}
        {/* Back + Avatar (đồng bộ style với phần avatar chính) */}
        <div className="flex items-center gap-3 p-4 h-20 w-full ">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-1 items-center justify-center">
            <img
              src={avatarUri || userAvatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border"
            />
          </div>

          {/* Giữ khoảng trống cân đối như phần avatar có text */}
          <div className="w-8" />
        </div>

        {/* Gói nâng cấp */}
        <div className="flex flex-col items-center space-y-3 w-full px-6 pt-4">
          <h1>Nâng cấp ngay</h1>

          {[
            { name: "Newbie", emoji: "⭐" },
            { name: "Plus", emoji: "⭐" },
            { name: "Boost", emoji: "⚡" },
            { name: "Premium", emoji: "⚡" },
          ].map((pkg) => (
            <button
              key={pkg.name}
              onClick={() =>
                navigate("/spotlight-payment", { state: { planName: pkg.name } })
              }
              className={`w-full font-medium py-2 rounded-full flex items-center justify-center gap-2 hover:opacity-80 transition
                ${pkg.name === "Boost"
                  ? "bg-cyan-50 text-cyan-700"
                  : pkg.name === "Premium"
                    ? "bg-gray-100 text-gray-700"
                    : pkg.name === "Plus"
                      ? "bg-pink-100 text-pink-700" // 🌸 màu hồng nhạt cho Plus
                      : "bg-yellow-50 text-yellow-700"
                }`}
            >
              <span>{pkg.emoji}</span> {pkg.name}
            </button>
          ))}
        </div>

        {/* Menu dưới */}
        <div className="flex flex-col items-center space-y-4 mt-8 text-sm font-medium text-gray-700">
          <button
            onClick={() => navigate("/profile")}
            className={`${location.pathname === "/profile"
              ? "text-black font-semibold underline decoration-yellow-500 underline-offset-4"
              : "hover:text-black"
              }`}
          >
            Cập nhật hồ sơ
          </button>

          <button
            onClick={() => navigate("/advice")}
            className={`${location.pathname === "/advice"
              ? "text-black font-semibold underline decoration-yellow-500 underline-offset-4"
              : "hover:text-black"
              }`}
          >
            Tip hẹn hò
          </button>

          <button
            onClick={() => navigate("/settings")}
            className={`${location.pathname === "/settings"
              ? "text-black font-semibold underline decoration-yellow-500 underline-offset-4"
              : "hover:text-black"
              }`}
          >
            Cài đặt
          </button>

          <button
            onClick={() => navigate("/contact")}
            className={`${location.pathname === "/contact"
              ? "text-black font-semibold underline decoration-yellow-500 underline-offset-4"
              : "hover:text-black"
              }`}
          >
            Liên hệ
          </button>

          <button
            onClick={() => {
              // localStorage.removeItem("access_token");
              // localStorage.removeItem("profile_id");
              // localStorage.removeItem("user_id");
              // localStorage.removeItem("role");
              // navigate("/");
              localStorage.clear();
              window.location.href = "/";
            }}
            className="hover:text-black"
          >
            Đăng xuất
          </button>
        </div>

      </aside>
    );
  }

  // 👉 Giao diện sidebar mặc định
  return (
    <aside
      className={`flex flex-col h-screen bg-white border-r transition-all duration-300 
      w-20 md:w-[320px] sm:w-20`}
    >
      {/* Profile */}
      <div className="block hover:bg-gray-50 w-full">
        <div className="flex items-center justify-between p-4 h-20">

          {/* Avatar + username */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleAvatarClick}
          >
            <img
              src={avatarUri || userAvatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="hidden md:block">
              <div className="text-sm font-semibold">
                {profile?.username || "Đang tải..."}
              </div>

              {typeof profile?.profile_age_days === "number" && (
                <div className="text-xs text-gray-400">
                  Hồ sơ đã hoạt động {profile.profile_age_days} ngày
                </div>
              )}
              <div className="text-xs text-gray-500 flex items-center gap-1"> <span className="w-2 h-2 bg-green-500 rounded-full block"></span> <span>Online</span> </div>
            </div>
          </div>

          {/* Daily status cloud */}
          <div className="hidden md:block">
            <DailyStatusBubble
              content={dailyStatus?.content}
              onClick={() => setOpenStatusModal(true)}
            />
          </div>

        </div>
      </div>


      {/* Match Queue */}
      <div className="px-4 py-3 hidden md:block">
        <div className="flex items-center gap-1 text-xs font-medium mb-4">
          <span>Tương tác mới</span>
          <span className="text-gray-500">({matchCount})</span>
        </div>
        <MatchQueue onMatchCountChange={setMatchCount} />
      </div>

      <div className="flex md:hidden justify-center items-center border-b py-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <MatchQueue limit={1} onMatchCountChange={setMatchCount} />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto hidden md:block">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium">Cuộc trò chuyện</div>
          </div>
          <MessageList />
        </div>
      </div>

      <div className="flex md:hidden justify-center items-center py-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <MessageList limit={1} compact />
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block p-4 text-xs text-gray-500 text-center">
        © 2025 Linkie - Quang Anh
      </div>
      <DailyStatusModal

        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        status={dailyStatus}
        onUpdated={async () => {
          const userId = localStorage.getItem("account_id");
          if (!userId) return;
          const data = await getUserDailyStatus(userId);
          setDailyStatus(data);
        }}
      />

    </aside>
  );
};

export default Sidebar;


