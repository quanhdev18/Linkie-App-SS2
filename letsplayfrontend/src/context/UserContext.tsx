// // src/context/UserContext.tsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getProfileById, getAvatarImage } from "@/services/api"; // Sửa đường dẫn import cho đúng với dự án của bạn

// interface UserContextType {
//   profile: any;
//   avatarUri: string | null;
//   isLoading: boolean;
//   refreshProfile: () => void; // Hàm này dùng để gọi lại API khi bạn update profile xong
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [profile, setProfile] = useState<any>(null);
//   const [avatarUri, setAvatarUri] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       setIsLoading(true);
//       const idStr = localStorage.getItem("profile_id");
//       if (!idStr) return; // Hoặc xử lý logout
      
//       const profileId = parseInt(idStr, 10);
//       const data = await getProfileById(profileId);
//       setProfile(data);

//       if (data?.avatar?.id) {
//         setAvatarUri(getAvatarImage(data.avatar.id));
//       } else {
//         setAvatarUri(null);
//       }
//     } catch (err) {
//       console.error("Lỗi tải User Context:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Gọi API 1 lần duy nhất khi App khởi chạy
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <UserContext.Provider value={{ profile, avatarUri, isLoading, refreshProfile: fetchProfile }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Hook để các component khác dễ dàng lấy dữ liệu
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser phải được dùng bên trong UserProvider");
//   }
//   return context;
// };



// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfileById, getAvatarImage } from "@/services/api"; // Sửa đường dẫn nếu cần

interface ProfileData {
  username: string;
  avatar: { id: string } | null;
  bio: string;
  gender: string;
  target_type: string;
  hobby: string[];
  email: string;
  // Thêm các trường khác nếu cần
}

interface UserContextType {
  profile: ProfileData | null;
  avatarUri: string | null;
  isLoading: boolean;
  refreshProfile: () => void; // Dùng để gọi lại API khi ProfileForm update
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const idStr = localStorage.getItem("profile_id");
      if (!idStr) return; 
      
      const profileId = parseInt(idStr, 10);
      const data = await getProfileById(profileId);
      setProfile(data);

      if (data?.avatar?.id) {
        setAvatarUri(getAvatarImage(data.avatar.id));
      } else {
        setAvatarUri(null);
      }
    } catch (err) {
      console.error("Lỗi tải User Context:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CHỈ GỌI API 1 LẦN DUY NHẤT KHI PROVIDER MOUNT (Ứng dụng khởi chạy)
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ profile, avatarUri, isLoading, refreshProfile: fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng Context dễ dàng
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser phải được dùng bên trong UserProvider");
  }
  return context;
};