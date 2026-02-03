// import React, { useEffect, useState } from "react";
// import { getDatingAdvice } from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

// const AdvicePage = () => {
//   const navigate = useNavigate();
//   const [videos, setVideos] = useState([]);
//   const [tips, setTips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdvice = async () => {
//       try {
//         const res = await getDatingAdvice();
//         setVideos(res.videos);
//         setTips(res.tips);
//       } catch (err) {
//         console.error("Error load:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdvice();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
//         Đang tải nội dung...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-hidden">

//       {/* HEADER — giống ContactAndFAQs */}
//       <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white">
//         <div className="text-yellow-500 font-bold text-xl">Dating Advice</div>

//         <FontAwesomeIcon
//           icon={faXmark}
//           className="cursor-pointer hover:text-red-500 transition absolute right-5"
//           onClick={() => navigate(-1)}
//         />
//       </header>

//       <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">

//         {/* Giống ContactAndFAQs: max-w-2xl */}
//         <div className="bg-white p-6 w-full max-w-2xl">

//           {/* Nội dung bên trong: max-w-md */}
//           <div className="max-w-md mx-auto">

//             {/* VIDEO */}
//             <section className="mb-8">
//               <h2 className="text-lg font-semibold mb-4 text-gray-800">
//                 🎬 Video hay dành cho bạn
//               </h2>

//               <div className="grid grid-cols-1 gap-4">
//                 {videos.map((v) => (
//                   <a
//                     key={v.id}
//                     href={v.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="rounded-xl border border-gray-200 hover:bg-gray-50 p-3 transition"
//                   >
//                     <img
//                       src={v.thumbnail_url}
//                       alt={v.title}
//                       className="w-full h-48 object-cover rounded-lg"
//                     />

//                     <div className="mt-2">
//                       <h3 className="font-semibold text-base line-clamp-2">
//                         {v.title}
//                       </h3>
//                       <p className="text-sm text-gray-500">{v.author}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </section>

//             {/* TIPS */}
//             <section className="mt-8">
//               <h2 className="text-lg font-semibold mb-4 text-gray-800">
//                 💡 Tips hẹn hò
//               </h2>

//               <div className="space-y-4">
//                 {tips.map((t) => (
//                   <div
//                     key={t.id}
//                     className="border border-gray-200 rounded-xl p-4 shadow-sm hover:bg-gray-50 transition"
//                   >
//                     <h3 className="font-semibold text-base mb-1">{t.title}</h3>
//                     <p className="text-gray-600 text-sm">{t.body}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Footer giống SettingsPage */}
//             <div className="flex justify-center items-center mt-10 text-gray-400 text-sm pb-10">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/1/19/Bumble_logo.svg"
//                 alt="logo"
//                 className="w-5 h-5 mr-2"
//               />
//               Tạo bởi Quang Anh ❤️
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdvicePage;





import React, { useEffect, useState } from "react";
import { getDatingAdvice } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AdvicePage = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const res = await getDatingAdvice();
                setVideos(res.videos);
                setTips(res.tips);
            } catch (err) {
                console.error("Error load:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdvice();
    }, []);

    if (loading) {
        return (
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

            {/* ⬇️ HEADER Y HỆT SETTINGS */}
            <header className="sticky top-0 z-10 w-full h-20 flex items-center justify-center border-b bg-white">
                <div className="text-yellow-500 font-bold text-xl">Lời khuyên hẹn hò</div>

                <FontAwesomeIcon
                    icon={faXmark}
                    className="cursor-pointer hover:text-red-500 transition absolute right-5"
                    onClick={() => navigate("/home", { state: { resetSidebar: true } })}
                />
            </header>

            {/* ⬇️ NỘI DUNG CÓ SCROLL */}
            <main className="flex-1 overflow-y-auto w-full flex justify-center p-6">

                <div className="bg-white p-6 w-full max-w-2xl">
                    <div className="max-w-md mx-auto">

                        {/* VIDEO LIST */}
                        <section className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                🎬 Video hay dành cho bạn
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {videos.map((v) => (
                                    <a
                                        key={v.id}
                                        href={v.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="relative w-full h-56 rounded-xl overflow-hidden">

                                            {/* Ảnh thumbnail */}
                                            <img
                                                src={v.thumbnail_url}
                                                alt={v.title}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Gradient để hiển thị chữ dưới rõ nét */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                            {/* Tác giả ở phía trên */}
                                            <div className="absolute top-3 left-3 right-3">
                                                <p className="text-white/85 text-sm font-medium drop-shadow">
                                                    {v.author}
                                                </p>
                                            </div>

                                            {/* Tiêu đề video ở phía dưới */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-white font-semibold text-base line-clamp-2 drop-shadow">
                                                    {v.title}
                                                </h3>
                                            </div>

                                        </div>

                                    </a>
                                ))}
                            </div>
                        </section>

                        {/* TIPS */}
                        <section className="mt-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                💡 Tips hẹn hò
                            </h2>

                            <div className="space-y-4">
                                {tips.map((t) => (
                                    <div
                                        key={t.id}
                                        className="border border-gray-200 rounded-xl p-4 shadow-sm hover:bg-gray-50 transition"
                                    >
                                        <h3 className="font-semibold text-base mb-1">{t.title}</h3>
                                        <p className="text-gray-600 text-sm">{t.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FOOTER */}
                        <div className="flex justify-center items-center mt-10 text-gray-400 text-sm pb-10">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/8633/8633642.png"
                                className="w-6 h-6 mr-2"
                            />
                            Tạo bởi Quang Anh ❤️
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdvicePage;

