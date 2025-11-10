// import React from "react";
// import { Link } from "react-router-dom";

// // Component con cho các mục trong "My Basics" (cho code sạch hơn)
// const BasicInfoItem = ({ icon, label, value }) => (
//   <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
//     <div className="flex items-center gap-3">
//       {icon}
//       <span className="text-sm font-medium">{label}</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <span className="text-sm text-gray-600">{value}</span>
//       {value === "" && (
//          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
//            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//          </svg>
//       )}
//     </div>
//   </div>
// );

// // Component con cho các ô ảnh
// const PhotoSlot = ({ src = "" }) => (
//   <div className="aspect-square w-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
//     {src ? (
//       <img src={src} alt="profile" className="w-full h-full object-cover rounded-lg" />
//     ) : (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//       </svg>
//     )}
//   </div>
// );

// // Component chính
// const ProfileForm: React.FC = () => {
//   // Dữ liệu mẫu (sau này bạn sẽ lấy từ state/API)
//   const userPhotos = [
//     "https://placehold.co/300x400/E2E8F0/94A3B8?text=Photo+1",
//     "https://placehold.co/300x400/E2E8F0/94A3B8?text=Photo+2",
//     "https://placehold.co/300x400/E2E8F0/94A3B8?text=Photo+3",
//   ];

//   return (
//     <div className="flex w-full h-screen bg-white">

//       {/* 1. THANH MENU BÊN TRÁI (Bên trong Profile) */}
//       <aside className="w-64 border-r p-6 space-y-4 hidden md:block">
//         {/* Các nút Upgrade (như trong ảnh) */}
//         <button className="w-full text-left p-3 rounded-lg bg-yellow-100 text-yellow-800 font-semibold">Activate Spotlight</button>
//         <button className="w-full text-left p-3 rounded-lg bg-cyan-100 text-cyan-800 font-semibold">Upgrade to Boost</button>
//         <button className="w-full text-left p-3 rounded-lg bg-gray-800 text-white font-semibold">Upgrade to Premium</button>

//         <hr className="my-4" />

//         {/* Menu điều hướng */}
//         <nav className="space-y-2">
//           <Link to="/profile" className="block p-3 rounded-lg bg-gray-100 font-semibold">Edit profile</Link>
//           <Link to="/settings" className="block p-3 rounded-lg hover:bg-gray-100">Settings</Link>
//           <Link to="/contact" className="block p-3 rounded-lg hover:bg-gray-100">Contact and FAQs</Link>
//           <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Log out</button>
//         </nav>
//       </aside>

//       {/* 2. NỘI DUNG CHÍNH (Bên trong Profile) */}
//       <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
//         <h1 className="text-2xl font-bold mb-6">Date profile</h1>

//         {/* Lưới ảnh */}
//         <div className="grid grid-cols-3 gap-3 max-w-lg">
//           <PhotoSlot src={userPhotos[0]} />
//           <PhotoSlot src={userPhotos[1]} />
//           <PhotoSlot src={userPhotos[2]} />
//           <PhotoSlot />
//           <PhotoSlot />
//           <PhotoSlot />
//         </div>

//         {/* Nút Verify */}
//         <button className="mt-6 w-full max-w-lg bg-blue-500 text-white font-semibold py-3 rounded-lg">
//           Account Verified
//         </button>

//         {/* Các mục thông tin */}
//         <div className="max-w-lg mt-8 space-y-6">

//           {/* About Me */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">About Me</h2>
//             <textarea
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg"
//               placeholder="Only here. Nào rảnh..."
//             ></textarea>
//           </section>

//           {/* My Basics */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">My Basics</h2>
//             <div className="space-y-2">
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" /></svg>}
//                 label="Height" 
//                 value="178 cm" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.362-3.871A8.25 8.25 0 0 1 15.362 5.214Z" /></svg>}
//                 label="Exercise" 
//                 value="Active" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c.502 0 .997-.013 1.482-.04M12 21c-.502 0-.997-.013-1.482-.04M12 3a9.004 9.004 0 0 0-8.716 6.747M12 3a9.004 9.004 0 0 1 8.716 6.747M12 3c.502 0 .997.013 1.482.04M12 3c-.502 0-.997.013-1.482.04M6.096 9.75H17.904M6.096 14.25H17.904" /></svg>}
//                 label="Education level" 
//                 value="In college" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l5.25-5.25h-3.75v-6h-3v6H6.75l5.25 5.25Z" /></svg>}
//                 label="Drinking" 
//                 value="Frequently" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
//                 label="Smoking" 
//                 value="Never" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>}
//                 label="Looking for" 
//                 value="Relationship" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
//                 label="Kids" 
//                 value="Don't want" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.518a.562.562 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.021a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.021a.563.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988H8.88a.563.563 0 0 0 .475-.31L11.48 3.5Z" /></svg>}
//                 label="Star sign" 
//                 value="" 
//               />
//               {/* Thêm các mục khác tại đây... */}
//             </div>
//           </section>

//           {/* Your gender */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">Your gender</h2>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200">
//                 <label htmlFor="gender-woman" className="text-sm font-medium">Woman</label>
//                 <input id="gender-woman" type="radio" name="gender" className="h-4 w-4 text-yellow-500" />
//               </div>
//               <div className="flex items-center justify-between py-3 px-4 rounded-lg border-2 border-yellow-500 bg-yellow-50">
//                 <label htmlFor="gender-man" className="text-sm font-medium text-yellow-700">Man</label>
//                 <input id="gender-man" type="radio" name="gender" className="h-4 w-4 text-yellow-500" defaultChecked />
//               </div>
//             </div>
//           </section>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfileForm;

// import React from "react";
// import { Link } from "react-router-dom";

// // Component con cho các mục trong "My Basics" (cho code sạch hơn)
// const BasicInfoItem = ({ icon, label, value }) => (
//   <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
//     <div className="flex items-center gap-3">
//       {icon}
//       <span className="text-sm font-medium">{label}</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <span className="text-sm text-gray-600">{value}</span>
//       {value === "" && (
//          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
//            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//          </svg>
//       )}
//     </div>
//   </div>
// );

// // Component con cho các ô ảnh
// const PhotoSlot = ({ src = "", isMain = false }) => ( // Thêm prop isMain
//   <div 
//     className={`aspect-square w-full rounded-lg border-2 ${
//       isMain ? "border-solid border-gray-300 shadow-md" : "border-dashed border-gray-300"
//     } flex items-center justify-center cursor-pointer overflow-hidden`} // Thêm overflow-hidden
//   >
//     {src ? (
//       <img src={src} alt="profile" className="w-full h-full object-cover rounded-lg" />
//     ) : (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//       </svg>
//     )}
//     {/* Nút xóa ảnh */}
//     {src && (
//       <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//     )}
//   </div>
// );

// // Component chính
// const ProfileForm: React.FC = () => {
//   // Dữ liệu mẫu (sau này bạn sẽ lấy từ state/API)
//   const userPhotos = [
//     "https://placehold.co/300x400/E2E8F0/94A3B8?text=Main", // Ảnh chính
//     "https://placehold.co/100x100/E2E8F0/94A3B8?text=Photo+2",
//     "https://placehold.co/100x100/E2E8F0/94A3B8?text=Photo+3",
//   ];

//   return (
//     <div className="flex w-full h-screen bg-white">

//       {/* 1. THANH MENU BÊN TRÁI (Bên trong Profile) */}


//       {/* 2. NỘI DUNG CHÍNH (Bên trong Profile) */}
//       <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
//         <h1 className="text-2xl font-bold mb-6">Date profile</h1>

//         {/* KHUNG ẢNH CHÍNH & LƯỚI ẢNH THỨ CẤP */}
//         <div className="flex gap-4 max-w-lg">
//           {/* Ảnh chính */}
//           <div className="flex-1 relative"> {/* Thêm relative để position nút xóa */}
//             <PhotoSlot src={userPhotos[0]} isMain={true} />
//           </div>

//           {/* Lưới ảnh nhỏ hơn */}
//           <div className="grid grid-cols-2 gap-3 w-1/3"> {/* Điều chỉnh kích thước lưới ảnh nhỏ */}
//             <PhotoSlot src={userPhotos[1]} />
//             <PhotoSlot src={userPhotos[2]} />
//             <PhotoSlot />
//             <PhotoSlot />
//           </div>
//         </div>

//         {/* Nút Verify */}
//         <button className="mt-6 w-full max-w-lg bg-blue-500 text-white font-semibold py-3 rounded-lg">
//           Account Verified
//         </button>

//         {/* Các mục thông tin */}
//         <div className="max-w-lg mt-8 space-y-6">

//           {/* About Me */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">About Me</h2>
//             <textarea
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg"
//               placeholder="Only here. Nào rảnh..."
//             ></textarea>
//           </section>

//           {/* My Basics */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">My Basics</h2>
//             <div className="space-y-2">
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" /></svg>}
//                 label="Height" 
//                 value="178 cm" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.362-3.871A8.25 8.25 0 0 1 15.362 5.214Z" /></svg>}
//                 label="Exercise" 
//                 value="Active" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c.502 0 .997-.013 1.482-.04M12 21c-.502 0-.997-.013-1.482-.04M12 3a9.004 9.004 0 0 0-8.716 6.747M12 3a9.004 9.004 0 0 1 8.716 6.747M12 3c.502 0 .997.013 1.482.04M12 3c-.502 0-.997.013-1.482.04M6.096 9.75H17.904M6.096 14.25H17.904" /></svg>}
//                 label="Education level" 
//                 value="In college" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l5.25-5.25h-3.75v-6h-3v6H6.75l5.25 5.25Z" /></svg>}
//                 label="Drinking" 
//                 value="Frequently" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
//                 label="Smoking" 
//                 value="Never" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>}
//                 label="Looking for" 
//                 value="Relationship" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
//                 label="Kids" 
//                 value="Don't want" 
//               />
//               <BasicInfoItem 
//                 icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.518a.562.562 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.021a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.021a.563.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988H8.88a.563.563 0 0 0 .475-.31L11.48 3.5Z" /></svg>}
//                 label="Star sign" 
//                 value="" 
//               />
//               {/* Thêm các mục khác tại đây... */}
//             </div>
//           </section>

//           {/* Your gender */}
//           <section>
//             <h2 className="text-lg font-semibold mb-3">Your gender</h2>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200">
//                 <label htmlFor="gender-woman" className="text-sm font-medium">Woman</label>
//                 <input id="gender-woman" type="radio" name="gender" className="h-4 w-4 text-yellow-500" />
//               </div>
//               <div className="flex items-center justify-between py-3 px-4 rounded-lg border-2 border-yellow-500 bg-yellow-50">
//                 <label htmlFor="gender-man" className="text-sm font-medium text-yellow-700">Man</label>
//                 <input id="gender-man" type="radio" name="gender" className="h-4 w-4 text-yellow-500" defaultChecked />
//               </div>
//             </div>
//           </section>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfileForm;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import {
//   uploadProfileImage,
//   getProfileImage,
//   getProfileById,
//   updateProfile,
//   deleteProfileImage,
// } from "@/services/api";
// import { useToast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";

// const GENDER_OPTIONS = { male: "Nam", female: "Nữ" };
// const HOBBY_OPTIONS = {
//   listening_to_music: "Nghe nhạc",
//   singing: "Hát",
//   playing_guitar: "Chơi guitar",
//   running: "Chạy bộ",
//   yoga: "Yoga",
//   reading: "Đọc sách",
//   cooking: "Nấu ăn",
//   photography: "Chụp ảnh",
//   traveling: "Du lịch",
//   video_games: "Chơi game",
//   dog_lover: "Yêu chó",
//   meditation: "Thiền",
//   fashion: "Thời trang",
//   blogging: "Viết blog",
// };
// const PURPOSE_OPTIONS = [
//   "Người yêu",
//   "Một người bạn đời",
//   "Quan hệ không ràng buộc",
//   "Những người bạn mới",
//   "Mình cũng chưa rõ lắm",
// ];

// const BasicInfoItem = ({ label, value, onClick }) => (
//   <div
//     onClick={onClick}
//     className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
//   >
//     <span className="text-sm font-medium">{label}</span>
//     <div className="flex items-center gap-2">
//       <span className="text-sm text-gray-600 truncate max-w-[140px]">
//         {value || "Chưa chọn"}
//       </span>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-5 h-5 text-gray-400"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2}
//         stroke="currentColor"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//       </svg>
//     </div>
//   </div>
// );

// const PhotoSlot = ({ src, onAdd, onRemove }) => (
//   <div className="relative aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
//     {src ? (
//       <>
//         <img src={src} alt="profile" className="w-full h-full object-cover" />
//         <button
//           onClick={onRemove}
//           className="absolute top-2 right-2 bg-white rounded-full shadow hover:bg-gray-100 
//              flex items-center justify-center w-7 h-7"
//         >
//           <FontAwesomeIcon icon={faXmark} className="text-gray-600 w-4 h-4" />
//         </button>

//       </>
//     ) : (
//       <button onClick={onAdd}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-8 h-8 text-gray-400"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//         </svg>
//       </button>
//     )}
//   </div>
// );

// const ProfileForm = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [photos, setPhotos] = useState(Array(6).fill(null));
//   const [bio, setBio] = useState("");
//   const [gender, setGender] = useState("");
//   const [hobby, setHobby] = useState<string[]>([]);
//   const [purpose, setPurpose] = useState("");
//   const [modalField, setModalField] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [profileId, setProfileId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const id = localStorage.getItem("profile_id");
//         if (!id) throw new Error("Không tìm thấy profile_id");
//         setProfileId(id);
//         const data = await getProfileById(id);
//         setBio(data.bio || "");
//         setGender(GENDER_OPTIONS[data.gender] || "");
//         setHobby((data.hobby || []).map((key) => HOBBY_OPTIONS[key]));
//         setPurpose(data.target_type || "");

//         const urls = [];
//         if (data.images?.length) {
//           for (const img of data.images) {
//             const url = await getProfileImage(img.title);
//             urls.push({ uri: url, id: img.id });
//           }
//         }
//         setPhotos([...urls, ...Array(6 - urls.length).fill(null)]);
//       } catch (e) {
//         toast({
//           title: "Lỗi tải hồ sơ",
//           description: e.message,
//           variant: "destructive",
//         });
//       }
//     };
//     fetchProfile();
//   }, []);

//   const pickImage = async (index: number) => {
//     if (!profileId) return;
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = async (e: any) => {
//       const file = e.target.files[0];
//       if (file) {
//         try {
//           await uploadProfileImage(profileId, [file]);
//           toast({ title: "Tải ảnh lên thành công!", variant: "success" });
//           window.location.reload();
//         } catch (err) {
//           toast({
//             title: "Lỗi upload ảnh",
//             description: err.message,
//             variant: "destructive",
//           });
//         }
//       }
//     };
//     input.click();
//   };

//   const removePhoto = async (index: number) => {
//     const photo = photos[index];
//     if (!photo?.id) return;
//     try {
//       await deleteProfileImage(photo.id);
//       const newList = [...photos];
//       newList[index] = null;
//       setPhotos(newList);
//       toast({ title: "Đã xoá ảnh" });
//     } catch (e) {
//       toast({
//         title: "Lỗi xoá ảnh",
//         description: e.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const saveProfile = async () => {
//     if (!profileId) return;
//     try {
//       const payload = {
//         bio,
//         gender: Object.keys(GENDER_OPTIONS).find(
//           (k) => GENDER_OPTIONS[k] === gender
//         ),
//         target_type: purpose,
//         hobby: hobby.map((vi) =>
//           Object.keys(HOBBY_OPTIONS).find((k) => HOBBY_OPTIONS[k] === vi)
//         ),
//       };
//       await updateProfile(profileId, payload);
//       toast({ title: "Cập nhật thành công!", variant: "success" });
//     } catch (e) {
//       toast({
//         title: "Lỗi cập nhật",
//         description: e.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const openModal = (field: string) => {
//     setModalField(field);
//     setModalVisible(true);
//   };

//   const handleSelectValue = (value) => {
//     if (modalField === "gender") setGender(value);
//     if (modalField === "purpose") setPurpose(value);
//     if (modalField === "hobby") {
//       setHobby((prev) =>
//         prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
//       {/* Header */}
//       <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
//         <div className="text-yellow-500 font-bold text-xl">Hồ sơ hẹn hò</div>
//         <FontAwesomeIcon
//           icon={faXmark}
//           className="cursor-pointer hover:text-red-500 transition absolute right-5"
//           onClick={() => navigate("/home")}
//         />
//       </header>

//       <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
//           {/* Ảnh */}
//           <div className="w-full max-w-md mx-auto">
//             <div className="flex gap-3">
//               <div className="flex-[2]">
//                 <PhotoSlot
//                   src={photos[0]?.uri}
//                   onAdd={() => pickImage(0)}
//                   onRemove={() => removePhoto(0)}
//                 />
//               </div>
//               <div className="flex-[1] grid grid-cols-1 gap-3">
//                 <PhotoSlot
//                   src={photos[1]?.uri}
//                   onAdd={() => pickImage(1)}
//                   onRemove={() => removePhoto(1)}
//                 />
//                 <PhotoSlot
//                   src={photos[2]?.uri}
//                   onAdd={() => pickImage(2)}
//                   onRemove={() => removePhoto(2)}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-3 mt-3">
//               {photos.slice(3, 6).map((p, i) => (
//                 <PhotoSlot
//                   key={i}
//                   src={p?.uri}
//                   onAdd={() => pickImage(i + 3)}
//                   onRemove={() => removePhoto(i + 3)}
//                 />
//               ))}
//             </div>

//             {/* <button className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50">
//               Xem trước hồ sơ →
//             </button> */}
//             <button
//               onClick={() => navigate("/profile/preview")}
//               className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50"
//             >
//               Xem trước hồ sơ →
//             </button>

//             <h2 className="text-lg font-semibold  mt-5">Xác thực</h2>
//             <button className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50">
//               Xác thực hồ sơ
//             </button>
//           </div>


//           {/* Bio */}
//           <div className="mt-5 max-w-md mx-auto">
//             <h2 className="text-lg font-semibold mb-5">Giới thiệu bản thân</h2>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="w-full h-24 p-3 border border-gray-300 rounded-lg"
//               placeholder="Viết gì đó về bạn..."
//             />
//           </div>

//           {/* Thông tin cơ bản */}
//           <section className="mt-5 max-w-md mx-auto space-y-2">
//             <h2 className="text-lg font-semibold mb-5">Thông tin cơ bản</h2>
//             <BasicInfoItem
//               label="Giới tính"
//               value={gender}
//               onClick={() => openModal("gender")}
//             />
//             <BasicInfoItem
//               label="Sở thích"
//               value={hobby.join(", ")}
//               onClick={() => openModal("hobby")}
//             />
//             <BasicInfoItem
//               label="Mục đích hẹn hò"
//               value={purpose}
//               onClick={() => openModal("purpose")}
//             />
//             <BasicInfoItem label="Chiều cao (Comming soon)" value="" icon={<></>} />
//             <BasicInfoItem label="Khuynh hướng hẹn hò (Comming soon)" value="" icon={<></>} />
//             <BasicInfoItem label="Cung hoàng đạo (Comming soon)" value="" icon={<></>} />
//           </section>

//           {/* Nút lưu */}
//           <div className="mt-10 mb-4 pb-10">
//             <Button
//               onClick={saveProfile}
//               className="w-60 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full shadow-lg flex mx-auto"
//             >
//               Lưu thay đổi
//             </Button>
//           </div>
//         </div>
//       </main>

//       {modalVisible && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md sm:max-w-lg md:max-w-xl shadow-xl">
//             <h2 className="text-xl font-semibold mb-4 capitalize text-center">
//               Chọn {modalField === "gender"
//                 ? "giới tính"
//                 : modalField === "purpose"
//                   ? "mục đích"
//                   : "sở thích"}
//             </h2>

//             <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
//               {modalField === "gender" &&
//                 Object.values(GENDER_OPTIONS).map((opt) => (
//                   <Button
//                     key={opt}
//                     onClick={() => {
//                       handleSelectValue(opt);
//                       setModalVisible(false);
//                     }}
//                     variant={gender === opt ? "default" : "outline"}
//                     className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
//                   >
//                     {opt}
//                   </Button>
//                 ))}

//               {modalField === "purpose" &&
//                 PURPOSE_OPTIONS.map((opt) => (
//                   <Button
//                     key={opt}
//                     onClick={() => {
//                       handleSelectValue(opt);
//                       setModalVisible(false);
//                     }}
//                     variant={purpose === opt ? "default" : "outline"}
//                     className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
//                   >
//                     {opt}
//                   </Button>
//                 ))}

//               {modalField === "hobby" &&
//                 Object.values(HOBBY_OPTIONS).map((opt) => (
//                   <Button
//                     key={opt}
//                     onClick={() => handleSelectValue(opt)}
//                     variant={hobby.includes(opt) ? "default" : "outline"}
//                     className="w-80 py-3 text-base justify-center items-center mx-auto justify-self-center items-center flex"
//                   >
//                     {opt}
//                   </Button>
//                 ))}
//             </div>

//             <Button
//               onClick={() => setModalVisible(false)}
//               className="mt-5 w-40 py-3 text-base bg-gray-200 hover:bg-gray-300 text-gray-800 justify-center items-center mx-auto justify-self-center items-center flex"
//             >
//               Đóng
//             </Button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ProfileForm;






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
} from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("profile_id");
        if (!id) throw new Error("Không tìm thấy profile_id");
        setProfileId(id);
        const data = await getProfileById(id);
        setBio(data.bio || "");
        setGender(GENDER_OPTIONS[data.gender] || "");
        setHobby((data.hobby || []).map((key) => HOBBY_OPTIONS[key]));
        setPurpose(data.target_type || "");

        const urls = [];
        if (data.images?.length) {
          for (const img of data.images) {
            const url = await getProfileImage(img.title);
            urls.push({ uri: url, id: img.id });
          }
        }
        setPhotos([...urls, ...Array(6 - urls.length).fill(null)]);
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
        gender: Object.keys(GENDER_OPTIONS).find(
          (k) => GENDER_OPTIONS[k] === gender
        ),
        target_type: purpose,
        hobby: hobby.map((vi) =>
          Object.keys(HOBBY_OPTIONS).find((k) => HOBBY_OPTIONS[k] === vi)
        ),
      };
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
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
        <div className="text-yellow-500 font-bold text-xl">Hồ sơ hẹn hò</div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:text-red-500 transition absolute right-5"
          onClick={() => navigate("/home")}
        />
      </header>

      <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
          {/* Ảnh */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-[2]">
                {/* <PhotoSlot
                  src={photos[0]?.uri}
                  onAdd={() => pickImage(0)}
                  onRemove={() => removePhoto(0)}
                /> */}
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

              </div>
              <div className="flex-[1] grid grid-cols-1 gap-3">
                <PhotoSlot
                  src={photos[1]?.uri}
                  onAdd={() => pickImage(1)}
                  onRemove={() => removePhoto(1)}
                  onPreview={() => {
                    if (photos[0]?.uri) {
                      setPreviewIndex(0);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
                <PhotoSlot
                  src={photos[2]?.uri}
                  onAdd={() => pickImage(2)}
                  onRemove={() => removePhoto(2)}
                  onPreview={() => {
                    if (photos[0]?.uri) {
                      setPreviewIndex(0);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {photos.slice(3, 6).map((p, i) => (
                <PhotoSlot
                  key={i}
                  src={p?.uri}
                  onAdd={() => pickImage(i + 3)}
                  onRemove={() => removePhoto(i + 3)}
                  onPreview={() => {
                    if (p?.uri) {
                      setPreviewIndex(i + 3);
                      setIsPreviewOpen(true);
                    }
                  }}
                />
              ))}
            </div>

            {/* <button className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50">
              Xem trước hồ sơ →
            </button> */}
            <button
              onClick={() => navigate("/profile/preview")}
              className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50"
            >
              Xem trước hồ sơ →
            </button>

            <h2 className="text-lg font-semibold  mt-5">Xác thực</h2>
            <button className="mt-4 w-full border rounded-full py-3 font-medium hover:bg-gray-50">
              Xác thực hồ sơ
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
            <BasicInfoItem label="Chiều cao (Comming soon)" value="" icon={<></>} />
            <BasicInfoItem label="Khuynh hướng hẹn hò (Comming soon)" value="" icon={<></>} />
            <BasicInfoItem label="Cung hoàng đạo (Comming soon)" value="" icon={<></>} />
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
            <h2 className="text-xl font-semibold mb-4 capitalize text-center">
              Chọn {modalField === "gender"
                ? "giới tính"
                : modalField === "purpose"
                  ? "mục đích"
                  : "sở thích"}
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
              <img
                src={photos[previewIndex]?.uri}
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