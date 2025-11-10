// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchConversations, getAvatarImage } from "../../../services/api";

// const MessageList: React.FC = () => {
//   const [conversations, setConversations] = useState<any[]>([]);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedId = localStorage.getItem("account_id");
//         if (storedId) {
//           const parsedId = parseInt(storedId, 10);
//           setAccountId(parsedId);
//           const convos = await fetchConversations(parsedId);
//           console.log("🧠 Dữ liệu fetchConversations:", convos);
//           setConversations(convos);
//         }
//       } catch (err) {
//         console.error("Lỗi khi tải danh sách hội thoại:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (!accountId) return;

//     // const socket = new WebSocket(`ws://localhost:8000/ws/chat/${accountId}`);
//     const token = localStorage.getItem("token");
//     const socket = new WebSocket(`ws://localhost:8000/ws/chat?token=${token}`);

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("📩 Tin nhắn mới:", data);

//       // Nếu là tin nhắn mới, cập nhật vào danh sách hội thoại
//       if (data.type === "new_message") {
//         setConversations((prevConversations) => {
//           // Cập nhật hội thoại tương ứng
//           const updated = [...prevConversations];
//           const index = updated.findIndex((c) => c.partner_id === data.from_id);

//           if (index >= 0) {
//             updated[index] = {
//               ...updated[index],
//               last_message: data.content,
//               last_sender_id: data.from_id,
//               updated_at: new Date().toISOString(),
//             };
//           } else {
//             // nếu hội thoại chưa có -> thêm mới
//             updated.unshift({
//               partner_id: data.from_id,
//               partner_name: data.from_username,
//               partner_avatar: data.from_avatar,
//               last_message: data.content,
//               last_sender_id: data.from_id,
//             });
//           }
//           // Sắp xếp lại theo thời gian gần nhất
//           return updated.sort(
//             (a, b) =>
//               new Date(b.updated_at || 0).getTime() -
//               new Date(a.updated_at || 0).getTime()
//           );
//         });
//       }
//     };

//     socket.onclose = () => console.log("🔌 WebSocket closed.");
//     socket.onerror = (err) => console.error("WebSocket error:", err);

//     return () => socket.close();
//   }, [accountId]);



//   if (loading) {
//     return <div className="text-center text-gray-500 text-sm">Đang tải...</div>;
//   }

//   if (conversations.length === 0) {
//     return (
//       <div className="text-center text-gray-500 text-sm">
//         Bạn chưa có cuộc trò chuyện nào.
//       </div>
//     );
//   }

//   return (
//     <ul className="space-y-3">
//       {conversations.map((conv) => (
//         // <Link key={conv.partner_id} to={`/chat/${conv.partner_id}`}>
//         <Link
//           key={conv.partner_id}
//           to={`/chat/${conv.partner_id}?toUsername=${encodeURIComponent(
//             conv.partner_name ?? ""
//           )}&toAvatarUrl=${encodeURIComponent(
//             getAvatarImage(conv.partner_avatar?.title || conv.partner_avatar || "")
//           )}`}
//         >


//           <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
//             <img
//               src={
//                 conv.partner_avatar
//                   ? getAvatarImage(conv.partner_avatar.title || conv.partner_avatar)
//                   : "/images/default-avatar.png"
//               }
//               alt={conv.partner_name}
//               className="w-10 h-10 rounded-full object-cover border"
//             />
//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <div className="font-medium text-sm">{conv.partner_name}</div>
//                 {conv.last_sender_id !== accountId && conv.last_message && (
//                   <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
//                     Your move
//                   </span>
//                 )}
//               </div>
//               <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px] sm:max-w-[190px]">
//                 {conv.last_message || "Chưa có tin nhắn"}
//               </div>

//             </div>
//           </li>
//         </Link>
//       ))}
//     </ul>
//   );
// };

// export default MessageList;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   fetchConversations,
//   getAvatarImage,
//   createChatSocket,
//   createNotificationSocket,
// } from "../../../services/api";

// const MessageList: React.FC = () => {
//   const [conversations, setConversations] = useState<any[]>([]);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load initial conversations
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedId = localStorage.getItem("account_id");
//         if (storedId) {
//           const parsedId = parseInt(storedId, 10);
//           setAccountId(parsedId);
//           const convos = await fetchConversations(parsedId);
//           console.log("🧠 Dữ liệu fetchConversations:", convos);
//           setConversations(convos);
//         }
//       } catch (err) {
//         console.error("Lỗi khi tải danh sách hội thoại:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   // WebSocket connections
//   useEffect(() => {
//     if (!accountId) return;

//     const chatSocket = createChatSocket();
//     const notificationSocket = createNotificationSocket(accountId);

//     const handleMessage = (event: MessageEvent) => {
//       const data = JSON.parse(event.data);
//       console.log("📩 WS message:", data);

//       if (data.type === "new_message") {
//         setConversations((prev) => {
//           const updated = [...prev];
//           const index = updated.findIndex((c) => c.partner_id === data.from_user_id);

//           if (index >= 0) {
//             updated[index] = {
//               ...updated[index],
//               last_message: data.content,
//               last_sender_id: data.from_user_id,
//               updated_at: new Date().toISOString(),
//             };
//           } else {
//             updated.unshift({
//               partner_id: data.from_user_id,
//               partner_name: data.from_username,
//               partner_avatar: data.from_avatar,
//               last_message: data.content,
//               last_sender_id: data.from_user_id,
//               updated_at: new Date().toISOString(),
//             });
//           }

//           return updated.sort(
//             (a, b) =>
//               new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
//           );
//         });
//       }
//     };

//     chatSocket?.addEventListener("message", handleMessage);
//     notificationSocket?.addEventListener("message", handleMessage);

//     return () => {
//       chatSocket?.close();
//       notificationSocket?.close();
//     };
//   }, [accountId]);

//   if (loading)
//     return <div className="text-center text-gray-500 text-sm">Đang tải...</div>;

//   if (conversations.length === 0)
//     return <div className="text-center text-gray-500 text-sm">Bạn chưa có cuộc trò chuyện nào.</div>;

//   return (
//     <ul className="space-y-3">
//       {conversations.map((conv) => (
//         <Link
//           key={conv.partner_id}
//           to={`/chat/${conv.partner_id}?toUsername=${encodeURIComponent(
//             conv.partner_name ?? ""
//           )}&toAvatarUrl=${encodeURIComponent(
//             getAvatarImage(conv.partner_avatar?.title || conv.partner_avatar || "")
//           )}`}
//         >
//           <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
//             <img
//               src={
//                 conv.partner_avatar
//                   ? getAvatarImage(conv.partner_avatar.title || conv.partner_avatar)
//                   : "/images/default-avatar.png"
//               }
//               alt={conv.partner_name}
//               className="w-10 h-10 rounded-full object-cover border"
//             />
//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <div className="font-medium text-sm">{conv.partner_name}</div>
//                 {conv.last_sender_id !== accountId && conv.last_message && (
//                   <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
//                     Your move
//                   </span>
//                 )}
//               </div>
//               <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px] sm:max-w-[190px]">
//                 {conv.last_message || "Chưa có tin nhắn"}
//               </div>
//             </div>
//           </li>
//         </Link>
//       ))}
//     </ul>
//   );
// };

// export default MessageList;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchConversations,
  getAvatarImage,
  createChatSocket,
  createNotificationSocket,
} from "../../../services/api";

const MessageList: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 1. Fetch danh sách hội thoại ban đầu
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedId = localStorage.getItem("account_id");
        if (storedId) {
          const parsedId = parseInt(storedId, 10);
          setAccountId(parsedId);
          const convos = await fetchConversations(parsedId);
          console.log("🧠 fetchConversations:", convos);
          setConversations(convos || []);
        }
      } catch (err) {
        console.error("Lỗi tải hội thoại:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ✅ 2. Kết nối WebSocket realtime
  useEffect(() => {
    if (!accountId) return;

    const chatSocket = createChatSocket();
    const notificationSocket = createNotificationSocket(accountId);

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== "new_message") return;

      const {
        from_user_id,
        to_user_id,
        from_username,
        from_avatar,
        to_username,
        to_avatar,
        content,
      } = data;

      const partnerId = from_user_id === accountId ? to_user_id : from_user_id;
      const partnerName =
        from_user_id === accountId ? to_username ?? "Người lạ" : from_username ?? "Người lạ";
      const partnerAvatar =
        from_user_id === accountId ? to_avatar ?? "" : from_avatar ?? "";

      // ✅ Cập nhật danh sách hội thoại realtime
      setConversations((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((c) => c.partner_id === partnerId);

        const newConv = {
          partner_id: partnerId,
          partner_name: partnerName,
          partner_avatar: partnerAvatar,
          last_message: content,
          last_sender_id: from_user_id,
          updated_at: new Date().toISOString(),
        };

        if (index >= 0) {
          updated[index] = { ...updated[index], ...newConv };
        } else {
          updated.unshift(newConv);
        }

        // sắp xếp theo thời gian mới nhất
        return updated.sort(
          (a, b) =>
            new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
        );
      });
    };

    chatSocket?.addEventListener("message", handleMessage);
    notificationSocket?.addEventListener("message", handleMessage);

    return () => {
      chatSocket?.close();
      notificationSocket?.close();
    };
  }, [accountId]);

  // ✅ 3. UI hiển thị
  if (loading)
    return <div className="text-center text-gray-500 text-sm">Đang tải...</div>;

  if (conversations.length === 0)
    return <div className="text-center text-gray-500 text-sm">Bạn chưa có cuộc trò chuyện nào.</div>;

  return (
    <ul className="space-y-3">
      {conversations.map((conv) => {
        const isPartnerTurn = conv.last_sender_id !== accountId; // nếu người gửi cuối cùng ≠ mình ⇒ Your move
        return (
          <Link
            key={conv.partner_id}
            to={`/chat/${conv.partner_id}?toUsername=${encodeURIComponent(
              conv.partner_name ?? ""
            )}&toAvatarUrl=${encodeURIComponent(
              getAvatarImage(conv.partner_avatar?.title || conv.partner_avatar || "")
            )}`}
          >
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <img
                src={
                  conv.partner_avatar
                    ? getAvatarImage(conv.partner_avatar.title || conv.partner_avatar)
                    : "/images/default-avatar.png"
                }
                alt={conv.partner_name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{conv.partner_name}</div>
                  {isPartnerTurn && conv.last_message && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      Your move
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px] sm:max-w-[190px]">
                  {conv.last_message || "Chưa có tin nhắn"}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default MessageList;
