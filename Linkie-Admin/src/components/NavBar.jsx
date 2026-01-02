// import {  useState } from 'react'
// import { Avatar, Dropdown, Input, Layout } from 'antd';
// import { FaBell, FaUser } from 'react-icons/fa';
// import { SettingOutlined } from '@ant-design/icons'
// const { Header } = Layout;

// const NavBar = ({ userName = "Vũ Tiến Đạt" }) => {
//     const [color] = useState('#f56a00');
//     const menuItems = [
//         {
//             key: '1',
//             label: 'vivudaudo@gmail.com',
//             disabled: true,
//         },
//         {
//             type: 'divider',
//         },
//         {
//             key: '2',
//             label: 'Profile',
//             icon: <FaUser />
//         },

//         {
//             key: '3',
//             label: 'Settings',
//             icon: <SettingOutlined />,

//         },
//     ];

//     return (

//         <Header className='border-b border-gray-200 ' style={{ padding: 0, display: 'flex', alignItems: 'center', backgroundColor: "white", borderRadius: '5px' }}>
//             <div className="w-1/6  text-2xl font-bold h-full flex items-center  rounded-[5px]  justify-center">Linkes Admin </div>
//             <div className="w-2/3 h-full  flex items-center justify-center">

//                 <Input.Search className='w-2/3 ' size="large" placeholder="Search" enterButton />

//             </div>
//             <div className="w-1/6 h-full   flex items-center justify-center">
//                 <nav className='w-1/2 mx-auto h-full   '>
//                     <ul className=' list-none  grid grid-cols-2   flex items-center justify-center'>
//                         <li className='h-full aspect-square   flex items-center justify-center '>
//                             <div className='w-10  aspect-square  bg-gray-300  flex items-center  rounded-full justify-center  relative '>
//                                 <FaBell style={{ fontSize: '18px' }} />
//                                 <div className="absolute top-[-2px]   right-[-5px] w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500"> 1</div>
//                             </div>
//                         </li>
//                         <li className=' h-full aspect-square  flex items-center justify-center'>
//                             <Dropdown
//                                 menu={{ items: menuItems }}
//                                 trigger={['click']}
//                                 overlayClassName="min-w-[150spx]"
//                             >
//                                 <div className="flex items-center gap-2 cursor-pointer">
//                                     <Avatar
//                                         className="border-2 border-transparent hover:border-blue-500 transition-all"
//                                         style={{
//                                             backgroundColor: color,
//                                             verticalAlign: 'middle',
//                                         }}
//                                         size="large"
//                                     >
//                                         {userName[0].toUpperCase()}
//                                     </Avatar>

//                                 </div>
//                             </Dropdown>

//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </Header>

//     )
// }

// export default NavBar

// import { useState } from "react";
// import { Avatar, Dropdown, Input, Layout } from "antd";
// import { FaBell, FaUser } from "react-icons/fa";
// import { SettingOutlined } from "@ant-design/icons";

// const { Header } = Layout;

// const NavBar = ({ userName = "Vũ Tiến Đạt" }) => {
//   const [color] = useState("#f56a00");

//   const menuItems = [
//     {
//       key: "1",
//       label: "vivudaudo@gmail.com",
//       disabled: true,
//     },
//     {
//       type: "divider",
//     },
//     {
//       key: "2",
//       label: "Profile",
//       icon: <FaUser />,
//     },
//     {
//       key: "3",
//       label: "Settings",
//       icon: <SettingOutlined />,
//     },
//   ];

//   return (
//     <Header
//       className="border-b border-gray-200 bg-white flex items-center justify-between px-6"
//       style={{
//         height: "64px",
//         borderRadius: "5px",
//       }}
//     >
//       {/* LOGO */}
//       <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
//         Linkes Admin
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex justify-center px-8">
//         <Input.Search
//           className="max-w-xl w-full"
//           size="large"
//           placeholder="Search"
//           enterButton
//         />
//       </div>

//       {/* ACTIONS */}
//       <div className="flex items-center gap-6">
//         {/* Notification */}
//         <div className="relative">
//           <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//             <FaBell className="text-gray-700 text-lg" />
//           </div>
//           <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500">
//             1
//           </div>
//         </div>

//         {/* Avatar */}
//         <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
//           <div className="cursor-pointer">
//             <Avatar
//               style={{
//                 backgroundColor: color,
//                 verticalAlign: "middle",
//               }}
//               size="large"
//               className="border-2 border-transparent hover:border-blue-500 transition-all"
//             >
//               {userName[0].toUpperCase()}
//             </Avatar>
//           </div>
//         </Dropdown>
//       </div>
//     </Header>
//   );
// };

// export default NavBar;

// import { useEffect, useState } from "react";
// import { Avatar, Dropdown, Input, Layout, Spin } from "antd";
// import { FaBell, FaUser } from "react-icons/fa";
// import { SettingOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { Header } = Layout;
// const API_BASE = "http://127.0.0.1:8000";

// const NavBar = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Lấy token và profile_id từ localStorage
//   const profileId = localStorage.getItem("profile_id");
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/profiles/${profileId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfile(res.data);
//       } catch (error) {
//         console.error("❌ Lỗi khi tải profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (profileId && token) fetchProfile();
//   }, [profileId, token]);

//   const menuItems = [
//     {
//       key: "1",
//       label: profile?.username || "Đang tải...",
//       disabled: true,
//     },
//     {
//       key: "2",
//       label: `ID: ${profile?.account_id || "—"}`,
//       disabled: true,
//     },
//     { type: "divider" },
//     {
//       key: "3",
//       label: "Hồ sơ",
//       icon: <FaUser />,
//     },
//     {
//       key: "4",
//       label: "Cài đặt",
//       icon: <SettingOutlined />,
//     },
//     { type: "divider" },
//     {
//       key: "5",
//       label: "Đăng xuất",
//       danger: true,
//       onClick: () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("profile_id");
//         window.location.href = "/login"; // điều hướng về trang login
//       },
//     },
//   ];

//   return (
//     <Header
//       className="border-b border-gray-200 bg-white flex items-center justify-between px-6"
//       style={{
//         height: "64px",
//         borderRadius: "5px",
//       }}
//     >
//       {/* LOGO */}
//       <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
//         Linkes Admin
//       </div>

//       {/* SEARCH */}
//       <div className="flex-1 flex justify-center px-8">
//         <Input.Search
//           className="max-w-xl w-full"
//           size="large"
//           placeholder="Search"
//           enterButton
//         />
//       </div>

//       {/* ACTIONS */}
//       <div className="flex items-center gap-6">
//         {/* Notification */}
//         <div className="relative">
//           <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//             <FaBell className="text-gray-700 text-lg" />
//           </div>
//           <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500">
//             1
//           </div>
//         </div>

//         {/* Avatar */}
//         <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
//           <div className="cursor-pointer">
//             {loading ? (
//               <Spin size="small" />
//             ) : (
//               <Avatar
//                 src={
//                   profile?.avatar?.url
//                     ? `${API_BASE}/${profile.avatar.url.replace(/\\/g, "/")}`
//                     : undefined
//                 }
//                 style={{
//                   backgroundColor: "#f56a00",
//                   verticalAlign: "middle",
//                 }}
//                 size="large"
//                 className="border-2 border-transparent hover:border-blue-500 transition-all"
//               >
//                 {!profile?.avatar?.url &&
//                   (profile?.username?.[0]?.toUpperCase() || "A")}
//               </Avatar>
//             )}
//           </div>
//         </Dropdown>
//       </div>
//     </Header>
//   );
// };

// export default NavBar;
// import { useEffect, useState } from "react";
// import { Avatar, Dropdown, Input, Layout, Spin, Modal, Button } from "antd";
// import { FaBell, FaUser } from "react-icons/fa";
// import { SettingOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { Header } = Layout;
// const API_BASE = "http://127.0.0.1:8000";

// const NavBar = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Modal state
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalProfile, setModalProfile] = useState(null);
//   const [modalLoading, setModalLoading] = useState(false);

//   const profileId = localStorage.getItem("profile_id");
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/profiles/${profileId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//       } catch (error) {
//         console.error("❌ Lỗi khi tải profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (profileId && token) fetchProfile();
//   }, [profileId, token]);

//   const handleProfileClick = async () => {
//     setModalLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/profiles/${profileId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setModalProfile(res.data);
//       setModalVisible(true);
//     } catch (err) {
//       console.error("❌ Lỗi khi lấy profile để hiển thị modal:", err);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const menuItems = [
//     {
//       key: "1",
//       label: profile?.username || "Đang tải...",
//       disabled: true,
//     },
//     {
//       key: "2",
//       label: `ID: ${profile?.account_id || "—"}`,
//       disabled: true,
//     },
//     { type: "divider" },
//     {
//       key: "3",
//       label: "Hồ sơ",
//       icon: <FaUser />,
//       onClick: handleProfileClick, // 🔹 gọi modal
//     },
//     {
//       key: "4",
//       label: "Cài đặt",
//       icon: <SettingOutlined />,
//     },
//     { type: "divider" },
//     {
//       key: "5",
//       label: "Đăng xuất",
//       danger: true,
//       onClick: () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("profile_id");
//         window.location.href = "/login";
//       },
//     },
//   ];

//   return (
//     <>
//       <Header
//         className="border-b border-gray-200 bg-white flex items-center justify-between px-6"
//         style={{ height: "64px", borderRadius: "5px" }}
//       >
//         <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
//           Linkes Admin
//         </div>

//         <div className="flex-1 flex justify-center px-8">
//           <Input.Search
//             className="max-w-xl w-full"
//             size="large"
//             placeholder="Search"
//             enterButton
//           />
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="relative">
//             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//               <FaBell className="text-gray-700 text-lg" />
//             </div>
//             <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500">
//               1
//             </div>
//           </div>

//           <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
//             <div className="cursor-pointer">
//               {loading ? (
//                 <Spin size="small" />
//               ) : (
//                 <Avatar
//                   src={
//                     profile?.avatar?.url
//                       ? `${API_BASE}/${profile.avatar.url.replace(/\\/g, "/")}`
//                       : undefined
//                   }
//                   style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
//                   size="large"
//                   className="border-2 border-transparent hover:border-blue-500 transition-all"
//                 >
//                   {!profile?.avatar?.url &&
//                     (profile?.username?.[0]?.toUpperCase() || "A")}
//                 </Avatar>
//               )}
//             </div>
//           </Dropdown>
//         </div>
//       </Header>

//       {/* Modal hiển thị profile */}
//       <Modal
//         title="Thông tin hồ sơ Admin"
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setModalVisible(false)}>
//             Đóng
//           </Button>,
//         ]}
//       >
//         {modalLoading ? (
//           <Spin />
//         ) : modalProfile ? (
//           <div className="space-y-2">
//             <Avatar
//               src={
//                 modalProfile.avatar?.url
//                   ? `${API_BASE}/${modalProfile.avatar.url.replace(/\\/g, "/")}`
//                   : undefined
//               }
//               size={64}
//             />
//             <p><b>Họ và tên:</b> {modalProfile.username}</p>
//             <p><b>ID:</b> {modalProfile.account_id}</p>
//             <p><b>Giới tính:</b> {modalProfile.gender}</p>
//             <p><b>Ngày sinh:</b> {modalProfile.date_of_birth}</p>
//             <p><b>Bio:</b> {modalProfile.bio}</p>
//             <p><b>Mục đích hẹn hò:</b> {modalProfile.target_type}</p>
//             <p><b>Sở thích:</b> {modalProfile.hobby.join(", ")}</p>
//             <div>
//               <b>Images:</b>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {modalProfile.images?.map((img) => (
//                   <img
//                     key={img.id}
//                     src={`${API_BASE}/${img.url}`}
//                     alt={img.alt || "image"}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Không có dữ liệu</p>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default NavBar;
import { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  Input,
  Layout,
  Spin,
  Modal,
  Button,
  Form,
  Input as AntInput,
  Switch,
} from "antd";
import { FaBell, FaUser } from "react-icons/fa";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header } = Layout;
const API_BASE = "http://127.0.0.1:8000";

const NavBar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProfile, setModalProfile] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);

  const profileId = localStorage.getItem("profile_id");
  const token = localStorage.getItem("access_token");

  const [notifications, setNotifications] = useState([]);
  const [notifVisible, setNotifVisible] = useState(false);

  // Lấy profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/profiles/${profileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi tải profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId && token) fetchProfile();
  }, [profileId, token]);

  const handleProfileClick = async (id = profileId) => {
    setModalLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalProfile(res.data);
      setModalVisible(true);
    } catch (err) {
      console.error("❌ Lỗi khi lấy profile để hiển thị modal:", err);
      alert("Không tìm thấy profile với ID này!");
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    if (!profileId) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/notification/for-user/${profileId}`
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải thông báo:", err);
      }
    };

    fetchNotifications();
  }, [profileId]);

  // useEffect(() => {
  //   if (!profileId) return;

  //   const ws = new WebSocket(
  //     `ws://127.0.0.1:8000/ws/notifications/${profileId}`
  //   );

  //   ws.onmessage = (event) => {
  //     const newNotif = {
  //       id: Date.now(),
  //       content: event.data,
  //       created_at: new Date().toISOString(),
  //       is_read: false,
  //     };

  //     // thêm vào đầu danh sách
  //     setNotifications((prev) => [newNotif, ...prev]);
  //   };

  //   return () => ws.close();
  // }, [profileId]);
  useEffect(() => {
    if (!profileId) return;

    const ws = new WebSocket(
      `ws://localhost:8000/notification/ws/notifications/${profileId}`
    );

    ws.onmessage = (event) => {
      console.log("🔔 New notification:", event.data);
      setNotifCount((prev) => prev + 1); // tăng số trên icon
    };

    return () => ws.close();
  }, [profileId]);

  const handleMyProfileClick = async () => {
    handleProfileClick(profileId);
  };

  // Hiển thị modal settings
  const handleSettingsClick = () => {
    setSettingsVisible(true);
  };

  const menuItems = [
    {
      key: "1",
      label: profile?.username || "Đang tải...",
      disabled: true,
    },
    {
      key: "2",
      label: `ID: ${profile?.account_id || "—"}`,
      disabled: true,
    },
    { type: "divider" },
    {
      key: "3",
      label: "Hồ sơ",
      icon: <FaUser />,
      onClick: handleMyProfileClick,
    },
    {
      key: "4",
      label: "Cài đặt",
      icon: <SettingOutlined />,
      onClick: handleSettingsClick,
    },
    { type: "divider" },
    {
      key: "5",
      label: "Đăng xuất",
      danger: true,
      onClick: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("profile_id");
        window.location.href = "/login";
      },
    },
  ];

  const handleSearch = (value) => {
    const id = value.trim();
    if (!id) return;
    handleProfileClick(id); // gọi modal profile với ID nhập vào
  };

  return (
    <>
      <Header
        className="border-b border-gray-200 bg-white flex items-center justify-between px-6"
        style={{ height: "64px", borderRadius: "5px" }}
      >
        <div className="text-2xl font-bold text-gray-800 whitespace-nowrap">
          Linkes Admin
        </div>

        <div className="flex-1 flex justify-center px-8">
          <Input.Search
            className="max-w-xl w-full"
            size="large"
            placeholder="Tìm kiếm theo ID"
            enterButton
            onSearch={handleSearch} // 🔹 tìm kiếm theo ID
          />
        </div>

        <div className="flex items-center gap-6">
          {/* <div className="relative">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaBell className="text-gray-700 text-lg" />
            </div>
            <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500">
              1
            </div>
          </div> */}
          <div
            className="relative cursor-pointer"
            onClick={() => setNotifVisible(true)}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaBell className="text-gray-700 text-lg" />
            </div>

            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full bg-red-500">
                {notifications.length}
              </div>
            )}
          </div>

          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <div className="cursor-pointer">
              {loading ? (
                <Spin size="small" />
              ) : (
                <Avatar
                  src={
                    profile?.avatar?.url
                      ? `${API_BASE}/${profile.avatar.url.replace(/\\/g, "/")}`
                      : undefined
                  }
                  style={{
                    backgroundColor: "#f56a00",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  className="border-2 border-transparent hover:border-blue-500 transition-all"
                >
                  {!profile?.avatar?.url &&
                    (profile?.username?.[0]?.toUpperCase() || "A")}
                </Avatar>
              )}
            </div>
          </Dropdown>
        </div>
      </Header>

      {/* Modal profile */}
      <Modal
        title="Thông tin hồ sơ"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {modalLoading ? (
          <Spin />
        ) : modalProfile ? (
          <div className="space-y-2">
            <Avatar
              src={
                modalProfile.avatar?.url
                  ? `${API_BASE}/${modalProfile.avatar.url.replace(/\\/g, "/")}`
                  : undefined
              }
              size={64}
            />
            <p>
              <b>Họ và tên:</b> {modalProfile.username}
            </p>
            <p>
              <b>ID:</b> {modalProfile.account_id}
            </p>
            <p>
              <b>Giới tính:</b> {modalProfile.gender}
            </p>
            <p>
              <b>Ngày sinh:</b> {modalProfile.date_of_birth}
            </p>
            <p>
              <b>Bio:</b> {modalProfile.bio}
            </p>
            <p>
              <b>Mục đích hẹn hò:</b> {modalProfile.target_type}
            </p>
            <p>
              <b>Sở thích:</b> {modalProfile.hobby.join(", ")}
            </p>
            <div>
              <b>Images:</b>
              <div className="flex flex-wrap gap-2 mt-1">
                {modalProfile.images?.map((img) => (
                  <img
                    key={img.id}
                    src={`${API_BASE}/${img.url}`}
                    alt={img.alt || "image"}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </Modal>

      <Modal
        title="Thông báo"
        visible={notifVisible}
        onCancel={() => setNotifVisible(false)}
        footer={null}
      >
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p>Không có thông báo</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 mb-2 bg-gray-100 rounded shadow-sm hover:bg-gray-200 transition"
              >
                <div className="font-semibold">{n.content}</div>
                <div className="text-xs text-gray-500">
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* Modal settings */}
      <Modal
        title="Cài đặt Admin"
        visible={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        footer={[
          <Button
            key="save"
            type="primary"
            onClick={() => setSettingsVisible(false)}
          >
            Lưu
          </Button>,
          <Button key="close" onClick={() => setSettingsVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {settingsLoading ? (
          <Spin />
        ) : (
          <Form layout="vertical" initialValues={{ notifications: true }}>
            <Form.Item label="Chế độ tối" name="" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item
              label="Hiển thị thông báo"
              name="notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item label="Mật khẩu cũ" name="password">
              <AntInput.Password placeholder="Nhập mật khẩu cũ" />
            </Form.Item>
            <Form.Item label="Mật khẩu mới" name="password">
              <AntInput.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default NavBar;
