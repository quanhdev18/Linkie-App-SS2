// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus } from "lucide-react";

// const API_BASE = "http://127.0.0.1:8000";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Popup
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     duration_days: "",
//   });

//   const token = localStorage.getItem("access_token");

//   // 🟢 Lấy danh sách packages
//   const fetchPackages = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/packages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPackages(res.data || []);
//     } catch (err) {
//       console.error("Lỗi khi lấy package:", err);
//       setMessage("❌ Không thể tải danh sách gói!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // 🟣 Mở modal thêm mới
//   const openAddModal = () => {
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       duration_days: "",
//     });
//     setIsModalOpen(true);
//   };

//   // 🔵 Cập nhật dữ liệu trong form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // 🧩 Gửi API thêm mới package
//   const handleSave = async () => {
//     try {
//       if (!formData.name || !formData.price || !formData.duration_days) {
//         setMessage("⚠️ Vui lòng nhập đầy đủ thông tin!");
//         return;
//       }

//       const payload = {
//         name: formData.name,
//         description: formData.description,
//         price: Number(formData.price),
//         duration_days: Number(formData.duration_days),
//       };

//       await axios.post(`${API_BASE}/packages`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage("✅ Thêm package thành công!");
//       setIsModalOpen(false);
//       fetchPackages();
//     } catch (err) {
//       console.error("Lỗi khi thêm package:", err);
//       setMessage("❌ Thêm package thất bại!");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold text-gray-700">📦 Quản lý Packages</h1>
//         <button
//           onClick={openAddModal}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
//         >
//           <Plus size={18} /> Thêm gói mới
//         </button>
//       </div>

//       {loading ? (
//         <p>⏳ Đang tải dữ liệu...</p>
//       ) : packages.length === 0 ? (
//         <p>Không có gói nào.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                 {pkg.name}
//               </h3>
//               <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
//               <p className="font-medium text-blue-600">
//                 💰 {pkg.price.toLocaleString()} VNĐ
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 ⏱ Thời hạn: {pkg.duration_days} ngày
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}

//       {/* 🟣 Modal thêm mới */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-[450px]">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">
//               ➕ Thêm gói mới
//             </h2>

//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                   Tên gói
//                 </label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="border w-full rounded-md p-2 mt-1"
//                   placeholder="Nhập tên gói..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                   Mô tả
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className="border w-full rounded-md p-2 mt-1"
//                   placeholder="Nhập mô tả gói..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                   Giá (VNĐ)
//                 </label>
//                 <input
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="border w-full rounded-md p-2 mt-1"
//                   placeholder="Nhập giá gói..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                   Thời hạn (ngày)
//                 </label>
//                 <input
//                   name="duration_days"
//                   type="number"
//                   value={formData.duration_days}
//                   onChange={handleChange}
//                   className="border w-full rounded-md p-2 mt-1"
//                   placeholder="Ví dụ: 30"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-md text-sm"
//               >
//                 Hủy
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
//               >
//                 Lưu
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Package;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration_days: "",
  });

  const token = localStorage.getItem("access_token");

  // 🟢 Lấy danh sách packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy package:", err);
      setMessage("❌ Không thể tải danh sách gói!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // 🔵 Xử lý thay đổi form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🟣 Mở modal thêm mới
  const openAddModal = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration_days: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // 🟡 Mở modal chỉnh sửa
  const openEditModal = (pkg: any) => {
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
    });
    setCurrentId(pkg.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // 🧩 Gửi API thêm hoặc cập nhật
  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.duration_days) {
      setMessage("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      duration_days: Number(formData.duration_days),
    };

    try {
      if (isEditing && currentId) {
        // 🟠 PUT update package
        await axios.put(`${API_BASE}/packages/${currentId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Cập nhật package thành công!");
      } else {
        // 🟢 POST create new
        await axios.post(`${API_BASE}/packages`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Thêm package thành công!");
      }

      setIsModalOpen(false);
      fetchPackages();
    } catch (err) {
      console.error("Lỗi khi lưu package:", err);
      setMessage("❌ Lưu package thất bại!");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">📦 Quản lý Packages</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          <Plus size={18} /> Thêm gói mới
        </button>
      </div>

      {/* Danh sách gói */}
      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : packages.length === 0 ? (
        <p>Không có gói nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition relative"
            >
              <button
                onClick={() => openEditModal(pkg)}
                className="absolute top-3 right-3 text-gray-500 hover:text-blue-600"
              >
                <Pencil size={18} />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {pkg.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {pkg.description || "Không có mô tả"}
              </p>
              <p className="font-medium text-blue-600">
                💰 {pkg.price.toLocaleString()} VNĐ
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ⏱ Thời hạn: {pkg.duration_days} ngày
              </p>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}

      {/* 🟣 Modal thêm / sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[450px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isEditing ? "✏️ Chỉnh sửa gói" : "➕ Thêm gói mới"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tên gói
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border w-full rounded-md p-2 mt-1"
                  placeholder="Nhập tên gói..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="border w-full rounded-md p-2 mt-1"
                  placeholder="Nhập mô tả gói..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Giá (VNĐ)
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="border w-full rounded-md p-2 mt-1"
                  placeholder="Nhập giá gói..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Thời hạn (ngày)
                </label>
                <input
                  name="duration_days"
                  type="number"
                  value={formData.duration_days}
                  onChange={handleChange}
                  className="border w-full rounded-md p-2 mt-1"
                  placeholder="Ví dụ: 30"
                />
              </div>
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
                {isEditing ? "Cập nhật" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
