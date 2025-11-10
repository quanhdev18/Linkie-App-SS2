// import React, { useEffect, useState } from "react";
// import { Radar } from "react-chartjs-2";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // ✅ Đăng ký các module cần thiết cho radar chart
// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// const RadarChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchRadarData = async () => {
//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/packages/statistics"
//         );
//         const data = res.data || [];

//         const filtered = data.filter((pkg) =>
//           ["Newbie", "Plus", "Boost", "Premium"].includes(pkg.package_name)
//         );

//         const labels = filtered.map((item) => item.package_name);
//         const totalRevenue = filtered.map((item) => item.total_revenue);
//         const totalSold = filtered.map((item) => item.total_sold);
//         const percent = filtered.map((item) => item.revenue_percentage);

//         const radarData = {
//           labels,
//           datasets: [
//             {
//               label: "Tổng doanh thu (VNĐ)",
//               data: totalRevenue,
//               fill: true,
//               backgroundColor: "rgba(255, 99, 132, 0.2)",
//               borderColor: "rgb(255, 99, 132)",
//               pointBackgroundColor: "rgb(255, 99, 132)",
//             },
//             {
//               label: "Số gói đã bán",
//               data: totalSold,
//               fill: true,
//               backgroundColor: "rgba(54, 162, 235, 0.2)",
//               borderColor: "rgb(54, 162, 235)",
//               pointBackgroundColor: "rgb(54, 162, 235)",
//             },
//             {
//               label: "Tỷ lệ doanh thu (%)",
//               data: percent,
//               fill: true,
//               backgroundColor: "rgba(255, 206, 86, 0.2)",
//               borderColor: "rgb(255, 206, 86)",
//               pointBackgroundColor: "rgb(255, 206, 86)",
//             },
//           ],
//         };

//         setChartData(radarData);
//       } catch (error) {
//         console.error("Lỗi khi tải dữ liệu radar:", error);
//       }
//     };

//     fetchRadarData();
//   }, []); // ✅ thêm [] để không bị re-render vô hạn

//   if (!chartData)
//     return <p className="text-center text-gray-500">Đang tải biểu đồ...</p>;

//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 h-[600px] overflow-hidden">
//       <h2 className="text-lg font-semibold mb-4 text-gray-700">
//         So sánh hiệu suất giữa các gói
//       </h2>
//       <Radar
//         data={chartData}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: "top" },
//             tooltip: { enabled: true },
//           },
//           scales: {
//             r: {
//               angleLines: { color: "#ddd" },
//               grid: { color: "#eee" },
//               ticks: { display: false },
//             },
//           },
//         }}
//         height={600}
//       />
//     </div>
//   );
// };

// export default RadarChart;
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Đăng ký module cho radar chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRadarData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/packages/statistics");
        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ Danh sách gói cố định
        const fixedPackages = ["Newbie", "Plus", "Boost", "Premium"];

        // ✅ Tạo dữ liệu đồng bộ (nếu thiếu gói thì cho 0)
        const mapped = fixedPackages.map((pkg) => {
          const found = data.find((d) => d.package_name === pkg);
          return {
            name: pkg,
            total_revenue: found?.total_revenue || 0,
            total_sold: found?.total_sold || 0,
            revenue_percentage: found?.revenue_percentage || 0,
          };
        });

        const labels = mapped.map((m) => m.name);
        const totalRevenue = mapped.map((m) => m.total_revenue);
        const totalSold = mapped.map((m) => m.total_sold);
        const percent = mapped.map((m) => m.revenue_percentage);

        // ✅ Chỉ setState nếu dữ liệu khác lần trước
        const newData = {
          labels,
          datasets: [
            {
              label: "Tổng doanh thu (VNĐ)",
              data: totalRevenue,
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
            },
            {
              label: "Số gói đã bán",
              data: totalSold,
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
            },
            {
              label: "Tỷ lệ doanh thu (%)",
              data: percent,
              fill: true,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgb(255, 206, 86)",
              pointBackgroundColor: "rgb(255, 206, 86)",
            },
          ],
        };

        // So sánh với state cũ để tránh re-render vô hạn
        setChartData((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(newData)) {
            return newData;
          }
          return prev;
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu radar:", error);
      }
    };

    fetchRadarData();
  }, []); // ✅ chỉ chạy 1 lần khi mount

  if (!chartData)
    return <p className="text-center text-gray-500">Đang tải biểu đồ...</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-[600px] overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        So sánh hiệu suất giữa các gói
      </h2>

      <div className="h-[500px]">
        <Radar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              tooltip: { enabled: true },
            },
            scales: {
              r: {
                angleLines: { color: "#ddd" },
                grid: { color: "#eee" },
                ticks: { display: false },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RadarChart;
