import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMatches,
  fetchConversations,
  // getAvatarImage,
  getUsersWhoLikedMe,
  getWhoLikedMe
} from "../../../services/api";
import defaultAvatar from "@/assets/image/image.png";

interface MatchQueueProps {
  limit?: number;
  onMatchCountChange?: (count: number) => void;
}

const MatchQueue: React.FC<MatchQueueProps> = ({ limit, onMatchCountChange }) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const storedId = localStorage.getItem("account_id");
        if (!storedId) {
          console.error("⚠️ Không tìm thấy account_id trong localStorage");
          return;
        }

        const parsedId = parseInt(storedId, 10);
        setAccountId(parsedId);

        const [matchData, convoData, likedList] = await Promise.all([
          fetchMatches(parsedId),
          fetchConversations(parsedId),
          getWhoLikedMe(parsedId),
        ]);

        const chattedUserIds = convoData.map((c: any) => c.partner_id);
        const unmessaged = matchData.filter((m: any) => !chattedUserIds.includes(m.id));

        setMatches(unmessaged);
        onMatchCountChange?.(unmessaged.length);

        setTotalLikes(Array.isArray(likedList) ? likedList.length : 0);
      } catch (err) {
        console.error("Lỗi khi tải match queue:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [onMatchCountChange]);

  const goToBeeline = () => {
    navigate("/upgrade");
  };

  const resolveAvatar = (avatarUrl: string | null | undefined) => {
    if (!avatarUrl) return defaultAvatar;

    // Nếu là link Cloudinary hoặc http(s) → giữ nguyên
    if (avatarUrl.startsWith("http")) return avatarUrl;

    // Nếu là đường dẫn static → thêm domain backend vào
    const fixed = avatarUrl.replace(/\\/g, "/"); // chuyển "\" → "/"
    return `http://127.0.0.1:8000/${fixed}`;
  };

  const goToChat = (toUserId: number, toUsername: string, avatarUrl: string | null) => {
    const resolved = resolveAvatar(avatarUrl);
    navigate(
      `/chat/${toUserId}?toUsername=${encodeURIComponent(
        toUsername
      )}&toAvatarUrl=${encodeURIComponent(resolved)}`
    );
  };

  const renderMatch = (m: any) => {
    const avatarUrl = resolveAvatar(m.avatar_url);
    return (
      <div
        key={m.id}
        className="flex flex-col items-center flex-shrink-0 cursor-pointer"
        onClick={() => goToChat(m.id, m.username || "Người dùng", m.avatar_url)}
      >
        <img
          src={avatarUrl}
          alt={m.username || "User"}
          className="w-12 h-12 rounded-full object-cover border-[2px] border-yellow-400"
          onError={(e) => (e.currentTarget.src = defaultAvatar)}
        />
      </div>
    );
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="flex items-center gap-3 pb-2">
      {/* Ảnh đầu tiên cố định */}
      <div
        className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-green-300 cursor-pointer hover:scale-105 transition"
        onClick={goToBeeline}
      >
        <span className="text-sm font-semibold text-gray-700">{totalLikes}</span>
        <div className="absolute inset-0 rounded-full border-[3px] border-teal-400 animate-pulse" />
      </div>

      {/* Container scroll ngang */}
      <div
        className="flex gap-3 overflow-x-auto flex-1"
        style={{ scrollbarWidth: "none" }}
        onWheel={(e) => {
          e.preventDefault(); // ngăn cuộn dọc mặc định
          const container = e.currentTarget;
          container.scrollLeft += e.deltaY; // cuộn ngang theo deltaY
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {matches.length === 0 ? (
          <div className="text-xs text-gray-500 flex items-center">
            Không có match mới
          </div>
        ) : (
          matches.map(renderMatch)
        )}
      </div>
    </div>
  );
};

export default MatchQueue;
