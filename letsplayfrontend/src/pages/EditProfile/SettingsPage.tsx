import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PasswordModal from "../Home/components/PasswordModal";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [connectionType, setConnectionType] = useState("Date");
  const [snoozeMode, setSnoozeMode] = useState(false);
  const [ageRange, setAgeRange] = useState([21, 30]);
  const [location, setLocation] = useState("Hanoi");
  const [language, setLanguage] = useState("English (United States)");
  const [passwordModal, setPasswordModal] = useState(false);

  return (
    // <div className="flex flex-col h-screen bg-white overflow-hidden">
    <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
       <header className="sticky top-0 z-10 w-full h-20 flex items-center justify-center border-b bg-white">
        <div className="text-yellow-500 font-bold text-xl">Cài đặt</div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:text-red-500 transition absolute right-5"
          onClick={() => navigate("/home", { state: { resetSidebar: true } })}
        />
      </header>

      {/* Nội dung có scroll */}
      <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
          {/* Type of Connection */}
          <section className="w-full max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Loại kết nối
            </label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Date">Tình yêu</option>
              <option value="Friend">Bạn bè</option>
              <option value="Business">Công việc</option>
            </select>
          </section>

          {/* Snooze Mode */}
          <section className="flex items-center justify-between mt-6 w-full max-w-md mx-auto">
            <div>
              <p className="font-medium text-gray-700">Chế độ đóng băng (coming soon...)</p>
              <p className="text-sm text-gray-500">
                Bật tính năng này sẽ ẩn bạn khỏi các chế độ của Linkie
              </p>
            </div>
            <Switch checked={snoozeMode} onCheckedChange={setSnoozeMode} />
          </section>

          {/* Enable Passkey */}
          <section className="flex items-center justify-between mt-6 w-full max-w-md mx-auto">
            <span className="font-medium text-gray-700">Mật khẩu (coming soon...)</span>
            <Switch checked={passwordModal} onCheckedChange={() => setPasswordModal(true)} />

          </section>

          {/* Filter */}
          <section className="mt-8 w-full max-w-md mx-auto">
            <h2 className="font-semibold text-gray-800 mb-3">Bộ lọc</h2>
              <p className="text-sm text-gray-600 mb-2">
                Bạn muốn hẹn hò với ai?
              </p>
            <div className="flex gap-2 mb-3">
              {["Nữ", "Nam", "Mọi người"].map((opt) => (
                <button
                  key={opt}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    opt === "Nữ"
                      ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Tuổi: giữa {ageRange[0]} và {ageRange[1]}
              </p>
              <Slider
                min={18}
                max={60}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
            </div>
          </section>

          {/* Advanced Filters */}
          <section className="mt-8 w-full max-w-md mx-auto">
            <h2 className="font-semibold text-gray-800">Mở rộng filter</h2>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </section>

          {/* Notifications */}
          <section className="mt-8 w-full max-w-md mx-auto">
            <h2 className="font-semibold text-gray-800">Cài đặt thông báo</h2>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </section>

          {/* Location */}
          <section className="mt-8 w-full max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vị trí
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-full px-4 py-2"
            />
          </section>

          {/* Language */}
          <section className="mt-8 w-full max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngôn ngữ
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded-full px-4 py-2 text-gray-700"
            >
              <option>Tiếng anh </option>
              <option>Tiếng việt</option>
            </select>
          </section>

          {/* Buttons */}
          <section className="flex flex-col space-y-3 pt-8 pb-10 w-full max-w-md mx-auto">
            <Button
              onClick={() => navigate("/")}
              className="w-full rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Đăng xuất
            </Button>
            <Button
              variant="destructive"
              className="w-full rounded-full bg-red-500 hover:bg-red-600"
            >
              Xóa tài khoản
            </Button>
          </section>

          {/* Footer */}
          <div className="flex justify-center items-center mt-6 text-gray-400 text-sm pb-10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
              alt="bumble"
              className="w-5 h-5 mr-2"
            />
            Tạo bởi Quang Anh ❤️ 
          </div>
        </div>
      </main>
      <PasswordModal
        visible={passwordModal}
        onClose={() => setPasswordModal(false)}
        onSubmit={(pwd) => {
          console.log("Mật khẩu mới:", pwd);
          // TODO: Gửi API đổi mật khẩu tại đây
        }}
      />

    </div>
  );
};

export default SettingsPage;
