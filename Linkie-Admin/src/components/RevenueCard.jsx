// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';
// import { ArrowUpOutlined } from '@ant-design/icons';
// const RevenueCard = () => {
//     useEffect(() => {
//         // Options for the bar chart
//         const options = {
//             series: [
//                 {
//                     name: 'Doanh số',
//                     color: '#31C48D',
//                     data: [1420, 1620, 1820, 2500],
//                 },

//             ],
//             chart: {
//                 type: 'bar',
//                 height: 300,
//                 toolbar: {
//                     show: false,
//                 },
//             },
//             plotOptions: {
//                 bar: {
//                     horizontal: true,
//                     columnWidth: '100%',
//                     borderRadius: 6,
//                 },
//             },
//             legend: {
//                 show: true,
//                 position: 'bottom',
//             },
//             dataLabels: {
//                 enabled: false,
//             },
//             tooltip: {
//                 shared: true,
//                 intersect: false,
//                 y: {
//                     formatter: (value) => value + '.000 vnđ',
//                 },
//             },
//             xaxis: {
//                 categories: ["Silver", "Gold", "Platinum ", "Personal Trainer Cost"],
//                 axisTicks: {
//                     show: false,
//                 },
//                 axisBorder: {
//                     show: false,
//                 },
//                 labels: {
//                     style: {
//                         fontFamily: 'Inter, sans-serif',
//                         fontSize: '12px',
//                     },
//                     formatter: (value) => value,
//                 },
//             },
//             yaxis: {
//                 labels: {
//                     style: {
//                         fontFamily: 'Inter, sans-serif',
//                         fontSize: '12px',
//                     },
//                 },
//             },
//             grid: {
//                 strokeDashArray: 4,
//                 padding: {
//                     left: 2,
//                     right: 2,
//                     top: -20,
//                 },
//             },
//         };

//         // Initialize the chart
//         const chartElement = document.getElementById('bar-chart');
//         if (chartElement) {
//             const chart = new ApexCharts(chartElement, options);
//             chart.render();
//         }
//     }, []);

//     return (
//         <div className=" w-full bg-white rounded-lg shadow p-4">
//             <div className="flex justify-between border-gray-200 border-b pb-3">
//                 <dl>
//                     <dt className="text-base font-normal text-gray-500 pb-1">Doanh thu</dt>
//                     <dd className="leading-none text-3xl font-bold text-gray-900">5.426.000 VNĐ</dd>
//                 </dl>
//                 <div>
//                     <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
//                         <ArrowUpOutlined className="w-2.5 h-2.5 me-1.5" />
//                         23.5%
//                     </span>
//                 </div>
//             </div>
//             <div id="bar-chart"></div>
//         </div>
//     );
// };

// export default RevenueCard;

import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { ArrowUpOutlined } from "@ant-design/icons";
import axios from "axios";

const RevenueCard = () => {
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/packages/statistics");
  //       const data = res.data || [];

  //       // Lấy doanh thu tổng
  //       const total = data.reduce((sum, item) => sum + (item.total_revenue || 0), 0);
  //       setTotalRevenue(total);

  //       // Chuẩn hóa dữ liệu cho chart
  //       const names = data.map((item) => item.package_name);
  //       const revenues = data.map((item) => item.total_revenue / 1000); // hiển thị nghìn VNĐ cho gọn

  //       // Render chart
  //       const options = {
  //         series: [
  //           {
  //             name: "Doanh thu (nghìn VNĐ)",
  //             color: "#31C48D",
  //             data: revenues,
  //           },
  //         ],
  //         chart: {
  //           type: "bar",
  //           height: 300,
  //           toolbar: { show: false },
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true,
  //             borderRadius: 6,
  //           },
  //         },
  //         legend: {
  //           show: false,
  //         },
  //         dataLabels: {
  //           enabled: true,
  //           formatter: (val) => `${val}.000 ₫`,
  //         },
  //         tooltip: {
  //           y: {
  //             formatter: (value) => `${value * 1000} VNĐ`,
  //           },
  //         },
  //         xaxis: {
  //           categories: names,
  //           labels: {
  //             style: { fontFamily: "Inter, sans-serif", fontSize: "12px" },
  //           },
  //         },
  //         grid: {
  //           strokeDashArray: 4,
  //           padding: { left: 2, right: 2, top: -20 },
  //         },
  //       };

  //       const chartElement = document.getElementById("bar-chart");
  //       if (chartElement) {
  //         chartElement.innerHTML = ""; // clear chart cũ
  //         const chart = new ApexCharts(chartElement, options);
  //         chart.render();
  //       }
  //     } catch (err) {
  //       console.error("Lỗi khi lấy thống kê gói:", err.message);
  //     }
  //   };

  //   fetchStatistics();
  // }, []);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/packages/statistics"
        );
        const data = res.data || [];

        // ✅ Gom nhóm theo 4 gói chính
        const packageNames = ["Newbie", "Plus", "Boost", "Premium"];

        const groupedData = packageNames.map((pkg) => {
          const filtered = data.filter(
            (item) => item.package_name?.toLowerCase() === pkg.toLowerCase()
          );

          const totalRevenue = filtered.reduce(
            (sum, item) => sum + (item.total_revenue || 0),
            0
          );

          return {
            package_name: pkg,
            total_revenue: totalRevenue,
          };
        });

        // ✅ Tính tổng doanh thu toàn bộ
        const total = groupedData.reduce(
          (sum, item) => sum + (item.total_revenue || 0),
          0
        );
        setTotalRevenue(total);

        // ✅ Chuẩn hóa dữ liệu cho chart
        const names = groupedData.map((item) => item.package_name);
        const revenues = groupedData.map((item) => item.total_revenue / 1000); // hiển thị nghìn VNĐ

        // ✅ Render chart
        const options = {
          series: [
            {
              name: "Doanh thu (nghìn VNĐ)",
              color: "#31C48D",
              data: revenues,
            },
          ],
          chart: {
            type: "bar",
            height: 300,
            toolbar: { show: false },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 6,
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => `${val}.000 ₫`,
          },
          tooltip: {
            y: {
              formatter: (value) => `${value * 1000} VNĐ`,
            },
          },
          xaxis: {
            categories: names,
            labels: {
              style: { fontFamily: "Inter, sans-serif", fontSize: "12px" },
            },
          },
          grid: {
            strokeDashArray: 4,
            padding: { left: 2, right: 2, top: -20 },
          },
        };

        const chartElement = document.getElementById("bar-chart");
        if (chartElement) {
          chartElement.innerHTML = ""; // clear chart cũ
          const chart = new ApexCharts(chartElement, options);
          chart.render();
        }
      } catch (err) {
        console.error("Lỗi khi lấy thống kê gói:", err.message);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4">
      <div className="flex justify-between border-gray-200 border-b pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">
            Tổng doanh thu
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900">
            {totalRevenue.toLocaleString("vi-VN")} VNĐ
          </dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
            <ArrowUpOutlined className="w-2.5 h-2.5 me-1.5" />
            +23.5%
          </span>
        </div>
      </div>
      <div id="bar-chart"></div>
    </div>
  );
};

export default RevenueCard;
