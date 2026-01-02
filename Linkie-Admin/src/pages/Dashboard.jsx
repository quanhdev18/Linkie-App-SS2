// import { useEffect, useState } from "react";
// // import Statistics from "../components/Statistics";
// import { FaUser } from "react-icons/fa";
// import { HiUserGroup } from "react-icons/hi2";
// import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import ChartPie from "../components/ChartPie";
// import RevenueCard from "../components/RevenueCard";
// import axios from "axios";

// const Dashboard = () => {
//   const [userCount, setUserCount] = useState(0);     // USER + ADMIN
//   const [memberCount, setMemberCount] = useState(0); // chỉ USER

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/accounts/activated", {
//           params: { page: 1, size: 100 },
//         });

//         const allAccounts = res.data.items || [];

//         // Lấy role (chuyển về in hoa để an toàn)
//         const normalizedAccounts = allAccounts.map(acc => ({
//           ...acc,
//           role: acc.role?.toUpperCase() || "",
//         }));

//         // USER = USER + ADMIN
//         const userTotal = normalizedAccounts.filter(acc =>
//           acc.role === "USER" || acc.role === "ADMIN"
//         ).length;

//         // MEMBER = chỉ USER
//         const memberTotal = normalizedAccounts.filter(acc =>
//           acc.role === "USER"
//         ).length;

//         setUserCount(userTotal);
//         setMemberCount(memberTotal);
//       } catch (err) {
//         console.error("Lỗi lấy dữ liệu account:", err.message);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   const dataSta = [
//     {
//       name: "User (User + Admin)",
//       number: userCount,
//       icon: <FaUser />,
//       color: "#000000",
//       unit: "",
//     },
//     {
//       name: "Member (chỉ User)",
//       number: memberCount,
//       icon: <HiUserGroup />,
//       color: "#000080",
//       unit: "",
//     },
//     {
//       name: "Revenue",
//       number: 30.49,
//       icon: <ArrowUpOutlined />,
//       color: "#3f8600",
//       unit: "%",
//     },
//     {
//       name: "Interest Rate",
//       number: 12.5,
//       icon: <ArrowDownOutlined />,
//       color: "#cf1322",
//       unit: "%",
//     },
//   ];

//   return (
//     <div className="w-full p-2">
//       {/* <Statistics data={dataSta} /> */}
//       <div className="w-full my-2 flex">
//         <div className="w-1/3 pr-1">
//           <ChartPie />
//         </div>
//         <div className="w-2/3 pl-1">
//           <RevenueCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import ChartPie from "../components/ChartPie";
import RevenueCard from "../components/RevenueCard";
import axios from "axios";
import RadarChart from "../components/RadarChart";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0); // USER + ADMIN
  const [memberCount, setMemberCount] = useState(0); // chỉ USER
  const [revenue, setRevenue] = useState(0); // Tổng doanh thu
  const [interestRate, setInterestRate] = useState(0); // % doanh thu TB

  // === Lấy danh sách tài khoản ===
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/accounts/activated",
          {
            params: { page: 1, size: 100 },
          }
        );

        const allAccounts = res.data.items || [];

        const normalizedAccounts = allAccounts.map((acc) => ({
          ...acc,
          role: acc.role?.toUpperCase() || "",
        }));

        const userTotal = normalizedAccounts.filter(
          (acc) => acc.role === "USER" || acc.role === "ADMIN"
        ).length;

        const memberTotal = normalizedAccounts.filter(
          (acc) => acc.role === "USER"
        ).length;

        setUserCount(userTotal);
        setMemberCount(memberTotal);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu account:", err.message);
      }
    };

    fetchAccounts();
  }, []);

  // === Lấy dữ liệu doanh thu ===
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/statistics/revenue");
        // ví dụ dữ liệu trả về
        // { total_revenue: 207000, average_revenue_percent: 100 }

        setRevenue(res.data.total_revenue || 0);
        setInterestRate(res.data.average_revenue_percent || 0);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu doanh thu:", err.message);
      }
    };

    fetchRevenue();
  }, []);

  // === Dữ liệu cho 4 card ===
  const dataSta = [
    {
      name: "Tài khoản (User + Admin)",
      number: userCount,
      icon: <FaUser className="text-xl text-black" />,
      color: "#000000",
      unit: "",
    },
    {
      name: "Người dùng (chỉ User)",
      number: memberCount,
      icon: <HiUserGroup className="text-xl text-blue-800" />,
      color: "#000080",
      unit: "",
    },
    {
      name: "Doanh thu tháng này (VND)",
      number: revenue,
      icon: <ArrowUpOutlined className="text-xl text-green-700" />,
      color: "#3f8600",
      unit: "VNĐ",
    },
    {
      name: "Tăng trưởng doanh thu (%)",
      number: interestRate,
      icon:
        interestRate >= 0 ? (
          <ArrowUpOutlined className="text-xl text-green-700" />
        ) : (
          <ArrowDownOutlined className="text-xl text-red-700" />
        ),
      color: interestRate >= 0 ? "#3f8600" : "#cf1322",
      unit: "%",
    },

    // {
    //   name: "Interest Rate",
    //   number: interestRate,
    //   icon: <ArrowDownOutlined className="text-xl text-red-700" />,
    //   color: "#cf1322",
    //   unit: "%",
    // },
  ];

  return (
    <div className="w-full p-4">
      {/* 4 ô thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {dataSta.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.name}</p>
              <h2 className="text-2xl font-bold" style={{ color: item.color }}>
                {item.number.toLocaleString()} {item.unit}
              </h2>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className="w-full my-2 flex flex-col lg:flex-row">
        <div className="lg:w-1/3 pr-0 lg:pr-2 mb-4 lg:mb-0">
          <ChartPie />
        </div>
        <div className="lg:w-2/3 pl-0 lg:pl-2 ">
          <RevenueCard />
        </div>
      </div>
      <div className="my-6">
        <RadarChart />
      </div>
    </div>
  );
};

export default Dashboard;
