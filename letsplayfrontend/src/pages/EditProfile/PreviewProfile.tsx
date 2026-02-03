// import React, { useEffect, useState } from "react";
// import { getProfileById, getProfileImage, getLocationName, getLocationByAccountId } from "@/services/api";
// import { useNavigate } from "react-router-dom";

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

// const PreviewProfile = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const [otherImages, setOtherImages] = useState<string[]>([]);
//   const [locationText, setLocationText] = useState("Chưa rõ vị trí");
//   const navigate = useNavigate();

//   const getAge = (dob: string) => {
//     if (!dob) return "";
//     const birthDate = new Date(dob);
//     const diff = Date.now() - birthDate.getTime();
//     return Math.floor(diff / (1000 * 3600 * 24 * 365.25));
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileId = localStorage.getItem("profile_id");
//         const accountId = localStorage.getItem("account_id");
//         if (!profileId || !accountId) return;

//         const data = await getProfileById(profileId);
//         setProfile(data);

//         const location = await getLocationByAccountId(accountId);
//         if (location?.latitude && location?.longitude) {
//           const name = await getLocationName(location.latitude, location.longitude);
//           setLocationText(name);
//         }

//         if (data.images && data.images.length > 0) {
//           const urls: string[] = [];
//           for (const img of data.images) {
//             const url = await getProfileImage(img.title);
//             urls.push(url);
//           }
//           setAvatar(urls[0]);
//           setOtherImages(urls.slice(1));
//         }
//       } catch (err) {
//         console.error("Lỗi tải hồ sơ xem trước:", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!profile)
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
//         Đang tải thông tin hồ sơ...
//       </div>
//     );

//   const age = getAge(profile.date_of_birth);
//   const hobbies = (profile.hobby || []).map((h: string) => HOBBY_OPTIONS[h] || h);

//   return (
//     <div className="flex flex-col h-screen bg-white items-center justify-center">
//       <div className="relative w-full max-w-[1100px] h-[800px] bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="w-full h-full overflow-y-auto snap-y snap-mandatory no-scrollbar rounded-2xl">

//           {/* Slide 1: Ảnh + thông tin cơ bản */}
//           <div className="w-full h-[800px] snap-start grid grid-cols-2  ">
//             <img
//               src={avatar || "/images/default-avatar.png"}
//               alt="avatar"
//               className="w-full h-full object-cover rounded-l-2xl object-center"
//             />
//             <div className="flex flex-col justify-center items-start bg-[#fff9e6] px-12 rounded-r-2xl">
//               <h2 className="text-4xl font-bold text-gray-800">
//                 {profile.username}, {age}
//               </h2>
//               <p className="text-lg text-gray-600 mt-2">📍 {locationText}</p>
//             </div>
//           </div>

//           {/* Slide 2: Bio + Sở thích */}
//           <div className="w-full h-[800px] snap-start flex flex-col justify-center items-center bg-[#fff9e6] space-y-8 px-8">
//             <h3 className="font-semibold text-gray-800 text-xl">Bio {profile.username}</h3>
//             <p className="text-gray-700 text-center text-lg max-w-xl">
//               {profile.bio || "Chưa có mô tả."}
//             </p>
//             {hobbies.length > 0 && (
//               <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 {hobbies.map((hobby, i) => (
//                   <span
//                     key={i}
//                     className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {hobby}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Slide 3: Mục đích hẹn hò */}
//           <div className="w-full h-[800px] snap-start grid grid-cols-2">
//             <img
//               src={otherImages[0] || avatar || "/images/default-avatar.png"}
//               alt="relationship goal"
//               className="w-full h-full object-cover rounded-l-2xl"
//             />
//             <div className="flex flex-col justify-center items-center bg-[#fff9e6] rounded-r-2xl px-10">
//               <h3 className="text-lg text-gray-700 mb-2">Mục đích hẹn hò</h3>
//               <p className="text-2xl font-semibold text-gray-800 text-center">
//                 {profile.target_type || "Chưa chia sẻ"}
//               </p>
//             </div>
//           </div>

//           {/* Các ảnh còn lại */}
//           {otherImages.slice(1).map((url, i) => (
//             <div key={i} className="w-full h-[800px] snap-start">
//               <img
//                 src={url}
//                 alt={`Ảnh ${i + 3}`}
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Nút quay lại */}
//         {/* <button
//           onClick={() => navigate(-1)}
//           className="absolute top-6 right-6 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100"
//         >
//           ✕
//         </button> */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
//         >
//           ✕
//         </button>

//       </div>
//     </div>
//   );
// };

// export default PreviewProfile;






import React, { useEffect, useState } from "react";
import { getProfileById, getProfileImage, getLocationName, getLocationByAccountId } from "@/services/api";
import { useNavigate } from "react-router-dom";

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

const PreviewProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<string[]>([]);
  const [locationText, setLocationText] = useState("Chưa rõ vị trí");
  const navigate = useNavigate();

  const getAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return Math.floor(diff / (1000 * 3600 * 24 * 365.25));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileId = localStorage.getItem("profile_id");
        const accountId = localStorage.getItem("account_id");
        if (!profileId || !accountId) return;

        const data = await getProfileById(profileId);
        setProfile(data);

        const location = await getLocationByAccountId(accountId);
        if (location?.latitude && location?.longitude) {
          const name = await getLocationName(location.latitude, location.longitude);
          setLocationText(name);
        }

        // if (data.images && data.images.length > 0) {
        //   const urls: string[] = [];
        //   for (const img of data.images) {
        //     const url = await getProfileImage(img.title);
        //     urls.push(url);
        //   }
        //   setAvatar(urls[0]);
        //   setOtherImages(urls.slice(1));
        // }
        // 1️⃣ Avatar (ưu tiên tuyệt đối)
// if (data.avatar?.id) {
//   setAvatar(`/api/avatar/${data.avatar.id}`);
// } else {
//   setAvatar(null);
// }
if (data.avatar?.url) {
  setAvatar(`http://127.0.0.1:8000/${data.avatar.url}`);
} else {
  setAvatar(null);
}


// 2️⃣ Ảnh profile (KHÔNG gồm avatar)
if (data.images && data.images.length > 0) {
  const urls: string[] = [];
  for (const img of data.images) {
    const url = await getProfileImage(img.title);
    urls.push(url);
  }
  setOtherImages(urls);
}

      } catch (err) {
        console.error("Lỗi tải hồ sơ xem trước:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Đang tải thông tin hồ sơ...
      </div>
    );

  const age = getAge(profile.date_of_birth);
  const hobbies = (profile.hobby || []).map((h: string) => HOBBY_OPTIONS[h] || h);

  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center">
      <div className="relative w-full max-w-[1100px] aspect-[3/4] h-[730px] bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-full overflow-y-auto snap-y snap-mandatory no-scrollbar rounded-2xl">

          {/* Slide 1: Ảnh + thông tin cơ bản */}
          <div className="w-full h-full snap-start grid grid-cols-2">
            <div className="flex items-center justify-center bg-black rounded-l-2xl">
              <div className="aspect-[3/4] w-[100%] bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={avatar || "/images/default-avatar.png"}
                  alt="avatar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-start bg-[#fff9e6] px-12 ">
              <h2 className="text-4xl font-bold text-gray-800">
                {profile.username}, {age}
              </h2>
              <p className="text-lg text-gray-600 mt-2">📍 {locationText}</p>
            </div>
          </div>

          {/* Slide 2: Bio + Sở thích */}
          <div className="w-full h-full snap-start grid grid-cols-2">
            <div className="flex flex-col justify-center items-center bg-[#fff9e6] px-8">
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Bio của {profile.username}
              </h3>
              <p className="text-gray-700 text-center text-lg max-w-xl">
                {profile.bio || "Chưa có mô tả."}
              </p>
              {hobbies.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {hobbies.map((hobby, i) => (
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

            <div className="flex items-center justify-center bg-black rounded-r-2xl">
              <div className="aspect-[3/4] w-[100%] bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={otherImages[0] || avatar || "/images/default-avatar.png"}
                  alt="bio"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Slide 3: Mục đích hẹn hò */}
          <div className="w-full h-full snap-start grid grid-cols-2">
            <div className="flex items-center justify-center bg-black rounded-l-2xl">
              <div className="aspect-[3/4] w-[100%] bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={otherImages[1] || avatar || "/images/default-avatar.png"}
                  alt="relationship goal"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-[#fff9e6] px-10">
              <h3 className="text-lg text-gray-700 mb-2">Mục đích hẹn hò</h3>
              <p className="text-2xl font-semibold text-gray-800 text-center">
                {profile.target_type || "Chưa chia sẻ"}
              </p>
            </div>
          </div>

          {/* Các ảnh còn lại */}
          {otherImages.slice(2).map((url, i) => (
            <div key={i} className="w-full h-full snap-start grid grid-cols-2">
              <div className="flex items-center justify-center bg-black rounded-l-2xl">
                <div className="aspect-[3/4] w-[100%] bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={url}
                    alt={`Ảnh ${i + 4}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center bg-[#fff9e6] ">
                <p className="text-gray-700 italic">Ảnh {i + 4} của {profile.username}</p>
              </div>
            </div>
          ))}

        </div>

        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PreviewProfile;
