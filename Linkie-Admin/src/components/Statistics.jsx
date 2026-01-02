
// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Statistic } from "antd";
// import CountUp from "react-countup";
// import axios from "axios";
// import {
//   DollarOutlined,
//   ShoppingCartOutlined,
//   RiseOutlined,
//   PercentageOutlined,
//   UserOutlined,
//   LineChartOutlined,
// } from "@ant-design/icons";

// const formatter = (value) => (
//   <CountUp end={value} separator="," decimals={value % 1 === 0 ? 0 : 2} />
// );

// function Statistics() {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         const res1 = await axios.get("http://127.0.0.1:8000/packages/statistics");
//         const data = res1.data || [];
//         const res2 = await axios.get("http://127.0.0.1:8000/statistics/summary");
//         const { today_revenue, month_revenue, growth_rate, total_users } = res2.data;


//         // ✅ Tính toán dữ liệu tổng hợp
//         const totalRevenue = data.reduce((s, i) => s + i.total_revenue, 0);
//         const totalSold = data.reduce((s, i) => s + i.total_sold, 0);
//         const avgPercent =
//           data.length > 0
//             ? (
//                 data.reduce((s, i) => s + i.revenue_percentage, 0) / data.length
//               ).toFixed(2)
//             : 0;

//         // ✅ Dữ liệu giả định cho các chỉ số "doanh thu hôm nay / tháng này"
//         const todayRevenue = 550000;
//         const monthRevenue = 10000;
//         const monthGrowth = 30.49;
//         const totalUsers = 120000;

//         const summaryCards = [
//           {
//             name: "Doanh thu hôm nay",
//             number: today_revenue,
//             unit: "đ",
//             color: "#3f8600",
//             icon: <DollarOutlined />,
//           },
//           {
//             name: "Doanh thu tháng này",
//             number: month_revenue,
//             unit: "đ",
//             color: "#1890ff",
//             icon: <LineChartOutlined />,
//           },
//           {
//             name: "Tăng trưởng theo tháng",
//             number: growth_rate,
//             unit: "%",
//             color: "#faad14",
//             icon: <RiseOutlined />,
//           },
//           {
//             name: "Số người dùng đăng ký gói",
//             number: total_users,
//             unit: "",
//             color: "#722ed1",
//             icon: <UserOutlined />,
//           },
//           {
//             name: "Tổng doanh thu (từ gói)",
//             number: totalRevenue,
//             unit: "VNĐ",
//             color: "#3f8600",
//             icon: <RiseOutlined />,
//           },
//           {
//             name: "Tổng số gói đã bán",
//             number: totalSold,
//             unit: "gói",
//             color: "#1890ff",
//             icon: <ShoppingCartOutlined />,
//           },
//           {
//             name: "Trung bình % doanh thu",
//             number: avgPercent,
//             unit: "%",
//             color: "#faad14",
//             icon: <PercentageOutlined />,
//           },
//         ];

//         setStats(summaryCards);
//       } catch (error) {
//         console.error("Lỗi khi tải thống kê:", error);
//       }
//     };

//     fetchStatistics();
//   }, []);

//   return (
//     <Row gutter={[16, 16]}>
//       {stats.map((item, index) => (
//         <Col key={index} xs={24} sm={12} md={8} lg={6}>
//           <Card
//             variant="borderless"
//             className="shadow-md hover:shadow-lg transition-shadow duration-200"
//           >
//             <Statistic
//               formatter={formatter}
//               title={item.name}
//               value={item.number}
//               precision={0}
//               valueStyle={{ color: item.color }}
//               prefix={item.icon}
//               suffix={item.unit}
//             />
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }

// export default Statistics;
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import CountUp from "react-countup";
import axios from "axios";

const formatter = (value) => (
  <CountUp end={value} separator="," decimals={value % 1 === 0 ? 0 : 2} />
);

function Statistics({ data }) {
  const [stats, setStats] = useState(data || []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res1 = await axios.get(
          "http://127.0.0.1:8000/packages/statistics"
        );
        const packageStats = res1.data || [];
        const res2 = await axios.get("http://127.0.0.1:8000/statistics/summary");
        const { today_revenue, month_revenue, growth_rate, total_users } =
          res2.data;

        const totalRevenue = packageStats.reduce(
          (sum, i) => sum + i.total_revenue,
          0
        );
        const totalSold = packageStats.reduce((sum, i) => sum + i.total_sold, 0);
        const avgPercent =
          packageStats.length > 0
            ? (
                packageStats.reduce((s, i) => s + i.revenue_percentage, 0) /
                packageStats.length
              ).toFixed(2)
            : 0;

        const summaryCards = [
          {
            name: "Doanh thu hôm nay",
            number: today_revenue,
            unit: "đ",
            color: "#3f8600",
            icon: "",
          },
          // {
          //   name: "Doanh thu tháng này",
          //   number: month_revenue,
          //   unit: "đ",
          //   color: "#1890ff",
          //   icon: "",
          // },
          // {
          //   name: "Tăng trưởng theo tháng",
          //   number: growth_rate,
          //   unit: "%",
          //   color: "#faad14",
          //   icon: "",
          // },
          
          {
            name: "Tổng doanh thu (từ gói)",
            number: totalRevenue,
            unit: "VNĐ",
            color: "#3f8600",
            icon: "",
          },
          {
            name: "Tổng số gói đã bán",
            number: totalSold,
            unit: "gói",
            color: "#1890ff",
            icon: "",
          },
          {
            name: "Số người dùng đăng ký gói",
            number: total_users,
            unit: "",
            color: "#722ed1",
            icon: "",
          },
          // {
          //   name: "Trung bình % doanh thu",
          //   number: avgPercent,
          //   unit: "%",
          //   color: "#faad14",
          //   icon: "",
          // },
        ];

        setStats(summaryCards);
      } catch (err) {
        console.error("Lỗi khi tải thống kê:", err);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
        >
          <div>
            <p className="text-gray-500 text-sm">{item.name}</p>
            <h2 className="text-2xl font-bold" style={{ color: item.color }}>
              {formatter(item.number)} {item.unit}
            </h2>
          </div>
          <div>{item.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
