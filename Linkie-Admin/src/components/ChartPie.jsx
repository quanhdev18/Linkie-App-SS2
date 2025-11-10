// import React, { useEffect, useRef } from 'react';
// import ApexCharts from 'apexcharts';

// const ChartPie = () => {
//     const chartRef = useRef(null);

//     // Function to get the chart options
//     const getChartOptions = () => {
//         return {
//             series: [50, 25, 15, 25],
//             colors: ["#C0C0C0", "#FFFF00", "#0000FF", "silver"],
//             chart: {
//                 height: 320,
//                 width: "100%",
//                 type: "donut",
//             },
//             stroke: {
//                 colors: ["transparent"],
//                 lineCap: "",
//             },
//             plotOptions: {
//                 pie: {
//                     donut: {
//                         labels: {
//                             show: true,
//                             name: {
//                                 show: true,
//                                 fontFamily: "Inter, sans-serif",
//                                 offsetY: 20,
//                             },
//                             total: {
//                                 showAlways: true,
//                                 show: true,
//                                 label: "Người dùng",
//                                 fontFamily: "Inter, sans-serif",
//                                 formatter: function (w) {
//                                     const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
//                                     return sum;
//                                 },
//                             },
//                             value: {
//                                 show: true,
//                                 fontFamily: "Inter, sans-serif",
//                                 offsetY: -20,
//                                 formatter: (value) => value + "k",
//                             },
//                         },
//                         size: "80%",
//                     },
//                 },
//             },
//             labels: ["Silver", "Gold", "Platinum ", "Personal Trainer Cost"],
//             legend: {
//                 position: "bottom",
//                 fontFamily: "Inter, sans-serif",
//             },
//         };
//     };

//     useEffect(() => {
//         if (chartRef.current) {
//             const chart = new ApexCharts(chartRef.current, getChartOptions());
//             chart.render();
//             return () => {
//                 chart.destroy();

//             };
//         }
//     }, []);

//     return (
//         <div className=" w-full mx-1  bg-white rounded-lg shadow  p-4 ">

//             <div className="py-6" ref={chartRef}></div>
//         </div>
//     );
// };

// export default ChartPie;
import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

const ChartPie = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  // Hàm lấy dữ liệu từ API
  // useEffect(() => {
  //   const fetchChartData = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/packages/statistics");
  //       const data = res.data || [];

  //       // series = phần trăm doanh thu
  //       const series = data.map((item) => item.revenue_percentage);
  //       // labels = tên gói
  //       const labels = data.map((item) => item.package_name);

  //       setChartData({ series, labels });

  //       // Xóa chart cũ nếu có
  //       if (chartRef.current) chartRef.current.innerHTML = "";

  //       // Cấu hình ApexCharts
  //       const options = {
  //         series,
  //         labels,
  //         colors: ["#C0C0C0", "#FFD700", "#1E90FF", "#32CD32", "#FF6347"],
  //         chart: {
  //           type: "donut",
  //           height: 320,
  //           width: "100%",
  //         },
  //         stroke: {
  //           colors: ["transparent"],
  //         },
  //         plotOptions: {
  //           pie: {
  //             donut: {
  //               size: "75%",
  //               labels: {
  //                 show: true,
  //                 name: {
  //                   show: true,
  //                   fontFamily: "Inter, sans-serif",
  //                   offsetY: 20,
  //                 },
  //                 total: {
  //                   showAlways: true,
  //                   show: true,
  //                   label: "Tổng doanh thu (%)",
  //                   fontFamily: "Inter, sans-serif",
  //                   formatter: function (w) {
  //                     const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
  //                     return total.toFixed(0) + "%";
  //                   },
  //                 },
  //                 value: {
  //                   show: true,
  //                   fontFamily: "Inter, sans-serif",
  //                   offsetY: -20,
  //                   formatter: (value) => value.toFixed(1) + "%",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         legend: {
  //           position: "bottom",
  //           fontFamily: "Inter, sans-serif",
  //         },
  //         tooltip: {
  //           y: {
  //             formatter: (val, opts) => {
  //               const pkg = labels[opts.seriesIndex];
  //               return `${pkg}: ${val.toFixed(2)}%`;
  //             },
  //           },
  //         },
  //       };

  //       const chart = new ApexCharts(chartRef.current, options);
  //       chart.render();

  //       return () => chart.destroy();
  //     } catch (err) {
  //       console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
  //     }
  //   };

  //   fetchChartData();
  // }, []);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/packages/statistics"
        );
        const data = res.data || [];

        // ✅ Gom nhóm theo 4 gói cố định
        const packageNames = ["Newbie", "Plus", "Boost", "Premium"];

        // Tính tổng doanh thu từng gói
        const grouped = packageNames.map((pkg) => {
          const filtered = data.filter(
            (item) => item.package_name?.toLowerCase() === pkg.toLowerCase()
          );
          const totalRevenue = filtered.reduce(
            (sum, item) => sum + (item.total_revenue || 0),
            0
          );
          return { package_name: pkg, total_revenue: totalRevenue };
        });

        // ✅ Tính tổng doanh thu toàn hệ thống
        const totalAll = grouped.reduce(
          (sum, item) => sum + item.total_revenue,
          0
        );

        // ✅ Chuyển thành phần trăm
        const series = grouped.map((item) =>
          totalAll > 0 ? (item.total_revenue / totalAll) * 100 : 0
        );
        const labels = grouped.map((item) => item.package_name);

        setChartData({ series, labels });

        // ✅ Xóa chart cũ
        if (chartRef.current) chartRef.current.innerHTML = "";

        const options = {
          series,
          labels,
          colors: ["#FFD700", "#1E90FF", "#FF6347", "#32CD32"], // Newbie, Plus, Boost, Premium
          chart: {
            type: "donut",
            height: 320,
            width: "100%",
          },
          stroke: {
            colors: ["transparent"],
          },
          plotOptions: {
            pie: {
              donut: {
                size: "75%",
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontFamily: "Inter, sans-serif",
                    offsetY: 20,
                  },
                  total: {
                    showAlways: true,
                    show: true,
                    label: "Tổng doanh thu (%)",
                    fontFamily: "Inter, sans-serif",
                    formatter: function (w) {
                      const total = w.globals.seriesTotals.reduce(
                        (a, b) => a + b,
                        0
                      );
                      return total.toFixed(0) + "%";
                    },
                  },
                  value: {
                    show: true,
                    fontFamily: "Inter, sans-serif",
                    offsetY: -20,
                    formatter: (value) => value.toFixed(1) + "%",
                  },
                },
              },
            },
          },
          legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
          },
          tooltip: {
            y: {
              formatter: (val, opts) => {
                const pkg = labels[opts.seriesIndex];
                return `${pkg}: ${val.toFixed(2)}%`;
              },
            },
          },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => chart.destroy();
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="w-full mx-1 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Tỷ lệ doanh thu theo gói
      </h2>
      <div className="py-6" ref={chartRef}></div>
    </div>
  );
};

export default ChartPie;
