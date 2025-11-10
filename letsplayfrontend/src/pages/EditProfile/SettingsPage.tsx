// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { ArrowLeft } from "lucide-react";

// const SettingsPage = () => {
//   const navigate = useNavigate();

//   const [connectionType, setConnectionType] = useState("Date");
//   const [snoozeMode, setSnoozeMode] = useState(false);
//   const [ageRange, setAgeRange] = useState([21, 30]);
//   const [location, setLocation] = useState("Hanoi");
//   const [language, setLanguage] = useState("English (United States)");

//   return (
//     <div className="flex flex-col h-screen bg-white">
//       {/* Header */}
//       <header className="sticky top-0 flex items-center justify-between border-b p-4 bg-white z-10">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/home")}
//             className="p-2 rounded-full hover:bg-gray-100"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <h1 className="text-lg font-semibold">Settings</h1>
//         </div>
//       </header>

//       {/* Nội dung chính */}
//       <main className="flex-1 overflow-y-auto px-6 py-6 space-y-8 max-w-xl mx-auto">

//         {/* Type of Connection */}
//         <section>
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Type of connection
//           </label>
//           <select
//             value={connectionType}
//             onChange={(e) => setConnectionType(e.target.value)}
//             className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           >
//             <option value="Date">Date</option>
//             <option value="Friend">Friend</option>
//             <option value="Business">Business</option>
//           </select>
//         </section>

//         {/* Snooze Mode */}
//         <section className="flex items-center justify-between">
//           <div>
//             <p className="font-medium text-gray-700">Snooze mode</p>
//             <p className="text-sm text-gray-500">
//               Turning this on will hide you from Bumble’s modes.
//             </p>
//           </div>
//           <Switch checked={snoozeMode} onCheckedChange={setSnoozeMode} />
//         </section>

//         {/* Enable Passkey */}
//         <section className="flex items-center justify-between">
//           <span className="font-medium text-gray-700">Enable passkey</span>
//           <Switch />
//         </section>

//         {/* Filter */}
//         <section>
//           <h2 className="font-semibold text-gray-800 mb-3">Filter</h2>
//           <div className="flex gap-2 mb-3">
//             {["Women", "Men", "Everyone"].map((opt) => (
//               <button
//                 key={opt}
//                 className={`px-4 py-2 rounded-full border text-sm ${
//                   opt === "Women"
//                     ? "bg-yellow-100 border-yellow-400 text-yellow-700"
//                     : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//           <div>
//             <p className="text-sm text-gray-600 mb-2">
//               Age: Between {ageRange[0]} and {ageRange[1]}
//             </p>
//             <Slider
//               min={18}
//               max={60}
//               step={1}
//               value={ageRange}
//               onValueChange={setAgeRange}
//             />
//           </div>
//         </section>

//         {/* Advanced Filters */}
//         <section>
//           <h2 className="font-semibold text-gray-800">Advanced filters</h2>
//           <p className="text-sm text-gray-500">Coming soon...</p>
//         </section>

//         {/* Notifications */}
//         <section>
//           <h2 className="font-semibold text-gray-800">Notification settings</h2>
//           <p className="text-sm text-gray-500">Coming soon...</p>
//         </section>

//         {/* Location */}
//         <section>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Location
//           </label>
//           <input
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full border rounded-full px-4 py-2"
//           />
//         </section>

//         {/* Language */}
//         <section>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Language
//           </label>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="w-full border rounded-full px-4 py-2 text-gray-700"
//           >
//             <option>English (United States)</option>
//             <option>Vietnamese</option>
//           </select>
//         </section>

//         {/* Buttons */}
//         <section className="flex flex-col space-y-3 pt-4">
//           <Button
//             onClick={() => navigate("/")}
//             className="w-full rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
//           >
//             Log out
//           </Button>
//           <Button
//             variant="destructive"
//             className="w-full rounded-full bg-red-500 hover:bg-red-600"
//           >
//             Delete account
//           </Button>
//         </section>

//         {/* Footer */}
//         <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
//             alt="bumble"
//             className="w-5 h-5 mr-2"
//           />
//           Created with ❤️ by Linkie
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SettingsPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { ArrowLeft } from "lucide-react";

// const SettingsPage = () => {
//     const navigate = useNavigate();

//     const [connectionType, setConnectionType] = useState("Date");
//     const [snoozeMode, setSnoozeMode] = useState(false);
//     const [ageRange, setAgeRange] = useState([21, 30]);
//     const [location, setLocation] = useState("Hanoi");
//     const [language, setLanguage] = useState("English (United States)");

//     return (
//         <div className="flex flex-col h-screen bg-white overflow-hidden">
//             {/* Header cố định */}
//             <header className="sticky top-0 z-10 flex items-center justify-between h-16 border-b bg-white px-5">
//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => navigate("/home")}
//                         className="p-2 rounded-full hover:bg-gray-100"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-gray-600" />
//                     </button>
//                     <h1 className="text-lg font-semibold">Settings</h1>
//                 </div>
//             </header>

//             {/* Nội dung có scroll */}
//             {/* <main className="flex-1 overflow-y-auto w-full flex justify-center">
//         <div className="w-full max-w-2xl p-6"> */}
//             <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
//                 <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">

//                     {/* Type of Connection */}
//                     <section>
//                         <label className="block text-sm font-medium text-gray-600 mb-2">
//                             Type of connection
//                         </label>
//                         <select
//                             value={connectionType}
//                             onChange={(e) => setConnectionType(e.target.value)}
//                             className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                         >
//                             <option value="Date">Date</option>
//                             <option value="Friend">Friend</option>
//                             <option value="Business">Business</option>
//                         </select>
//                     </section>

//                     {/* Snooze Mode */}
//                     <section className="flex items-center justify-between mt-6">
//                         <div>
//                             <p className="font-medium text-gray-700">Snooze mode</p>
//                             <p className="text-sm text-gray-500">
//                                 Turning this on will hide you from Bumble’s modes.
//                             </p>
//                         </div>
//                         <Switch checked={snoozeMode} onCheckedChange={setSnoozeMode} />
//                     </section>

//                     {/* Enable Passkey */}
//                     <section className="flex items-center justify-between mt-6">
//                         <span className="font-medium text-gray-700">Enable passkey</span>
//                         <Switch />
//                     </section>

//                     {/* Filter */}
//                     <section className="mt-8">
//                         <h2 className="font-semibold text-gray-800 mb-3">Filter</h2>
//                         <div className="flex gap-2 mb-3">
//                             {["Women", "Men", "Everyone"].map((opt) => (
//                                 <button
//                                     key={opt}
//                                     className={`px-4 py-2 rounded-full border text-sm ${opt === "Women"
//                                             ? "bg-yellow-100 border-yellow-400 text-yellow-700"
//                                             : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                                         }`}
//                                 >
//                                     {opt}
//                                 </button>
//                             ))}
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-600 mb-2">
//                                 Age: Between {ageRange[0]} and {ageRange[1]}
//                             </p>
//                             <Slider
//                                 min={18}
//                                 max={60}
//                                 step={1}
//                                 value={ageRange}
//                                 onValueChange={setAgeRange}
//                             />
//                         </div>
//                     </section>

//                     {/* Advanced Filters */}
//                     <section className="mt-8">
//                         <h2 className="font-semibold text-gray-800">Advanced filters</h2>
//                         <p className="text-sm text-gray-500">Coming soon...</p>
//                     </section>

//                     {/* Notifications */}
//                     <section className="mt-8">
//                         <h2 className="font-semibold text-gray-800">Notification settings</h2>
//                         <p className="text-sm text-gray-500">Coming soon...</p>
//                     </section>

//                     {/* Location */}
//                     <section className="mt-8">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Location
//                         </label>
//                         <input
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                             className="w-full border rounded-full px-4 py-2"
//                         />
//                     </section>

//                     {/* Language */}
//                     <section className="mt-8">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Language
//                         </label>
//                         <select
//                             value={language}
//                             onChange={(e) => setLanguage(e.target.value)}
//                             className="w-full border rounded-full px-4 py-2 text-gray-700"
//                         >
//                             <option>English (United States)</option>
//                             <option>Vietnamese</option>
//                         </select>
//                     </section>

//                     {/* Buttons */}
//                     <section className="flex flex-col space-y-3 pt-8 pb-10">
//                         <Button
//                             onClick={() => navigate("/")}
//                             className="w-full rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         >
//                             Log out
//                         </Button>
//                         <Button
//                             variant="destructive"
//                             className="w-full rounded-full bg-red-500 hover:bg-red-600"
//                         >
//                             Delete account
//                         </Button>
//                     </section>

//                     {/* Footer */}
//                     <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
//                         <img
//                             src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
//                             alt="bumble"
//                             className="w-5 h-5 mr-2"
//                         />
//                         Created with ❤️ by Linkie
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default SettingsPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [connectionType, setConnectionType] = useState("Date");
  const [snoozeMode, setSnoozeMode] = useState(false);
  const [ageRange, setAgeRange] = useState([21, 30]);
  const [location, setLocation] = useState("Hanoi");
  const [language, setLanguage] = useState("English (United States)");

  return (
    // <div className="flex flex-col h-screen bg-white overflow-hidden">
    <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
      {/* Header cố định */}
      {/* <header className="sticky top-0 z-10 flex items-center justify-between h-16 border-b bg-white px-6">
        <h1 className="text-lg font-semibold text-gray-800">Settings</h1>

        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </header> */}
       <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
        <div className="text-yellow-500 font-bold text-xl">Cài đặt</div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:text-red-500 transition absolute right-5"
          onClick={() => navigate("/home")}
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
            <Switch />
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
    </div>
  );
};

export default SettingsPage;
