// import React from "react";
// import { useParams } from "react-router-dom";

// // Import các icon (bạn cần thay thế bằng icon thật của mình)
// // import { Video, Phone, X } from "lucide-react"; 

// // Import ảnh mẫu (thay thế bằng dữ liệu thật)
// import userImage1 from "@/assets/image/tracy.jpg"; // Ảnh của Huyen Trang
// import userImage2 from "@/assets/image/u2.jpg";    // Ảnh của Huyen Trang
// import gifImage from "@/assets/image/u3.jpg";  // Ảnh GIF

// const ChatPage: React.FC = () => {
//   // Lấy ID của cuộc trò chuyện từ URL, ví dụ: /chat/1
//   const { chatId } = useParams();

//   // (Trong tương lai, bạn sẽ dùng chatId này để fetch dữ liệu chat)

//   return (
//     // Layout 2 cột: Chat chính (flex-1) và Profile (w-80)
//     <div className="flex h-screen">

//       {/* ================================== */}
//       {/* 1. KHUNG CHAT CHÍNH (Ở GIỮA) */}
//       {/* ================================== */}
//       <main className="flex-1 flex flex-col h-screen">

//         {/* Header của Chat */}
//         <header className="h-16 border-b flex items-center justify-between px-6">
//           <div className="flex items-center gap-3">
//             <img src={userImage1} alt="Huyen Trang" className="w-10 h-10 rounded-full object-cover" />
//             <div className="font-bold">Huyen Trang</div>
//           </div>
//           <div className="flex items-center gap-4">
//             {/* <Phone size={20} className="cursor-pointer" />
//             <Video size={20} className="cursor-pointer" />
//             <X size={20} className="cursor-pointer" /> */}
//             <span>[Icon Phone] [Icon Video] [Icon X]</span>
//           </div>
//         </header>

//         {/* Nội dung tin nhắn */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           <div className="text-center text-xs text-gray-500 uppercase">
//             Yesterday
//           </div>

//           {/* Tin nhắn GIF (từ ảnh bạn gửi) */}
//           <div className="flex justify-start">
//             <img 
//               src={gifImage} 
//               alt="waving gif" 
//               className="w-48 rounded-lg" 
//             />
//           </div>

//           {/* Thông báo (từ ảnh bạn gửi) */}
//           <div className="text-center text-sm text-gray-500 py-4">
//             You have 15 hours to respond
//             <br />
//             Or confirm they're the real deal
//           </div>
//         </div>

//         {/* Footer (ô nhập tin nhắn) */}
//         <footer className="h-16 border-t p-4 flex items-center">
//           <input
//             type="text"
//             placeholder="Start chatting..."
//             className="w-full h-full px-4 border rounded-lg focus:outline-none"
//           />
//         </footer>
//       </main>

//       {/* ================================== */}
//       {/* 2. THANH PROFILE (BÊN PHẢI) */}
//       {/* ================================== */}
//       <aside className="w-80 border-l p-6 overflow-y-auto no-scrollbar">
//         <img src={userImage1} alt="Profile" className="rounded-lg w-full" />
//         <div className="font-bold text-lg mt-2">Huyen Trang, 24</div>

//         <div className="mt-4">
//           <h3 className="font-semibold text-sm mb-2">About Huyen Trang</h3>
//           <div className="flex flex-wrap gap-2 text-xs">
//             {/* Các tag info */}
//             <span className="bg-gray-100 p-2 rounded-lg">163 cm</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Rarely</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Never</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Relationship</span>
//           </div>
//         </div>

//         <img src={userImage2} alt="Profile 2" className="rounded-lg w-full mt-4" />
//       </aside>

//     </div>
//   );
// };

// export default ChatPage;



// import React from "react";
// import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPhone,
//   faVideo,
//   faEllipsisVertical,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";

// // Import ảnh mẫu (thay thế bằng dữ liệu thật)
// import userImage1 from "@/assets/image/tracy.jpg"; // Ảnh của Huyen Trang
// import userImage2 from "@/assets/image/u2.jpg";    // Ảnh phụ
// import gifImage from "@/assets/image/u3.jpg";      // Ảnh GIF

// const ChatPage: React.FC = () => {
//   // Lấy ID của cuộc trò chuyện từ URL, ví dụ: /chat/1
//   const { chatId } = useParams();

//   return (
//     // Layout 2 cột: Chat chính (flex-1) và Profile (w-80)
//     <div className="flex h-screen">

//       {/* ================================== */}
//       {/* 1. KHUNG CHAT CHÍNH (Ở GIỮA) */}
//       {/* ================================== */}
//       <main className="flex-1 flex flex-col h-screen">

//         {/* Header của Chat */}
//         <header className="h-16 border-b flex items-center justify-between px-6">
//           <div className="flex items-center gap-3">
//             <img
//               src={userImage1}
//               alt="Huyen Trang"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div className="font-bold">Huyen Trang</div>
//           </div>

//           {/* ✅ ICONS FONT AWESOME */}
//           <div className="flex items-center gap-5 text-gray-600">
//             <FontAwesomeIcon icon={faPhone} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faVideo} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faEllipsisVertical} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faXmark} className="cursor-pointer hover:text-black" />
//           </div>
//         </header>

//         {/* Nội dung tin nhắn */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           <div className="text-center text-xs text-gray-500 uppercase">
//             Yesterday
//           </div>

//           {/* Tin nhắn GIF */}
//           <div className="flex justify-start">
//             <img
//               src={gifImage}
//               alt="waving gif"
//               className="w-48 rounded-lg"
//             />
//           </div>

//           {/* Thông báo */}
//           <div className="text-center text-sm text-gray-500 py-4">
//             You have 15 hours to respond
//             <br />
//             Or confirm they're the real deal
//           </div>
//         </div>

//         {/* Footer (ô nhập tin nhắn) */}
//         <footer className="h-16 border-t p-4 flex items-center">
//           <input
//             type="text"
//             placeholder="Start chatting..."
//             className="w-full h-full px-4 border rounded-lg focus:outline-none"
//           />
//         </footer>
//       </main>

//       {/* ================================== */}
//       {/* 2. THANH PROFILE (BÊN PHẢI) */}
//       {/* ================================== */}
//       <aside className="w-80 border-l p-6 overflow-y-auto no-scrollbar">
//         <img src={userImage1} alt="Profile" className="rounded-lg w-full" />
//         <div className="font-bold text-lg mt-2">Huyen Trang, 24</div>

//         <div className="mt-4">
//           <h3 className="font-semibold text-sm mb-2">About Huyen Trang</h3>
//           <div className="flex flex-wrap gap-2 text-xs">
//             <span className="bg-gray-100 p-2 rounded-lg">163 cm</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Rarely</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Never</span>
//             <span className="bg-gray-100 p-2 rounded-lg">Relationship</span>
//           </div>
//         </div>

//         <img src={userImage2} alt="Profile 2" className="rounded-lg w-full mt-4" />
//       </aside>

//     </div>
//   );
// };

// export default ChatPage;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPhone,
//   faVideo,
//   faEllipsisVertical,
//   faXmark,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";

// import { getMessageHistory, createChatSocket } from "../../services/api";
// import defaultAvatar from "@/assets/image/image.png";

// const ChatPage: React.FC = () => {
//   const { chatId } = useParams();
//   const [searchParams] = useSearchParams();

//   // ✅ Lấy thêm thông tin từ URL
//   const toUserId = chatId ? parseInt(chatId) : null;
//   const toUsername = searchParams.get("toUsername") || "Người dùng";
//   const toAvatarUrl = searchParams.get("toAvatarUrl");

//   const [messages, setMessages] = useState<any[]>([]);
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [content, setContent] = useState("");
//   const [userId, setUserId] = useState<number | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 🧠 Load lịch sử tin nhắn
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const storedId = localStorage.getItem("account_id");
//         if (!storedId || !toUserId) return;
//         const parsedId = parseInt(storedId, 10);
//         setUserId(parsedId);

//         const history = await getMessageHistory(parsedId, toUserId);
//         setMessages(history || []);
//       } catch (err) {
//         console.error("❌ Lỗi khi tải lịch sử chat:", err);
//       }
//     };
//     fetchHistory();
//   }, [toUserId]);

//   // 🔌 Kết nối WebSocket
//   useEffect(() => {
//     if (!userId) return;

//     const ws = createChatSocket(userId);
//     if (!ws) return;

//     ws.onopen = () => {
//       console.log("✅ WebSocket connected");
//       setSocket(ws);
//     };

//     ws.onmessage = (event) => {
//       try {
//         const msg = JSON.parse(event.data);
//         if (msg.from_user_id == toUserId) {
//           setMessages((prev) => [...prev, msg]);
//         }
//       } catch (error) {
//         console.error("❌ WebSocket error:", error);
//       }
//     };

//     ws.onerror = (err) => {
//       console.error("⚠️ WS error:", err);
//     };

//     return () => ws.close();
//   }, [userId, toUserId]);

//   // 📤 Gửi tin nhắn
//   const sendMessage = () => {
//     if (!socket || socket.readyState !== WebSocket.OPEN || !content.trim()) {
//       console.warn("⚠️ Socket chưa sẵn sàng hoặc nội dung rỗng");
//       return;
//     }

//     const message = {
//       from_user_id: userId,
//       to_user_id: toUserId,
//       content: content.trim(),
//       created_at: new Date().toISOString(),
//     };

//     socket.send(JSON.stringify(message));
//     setMessages((prev) => [...prev, message]);
//     setContent("");
//   };

//   // 🔽 Auto scroll xuống cuối
//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages]);

//   return (
//     <div className="flex h-screen">
//       {/* ============================ */}
//       {/* 1️⃣ KHUNG CHAT CHÍNH */}
//       {/* ============================ */}
//       <main className="flex-1 flex flex-col h-screen">
//         {/* Header */}
//         <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
//           <div className="flex items-center gap-3">
//             <img
//               src={toAvatarUrl || defaultAvatar}
//               alt={toUsername}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div className="font-bold text-gray-800">{toUsername}</div>
//           </div>

//           <div className="flex items-center gap-5 text-gray-600">
//             <FontAwesomeIcon icon={faPhone} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faVideo} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faEllipsisVertical} className="cursor-pointer hover:text-black" />
//             <FontAwesomeIcon icon={faXmark} className="cursor-pointer hover:text-black" />
//           </div>
//         </header>

//         {/* Nội dung tin nhắn */}
//         <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
//           {messages.length === 0 ? (
//             <div className="text-center text-gray-500 text-sm italic mt-10">
//               Chưa có tin nhắn nào
//             </div>
//           ) : (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.from_user_id == userId ? "justify-end" : "justify-start"
//                   }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-2xl text-sm max-w-[60%] ${msg.from_user_id == userId
//                       ? "bg-blue-500 text-white"
//                       : "bg-white border"
//                     }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Ô nhập tin nhắn */}
//         <footer className="p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
//           <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm">
//             <input
//               type="text"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Start chatting..."
//               className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//             />
//             {/* Bạn có thể thêm các icon nhỏ ở đây nếu cần */}
//             <button
//               onClick={sendMessage}
//               className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition text-white shadow-md"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} />
//             </button>
//           </div>
//         </footer>

//       </main>

//       {/* ============================ */}
//       {/* 2️⃣ THANH PROFILE (bên phải) */}
//       {/* ============================ */}
//       <aside className="w-80 border-l p-6 overflow-y-auto bg-white">
//         <img
//           src={toAvatarUrl || defaultAvatar}
//           alt="Profile"
//           className="rounded-lg w-full"
//         />
//         <div className="font-bold text-lg mt-2">{toUsername}</div>

//         <div className="mt-4">
//           <h3 className="font-semibold text-sm mb-2">About</h3>
//           <div className="flex flex-wrap gap-2 text-xs">
//             <span className="bg-gray-100 p-2 rounded-lg">Chưa có thông tin</span>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default ChatPage;




import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom"; // 🟢 thêm useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVideo,
  faEllipsisVertical,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { getMessageHistory, createChatSocket } from "../../services/api";
import defaultAvatar from "@/assets/image/image.png";
import ProfileSidebar from "./ProfileSidebar"; // 🟢 import component ProfileSidebar
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const ChatPage: React.FC = () => {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 🟢 khởi tạo navigate

  // ✅ Lấy thông tin từ URL
  const toUserId = chatId ? parseInt(chatId) : null;
  const toUsername = searchParams.get("toUsername") || "Người dùng";
  const toAvatarUrl = searchParams.get("toAvatarUrl");

  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const ZEGO_APP_ID = 1301516268;
  const ZEGO_SERVER_SECRET = "2530e567b9e5eccc224e88114e75473f";
  const [showCall, setShowCall] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video">("video");
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const joinedRef = useRef(false);


  const startCall = (type: "voice" | "video") => {
    if (!socket || !userId || !toUserId || !chatId) return;

    socket.send(
      JSON.stringify({
        type: "CALL_INVITE",
        from_user_id: userId,
        to_user_id: toUserId,
        call_type: type,
        room_id: `chat_${chatId}`,
      })
    );
  };



  const acceptCall = () => {
    if (!socket || !incomingCall) return;

    socket.send(
      JSON.stringify({
        type: "CALL_ACCEPT",
        from_user_id: userId,
        to_user_id: incomingCall.from_user_id,
        room_id: incomingCall.room_id,
        call_type: incomingCall.call_type,
      })
    );

    joinZegoRoom(incomingCall.room_id, incomingCall.call_type);
    setIncomingCall(null);
  };

  const joinZegoRoom = (roomId: string, type: "voice" | "video") => {
    if (joinedRef.current) return; // ⛔ chặn join lặp
    joinedRef.current = true;

    setShowCall(true);

    setTimeout(() => {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        ZEGO_APP_ID,
        ZEGO_SERVER_SECRET,
        roomId,
        userId!.toString(),
        "User"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: document.getElementById("zego-call")!,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showTurnOffCameraButton: type === "voice",
        onLeaveRoom: () => {
          joinedRef.current = false;   // ✅ reset
          setShowCall(false);
        },
      });
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedId = localStorage.getItem("account_id");
        if (!storedId || !toUserId) return;
        const parsedId = parseInt(storedId, 10);
        setUserId(parsedId);

        const history = await getMessageHistory(parsedId, toUserId);
        setMessages(history || []);
      } catch (err) {
        console.error("❌ Lỗi khi tải lịch sử chat:", err);
      }
    };
    fetchHistory();
  }, [toUserId]);

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("⚠️ Không có token — không thể kết nối WebSocket");
      return;
    }

    const ws = createChatSocket(); // sẽ tự truyền token
    if (!ws) return;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      // 📞 cuộc gọi đến
      if (msg.type === "CALL_INVITE" && msg.to_user_id === userId) {
        console.log("📞 Incoming call", msg);
        setIncomingCall(msg);
        return;
      }

      // 📞 accept call
      if (msg.type === "CALL_ACCEPT" && msg.to_user_id === userId) {
        joinZegoRoom(msg.room_id, msg.call_type);
        return;
      }

      // 💬 chat message
      if (msg.content) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    ws.onerror = (err) => console.error("⚠️ WS error:", err);

    return () => ws.close();
  }, [userId, toUserId]);


  // 📤 Gửi tin nhắn
  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !content.trim()) {
      console.warn("⚠️ Socket chưa sẵn sàng hoặc nội dung rỗng");
      return;
    }

    const message = {
      from_user_id: userId,
      to_user_id: toUserId,
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    socket.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setContent("");
  };

  // 🔽 Auto scroll xuống cuối
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setContent((prev) => prev + emojiData.emoji);
  };


  return (
    <div className="flex h-screen ">
      <main className="flex-1 flex flex-col h-screen ">
        {/* Header */}
        <header className="h-20 border-b flex items-center justify-between px-6 bg-white">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfile(true)}>
            <img
              src={toAvatarUrl || defaultAvatar}
              alt={toUsername}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="font-bold text-gray-800">{toUsername}</div>
          </div>

          <div className="flex items-center gap-5 text-gray-600">
            {/* <FontAwesomeIcon icon={faPhone} className="cursor-pointer hover:text-black" />
            <FontAwesomeIcon icon={faVideo} className="cursor-pointer hover:text-black" /> */}
            <FontAwesomeIcon
              icon={faPhone}
              className="cursor-pointer hover:text-black"
              onClick={() => startCall("voice")}
            />

            <FontAwesomeIcon
              icon={faVideo}
              className="cursor-pointer hover:text-black"
              onClick={() => startCall("video")}
            />

            <div className="relative" ref={menuRef}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="cursor-pointer hover:text-black"
                onClick={() => setShowMenu((prev) => !prev)}
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <button
                    onClick={() => {
                      console.log("Unmatch clicked");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      console.log("Block and report clicked");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl"
                  >
                    Báo cáo
                  </button>
                </div>
              )}
            </div>

            {/* 🟢 Nút X — quay lại trang home */}
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/home")} // ⬅️ quay lại Home
            />
          </div>
        </header>

        {/* Nội dung tin nhắn */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm italic mt-10">
              Chưa có tin nhắn nào, hãy bắt đầu cuộc trò chuyện ngay bây giờ!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from_user_id == userId ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[60%] break-words whitespace-pre-wrap ${msg.from_user_id == userId
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                    }`}
                >
                  {msg.content}
                </div>

              </div>
            ))
          )}
        </div>

        <footer className="p-3 bg-white border-gray-200 relative">
          {showEmoji && (
            <div className="absolute bottom-16 left-3 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <div className="flex items-center gap-2 bg-gray-50 border rounded-full px-3 py-1.5">
            <button
              onClick={() => setShowEmoji((prev) => !prev)}
              className="text-xl"
            >
              😊
            </button>

            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            <button onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </footer>

      </main>
      {showCall && (
        <div className="fixed inset-0 bg-black z-[9999]">
          <div id="zego-call" className="w-full h-full" />
        </div>
      )}


      <ProfileSidebar
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        userId={toUserId}
      />

      {incomingCall && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-2xl w-80 p-6 text-center shadow-xl">

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={toAvatarUrl || defaultAvatar}
                alt="caller"
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>

            {/* Caller name */}
            <p className="text-lg font-semibold text-gray-800">
              Cuộc gọi đến từ
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {toUsername}
            </p>

            {/* Call type */}
            <p className="text-sm text-gray-500 mt-1">
              {incomingCall.call_type === "video"
                ? "Cuộc gọi video"
                : "Cuộc gọi thoại"}
            </p>

            {/* Action buttons */}
            <div className="flex justify-between items-center mt-8 px-6">

              {/* Reject */}
              <button
                onClick={() => setIncomingCall(null)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-white text-xl"
                />
              </button>

              {/* Accept */}
              <button
                onClick={acceptCall}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition"
              >
                <FontAwesomeIcon
                  icon={
                    incomingCall.call_type === "video" ? faVideo : faPhone
                  }
                  className="text-white text-xl"
                />
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ChatPage;
