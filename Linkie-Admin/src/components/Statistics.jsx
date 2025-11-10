// import { Card, Col, Row, Statistic } from 'antd';
// import CountUp from 'react-countup';
// const formatter = (value) => (
//     <CountUp
//         end={value}
//         separator=","
//         decimals={value % 1 === 0 ? 0 : 2}
//     />
// );


// function Statistics({ data }) {


//     return (
//         <Row gutter={16}>
//             {data.map((item, index) => (
//                 <Col key={index} span={6}>
//                     <Card variant="borderless" className='shadow-2xl'>
//                         <Statistic
//                             formatter={formatter}
//                             title={item.name}
//                             value={item.number}
//                             precision={2}
//                             valueStyle={{ color: item.color }}
//                             prefix={item.icon}
//                             suffix={item.unit}
//                         />
//                     </Card>
//                 </Col>
//             ))}

//         </Row>
//     );

// }

// export default Statistics


// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Statistic } from "antd";
// import CountUp from "react-countup";
// import axios from "axios";
// import {
//   DollarOutlined,
//   ShoppingCartOutlined,
//   RiseOutlined,
//   PercentageOutlined,
// } from "@ant-design/icons";

// const formatter = (value) => (
//   <CountUp
//     end={value}
//     separator=","
//     decimals={value % 1 === 0 ? 0 : 2}
//   />
// );

// /**
//  * ✅ Nhận prop `data` từ Dashboard để hiển thị thêm
//  */
// function Statistics({ data = [] }) {
//   const [packageStats, setPackageStats] = useState([]);

//   useEffect(() => {
//     const fetchPackageStatistics = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/packages/statistics");
//         const stats = res.data || [];

//         const mappedData = stats.map((item) => ({
//           name: item.package_name,
//           number: item.total_revenue,
//           unit: "VNĐ",
//           color: "#3f8600",
//           icon: <DollarOutlined />,
//         }));

//         // Tính tổng & phần trăm
//         const totalRevenue = stats.reduce((s, i) => s + i.total_revenue, 0);
//         const totalSold = stats.reduce((s, i) => s + i.total_sold, 0);
//         const avgPercent =
//           stats.length > 0
//             ? (stats.reduce((s, i) => s + i.revenue_percentage, 0) /
//                 stats.length).toFixed(1)
//             : 0;

//         const summaryCards = [
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

//         setPackageStats([...summaryCards, ...mappedData]);
//       } catch (error) {
//         console.error("Lỗi khi tải thống kê gói:", error);
//       }
//     };

//     fetchPackageStatistics();
//   }, []);

//   // ✅ Kết hợp dữ liệu từ props (Dashboard) và từ backend
//   const combinedData = [...data, ...packageStats];

//   return (
//     <Row gutter={16}>
//       {combinedData.map((item, index) => (
//         <Col key={index} xs={24} sm={12} md={8} lg={6}>
//           <Card
//             variant="borderless"
//             className="shadow-xl hover:shadow-2xl transition-shadow duration-200"
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
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import axios from "axios";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  PercentageOutlined,
  UserOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const formatter = (value) => (
  <CountUp end={value} separator="," decimals={value % 1 === 0 ? 0 : 2} />
);

function Statistics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res1 = await axios.get("http://127.0.0.1:8000/packages/statistics");
        const data = res1.data || [];
        const res2 = await axios.get("http://127.0.0.1:8000/statistics/summary");
        const { today_revenue, month_revenue, growth_rate, total_users } = res2.data;


        // ✅ Tính toán dữ liệu tổng hợp
        const totalRevenue = data.reduce((s, i) => s + i.total_revenue, 0);
        const totalSold = data.reduce((s, i) => s + i.total_sold, 0);
        const avgPercent =
          data.length > 0
            ? (
                data.reduce((s, i) => s + i.revenue_percentage, 0) / data.length
              ).toFixed(2)
            : 0;

        // ✅ Dữ liệu giả định cho các chỉ số "doanh thu hôm nay / tháng này"
        const todayRevenue = 550000;
        const monthRevenue = 10000;
        const monthGrowth = 30.49;
        const totalUsers = 120000;

        const summaryCards = [
          {
            name: "Doanh thu hôm nay",
            number: today_revenue,
            unit: "đ",
            color: "#3f8600",
            icon: <DollarOutlined />,
          },
          {
            name: "Doanh thu tháng này",
            number: month_revenue,
            unit: "đ",
            color: "#1890ff",
            icon: <LineChartOutlined />,
          },
          {
            name: "Tăng trưởng theo tháng",
            number: growth_rate,
            unit: "%",
            color: "#faad14",
            icon: <RiseOutlined />,
          },
          {
            name: "Số người dùng đăng ký gói",
            number: total_users,
            unit: "",
            color: "#722ed1",
            icon: <UserOutlined />,
          },
          {
            name: "Tổng doanh thu (từ gói)",
            number: totalRevenue,
            unit: "VNĐ",
            color: "#3f8600",
            icon: <RiseOutlined />,
          },
          {
            name: "Tổng số gói đã bán",
            number: totalSold,
            unit: "gói",
            color: "#1890ff",
            icon: <ShoppingCartOutlined />,
          },
          {
            name: "Trung bình % doanh thu",
            number: avgPercent,
            unit: "%",
            color: "#faad14",
            icon: <PercentageOutlined />,
          },
        ];

        setStats(summaryCards);
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {stats.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            variant="borderless"
            className="shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Statistic
              formatter={formatter}
              title={item.name}
              value={item.number}
              precision={0}
              valueStyle={{ color: item.color }}
              prefix={item.icon}
              suffix={item.unit}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Statistics;
