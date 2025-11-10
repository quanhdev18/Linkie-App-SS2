// import React from 'react';

// const Setting = () => {
//     return (
//         <div>
//             Day la Advice
//         </div>
//     );
// };

// export default Setting;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";

// const Setting = () => {
//   const [videos, setVideos] = useState([]);
//   const [tips, setTips] = useState([]);
//   const [activeTab, setActiveTab] = useState("videos");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("access_token");

//   const fetchAdvice = async () => {
//     try {
//       const token = localStorage.getItem("access_token"); // 🔥 Lấy token từ localStorage
//       if (!token) {
//         console.error("Không có token, vui lòng đăng nhập lại.");
//         return;
//       }

//       const res = await axios.get("http://127.0.0.1:8000/dating-advice/", {
//         headers: {
//           Authorization: `Bearer ${token}`, // 🔥 Thêm token vào request
//         },
//       });

//       setVideos(res.data.videos || []);
//       setTips(res.data.tips || []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Lỗi khi lấy dữ liệu:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdvice();
//   }, []);

//   // 🟡 Xóa video hoặc tip
//   const handleDelete = async (type, id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa?")) return;
//     try {
//       const url =
//         type === "video"
//           ? `${API_BASE}/admin/advice/videos/${id}`
//           : `${API_BASE}/admin/advice/tips/${id}`;
//       await axios.delete(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("✅ Đã xóa thành công!");
//       fetchAdvice();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Xóa thất bại!");
//     }
//   };

//   // 🟣 Cập nhật video hoặc tip (ví dụ sửa tiêu đề)
//   const handleEdit = async (type, item) => {
//     const newTitle = prompt("Nhập tiêu đề mới:", item.title);
//     if (!newTitle) return;

//     try {
//       const url =
//         type === "video"
//           ? `${API_BASE}/admin/advice/videos/${item.id}`
//           : `${API_BASE}/admin/advice/tips/${item.id}`;
//       const data =
//         type === "video"
//           ? { ...item, title: newTitle }
//           : { ...item, title: newTitle };

//       await axios.put(url, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("✅ Sửa thành công!");
//       fetchAdvice();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Cập nhật thất bại!");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4 text-gray-700">
//         💡 Dating Advice (Admin)
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-3 mb-4">
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "videos"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setActiveTab("videos")}
//         >
//           🎥 Videos
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "tips"
//               ? "bg-green-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => setActiveTab("tips")}
//         >
//           📝 Tips
//         </button>
//       </div>

//       {/* Nội dung tab */}
//       {loading ? (
//         <p>⏳ Đang tải dữ liệu...</p>
//       ) : activeTab === "videos" ? (
//         <div className="space-y-3">
//           {videos.length === 0 ? (
//             <p>Không có video nào.</p>
//           ) : (
//             videos.map((v) => (
//               <div
//                 key={v.id}
//                 className="flex items-center justify-between border p-3 rounded-md bg-white shadow-sm"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={v.thumbnail_url}
//                     alt={v.title}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-medium">{v.title}</p>
//                     <p className="text-sm text-gray-500">Tác giả: {v.author}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit("video", v)}
//                     className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm"
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     onClick={() => handleDelete("video", v.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {tips.length === 0 ? (
//             <p>Không có tip nào.</p>
//           ) : (
//             tips.map((t) => (
//               <div
//                 key={t.id}
//                 className="flex items-center justify-between border p-3 rounded-md bg-white shadow-sm"
//               >
//                 <div>
//                   <p className="font-medium">{t.title}</p>
//                   <p className="text-sm text-gray-500">{t.body}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit("tip", t)}
//                     className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm"
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     onClick={() => handleDelete("tip", t.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
//     </div>
//   );
// };

// export default Setting;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react"; // icon "plus"

const API_BASE = "http://127.0.0.1:8000";

const Advice = () => {
  const [videos, setVideos] = useState([]);
  const [tips, setTips] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🟢 Modal dùng chung (sửa + thêm)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // "edit" hoặc "add"
  const [modalType, setModalType] = useState(null); // "video" hoặc "tip"
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("access_token");

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/dating-advice/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(res.data.videos || []);
      setTips(res.data.tips || []);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  // 🟡 Xóa video hoặc tip
  const handleDelete = async (type, id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    try {
      const url =
        type === "video"
          ? `${API_BASE}/admin/advice/videos/${id}`
          : `${API_BASE}/admin/advice/tips/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Đã xóa thành công!");
      fetchAdvice();
    } catch (err) {
      console.error(err);
      setMessage("❌ Xóa thất bại!");
    }
  };

  // 🟣 Mở popup sửa
  const openEditModal = (type, item) => {
    setModalMode("edit");
    setModalType(type);
    setFormData(item);
    setIsModalOpen(true);
  };

  // 🟢 Mở popup thêm
  const openAddModal = (type) => {
    setModalMode("add");
    setModalType(type);
    if (type === "video") {
      setFormData({
        title: "",
        author: "",
        url: "",
        thumbnail_url: "",
      });
    } else {
      setFormData({
        title: "",
        body: "",
      });
    }
    setIsModalOpen(true);
  };

  // 🔵 Cập nhật dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🧩 Gửi API lưu (PUT khi sửa, POST khi thêm)
  const handleSave = async () => {
    try {
      let url = "";
      let method = "";

      if (modalMode === "edit") {
        // Sửa
        url =
          modalType === "video"
            ? `${API_BASE}/admin/advice/videos/${formData.id}`
            : `${API_BASE}/admin/advice/tips/${formData.id}`;
        method = "put";
      } else {
        // Thêm mới
        url =
          modalType === "video"
            ? `${API_BASE}/admin/advice/videos`
            : `${API_BASE}/admin/advice/tips`;
        method = "post";
      }

      await axios({
        method,
        url,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(
        modalMode === "add"
          ? "✅ Thêm mới thành công!"
          : "✅ Cập nhật thành công!"
      );
      setIsModalOpen(false);
      fetchAdvice();
    } catch (err) {
      console.error(err);
      setMessage("❌ Thao tác thất bại!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">
          💡 Dating Advice (Admin)
        </h1>
        {/* 🟢 Nút thêm mới */}
        <button
          onClick={() => openAddModal(activeTab === "videos" ? "video" : "tip")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "videos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          🎥 Videos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "tips"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("tips")}
        >
          📝 Tips
        </button>
      </div>

      {/* Nội dung tab */}
      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : activeTab === "videos" ? (
        <div className="space-y-3">
          {videos.length === 0 ? (
            <p>Không có video nào.</p>
          ) : (
            videos.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between border p-3 rounded-md bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={v.thumbnail_url}
                    alt={v.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{v.title}</p>
                    <p className="text-sm text-gray-500">Tác giả: {v.author}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal("video", v)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete("video", v.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tips.length === 0 ? (
            <p>Không có tip nào.</p>
          ) : (
            tips.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border p-3 rounded-md bg-white shadow-sm"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-gray-500">{t.body}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal("tip", t)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete("tip", t.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}

      {/* 🟣 Modal thêm/sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[450px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {modalMode === "add" ? "➕ Thêm mới" : "✏️ Chỉnh sửa"}{" "}
              {modalType === "video" ? "Video" : "Tip"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tiêu đề
                </label>
                <input
                  name="title"
                  value={formData?.title || ""}
                  onChange={handleChange}
                  className="border w-full rounded-md p-2 mt-1"
                />
              </div>

              {modalType === "video" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Tác giả
                    </label>
                    <input
                      name="author"
                      value={formData?.author || ""}
                      onChange={handleChange}
                      className="border w-full rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      URL Video
                    </label>
                    <input
                      name="url"
                      value={formData?.url || ""}
                      onChange={handleChange}
                      className="border w-full rounded-md p-2 mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Thumbnail URL
                    </label>
                    <input
                      name="thumbnail_url"
                      value={formData?.thumbnail_url || ""}
                      onChange={handleChange}
                      className="border w-full rounded-md p-2 mt-1"
                      placeholder="Dán link ảnh vào đây..."
                    />

                    {/* ✅ Hiển thị ảnh preview nếu có URL */}
                    {formData.thumbnail_url && (
                      <div className="mt-3 flex justify-center">
                        <img
                          src={formData.thumbnail_url}
                          alt="Preview"
                          className="w-40 h-24 object-cover rounded-md border"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {modalType === "tip" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nội dung
                  </label>
                  <textarea
                    name="body"
                    value={formData?.body || ""}
                    onChange={handleChange}
                    rows="3"
                    className="border w-full rounded-md p-2 mt-1"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                {modalMode === "add" ? "Thêm mới" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advice;
