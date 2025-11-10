// import Sidebar from "./components/Sidebar";
// import SwipeContainer from "./components/SwipeContainer";

// const HomePage = () => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <main className="flex-1 bg-[#FFF8E1] flex justify-center items-center">
//         <SwipeContainer />
//       </main>
//     </div>
//   );
// };

// export default HomePage;



// import React from "react";
// // import Sidebar from "./components/Sidebar";
// import SwipeContainer from "./components/SwipeContainer";

// const HomePage: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white">
//       {/* <Sidebar /> */}

//       <main className="flex-1">
//         <header className="h-16 flex items-center justify-center">
//           <div className="text-yellow-500 font-bold text-xl">bumble</div>
//         </header>

//         <div className="flex-1 overflow-hidden ">
//           <SwipeContainer />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;


// import React from "react";
// import { SlidersHorizontal } from "lucide-react";
// // import Sidebar from "./components/Sidebar";
// import SwipeContainer from "./components/SwipeContainer";

// const HomePage: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white relative">
//       {/* <Sidebar /> */}

//       <main className="flex-1 relative">
//         {/* Header */}
//         <header className="h-16 flex items-center justify-center">
//           <div className="text-yellow-500 font-bold text-xl">bumble</div>
//         </header>

//         {/* Vùng nội dung */}
//         <div className="flex-1 overflow-hidden relative">
//           {/* 🟢 Nút Filter — nằm tuyệt đối ở góc trên trái */}
//           <button
//             className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
//                        transition rounded-full shadow-sm text-sm text-gray-500 font-medium"
//           >
//             <SlidersHorizontal size={16} />
//             <span className="hidden sm:inline">Filter</span>
//           </button>

//           {/* Swipe Container */}
//           <SwipeContainer />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;









import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import SwipeContainer from "./components/SwipeContainer";
import FilterModal from "./components/FilterModal";

const HomePage: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<any>({});
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token) {
  //     navigate("/");
  //   }

  //   // ✅ reset dữ liệu khi account đổi
  //   // có thể đặt state rỗng hoặc gọi lại API getMatches, getChats theo token mới
  // }, []);


  return (
    <div className="flex h-screen bg-white relative">
      <main className="flex-1 relative">
        {/* Header */}
        <header className="h-16 flex items-center justify-center">
          <div className="text-yellow-500 font-bold text-xl">bumble</div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {/* Filter button */}
          <button
            onClick={() => setShowFilter(true)}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                       transition rounded-full shadow-sm text-sm text-gray-500 font-medium"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {/* Swipe Container (apply filters) */}
          <SwipeContainer filters={filters} />
        </div>

        {/* Modal */}
        <FilterModal
          visible={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={(data) => setFilters(data)}
        />
      </main>
    </div>
  );
};

export default HomePage;
