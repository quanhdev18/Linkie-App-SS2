import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const StatsCard = () => {
    const [chartData, setChartData] = useState({
        days: [],
        series: []
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/statistics/revenue-daily")
            .then(res => {
                const apiData = res.data;

                const series = apiData.packages.map(pkg => ({
                    name: pkg.package_name,
                    data: pkg.daily_revenue,
                }));

                setChartData({
                    days: apiData.days,
                    series
                });
            });
    }, []);

    const options = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        xaxis: {
            categories: chartData.days,
        },
        yaxis: {
            labels: { formatter: value => `${value}₫` }
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow p-4">
            <ReactApexChart
                options={options}
                series={chartData.series}
                type="line"
                height={260}
            />
        </div>
    );
};

export default StatsCard;


// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const StatsCard = () => {
//     const options = {
//         chart: {
//             height: "100%",
//             maxWidth: "100%",
//             type: "line",
//             fontFamily: "Inter, sans-serif",
//             dropShadow: {
//                 enabled: false,
//             },
//             toolbar: {
//                 show: false,
//             },
//         },
//         tooltip: {
//             enabled: true,
//             x: {
//                 show: false,
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             curve: 'smooth',
//             width: 6,
//         },
//         grid: {
//             show: true,
//             strokeDashArray: 4,
//             padding: {
//                 left: 2,
//                 right: 2,
//                 top: -26
//             },
//         },
//         series: [
//             {
//                 name: "Revenue",
//                 data: [6500, 6418, 6456, 6526, 6356, 6456],
//                 color: "#FF0000",
//             },
//             {
//                 name: "Interest Rate",
//                 data: [6456, 6356, 6526, 6332, 6418, 6500],
//                 color: "#0033FF",
//             },
//         ],
//         legend: {
//             show: false
//         },
//         xaxis: {
//             categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: "Inter, sans-serif",
//                     cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
//                 }
//             },
//             axisBorder: {
//                 show: false,
//             },
//             axisTicks: {
//                 show: false,
//             },
//         },
//         yaxis: {
//             show: false,
//         },
//     };

//     return (
//         <div className=" w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
//             {/* <div className="flex justify-between mb-5">
//                 <div className="grid gap-4 grid-cols-2">
//                     <div>
//                         <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 font-normal mb-2">
//                             Revenue
//                         </h5>
//                         <p className="text-gray-900  text-2xl font-bold">42,3k</p>
//                     </div>
//                     <div>
//                         <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 font-normal mb-2">
//                             Interest Rate
//                         </h5>
//                         <p className="text-gray-900  text-2xl font-bold">$5.40</p>
//                     </div>
//                 </div>

//             </div> */}

//             <div>
//                 <ReactApexChart options={options} series={options.series} type="line" height={250} />
//             </div>

//             {/* <div className="grid grid-cols-1 border-t border-gray-200 dark:border-gray-700 mt-2.5">
//                 <div className="pt-5">
//                     <a
//                         href="#"
//                         className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                         <svg
//                             className="w-3.5 h-3.5 text-white mr-2"
//                             fill="currentColor"
//                             viewBox="0 0 16 20"
//                         >
//                             <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
//                             <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
//                         </svg>
//                         View full report
//                     </a>
//                 </div>
//             </div> */}
//         </div>
//     );
// };

// export default StatsCard;


// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";

// const StatsCard = () => {
//   const [chartData, setChartData] = useState({
//     categories: [],
//     revenue: [],
//     interest: [],
//   });

//   const [loading, setLoading] = useState(true);

//   // Hàm lấy dữ liệu từ API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/statistics/revenue-trend");
//         const data = res.data || [];

//         // Map dữ liệu
//         const categories = data.map((item) =>
//           new Date(item.date).toLocaleDateString("vi-VN", {
//             day: "2-digit",
//             month: "2-digit",
//           })
//         );

//         const revenue = data.map((item) => item.revenue);
//         const interest = data.map((item) => item.interest_rate);

//         setChartData({ categories, revenue, interest });
//       } catch (err) {
//         console.error("Lỗi tải dữ liệu:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     chart: {
//       type: "line",
//       fontFamily: "Inter, sans-serif",
//       toolbar: { show: false },
//     },
//     stroke: { curve: "smooth", width: 4 },
//     grid: { show: true, strokeDashArray: 4 },
//     dataLabels: { enabled: false },
//     xaxis: {
//       categories: chartData.categories,
//       labels: {
//         style: {
//           fontFamily: "Inter, sans-serif",
//           cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
//         },
//       },
//     },
//     yaxis: { show: false },
//     tooltip: {
//       y: { formatter: (val) => val.toLocaleString("vi-VN") + " VNĐ" },
//     },
//   };

//   const series = [
//     {
//       name: "Doanh thu",
//       data: chartData.revenue,
//       color: "#FF0000",
//     },
//     {
//       name: "Lãi suất",
//       data: chartData.interest,
//       color: "#0033FF",
//     },
//   ];

//   return (
//     <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
//       <h2 className="text-lg font-semibold text-gray-700 mb-3">
//         Biểu đồ doanh thu & lãi suất
//       </h2>

//       {loading ? (
//         <p className="text-gray-500">Đang tải dữ liệu...</p>
//       ) : (
//         <ReactApexChart options={options} series={series} type="line" height={250} />
//       )}
//     </div>
//   );
// };

// export default StatsCard;
