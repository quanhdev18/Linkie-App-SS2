// import React, { useState } from "react";
// import { createDailyStatus, deleteDailyStatus } from "../../../services/api";

// const DailyStatusModal = ({ open, onClose, status, onUpdated }: any) => {
//   const [text, setText] = useState(status?.content || "");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handleSave = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     await createDailyStatus(text);
//     setLoading(false);
//     onUpdated();
//     onClose();
//   };

//   const handleDelete = async () => {
//     setLoading(true);
//     await deleteDailyStatus();
//     setLoading(false);
//     onUpdated();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//       <div className="bg-white w-[320px] rounded-xl p-4 shadow-lg">
//         <h3 className="font-semibold mb-2">Ngày hôm nay của bạn thế nào</h3>

//         <textarea
//           maxLength={120}
//           rows={3}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full border rounded-lg p-2 text-sm"
//           placeholder="Bạn đang nghĩ gì?"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           PS: Trạng thái này sẽ được hiển thị trên hồ sơ của bạn trong 24 giờ.      
//         </p>
//         <div className="text-xs text-gray-400 text-right mt-1">
//           {text.length}/120
//         </div>

//         <div className="flex justify-between mt-4">
//           {status && (
//             <button
//               onClick={handleDelete}
//               className="text-red-500 text-sm"
//             >
//               Xoá
//             </button>
//           )}

//           <div className="flex gap-2 ml-auto">
//             <button onClick={onClose} className="text-sm">
//               Huỷ
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="bg-sky-500 text-white px-3 py-1 rounded-md text-sm"
//             >
//               Lưu
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DailyStatusModal;

import React, { useEffect, useState } from "react";
import { createDailyStatus, deleteDailyStatus } from "../../../services/api";

const DailyStatusModal = ({ open, onClose, status, onUpdated }: any) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ QUAN TRỌNG: sync khi mở modal hoặc status đổi
  useEffect(() => {
    if (open) {
      setText(status?.content || "");
    }
  }, [open, status]);

  if (!open) return null;

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      // ✅ nếu đã có → xoá trước
      if (status) {
        await deleteDailyStatus();
      }

      await createDailyStatus(text.trim());

      onUpdated();
      onClose();
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteDailyStatus();
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[320px] rounded-xl p-4 shadow-lg">
        <h3 className="font-semibold mb-2">
          {status ? "Trạng thái hôm nay của bạn" : "Ngày hôm nay của bạn thế nào"}
        </h3>

        <textarea
          maxLength={120}
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
          placeholder="Bạn đang nghĩ gì?"
        />

        <p className="text-xs text-gray-500 mt-1">
          Trạng thái hiển thị trên hồ sơ trong 24 giờ
        </p>

        <div className="text-xs text-gray-400 text-right mt-1">
          {text.length}/120
        </div>

        <div className="flex justify-between mt-4">
          {status && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-red-500 text-sm"
            >
              Xoá
            </button>
          )}

          <div className="flex gap-2 ml-auto">
            <button onClick={onClose} className="text-sm">
              Huỷ
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-sky-500 text-white px-3 py-1 rounded-md text-sm"
            >
              {status ? "Cập nhật" : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStatusModal;
