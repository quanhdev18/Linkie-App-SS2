import React from "react";
import { Cloud } from "lucide-react";

const DailyStatusBubble = ({ content, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="ml-2 flex items-center gap-1 max-w-[120px]
        bg-sky-100 text-sky-800 text-xs px-3 py-1
        rounded-full shadow-sm hover:bg-sky-200 transition"
    >
      <Cloud size={14} />
      <span className="truncate">{content || "Ngày hôm nay của bạn thế nào"}</span>
    </button>
  );
};

export default DailyStatusBubble;
