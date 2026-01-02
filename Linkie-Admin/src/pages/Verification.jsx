// import React, { useEffect, useState } from "react";
// import { Table, Space, Select, Upload, Button, message, Input } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const Verification = () => {
//   const [file, setFile] = useState(null);
//   const [accountId, setAccountId] = useState("");
//   const [poseKey, setPoseKey] = useState("");
//   const [tableData, setTableData] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("");

//   // ----------------------------
//   // 1) API: GET /verify/all
//   // ----------------------------
//   const fetchAllUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/verify/all");

//       const formatted = res.data.map((item) => ({
//         key: item.account_id,
//         account_id: item.account_id,
//         email: item.email,
//         is_verified: item.is_verified,
//         verification_status: item.verification_status || "unverified",
//         pending_image_path: item.pending_image_path || "Không có",
//         pending_pose: item.pending_pose || "Không có",
//       }));

//       setTableData(formatted);

//       message.success("Tải danh sách xác thực thành công!");
//     } catch (err) {
//       console.error("Lỗi fetch all:", err);

//       const apiError = err.response?.data?.detail || "Không thể tải danh sách!";
//       message.error(`Lỗi: ${apiError}`);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   // ----------------------------
//   // 2) API: POST /verify/request
//   // ----------------------------
//   const sendVerifyRequest = async () => {
//     if (!accountId || !poseKey || !file) {
//       return message.error("Hãy nhập đủ account_id, pose_key và ảnh!");
//     }

//     const form = new FormData();
//     form.append("account_id", accountId);
//     form.append("pose_key", poseKey);
//     form.append("file", file);

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/verify/request",
//         form
//       );

//       message.success(res.data?.detail || "Gửi yêu cầu xác thực thành công!");

//       fetchAllUsers();
//     } catch (err) {
//       console.error(err);

//       const apiError =
//         err.response?.data?.detail || "Lỗi gửi yêu cầu xác thực!";
//       message.error(`Lỗi: ${apiError}`);
//     }
//   };

//   // ----------------------------
//   // 3) API: POST /verify/approve
//   // ----------------------------
//   const approveUser = async (accountId) => {
//     try {
//       const res = await axios.post("http://localhost:8000/verify/approve", {
//         account_id: accountId,
//       });

//       message.success(res.data?.detail || "Duyệt xác thực thành công!");
//       fetchAllUsers();
//     } catch (err) {
//       console.error(err);

//       const apiError = err.response?.data?.detail || "Lỗi duyệt tài khoản!";
//       message.error(`Lỗi: ${apiError}`);
//     }
//   };

//   // ----------------------------
//   // 4) API: GET /verify/alluser?status=
//   // ----------------------------
//   const filterUserByStatus = async (status) => {
//     setFilterStatus(status);

//     if (!status) return fetchAllUsers();

//     try {
//       const res = await axios.get(
//         `http://localhost:8000/verify/alluser?status=${status}`
//       );

//       const formatted = res.data.map((item) => ({
//         key: item.account_id,
//         account_id: item.account_id,
//         email: item.email,
//         is_verified: item.is_verified,
//         verification_status: item.verification_status || "unverified",
//         pending_image_path: item.pending_image_path || "Không có",
//         pending_pose: item.pending_pose || "Không có",
//       }));

//       setTableData(formatted);

//       message.success("Lọc tài khoản thành công!");
//     } catch (err) {
//       console.error(err);
//       const apiError = err.response?.data?.detail || "Lỗi lọc tài khoản!";
//       message.error(`Lỗi: ${apiError}`);
//     }
//   };

//   // ----------------------------
//   // TABLE COLUMNS
//   // ----------------------------
//   const columns = [
//     {
//       title: "Account ID",
//       dataIndex: "account_id",
//       key: "account_id",
//       sorter: (a, b) => a.account_id - b.account_id,
//       defaultSortOrder: "ascend",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Trạng thái xác thực",
//       dataIndex: "verification_status",
//       key: "verification_status",
//       render: (status) => {
//         if (status === "pending")
//           return (
//             <span className="text-yellow-600 font-bold">Đang chờ duyệt</span>
//           );
//         if (status === "verified")
//           return <span className="text-green-600 font-bold">Đã xác thực</span>;
//         return <span className="text-gray-600">Chưa xác thực</span>;
//       },
//     },
//     {
//       title: "Ảnh pending",
//       dataIndex: "pending_image_path",
//       key: "pending_image_path",
//     },
//     {
//       title: "Pose",
//       dataIndex: "pending_pose",
//       key: "pending_pose",
//     },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_, record) =>
//         record.verification_status === "pending" ? (
//           <Button type="primary" onClick={() => approveUser(record.account_id)}>
//             Duyệt
//           </Button>
//         ) : (
//           <span>—</span>
//         ),
//     },
//   ];

//   return (
//     <>
//       <h1 className="text-[20px] font-bold mt-5 mx-5">
//         Quản lý xác thực khuôn mặt
//       </h1>

//       {/* ====================== FORM GỬI YÊU CẦU ====================== */}
//       <div className="m-5 p-4 bg-white rounded-lg shadow-lg border">
//         <h2 className="text-[16px] font-bold mb-3">Gửi yêu cầu xác thực</h2>

//         <div className="flex gap-3 mb-3">
//           <Input
//             placeholder="Account ID"
//             value={accountId}
//             onChange={(e) => setAccountId(e.target.value)}
//             style={{ width: 150 }}
//           />
//           <Input
//             placeholder="Pose Key"
//             value={poseKey}
//             onChange={(e) => setPoseKey(e.target.value)}
//             style={{ width: 150 }}
//           />
//           <Upload
//             beforeUpload={(f) => {
//               setFile(f);
//               return false;
//             }}
//             maxCount={1}
//           >
//             <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
//           </Upload>

//           <Button type="primary" onClick={sendVerifyRequest}>
//             Gửi yêu cầu
//           </Button>
//         </div>
//       </div>

//       {/* ====================== BỘ LỌC ====================== */}
//       <div className="m-5">
//         <Select
//           style={{ width: 250 }}
//           placeholder="Lọc theo trạng thái"
//           value={filterStatus}
//           onChange={filterUserByStatus}
//           options={[
//             { label: "Tất cả", value: "" },
//             { label: "Chưa xác thực", value: "unverified" },
//             { label: "Chờ duyệt", value: "pending" },
//             { label: "Đã xác thực", value: "verified" },
//           ]}
//         />
//       </div>

//       {/* ====================== BẢNG HIỂN THỊ ====================== */}
//       <div className="w-[98%] mx-auto bg-white p-3 rounded-xl border shadow">
//         <Table columns={columns} dataSource={tableData} scroll={{ x: true }} />
//       </div>
//     </>
//   );
// };

// export default Verification;

import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Select,
  Upload,
  Button,
  message,
  Input,
  Modal,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const Verification = () => {
  const [file, setFile] = useState(null);
  const [accountId, setAccountId] = useState("");
  const [poseKey, setPoseKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/verify/all");

      const formatted = res.data.map((item) => ({
        key: item.account_id,
        account_id: item.account_id,
        email: item.email,
        is_verified: item.is_verified,
        verification_status: item.verification_status || "unverified",
        // pending_image_path: item.pending_image_path || null,
        pending_image_path: item.pending_image_path
          ? `http://localhost:8000/${item.pending_image_path.replace(
              /^\/+/,
              ""
            )}`
          : null,

        pending_pose: item.pending_pose || null,
        pose_sample_image: item.pose_sample_image || null,
      }));

      setTableData(formatted);
      message.success("Tải danh sách xác thực thành công!");
    } catch (err) {
      console.error("Lỗi fetch all:", err);
      const apiError = err.response?.data?.detail || "Không thể tải danh sách!";
      message.error(`Lỗi: ${apiError}`);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const sendVerifyRequest = async () => {
    if (!accountId || !poseKey || !file) {
      return message.error("Hãy nhập đủ account_id, pose_key và ảnh!");
    }

    const form = new FormData();
    form.append("account_id", accountId);
    form.append("pose_key", poseKey);
    form.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/verify/request",
        form
      );
      message.success(res.data?.message || "Gửi yêu cầu xác thực thành công!");
      fetchAllUsers();
    } catch (err) {
      console.error(err);
      const apiError =
        err.response?.data?.detail || "Lỗi gửi yêu cầu xác thực!";
      message.error(`Lỗi: ${apiError}`);
    }
  };

  const approveUser = async (accountId) => {
    try {
      const res = await axios.post("http://localhost:8000/verify/approve", {
        account_id: accountId,
      });
      message.success(res.data?.message || "Duyệt xác thực thành công!");
      fetchAllUsers();
    } catch (err) {
      console.error(err);
      const apiError = err.response?.data?.detail || "Lỗi duyệt tài khoản!";
      message.error(`Lỗi: ${apiError}`);
    }
  };

  const filterUserByStatus = async (status) => {
    setFilterStatus(status);
    if (!status) return fetchAllUsers();

    try {
      const res = await axios.get(
        `http://localhost:8000/verify/alluser?status=${status}`
      );
      const formatted = res.data.map((item) => ({
        key: item.account_id,
        account_id: item.account_id,
        email: item.email,
        is_verified: item.is_verified,
        verification_status: item.verification_status || "unverified",
        pending_image_path: item.pending_image_path || null,
        pending_pose: item.pending_pose || null,
        pose_sample_image: item.pose_sample_image || null,
      }));
      setTableData(formatted);
      message.success("Lọc tài khoản thành công!");
    } catch (err) {
      console.error(err);
      const apiError = err.response?.data?.detail || "Lỗi lọc tài khoản!";
      message.error(`Lỗi: ${apiError}`);
    }
  };

  const handlePreview = (title, url) => {
    setPreviewTitle(title);
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  // ----------------------------
  // TABLE COLUMNS
  // ----------------------------
  const columns = [
    {
      title: "Account ID",
      dataIndex: "account_id",
      key: "account_id",
      sorter: (a, b) => a.account_id - b.account_id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái xác thực",
      dataIndex: "verification_status",
      key: "verification_status",
      render: (status) => {
        if (status === "pending")
          return (
            <span className="text-yellow-600 font-bold">Đang chờ duyệt</span>
          );
        if (status === "verified")
          return <span className="text-green-600 font-bold">Đã xác thực</span>;
        return <span className="text-gray-600">Chưa xác thực</span>;
      },
    },
    {
      title: "Ảnh người dùng",
      dataIndex: "pending_image_path",
      key: "pending_image_path",
      //   render: (path) =>
      //     path && path !== "Không có" ? (
      //       <img
      //         src={`http://localhost:8000/${path}`}
      //         alt="Pending"
      //         style={{
      //           width: 80,
      //           height: 80,
      //           objectFit: "cover",
      //           borderRadius: 8,
      //         }}
      //       />
      //     ) : (
      //       <span>Không có</span>
      //     ),
      render: (url, record) =>
        url ? (
          <div className="flex flex-col ">
            <img
              src={url}
              alt="Pending"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
                cursor: "pointer",
              }}
              onClick={() =>
                handlePreview(`Ảnh pending #${record.account_id}`, url)
              }
            />
            {/* <Button
              size="small"
              className="mt-1"
              onClick={() =>
                handlePreview(`Ảnh pending #${record.account_id}`, url)
              }
            >
              Xem
            </Button> */}
          </div>
        ) : (
          <span>Không có</span>
        ),
    },
    {
      title: "Pose mẫu",
      dataIndex: "pose_sample_image",
      key: "pose_sample_image",
      render: (path) =>
        path ? (
          <img
            src={`http://localhost:8000/${path}`}
            alt="Pose Sample"
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          <span>Không có</span>
        ),
    },
    {
      title: "Pose",
      dataIndex: "pending_pose",
      key: "pending_pose",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) =>
        record.verification_status === "pending" ? (
          <Button type="primary" onClick={() => approveUser(record.account_id)}>
            Duyệt
          </Button>
        ) : (
          <span>—</span>
        ),
    },
  ];

  return (
    <>
      <h1 className="text-[20px] font-bold mt-5 mx-5">
        Quản lý xác thực khuôn mặt
      </h1>

      {/* FORM GỬI YÊU CẦU */}
      <div className="m-5 p-4 bg-white rounded-lg shadow-lg border">
        <h2 className="text-[16px] font-bold mb-3">Gửi yêu cầu xác thực</h2>
        <div className="flex gap-3 mb-3">
          <Input
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            style={{ width: 150 }}
          />
          <Input
            placeholder="Pose Key"
            value={poseKey}
            onChange={(e) => setPoseKey(e.target.value)}
            style={{ width: 150 }}
          />
          <Upload
            beforeUpload={(f) => {
              setFile(f);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          <Button type="primary" onClick={sendVerifyRequest}>
            Gửi yêu cầu
          </Button>
        </div>
      </div>

      {/* BỘ LỌC */}
      <div className="m-5">
        <Select
          style={{ width: 250 }}
          placeholder="Lọc theo trạng thái"
          value={filterStatus}
          onChange={filterUserByStatus}
          options={[
            { label: "Tất cả", value: "" },
            { label: "Chưa xác thực", value: "unverified" },
            { label: "Chờ duyệt", value: "pending" },
            { label: "Đã xác thực", value: "verified" },
          ]}
        />
      </div>

      {/* BẢNG HIỂN THỊ */}
      <div className="w-[98%] mx-auto bg-white p-3 rounded-xl border shadow">
        <Table columns={columns} dataSource={tableData} scroll={{ x: true }} />
      </div>

      {/* MODAL XEM ẢNH */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image src={previewImage} alt={previewTitle} width="100%" />
      </Modal>
    </>
  );
};

export default Verification;
