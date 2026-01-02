// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faXmark } from "@fortawesome/free-solid-svg-icons";
// // // Lược bỏ các imports API không cần thiết
// // // Lược bỏ useToast, Button

// // // Component mô tả một mục liên kết
// // const UsefulLinkItem = ({ label, href }) => {
// //   return (
// //     <a
// //       href={href} // Sử dụng <a> hoặc <Link> tùy theo thư viện router
// //       target="_blank" // Mở ở tab mới cho các liên kết ngoài (nếu có)
// //       rel="noopener noreferrer"
// //       className="block w-full px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150 text-gray-700"
// //     >
// //       {label}
// //     </a>
// //   );
// // };

// // const ContactAndFAQs = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
// //       {/* Header */}
// //       <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
// //         <div className="text-xl font-medium text-gray-800">
// //           Contact and FAQs
// //         </div>
// //         <FontAwesomeIcon
// //           icon={faXmark}
// //           className="cursor-pointer hover:text-red-500 transition absolute right-5"
// //           onClick={() => navigate("/home")}
// //         />
// //       </header>

// //       <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
// //         <div className="bg-white p-6 w-full max-w-xl">
// //           {/* Useful Links */}
// //           <section className="mb-8">
// //             <h2 className="text-lg font-semibold mb-4">Useful links</h2>
// //             <div className="space-y-3">
// //               <UsefulLinkItem label="FAQs" href="/faqs" />
// //               <UsefulLinkItem label="Terms of Service" href="/terms" />
// //               <UsefulLinkItem label="Privacy Policy" href="/privacy" />
// //               <UsefulLinkItem label="Contact us" href="/contact-form" />
// //             </div>
// //           </section>

// //           {/* Advertising Preferences */}
// //           <section className="mb-10">
// //             <h2 className="text-lg font-semibold mb-4">
// //               Advertising preferences
// //             </h2>
// //             <div className="flex items-center justify-between py-3">
// //               <span className="text-sm font-medium text-gray-700">
// //                 Personalized advertising
// //               </span>
// //               {/* Toggle Switch (giữ nguyên style từ ảnh) */}
// //               <label className="relative inline-flex items-center cursor-pointer">
// //                 <input type="checkbox" value="" className="sr-only peer" defaultChecked />
// //                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
// //               </label>
// //             </div>
// //             <p className="text-xs text-gray-500 mt-2">
// //               Bumble works with a limited number of selected partners to provide
// //               you with adverts that are relevant to you based on your profile
// //               information, like your age and location.
// //             </p>
// //             <p className="text-xs text-gray-500 mt-2">
// //               If you would prefer us not to use your information to personalize your adverts, you can opt out here.
// //             </p>
// //           </section>
          
// //           {/* Bumble Logo and Footer (giữ nguyên style từ ảnh) */}
// //           <div className="flex flex-col items-center justify-center mt-12">
// //             <svg
// //               className="w-10 h-10 text-yellow-500"
// //               viewBox="0 0 40 40"
// //               fill="currentColor"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM20.73 28.79C19.7 28.93 18.9 28.79 17.87 28.65C16.84 28.51 15.81 28.23 14.78 27.95C13.75 27.67 12.82 27.25 11.99 26.79C11.16 26.33 10.43 25.79 9.8 25.17C9.17 24.55 8.65 23.84 8.24 23.04C7.83 22.24 7.53 21.36 7.34 20.4C7.15 19.44 7.06 18.33 7.06 17.07C7.06 15.38 7.32 14.07 7.84 13.14C8.36 12.21 9.25 11.66 10.51 11.5L10.51 11.5V11.5L20 12.18V12.18C21.03 12.32 21.83 12.46 22.86 12.6C23.89 12.74 24.92 13.02 25.95 13.3C26.98 13.58 27.91 14 28.74 14.46C29.57 14.92 30.3 15.46 30.93 16.08C31.56 16.7 32.08 17.41 32.49 18.21C32.9 19.01 33.2 19.89 33.39 20.85C33.58 21.81 33.67 22.92 33.67 24.18C33.67 25.87 33.41 27.18 32.89 28.11C32.37 29.04 31.48 29.59 30.22 29.75L30.22 29.75V29.75L20.73 28.79Z"
// //                 fill="currentColor"
// //               />
// //             </svg>
// //             <div className="text-xs text-gray-500 mt-1">bumble</div>
// //             <div className="text-xs text-gray-400 mt-1">Created with 💛</div>
// //           </div>
// //         </div>
// //       </main>

// //       {/* Lược bỏ Modal, Preview và Verify Popup */}
// //     </div>
// //   );
// // };

// // export default ContactAndFAQs;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

// // Component mô tả một mục liên kết, style tương tự BasicInfoItem/Settings item
// const UsefulLinkItem = ({ label, href, comingSoon = false }) => {
//   const navigate = useNavigate();
//   const onClickAction = () => {
//     if (href && !comingSoon) {
//       // Dùng navigate cho các route nội bộ, hoặc window.open cho link ngoài
//       if (href.startsWith("/")) {
//         navigate(href);
//       } else {
//         window.open(href, "_blank", "noopener noreferrer");
//       }
//     }
//     // Không làm gì nếu là comingSoon
//   };

//   return (
//     <div
//       onClick={!comingSoon ? onClickAction : undefined}
//       className={`flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 ${
//         !comingSoon ? "cursor-pointer hover:bg-gray-50 transition duration-150" : "opacity-60 cursor-default"
//       }`}
//     >
//       <span className="text-sm font-medium text-gray-700">
//         {label}
//         {comingSoon && <span className="text-xs text-yellow-500 ml-2">(Coming soon)</span>}
//       </span>
//       <div className="flex items-center gap-2">
//         {/* Biểu tượng mũi tên hoặc dấu cộng (giống BasicInfoItem) */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-5 h-5 text-gray-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="currentColor"
//         >
//           {/* Biểu tượng mũi tên sang phải (hoặc dấu cộng nếu muốn) */}
//           <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// const ContactAndFAQs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
//       {/* Header - Áp dụng style màu vàng và font-bold như các component khác */}
//       <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
//         <div className="text-yellow-500 font-bold text-xl">Liên hệ và Câu hỏi thường gặp</div>
//         <FontAwesomeIcon
//           icon={faXmark}
//           className="cursor-pointer hover:text-red-500 transition absolute right-5"
//           onClick={() => navigate("/home")}
//         />
//       </header>

//       <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
//         {/* Giảm max-w từ xl xuống md để các mục item không quá rộng, tạo cảm giác app mobile */}
//         <div className="bg-white p-6 w-full max-w-md">
//           {/* Useful Links */}
//           <section className="mb-8">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">Liên kết hữu ích</h2>
//             <div className="space-y-3">
//               {/* Giả sử các link này là nội bộ hoặc cố định */}
//               <UsefulLinkItem label="Câu hỏi thường gặp (FAQs)" href="/faqs" />
//               <UsefulLinkItem label="Điều khoản dịch vụ" href="/terms" />
//               <UsefulLinkItem label="Chính sách bảo mật" href="/privacy" />
//               <UsefulLinkItem label="Liên hệ với chúng tôi" href="/contact-form" />
//             </div>
//           </section>

//           {/* Advertising Preferences */}
//           <section className="mb-10 border-t border-gray-200 pt-6">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Tùy chọn quảng cáo
//             </h2>
//             <div className="flex items-center justify-between py-3">
//               <span className="text-sm font-medium text-gray-700">
//                 Quảng cáo cá nhân hóa
//               </span>
//               {/* Toggle Switch (Giữ nguyên style) */}
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" value="" className="sr-only peer" defaultChecked />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
//               </label>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               Linkie làm việc với một số đối tác chọn lọc để cung cấp cho bạn
//               các quảng cáo phù hợp dựa trên thông tin hồ sơ của bạn, như tuổi và vị trí.
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               Nếu bạn không muốn chúng tôi sử dụng thông tin của bạn để cá nhân hóa
//               quảng cáo, bạn có thể từ chối tại đây.
//             </p>
//           </section>

//           {/* Footer (Giống SettingsPage) */}
//           <div className="flex justify-center items-center mt-6 text-gray-400 text-sm pb-10">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
//               alt="logo" // Tên logo được thay thế cho mục đích minh họa
//               className="w-5 h-5 mr-2"
//             />
//             Tạo bởi Quang Anh ❤️
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ContactAndFAQs;
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Component mô tả một mục liên kết, style tương tự BasicInfoItem/Settings item
const UsefulLinkItem = ({ label, href, comingSoon = false }) => {
  const navigate = useNavigate();
  const onClickAction = () => {
    if (href && !comingSoon) {
      // Dùng navigate cho các route nội bộ, hoặc window.open cho link ngoài
      if (href.startsWith("/")) {
        navigate(href);
      } else {
        // Chỉ mở link ngoài nếu href không phải là route nội bộ
        window.open(href, "_blank", "noopener noreferrer");
      }
    }
    // Không làm gì nếu là comingSoon
  };

  return (
    <div
      onClick={!comingSoon ? onClickAction : undefined}
      className={`flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 ${
        !comingSoon ? "cursor-pointer hover:bg-gray-50 transition duration-150" : "opacity-60 cursor-default"
      }`}
    >
      <span className="text-sm font-medium text-gray-700">
        {label}
        {comingSoon && <span className="text-xs text-yellow-500 ml-2">(Coming soon)</span>}
      </span>
      <div className="flex items-center gap-2">
        {/* Biểu tượng mũi tên sang phải, đồng bộ với BasicInfoItem */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
};

const ContactAndFAQs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden">
      {/* Header - Style đồng bộ: text-yellow-500 font-bold text-xl */}
      <header className="sticky top-0 z-10 w-full h-20 flex items-center justify-center border-b bg-white">
        <div className="text-yellow-500 font-bold text-xl">Liên hệ và câu hỏi thường gặp</div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:text-red-500 transition absolute right-5"
          onClick={() => navigate("/home", { state: { resetSidebar: true } })}
        />
      </header>

      <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">
        {/* Đổi max-w-md thành max-w-2xl để rộng hơn, giống container của ProfileForm */}
        <div className="bg-white p-6 w-full max-w-2xl">
          {/* Container cho nội dung bên trong, giới hạn max-w-md và căn giữa */}
          <div className="max-w-md mx-auto">
            {/* Useful Links */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Liên kết hữu ích</h2>
              <div className="space-y-3">
                <UsefulLinkItem label="Câu hỏi thường gặp (FAQs)" href="/faqs" />
                <UsefulLinkItem label="Điều khoản dịch vụ" href="/terms" />
                <UsefulLinkItem label="Chính sách bảo mật" href="/privacy" />
                <UsefulLinkItem label="Liên hệ với chúng tôi" href="/contact-form" />
              </div>
            </section>

            {/* Advertising Preferences */}
            <section className="mb-10 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Tùy chọn quảng cáo
              </h2>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-700">
                  Quảng cáo cá nhân hóa
                </span>
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Linkie làm việc với một số đối tác chọn lọc để cung cấp cho bạn
                các quảng cáo phù hợp dựa trên thông tin hồ sơ của bạn, như tuổi và vị trí.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Nếu bạn không muốn chúng tôi sử dụng thông tin của bạn để cá nhân hóa
                quảng cáo, bạn có thể từ chối tại đây.
              </p>
            </section>

            {/* Footer - Đồng bộ với SettingsPage */}
            <div className="flex justify-center items-center mt-6 text-gray-400 text-sm pb-10">
              {/* Sử dụng thẻ img và nguồn ảnh tượng trưng giống SettingsPage */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
                alt="logo"
                className="w-5 h-5 mr-2"
              />
              Tạo bởi Quang Anh ❤️
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactAndFAQs;