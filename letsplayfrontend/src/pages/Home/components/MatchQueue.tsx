// import React from "react";

// const mockQueue = [
//   { id: 1, name: "A", avatar: "/images/u5.jpg" },
//   { id: 2, name: "B", avatar: "/images/u6.jpg" },
//   { id: 3, name: "C", avatar: "/images/u7.jpg" },
// ];

// const MatchQueue: React.FC = () => {
//   return (
//     <div className="flex gap-3">
//       {mockQueue.map((m) => (
//         <div key={m.id} className="flex flex-col items-center">
//           <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border" />
//           <div className="text-xs text-gray-600 mt-1">{m.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MatchQueue;



// MatchQueue.tsx
// import React, { useEffect, useState } from "react";
// import { fetchMatches, getAvatarImage } from "../../../services/api";

// const MatchQueue: React.FC = () => {
//   const [matches, setMatches] = useState<any[]>([]);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadMatches = async () => {
//       try {
//         const storedId = localStorage.getItem("account_id"); // ⚠️ web
//         if (storedId) {
//           const parsedId = parseInt(storedId, 10);
//           setAccountId(parsedId);
//           const res = await fetchMatches(parsedId);
//           setMatches(res);
//         }
//       } catch (err) {
//         console.error("Lỗi khi tải danh sách match:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMatches();
//   }, []);

//   if (loading) {
//     return <div className="text-sm text-gray-500">Đang tải...</div>;
//   }

//   if (matches.length === 0) {
//     return <div className="text-sm text-gray-500">Chưa có tương tác mới.</div>;
//   }

//   return (
//     <div className="flex gap-3 overflow-x-auto pb-2">
//       {matches.map((m) => (
//         <div key={m.id} className="flex flex-col items-center">
//           <img
//             src={
//               m.avatar
//                 ? getAvatarImage(m.avatar.title || m.avatar)
//                 : "/images/default-avatar.png"
//             }
//             alt={m.username || "User"}
//             className="w-12 h-12 rounded-full object-cover border"
//           />
//           <div className="text-xs text-gray-600 mt-1">
//             {m.username || "Chưa đặt tên"}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MatchQueue;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // 🟢 thêm dòng này
// import { fetchMatches, getAvatarImage } from "../../../services/api";
// import defaultAvatar from "@/assets/image/image.png";

// const MatchQueue: React.FC = () => {
//   const [matches, setMatches] = useState<any[]>([]);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // 🟢 khởi tạo điều hướng

//   useEffect(() => {
//     const loadMatches = async () => {
//       try {
//         const storedId = localStorage.getItem("account_id");
//         if (storedId) {
//           const parsedId = parseInt(storedId, 10);
//           setAccountId(parsedId);
//           const res = await fetchMatches(parsedId);
//           setMatches(res);
//         }
//       } catch (err) {
//         console.error("Lỗi khi tải danh sách match:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMatches();
//   }, []);

//   // 🟢 Hàm điều hướng đến ChatPage
//   const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
//     const avatarUrl = avatarObj
//       ? getAvatarImage(avatarObj.title || avatarObj)
//       : null;

//     navigate(`/chat/${toUserId}?toUsername=${encodeURIComponent(toUsername)}&toAvatarUrl=${encodeURIComponent(avatarUrl || "")}`);
//   };

//   if (loading) {
//     return <div className="text-sm text-gray-500">Đang tải...</div>;
//   }

//   if (matches.length === 0) {
//     return <div className="text-sm text-gray-500">Chưa có tương tác mới.</div>;
//   }

//   return (
//     <div className="flex gap-3 overflow-x-auto pb-2">
//       {matches.map((m) => (
//         <div
//           key={m.id}
//           className="flex flex-col items-center cursor-pointer"
//           onClick={() => goToChat(m.id, m.username || "Người dùng", m.avatar)}
//         >
//           <img
//             src={
//               m.avatar
//                 ? getAvatarImage(m.avatar.title || m.avatar)
//                 : defaultAvatar
//             }
//             alt={m.username || "User"}
//             className="w-12 h-12 rounded-full object-cover border"
//           />
//           <div className="text-xs text-gray-600 mt-1">
//             {m.username || "Chưa đặt tên"}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MatchQueue;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchMatches, fetchConversations, getAvatarImage } from "../../../services/api";
// import defaultAvatar from "@/assets/image/image.png";

// interface MatchQueueProps {
//   totalLikes?: number; // tổng số người đã thích mình (chưa match)
//   limit?: number;
//   onMatchCountChange?: (count: number) => void;
// }

// const MatchQueue: React.FC<MatchQueueProps> = ({ totalLikes = 50, limit, onMatchCountChange }) => {
//   const [matches, setMatches] = useState<any[]>([]);
//   const [conversations, setConversations] = useState<any[]>([]);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const loadMatchesAndChats = async () => {
//     try {
//       const storedId = localStorage.getItem("account_id");
//       if (!storedId) return;
//       const parsedId = parseInt(storedId, 10);
//       setAccountId(parsedId);

//       const [matchData, convoData] = await Promise.all([
//         fetchMatches(parsedId),
//         fetchConversations(parsedId),
//       ]);

//       const chattedUserIds = convoData.map((c: any) => c.partner_id);
//       const unmessaged = matchData.filter(
//         (m: any) => !chattedUserIds.includes(m.id)
//       );

//       setMatches(unmessaged);
//       onMatchCountChange?.(unmessaged.length); // 🟢 báo lên Sidebar đúng số match chưa nhắn
//     } catch (err) {
//       console.error("Lỗi khi tải match queue:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadMatchesAndChats();
// }, []);

//    const goToBeeline = () => {
//     navigate("/upgrade");
//   };

//   const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
//     const avatarUrl = avatarObj
//       ? getAvatarImage(avatarObj.title || avatarObj)
//       : null;

//     navigate(
//       `/chat/${toUserId}?toUsername=${encodeURIComponent(
//         toUsername
//       )}&toAvatarUrl=${encodeURIComponent(avatarUrl || "")}`
//     );
//   };

//   if (loading) {
//     return <div className="text-sm text-gray-500">Đang tải...</div>;
//   }

//   return (
//     <div className="flex items-center gap-3 overflow-x-auto pb-2">
//       {/* 🟡 Ảnh đầu tiên hiển thị tổng số lượt thích (chưa match) */}
//       <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-green-300" onClick={goToBeeline}>
//         <span className="text-sm font-semibold text-gray-700">{totalLikes}</span>
//         <div className="absolute inset-0 rounded-full border-[3px] border-teal-400 animate-pulse" />
//       </div>

//       {/* 🟢 Danh sách match chưa nhắn tin */}
//       {matches.length === 0 ? (
//         <div className="text-xs text-gray-500">Không có match mới</div>
//       ) : (
//         matches.map((m) => (
//           <div
//             key={m.id}
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => goToChat(m.id, m.username || "Người dùng", m.avatar)}
//           >
//             <div className="relative">
//               <img
//                 src={
//                   m.avatar
//                     ? getAvatarImage(m.avatar.title || m.avatar)
//                     : defaultAvatar
//                 }
//                 alt={m.username || "User"}
//                 className="w-12 h-12 rounded-full object-cover border-[2px] border-yellow-400"
//               />
//             </div>
//             {/* <div className="text-[11px] text-gray-600 mt-1 truncate max-w-[60px] text-center">
//               {m.username || "Ẩn danh"}
//             </div> */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MatchQueue;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMatches,
  fetchConversations,
  getAvatarImage,
  getUsersWhoLikedMe, // ✅ Thêm API này
} from "../../../services/api";
import defaultAvatar from "@/assets/image/image.png";

interface MatchQueueProps {
  limit?: number;
  onMatchCountChange?: (count: number) => void;
}

const MatchQueue: React.FC<MatchQueueProps> = ({ limit, onMatchCountChange }) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0); // ✅ lưu số người đã thích mình
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // const storedId = localStorage.getItem("account_id");
        // const userId = localStorage.getItem("user_id");
        // if (!storedId || !userId) return;
        const storedId = localStorage.getItem("account_id");
        if (!storedId) {
          console.error("⚠️ Không tìm thấy account_id trong localStorage");
          return;
        }

        const parsedId = parseInt(storedId, 10);
        setAccountId(parsedId);

        // 🟢 Lấy danh sách match & chat
        const [matchData, convoData, likedList] = await Promise.all([
          fetchMatches(parsedId),
          fetchConversations(parsedId),
          getUsersWhoLikedMe(parsedId),
        ]);

        const chattedUserIds = convoData.map((c: any) => c.partner_id);
        const unmessaged = matchData.filter(
          (m: any) => !chattedUserIds.includes(m.id)
        );

        setMatches(unmessaged);
        onMatchCountChange?.(unmessaged.length);

        // 🟢 Cập nhật tổng số người đã thích mình
        const likeCount = Array.isArray(likedList) ? likedList.length : 0;
        setTotalLikes(likeCount);
      } catch (err) {
        console.error("Lỗi khi tải match queue:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const goToBeeline = () => {
    navigate("/upgrade");
  };

  const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
    const avatarUrl = avatarObj
      ? getAvatarImage(avatarObj.title || avatarObj)
      : null;

    navigate(
      `/chat/${toUserId}?toUsername=${encodeURIComponent(
        toUsername
      )}&toAvatarUrl=${encodeURIComponent(avatarUrl || "")}`
    );
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {/* 🟢 Ảnh đầu tiên hiển thị tổng số lượt thích */}
      <div
        className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-green-300 cursor-pointer hover:scale-105 transition"
        onClick={goToBeeline}
      >
        <span className="text-sm font-semibold text-gray-700">
          {totalLikes}
        </span>
        <div className="absolute inset-0 rounded-full border-[3px] border-teal-400 animate-pulse" />
      </div>

      {/* 🟡 Danh sách match chưa nhắn tin */}
      {matches.length === 0 ? (
        <div className="text-xs text-gray-500">Không có match mới</div>
      ) : (
        matches.map((m) => (
          <div
            key={m.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => goToChat(m.id, m.username || "Người dùng", m.avatar)}
          >
            <img
              src={
                m.avatar
                  ? getAvatarImage(m.avatar.title || m.avatar)
                  : defaultAvatar
              }
              alt={m.username || "User"}
              className="w-12 h-12 rounded-full object-cover border-[2px] border-yellow-400"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MatchQueue;

