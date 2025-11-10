// import ProfileCard from "./ProfileCard";

// const SwipeContainer = () => {
//   const profiles = [
//     { name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//     { name: "Minh Ngọc", age: 22, image: "/images/minhngoc.jpg" },
//   ];

//   return (
//     <div className="flex-1 flex items-center justify-center overflow-y-auto p-4">
//       <div className="space-y-6">
//         {profiles.map((p, i) => (
//           <ProfileCard key={i} {...p} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;
// import React from "react";
// import ProfileCard from "./ProfileCard";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, location: "Hanoi", image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, location: "Hanoi", image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, location: "Hanoi", image: "/images/u3.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="flex-1 overflow-y-auto p-8">
//       <div className="space-y-8">
//         {profiles.map((p) => (
//           <ProfileCard key={p.id} name={p.name} age={p.age} location={p.location} image={p.image} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;



// import React from "react";
// import { Star, X, Check } from "lucide-react";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="h-screen overflow-y-scroll bg-white">
//       {profiles.map((p) => (
//         <div
//           key={p.id}
//           className="flex flex-col items-center justify-center min-h-screen"
//         >
//           {/* Thẻ Profile Card */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden w-[900px] mx-auto">
//             <div className="grid grid-cols-2 gap-0">
//               {/* Bên trái: hình ảnh */}
//               <div className="col-span-1">
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="w-full h-[600px] object-cover"
//                 />
//               </div>

//               {/* Bên phải: thông tin */}
//               <div className="col-span-1 bg-[#fff5d9] p-10 flex flex-col items-center justify-center rounded-r-2xl">
//                 <div className="text-3xl font-bold mb-2">
//                   {p.name}, {p.age}
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">📍 Hà Nội</div>
//               </div>
//             </div>

//             {/* Các nút Like/Dislike */}
//             <div className="flex items-center justify-center gap-8 py-6">
//               <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//                 <X size={22} />
//               </button>

//               <button className="bg-yellow-400 rounded-full p-5 shadow transform scale-110">
//                 <Star size={26} />
//               </button>

//               <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//                 <Check size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SwipeContainer;


// import React from "react";
// import ReactFullpage from "@fullpage/react-fullpage";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <ReactFullpage
//       scrollingSpeed={600}
//       credits={{ enabled: false }}
//       render={() => (
//         <div id="fullpage-wrapper">
//           {profiles.map((p) => (
//             <div key={p.id} className="section flex flex-col items-center justify-center bg-white">
//               <img src={p.image} alt={p.name} className="w-80 h-80 object-cover rounded-2xl shadow-lg" />
//               <h2 className="text-2xl font-semibold mt-4">
//                 {p.name}, {p.age}
//               </h2>
//             </div>
//           ))}
//         </div>
//       )}
//     />
//   );
// };

// export default SwipeContainer;























// import React from "react";
// import { Star, X, Check } from "lucide-react";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white">

//       {/* Main content bên phải */}
//       <div className="flex-1 flex flex-col items-center justify-center relative">
//         {/* khung cố định */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[950px] h-[700px] flex">
//           {/* Bên trái: ảnh cuộn trong khung */}
//           <div className="w-1/2 overflow-y-auto h-full">
//             <div className="space-y-2 p-4">
//               {profiles.map((p) => (
//                 <img
//                   key={p.id}
//                   src={p.image}
//                   alt={p.name}
//                   className="w-full h-[500px] object-cover rounded-xl"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Bên phải: thông tin cố định */}
//           <div className="w-1/2 bg-[#fff5d9] p-10 flex flex-col items-center justify-center">
//             <div className="text-3xl font-bold mb-2">Nguyễn, 22</div>
//             <div className="text-gray-600 text-sm">📍 Hà Nội</div>
//           </div>
//         </div>

//         {/* Nút thao tác cố định */}
//         <div className="absolute bottom-8 flex items-center justify-center gap-8">
//           <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//             <X size={22} />
//           </button>
//           <button className="bg-yellow-400 rounded-full p-5 shadow transform scale-110">
//             <Star size={26} />
//           </button>
//           <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//             <Check size={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;




// import React from "react";
// import { Star, X, Check } from "lucide-react";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white items-center justify-center">
//       {/* Khung chính */}
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-[1000px] h-[650px] flex">
//         {/* Bên trái: ảnh cuộn trong khung */}
//         <div className="w-1/2 overflow-y-auto h-full">
//           <div className="space-y-3 p-4">
//             {profiles.map((p) => (
//               <img
//                 key={p.id}
//                 src={p.image}
//                 alt={p.name}
//                 className="w-full h-[480px] object-cover rounded-xl"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bên phải: thông tin cố định */}
//         <div className="w-1/2 bg-[#fff5d9] p-10 flex flex-col items-center justify-center">
//           <div className="text-3xl font-bold mb-2">Nguyễn, 22</div>
//           <div className="text-gray-600 text-sm mb-6">📍 Hà Nội</div>
//           <p className="text-center text-gray-700 text-base leading-relaxed">
//             Yêu cà phê, thích đi phượt và nghe indie 🎶
//             <br />
//             Tìm người cùng chill cuối tuần ☕
//           </p>
//         </div>
//       </div>

//       {/* Nút thao tác cố định */}
//       <div className="absolute bottom-10 flex items-center justify-center gap-8">
//         <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//           <X size={22} />
//         </button>
//         <button className="bg-yellow-400 rounded-full p-5 shadow transform scale-110">
//           <Star size={26} />
//         </button>
//         <button className="bg-white rounded-full p-4 shadow hover:scale-105 transition">
//           <Check size={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;




// import React from "react";
// import { Star, X, Check } from "lucide-react";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
//   // Thêm ảnh để thấy hiệu ứng cuộn rõ hơn
//   { id: 4, name: "Another User", age: 23, image: "/images/u2.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white items-center justify-center">
//       {/* Khung chính (Card Frame)
//         - Đóng vai trò là container cho tất cả các phần tử.
//         - `relative` để các nút `absolute` bên trong định vị theo nó.
//         - `overflow-hidden` để đảm bảo nội dung không tràn ra ngoài các góc bo tròn.
//       */}
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-[1000px] h-[650px]">

//         {/* VÙNG CUỘN (SCROLL WRAPPER)
//           - `h-full` và `overflow-y-auto` để tạo thanh cuộn bên trong card.
//           - Toàn bộ nội dung hiển thị sẽ nằm trong div này.
//         */}
//         <div className="h-full w-full overflow-y-auto">

//           {/* Container cho layout 2 cột */}
//           <div className="flex">

//             {/* Bên trái: ảnh cuộn
//               - Bỏ `overflow-y-auto` và `h-full` từ đây.
//             */}
//             <div className="w-1/2">
//               <div className="space-y-3 p-4">
//                 {profiles.map((p) => (
//                   <img
//                     key={p.id}
//                     src={p.image}
//                     alt={p.name}
//                     className="w-full h-[480px] object-cover rounded-xl"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Bên phải: thông tin cố định
//               - Nền màu được đặt ở đây. Cột này sẽ tự động kéo dài theo chiều cao của cột ảnh.
//             */}
//             <div className="w-1/2 bg-[#fff5d9] p-10 flex flex-col items-center justify-center">
//               <div className="text-3xl font-bold mb-2">Nguyễn, 22</div>
//               <div className="text-gray-600 text-sm mb-6">📍 Hà Nội</div>
//               <p className="text-center text-gray-700 text-base leading-relaxed">
//                 Yêu cà phê, thích đi phượt và nghe indie 🎶
//                 <br />
//                 Tìm người cùng chill cuối tuần ☕
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Nút thao tác cố định
//           - Nằm bên trong card chính nhưng BÊN NGOÀI vùng cuộn.
//           - `absolute` để nó nổi lên trên và định vị ở cuối card.
//           - `z-10` để đảm bảo nó luôn nằm trên nội dung cuộn.
//         */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
//           <button className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition">
//             <X size={22} />
//           </button>
//           <button className="bg-yellow-400 text-white rounded-full p-5 shadow-lg transform scale-110">
//             <Star size={26} fill="white"/>
//           </button>
//           <button className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition">
//             <Check size={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;

// import React from "react";
// import { Star, X, Check } from "lucide-react";

// const profiles = [
//   { id: 1, name: "Tracyngxxx", age: 21, image: "/images/tracy.jpg" },
//   { id: 2, name: "Minh Ngoc", age: 22, image: "/images/u2.jpg" },
//   { id: 3, name: "Vivian", age: 24, image: "/images/u3.jpg" },
//   { id: 4, name: "Another User", age: 23, image: "/images/u2.jpg" },
// ];

// const SwipeContainer: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white items-center justify-center">
//       {/* Khung chính (Card Frame) - Vẫn là relative để chứa các phần tử absolute */}
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-[1000px] h-[650px]">

//         {/* ===== VÙNG CUỘN CHÍNH (KEY CHANGE) ===== */}
//         {/* - Chiếm 100% kích thước card.
//           - Đây là element duy nhất có overflow-y-auto và scroll-snap.
//           - Nó sẽ bắt tất cả sự kiện cuộn chuột bên trong card.
//         */}
//         <div className="w-full h-full overflow-y-auto snap-y snap-mandatory no-scrollbar">
//           {profiles.map((p) => (
//             // Mỗi slide giờ đây chiếm 100% kích thước của vùng cuộn
//             <div
//               key={p.id}
//               className="h-full w-full snap-start flex items-center justify-start" // Dùng justify-start để ảnh luôn ở bên trái
//             >
//               {/* Ảnh chỉ chiếm 50% chiều rộng bên trái của slide */}
//               <div className="w-1/2 h-full flex items-center justify-center p-4">
//                  <img
//                   src={p.image}
//                   alt={p.name}
//                   className="max-w-full max-h-full object-contain rounded-xl"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ===== BÊN PHẢI: LỚP OVERLAY THÔNG TIN (KEY CHANGE) ===== */}
//         {/* - `absolute` để nó nổi lên trên vùng cuộn.
//           - `top-0 right-0`: Ghim nó vào góc trên bên phải.
//           - `pointer-events-none`: "Phép thuật" ở đây! Làm cho div này và MỌI THỨ bên trong nó "trong suốt" với chuột.
//              Sự kiện cuộn sẽ đi "xuyên" qua và tác động vào vùng cuộn bên dưới.
//         */}
//         <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fff5d9] p-10 flex flex-col items-center justify-center pointer-events-none">

//           {/* Vì div cha là pointer-events-none, ta cần bật lại cho các phần tử con nếu muốn chúng tương tác được sau này */}
//           <div className="pointer-events-auto">
//             <div className="text-3xl font-bold mb-2 text-center">Nguyễn, 22</div>
//             <div className="text-gray-600 text-sm mb-6 text-center">📍 Hà Nội</div>
//             <p className="text-center text-gray-700 text-base leading-relaxed">
//               Yêu cà phê, thích đi phượt và nghe indie 🎶
//               <br />
//               Tìm người cùng chill cuối tuần ☕
//             </p>
//           </div>
//         </div>

//         {/* Nút thao tác cố định - Giữ nguyên */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
//           <button className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition">
//             <X size={22} />
//           </button>
//           <button className="bg-yellow-400 text-white rounded-full p-5 shadow-lg transform scale-110">
//             <Star size={26} fill="white" />
//           </button>
//           <button className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition">
//             <Check size={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;

// import React, { useState, useRef } from "react";
// import { Star, X, Check } from "lucide-react";
// import imgTracy from "../../../assets/image/tracy.jpg"; 
// import imgU2 from "../../../assets/image/u2.jpg";
// import imgU3 from "../../../assets/image/u3.jpg";
// // Dữ liệu mock (giữ nguyên)
// const profiles = [
//   {
//     id: 1,
//     name: "Hằng Nga",
//     age: 21,
//     location: "Hà Nội, -7 km away",
//     bio: "Someone makes me delete this app.",
//     interests: ["Graduate degree", "Ready", "Never", "Woman", "Relationship", "Scorpio"],
//     images: [
//       imgTracy,
//       imgU2,
//       imgU3,
//     ],
//   },
//   {
//     id: 2,
//     name: "Minh Ngọc",
//     age: 22,
//     location: "TP. Hồ Chí Minh",
//     bio: "Yêu cà phê, thích đi phượt và nghe indie 🎶\nTìm người cùng chill cuối tuần ☕",
//     interests: ["Coffee", "Travel", "Indie Music"],
//     images: [
//       imgTracy,
//       imgU2,
//       imgU3,
//     ],
//   },
//   {
//     id: 3,
//     name: "Vivian",
//     age: 24,
//     location: "Đà Nẵng",
//     bio: "Bookworm and beach lover.",
//     interests: ["Reading", "Beach", "Yoga"],
//     images: [
//       imgTracy,
//       imgU2,
//       imgU3,
//     ],
//   },
// ];

// // Thời gian animation (ms), phải khớp với thời gian trong tailwind.config.js
// const ANIMATION_DURATION = 400; // 0.4s

// const SwipeContainer: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // === THAY ĐỔI 1: State cho animation ===
//   // State này điều khiển class animation nào được áp dụng
//   const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'none'>('none');

//   // === THAY ĐỔI 2: Ref để reset cuộn ===
//   // Chúng ta cần một ref để truy cập vào div cuộn và reset nó
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const currentProfile = profiles[currentIndex];

//   // === THAY ĐỔI 3: Hàm "lướt" mới ===
//   // Hàm này giờ chỉ kích hoạt animation và đặt hẹn giờ
//   const triggerSwipe = (direction: 'left' | 'right') => {
//     // 1. Đặt hướng lướt để CSS animation được áp dụng
//     setSwipeDirection(direction);

//     // 2. Đặt hẹn giờ để thay đổi hồ sơ *sau khi* animation chạy xong
//     setTimeout(() => {
//       // 3. Tính toán hồ sơ tiếp theo
//       const nextIndex = (currentIndex + 1) % profiles.length;
//       setCurrentIndex(nextIndex);

//       // 4. Reset trạng thái animation về 'none'
//       setSwipeDirection('none');

//       // 5. QUAN TRỌNG: Reset thanh cuộn về 0 cho hồ sơ mới
//       scrollContainerRef.current?.scrollTo(0, 0);

//     }, ANIMATION_DURATION);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 items-center justify-center p-8">

//       {/* Khung Card chính (Card Frame) */}
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[900px] h-[700px]">

//         {/* === THAY ĐỔI 4: Áp dụng animation vào div này === */}
//         {/* Div này chứa toàn bộ nội dung card VÀ sẽ là thứ được animate */}
//         <div
//           className={`w-full h-full ${
//             swipeDirection === 'left' ? 'animate-swipe-out-left' : ''
//           } ${
//             swipeDirection === 'right' ? 'animate-swipe-out-right' : ''
//           }`}
//         >
//           {/* VÙNG NỘI DUNG CUỘN */}
//           {/* === THAY ĐỔI 5: Thêm 'ref' và bỏ 'key' === */}
//           {/* 'key' bị bỏ đi vì nó xung đột với animation 'out' */}
//           <div
//             ref={scrollContainerRef}
//             className="w-full h-full overflow-y-auto no-scrollbar"
//           >
//             {/* Lưới 2 Cột (Giữ nguyên) */}
//             <div className="grid grid-cols-2 min-h-full">

//               {/* CỘT TRÁI (Ảnh) */}
//               <div className="col-span-1 p-4 space-y-4 bg-white">
//                 {currentProfile.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`${currentProfile.name} ${index + 1}`}
//                     className="w-full h-auto object-cover rounded-xl"
//                   />
//                 ))}
//               </div>

//               {/* CỘT PHẢI (Thông tin) */}
//               <div className="col-span-1 bg-[#fff5d9] p-10 space-y-8">
//                 {/* Thông tin cơ bản */}
//                 <div>
//                   <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
//                   <p className="text-gray-600 mt-1">📍 {currentProfile.location}</p>
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <h3 className="font-semibold text-gray-800">About {currentProfile.name}</h3>
//                   <p className="text-gray-700 mt-2 whitespace-pre-line">
//                     {currentProfile.bio}
//                   </p>
//                 </div>

//                 {/* Interests */}
//                 <div>
//                   <h3 className="font-semibold text-gray-800">Interests</h3>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {currentProfile.interests.map((interest, index) => (
//                       <span
//                         key={index}
//                         className="bg-white/70 rounded-full px-3 py-1 text-sm text-gray-700"
//                       >
//                         {interest}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="h-24"></div> 
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* NÚT HÀNH ĐỘNG CỐ ĐỊNH */}
//         {/* === THAY ĐỔI 6: Cập nhật onClick === */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
//           <button
//             onClick={() => triggerSwipe('left')}
//             disabled={swipeDirection !== 'none'} // Vô hiệu hóa khi đang lướt
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <X size={24} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => { /* Bạn có thể thêm logic cho SuperLike sau */ }}
//             disabled={swipeDirection !== 'none'} // Vô hiệu hóa khi đang lướt
//             className="bg-yellow-400 text-white rounded-full p-5 shadow-lg transform scale-110 hover:scale-125 transition active:scale-100 disabled:opacity-50"
//           >
//             <Star size={28} fill="white" />
//           </button>
//           <button
//             onClick={() => triggerSwipe('right')}
//             disabled={swipeDirection !== 'none'} // Vô hiệu hóa khi đang lướt
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <Check size={24} className="text-green-500" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;



// import React, { useState, useRef } from "react";
// import { Star, X, Check } from "lucide-react";

// // Dùng link ảnh placeholder (giữ chỗ) để test
// const imgTracy = "https://placehold.co/600x800/E0A8A8/333?text=Profile+Image+1";
// const imgU2 = "https://placehold.co/600x700/A8C0E0/333?text=Profile+Image+2";
// const imgU3 = "https://placehold.co/600x600/A8E0B9/333?text=Profile+Image+3";

// // Dữ liệu mock (Cập nhật lại)
// const profiles = [
//   {
//     id: 1,
//     name: "Hằng Nga",
//     age: 21,
//     location: "Hà Nội, -7 km away",
//     bio: "Someone makes me delete this app.",
//     interests: ["Graduate degree", "Ready", "Never", "Woman", "Relationship", "Scorpio"],
//     images: [
//       imgTracy, // Ảnh 1
//       imgU2,   // Ảnh 2
//       imgU3,   // Ảnh 3
//     ],
//   },
//   {
//     id: 2,
//     name: "Minh Ngọc",
//     age: 22,
//     location: "TP. Hồ Chí Minh",
//     bio: "Yêu cà phê, thích đi phượt và nghe indie 🎶\nTìm người cùng chill cuối tuần ☕",
//     interests: ["Coffee", "Travel", "Indie Music"],
//     images: [
//       imgU2, // Dùng ảnh khác để test
//     ],
//   },
//   {
//     id: 3,
//     name: "Vivian",
//     age: 24,
//     location: "Đà Nẵng",
//     bio: "Bookworm and beach lover.",
//     interests: ["Reading", "Beach", "Yoga"],
//     images: [
//       imgU3, // Dùng ảnh khác để test
//       imgTracy,
//     ],
//   },
// ];

// // Thời gian animation (ms), phải khớp với thời gian trong tailwind.config.js
// const ANIMATION_DURATION = 400; // 0.4s

// const SwipeContainer: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'none'>('none');
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const currentProfile = profiles[currentIndex];

//   // Logic "lướt" (animation) khi nhấn nút
//   const triggerSwipe = (direction: 'left' | 'right') => {
//     setSwipeDirection(direction);

//     setTimeout(() => {
//       const nextIndex = (currentIndex + 1) % profiles.length;
//       setCurrentIndex(nextIndex);
//       setSwipeDirection('none');
//       // Reset thanh cuộn về 0 cho hồ sơ mới
//       scrollContainerRef.current?.scrollTo(0, 0); 
//     }, ANIMATION_DURATION);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 items-center justify-center pb-14">

//       {/* === THAY ĐỔI 1: Wrapper cho Card và Nút === */}
//       {/* Wrapper này là 'relative' để các nút 'absolute' có thể định vị */}
//       <div className="relative w-full max-w-[1100px] h-[800px]">

//         {/* === THAY ĐỔI 2: Khung Card chính === */}
//         {/* - Đây là 'div' được animate (lướt ra)
//           - Nó chứa 'div' cuộn bên trong
//         */}
//         <div
//           className={`relative w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden ${
//             swipeDirection === 'left' ? 'animate-swipe-out-left' : ''
//           } ${
//             swipeDirection === 'right' ? 'animate-swipe-out-right' : ''
//           }`}
//         >
//           {/* === THAY ĐỔI 3: VÙNG NỘI DUNG CUỘN === */}
//           {/* - Đây là 'div' duy nhất có thể cuộn.
//             - Nó dùng 'snap-y' để "lướt" (cuộn) giữa các ảnh và thông tin.
//           */}
//           <div
//             ref={scrollContainerRef}
//             className="w-full h-full overflow-y-auto no-scrollbar snap-y snap-mandatory"
//           >
//             {/* === THAY ĐỔI 4: Vòng lặp các "Block" === */}

//             {/* Block 1: Ảnh đầu tiên (luôn có) */}
//             <div className="w-full h-full snap-start relative flex items-end">
//               <img
//                 src={currentProfile.images[0]}
//                 alt={`${currentProfile.name} 1`}
//                 className="w-full h-full object-cover"
//               />
//               {/* Overlay thông tin trên ảnh 1 */}
//               <div className="absolute bottom-10 left-10 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
//                 <h2 className="text-4xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
//                 <p className="text-lg mt-1">📍 {currentProfile.location}</p>
//               </div>
//             </div>

//             {/* Block 2: Trang thông tin (luôn có) */}
//             <div className="w-full h-full snap-start bg-[#fff5d9] p-12 flex flex-col justify-center items-center space-y-8">
//               {/* Bio */}
//               <div className="w-full max-w-lg justify-center flex flex-col items-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">About {currentProfile.name}</h3>
//                 <p className="text-gray-700 mt-2 whitespace-pre-line text-xl">
//                   {currentProfile.bio}
//                 </p>
//               </div>
//               {/* Interests */}
//               <div className="w-full justify-center flex flex-col items-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">Interests</h3>
//                 <div className="flex flex-wrap gap-2 mt-2 justify-center">
//                   {currentProfile.interests.map((interest, index) => (
//                     <span
//                       key={index}
//                       className="bg-white/70 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
//                     >
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Block 3...N: Các ảnh còn lại */}
//             {/* Chúng ta lặp từ ảnh thứ 2 (index = 1) trở đi */}
//             {currentProfile.images.slice(1).map((image, index) => (
//               <div key={index} className="w-full h-full snap-start relative flex items-end">
//                 <img
//                   src={image}
//                   alt={`${currentProfile.name} ${index + 2}`} // +2 vì ta bắt đầu từ ảnh thứ 2
//                   className="w-full h-full object-cover"
//                 />
//                  {/* Overlay thông tin trên các ảnh sau (tùy chọn) */}
//                 {/* <div className="absolute bottom-10 left-10 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
//                   <h2 className="text-4xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
//                 </div> */}
//               </div>
//             ))}

//           </div>
//         </div>

//         {/* NÚT HÀNH ĐỘNG CỐ ĐỊNH */}
//         {/* Nằm bên ngoài Khung Card, nhưng bên trong Wrapper */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
//           <button
//             onClick={() => triggerSwipe('left')}
//             disabled={swipeDirection !== 'none'}
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <X size={24} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => { /* Logic SuperLike */ }}
//             disabled={swipeDirection !== 'none'}
//             className="bg-yellow-400 text-white rounded-full p-5 shadow-lg transform scale-110 hover:scale-125 transition active:scale-100 disabled:opacity-50"
//           >
//             <Star size={28} fill="white" />
//           </button>
//           <button
//             onClick={() => triggerSwipe('right')}
//             disabled={swipeDirection !== 'none'}
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <Check size={24} className="text-green-500" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;




// import React, { useState, useRef } from "react";
// import { Star, X, Check, SlidersHorizontal } from "lucide-react";

// const imgTracy = "https://placehold.co/600x800/E0A8A8/333?text=Profile+Image+1";
// const imgU2 = "https://placehold.co/600x700/A8C0E0/333?text=Profile+Image+2";
// const imgU3 = "https://placehold.co/600x600/A8E0B9/333?text=Profile+Image+3";

// const profiles = [
//   {
//     id: 1,
//     name: "Hằng Nga",
//     age: 21,
//     location: "Hà Nội, -7 km away",
//     bio: "Someone makes me delete this app.",
//     interests: ["Graduate degree", "Ready", "Never", "Woman", "Relationship", "Scorpio"],
//     images: [imgTracy, imgU2, imgU3],
//   },
//   {
//     id: 2,
//     name: "Minh Ngọc",
//     age: 22,
//     location: "TP. Hồ Chí Minh",
//     bio: "Yêu cà phê, thích đi phượt và nghe indie 🎶\nTìm người cùng chill cuối tuần ☕",
//     interests: ["Coffee", "Travel", "Indie Music"],
//     images: [imgU2],
//   },
//   {
//     id: 3,
//     name: "Vivian",
//     age: 24,
//     location: "Đà Nẵng",
//     bio: "Bookworm and beach lover.",
//     interests: ["Reading", "Beach", "Yoga"],
//     images: [imgU3, imgTracy],
//   },
// ];

// const ANIMATION_DURATION = 400;

// interface SwipeContainerProps {
//   filters: any;
// }

// const SwipeContainer: React.FC<SwipeContainerProps> = ({ filters }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const filteredProfiles = profiles.filter((p) => {
//     // ví dụ: lọc theo tuổi (đây bạn có thể thêm logic tùy vào API sau này)
//     if (filters.minAge && p.age < filters.minAge) return false;
//     if (filters.maxAge && p.age > filters.maxAge) return false;
//     return true;
//   });

//   const currentProfile = filteredProfiles[currentIndex % filteredProfiles.length];
//   if (!currentProfile) return <div className="flex justify-center items-center h-full text-gray-400">Không có kết quả phù hợp</div>;

//   const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'none'>('none');
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // const currentProfile = profiles[currentIndex];

//   const triggerSwipe = (direction: 'left' | 'right') => {
//     setSwipeDirection(direction);
//     setTimeout(() => {
//       const nextIndex = (currentIndex + 1) % profiles.length;
//       setCurrentIndex(nextIndex);
//       setSwipeDirection('none');
//       scrollContainerRef.current?.scrollTo(0, 0);
//     }, ANIMATION_DURATION);
//   };

//   return (
//     <div className="flex h-screen bg-white items-center justify-center pb-14">
//       {/* === Wrapper chính === */}
//       <div className="relative w-full max-w-[1100px] h-[800px] bg-white rounded-2xl shadow-lg">

//         {/* === Card chính === */}
//         <div
//           className={`relative w-full h-full rounded-2xl overflow-hidden transition-transform ${swipeDirection === 'left' ? 'animate-swipe-out-left' : ''
//             } ${swipeDirection === 'right' ? 'animate-swipe-out-right' : ''}`}
//         >
//           <div
//             ref={scrollContainerRef}
//             className="w-full h-full overflow-y-auto no-scrollbar snap-y snap-mandatory"
//           >
//             {/* Ảnh chính */}
//             <div className="w-full h-full snap-start relative flex items-end">
//               <img
//                 src={currentProfile.images[0]}
//                 alt={`${currentProfile.name} 1`}
//                 className="w-full h-full object-cover"
//               />
//               <div
//                 className="absolute bottom-10 left-10 text-white"
//                 style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
//               >
//                 <h2 className="text-4xl font-bold">
//                   {currentProfile.name}, {currentProfile.age}
//                 </h2>
//                 <p className="text-lg mt-1">📍 {currentProfile.location}</p>
//               </div>
//             </div>

//             {/* Trang thông tin */}
//             <div className="w-full h-full snap-start bg-white p-12 flex flex-col justify-center items-center space-y-8">
//               <div className="w-full max-w-lg justify-center flex flex-col items-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   About {currentProfile.name}
//                 </h3>
//                 <p className="text-gray-700 mt-2 whitespace-pre-line text-xl text-center">
//                   {currentProfile.bio}
//                 </p>
//               </div>

//               <div className="w-full justify-center flex flex-col items-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">Interests</h3>
//                 <div className="flex flex-wrap gap-2 mt-2 justify-center">
//                   {currentProfile.interests.map((interest, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
//                     >
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Các ảnh còn lại */}
//             {currentProfile.images.slice(1).map((image, index) => (
//               <div key={index} className="w-full h-full snap-start relative flex items-end">
//                 <img
//                   src={image}
//                   alt={`${currentProfile.name} ${index + 2}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Nút hành động */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
//           <button
//             onClick={() => triggerSwipe("left")}
//             disabled={swipeDirection !== "none"}
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <X size={24} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => { }}
//             disabled={swipeDirection !== "none"}
//             className="bg-yellow-400 text-white rounded-full p-5 shadow-lg transform scale-110 hover:scale-125 transition active:scale-100 disabled:opacity-50"
//           >
//             <Star size={28} fill="white" />
//           </button>
//           <button
//             onClick={() => triggerSwipe("right")}
//             disabled={swipeDirection !== "none"}
//             className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
//           >
//             <Check size={24} className="text-green-500" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwipeContainer;







import React, { useEffect, useState, useRef, useCallback } from "react";
import { Star, X, Check } from "lucide-react";
import { getProfiles, likeUser, getLikedUsers, getLocationByAccountId, getLocationName } from "@/services/api";

interface SwipeContainerProps {
  filters: any;
}

interface Profile {
  account_id: number;
  username: string;
  date_of_birth: string;
  gender?: string;
  bio?: string;
  images: { url: string }[];
}

const ANIMATION_DURATION = 400;

const SwipeContainer: React.FC<SwipeContainerProps> = ({ filters }) => {
  const [accountId, setAccountId] = useState<number | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [locationNames, setLocationNames] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<"loading" | "error" | "empty" | "success">("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "none">("none");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchAllData = useCallback(async () => {
    setStatus("loading");
    try {
      const storedAccountId = localStorage.getItem("account_id");
      if (!storedAccountId) throw new Error("User not logged in");
      const parsedId = parseInt(storedAccountId);
      setAccountId(parsedId);

      const [allProfiles, likedUsers] = await Promise.all([
        getProfiles(),        // nếu getProfiles cần token, truyền token ở đây
        getLikedUsers(parsedId),
      ]);

      console.log("🧩 allProfiles:", allProfiles);
      console.log("💖 likedUsers:", likedUsers);
      console.log("🎛 incoming filters:", filters);

      const likedIds = new Set(likedUsers.map((item: any) => item.liked_id));
      // start with everyone except self and already-liked
      let filtered = allProfiles.filter(
        (p: any) => p.account_id !== parsedId && !likedIds.has(p.account_id)
      );

      // decide whether we should actually apply filters:
      const shouldApplyFilter =
        !!filters &&
        (
          (typeof filters.minAge !== "undefined" && filters.minAge !== null) ||
          (typeof filters.maxAge !== "undefined" && filters.maxAge !== null) ||
          (Array.isArray(filters.gender) && filters.gender.length > 0) ||
          (Array.isArray(filters.orientation) && filters.orientation.length > 0) ||
          (Array.isArray(filters.relationship) && filters.relationship.length > 0)
        );

      if (shouldApplyFilter) {
        filtered = filtered.filter((user: any) => {
          // age
          const age = new Date().getFullYear() - new Date(user.date_of_birth).getFullYear();
          let ageMatch = true;
          if (typeof filters.minAge !== "undefined" && filters.minAge !== null) {
            ageMatch = ageMatch && age >= filters.minAge;
          }
          if (typeof filters.maxAge !== "undefined" && filters.maxAge !== null) {
            ageMatch = ageMatch && age <= filters.maxAge;
          }

          // gender (assuming user.gender matches text used in filters, otherwise map)
          let genderMatch = true;
          if (Array.isArray(filters.gender) && filters.gender.length > 0) {
            genderMatch = filters.gender.includes(user.gender);
          }

          // orientation / relationship - add logic if your user object has those fields
          let orientationMatch = true;
          if (Array.isArray(filters.orientation) && filters.orientation.length > 0) {
            // adjust according to API: if user.orientation exists and matches filter values
            orientationMatch = filters.orientation.includes(user.orientation);
          }

          let relationshipMatch = true;
          if (Array.isArray(filters.relationship) && filters.relationship.length > 0) {
            relationshipMatch = filters.relationship.includes(user.target_type);
          }

          return ageMatch && genderMatch && orientationMatch && relationshipMatch;
        });

        console.log("✅ applied filters -> filtered count:", filtered.length);
      } else {
        console.log("ℹ️ no filters applied, showing all (minus liked/self). Count:", filtered.length);
      }

      if (filtered.length === 0) {
        setStatus("empty");
        setProfiles([]);
        return;
      }

      // Lấy vị trí tên
      const locationPromises = filtered.map(async (user: any) => {
        try {
          const location = await getLocationByAccountId(user.account_id);
          if (location?.latitude && location?.longitude) {
            const name = await getLocationName(location.latitude, location.longitude);
            return [user.account_id, name || "Không rõ vị trí"];
          }
          return [user.account_id, "Không rõ vị trí"];
        } catch {
          return [user.account_id, "Không rõ vị trí"];
        }
      });

      const locationResults = await Promise.all(locationPromises);
      const newLocationNames = Object.fromEntries(locationResults);
      setLocationNames(newLocationNames);
      setProfiles(filtered);
      setStatus("success");
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    }
  }, [filters]);


  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // --- XỬ LÝ SWIPE ---
  const triggerSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(async () => {
      if (direction === "right") {
        const likedUser = profiles[currentIndex];
        if (likedUser && accountId) {
          await likeUser(likedUser.account_id, accountId);
        }
      }
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setSwipeDirection("none");
      scrollContainerRef.current?.scrollTo(0, 0);
    }, ANIMATION_DURATION);
  };

  // --- RENDER GIAO DIỆN ---
  if (status === "loading")
    return <div className="flex justify-center items-center h-full text-gray-400">Đang tải...</div>;
  if (status === "error")
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p>Không thể tải dữ liệu 😢</p>
        <button
          onClick={fetchAllData}
          className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
        >
          Thử lại
        </button>
      </div>
    );
  if (status === "empty")
  return (
    <div className="flex justify-center items-center h-screen w-full text-gray-400 text-lg">
      Không có hồ sơ phù hợp 😅
    </div>
  );


  const currentProfile = profiles[currentIndex % profiles.length];
  const age = new Date().getFullYear() - new Date(currentProfile.date_of_birth).getFullYear();
  const location = locationNames[currentProfile.account_id] || "Không rõ vị trí";

  return (
    <div className="flex h-screen bg-white items-center justify-center pb-14">
      <div className="relative w-full max-w-[1100px] h-[800px] bg-white rounded-2xl shadow-lg">
        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden transition-transform ${swipeDirection === "left" ? "animate-swipe-out-left" : ""
            } ${swipeDirection === "right" ? "animate-swipe-out-right" : ""}`}
        >
          <div ref={scrollContainerRef} className="w-full h-full overflow-y-auto no-scrollbar snap-y snap-mandatory">
            {/* Slide 1: Ảnh + Thông tin cơ bản */}
            <div className="w-full h-full snap-start grid grid-cols-2">
              {/* Ảnh bên trái */}
              <img
                src={currentProfile.images?.[0]?.url}
                alt={currentProfile.username}
                className="w-full h-full object-cover rounded-l-2xl"
              />

              {/* Thông tin bên phải */}
              <div className="flex flex-col justify-center items-start bg-[#fff9e6] px-12 rounded-r-2xl">
                <h2 className="text-4xl font-bold text-gray-800">
                  {currentProfile.username}, {age}
                </h2>
                <p className="text-lg text-gray-600 mt-2">📍 {location}</p>
              </div>
            </div>

            {/* Slide 2: Bio & Sở thích */}
            <div className="w-full h-full snap-start flex flex-col justify-center items-center bg-[#fff9e6] space-y-8 px-8">
              <h3 className="font-semibold text-gray-800 text-xl">
                About {currentProfile.username}
              </h3>
              <p className="text-gray-700 text-center text-lg max-w-xl">
                {currentProfile.bio || "Chưa có mô tả."}
              </p>

              {/* Ví dụ thêm sở thích */}
              {currentProfile.hobbies && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {currentProfile.hobbies.map((hobby: string, i: number) => (
                    <span
                      key={i}
                      className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Slide 3: Mục đích hẹn hò */}
            <div className="w-full h-full snap-start grid grid-cols-2 ">
              {/* Ảnh */}
              <img
                src={currentProfile.images?.[1]?.url || currentProfile.images?.[0]?.url}
                alt="Relationship goal"
                className="w-full h-full object-cover rounded-l-2xl"
              />

              {/* Thông tin mục đích */}
              <div className="flex flex-col justify-center items-center bg-[#fff9e6] rounded-r-2xl px-10">
                <h3 className="text-lg text-gray-700 mb-2">Mục đích hẹn hò</h3>
                <p className="text-2xl font-semibold text-gray-800 text-center">
                  {currentProfile.target_type || "Chưa chia sẻ"}
                </p>
              </div>
            </div>

            {/* Các ảnh còn lại */}
            {currentProfile.images?.slice(2).map((image, i) => (
              <div key={i} className="w-full h-full snap-start">
                <img src={image.url} alt={`Ảnh ${i + 3}`} className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>

        </div>

        {/* Nút hành động */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-10">
          <button
            onClick={() => triggerSwipe("left")}
            disabled={swipeDirection !== "none"}
            className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
          >
            <X size={24} className="text-gray-600" />
          </button>
          <button
            onClick={() => triggerSwipe("right")}
            disabled={swipeDirection !== "none"}
            className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition active:scale-95 disabled:opacity-50"
          >
            <Check size={24} className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeContainer;
