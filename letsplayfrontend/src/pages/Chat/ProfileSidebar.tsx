// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { getProfileById } from "../../services/api";
// import defaultAvatar from "@/assets/image/image.png";

// interface ProfileSidebarProps {
//   visible: boolean;
//   onClose: () => void;
//   userId: number | null;
// }

// const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ visible, onClose, userId }) => {
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!userId) return;
//       const data = await getProfileById(userId);
//       setProfile(data);
//     };
//     fetchProfile();
//   }, [userId]);

//   return (
//     <aside
//       className={`h-screen bg-white border-l transition-all duration-300 overflow-y-auto ${
//         visible ? "w-[30%] opacity-100" : "w-0 opacity-0"}`}
//     >
//       {visible && (
//         <div className="h-full flex flex-col">
//           <div className="relative">
//             <img
//               src={profile?.avatar?.url || defaultAvatar}
//               alt={profile?.username || "Profile"}
//               className="w-full h-80 object-cover"
//             />
//             <FontAwesomeIcon
//               icon={faXmark}
//               className="absolute top-4 right-4 text-white text-lg bg-black/40 p-2 rounded-full cursor-pointer hover:bg-black/70"
//               onClick={onClose}
//             />
//           </div>

//           <div className="p-4 space-y-3">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {profile?.username || "Chưa có tên"}, {profile?.age || ""}
//               {profile?.verified && (
//                 <span className="text-blue-500 text-base">✔️</span>
//               )}
//             </h2>
//             <p className="text-gray-600 text-sm">{profile?.job_title}</p>

//             <div className="bg-yellow-50 rounded-xl p-4">
//               <h4 className="font-semibold text-gray-800 mb-2">About {profile?.username}</h4>
//               <p className="text-gray-700 text-sm">
//                 {profile?.bio || "Chưa có mô tả bản thân"}
//               </p>

//               <div className="flex flex-wrap gap-2 mt-3">
//                 {profile?.height && (
//                   <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
//                     {profile.height} cm
//                   </span>
//                 )}
//                 {profile?.gender && (
//                   <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
//                     {profile.gender}
//                   </span>
//                 )}
//                 {profile?.target_type && (
//                   <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
//                     {profile.target_type}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default ProfileSidebar;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { getProfiles, getLocationByAccountId, getLocationName } from "../../services/api";
import { getProfileById, getProfileImage, getAvatarImage } from "../../services/api";

import defaultAvatar from "@/assets/image/image.png";

interface ProfileSidebarProps {
  visible: boolean;
  onClose: () => void;
  userId: number | null;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ visible, onClose, userId }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // const [locationName, setLocationName] = useState<string>("");

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (!userId) return;

  //     try {
  //       // 🔹 Lấy danh sách profiles
  //       const profiles = await getProfiles();
  //       const selectedProfile = profiles.find((p: any) => p.id === userId);

  //       if (selectedProfile) {
  //         setProfile(selectedProfile);

  //         // 🔹 Lấy location name nếu có
  //         const locData = await getLocationByAccountId(userId);
  //         if (locData?.location_id) {
  //           const loc = await getLocationName(locData.location_id);
  //           if (loc?.name) setLocationName(loc.name);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Lỗi khi tải profile:", err);
  //     }
  //   };

  //   fetchProfile();
  // }, [userId]);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const data = await getProfileById(userId);

        // xử lý ảnh giống ProfileForm
        const images = [];
        if (data.images?.length) {
          for (const img of data.images) {
            const url = await getProfileImage(img.title);
            images.push({ ...img, url });
          }
        }

        const avatarUrl = data.avatar?.id
          ? getAvatarImage(data.avatar.id)
          : null;

        setProfile({
          ...data,
          images,
          avatarUrl,
        });
      } catch (err) {
        console.error("Lỗi khi tải profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);


  return (
    <aside
      className={`h-screen bg-white border-l transition-all duration-300 overflow-y-auto ${visible ? "w-[30%] opacity-100" : "w-0 opacity-0"
        }`}
    >
      {visible && profile && (
        <div className="h-full flex flex-col">
          {/* Ảnh đại diện */}
          <div className="relative w-full aspect-[3/4]">
            <img
              // src={profile?.images?.[0]?.url || defaultAvatar}
              src={profile?.avatarUrl || defaultAvatar}

              alt={profile?.username || "Profile"}
              className="w-full h-full aspect-[3/4] object-cover"
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute top-4 right-4 text-white text-lg bg-black/40 p-2 rounded-full cursor-pointer hover:bg-black/70 transition"
              onClick={onClose}
            />
          </div>

          {/* Nội dung profile */}
          <div className="p-4 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {profile?.username || "Chưa có tên"}
              {profile?.age && `, ${profile.age}`}
              {profile?.verified && (
                <span className="text-blue-500 text-base">✔️</span>
              )}
            </h2>

            {/* {profile?.job_title && (
              <p className="text-gray-600 text-sm">{profile.job_title}</p>
            )} */}
            {/* {locationName && (
              <p className="text-gray-500 text-xs">{locationName}</p>
            )} */}
            {/* {profile?.location_name && (
              <p className="text-gray-700 text-sm">
                {profile.location_name}
              </p>
            )} */}
            {profile?.location_name && (
              <p className="flex items-center gap-1 text-gray-800 text-sm">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-green-700 text-xl"
                />
                {profile.location_name}
              </p>
            )}



            <div className="bg-yellow-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Về {profile?.username}
              </h4>
              <p className="text-gray-700 text-sm">
                {profile?.bio || "Chưa có mô tả bản thân"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {profile?.height && (
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
                    {profile.height} cm
                  </span>
                )}
                {/* {profile?.gender && (
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
                    {profile.gender}
                  </span>
                )} */}
                {profile?.target_type && (
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
                    {profile.target_type}
                  </span>
                )}
                {/* {profile?.job && <p className="text-sm">{profile.job}</p>}
                {profile?.education && <p className="text-sm">{profile.education}</p>} */}

                {profile?.job && (
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
                    {profile.job}
                  </span>
                )}

                {profile?.education && (
                  <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs text-gray-700">
                    {profile.education}
                  </span>
                )}


              </div>
            </div>
          </div>
          {/* Ảnh profile (hiện to từng cái) */}
          {profile?.images?.length > 0 && (
            <div className="space-y-4 px-4 pb-6">
              {profile.images.map((img: any, index: number) => (
                <div
                  key={img.id || index}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={img.url || defaultAvatar}
                    alt={`profile-${index}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* số thứ tự ảnh (optional, giống dating app) */}
                  <span className="absolute bottom-3 right-3 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                    {index + 1}/{profile.images.length}
                  </span>
                </div>
              ))}
            </div>
          )}


        </div>
      )}
    </aside>
  );
};

export default ProfileSidebar;
