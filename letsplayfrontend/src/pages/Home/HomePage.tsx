import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import SwipeContainer from "./components/SwipeContainer";
import FilterModal from "./components/FilterModal";

const HomePage: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(true);  // loading API

  return (
    <>
      
      {loading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmZnOTFqb2hlZTZwcHpmeGJnZHVwMjdqZmJqYjE1eGx5ODR0b3A5MiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1ppmWX0wxyIyhyITth/giphy.gif"
              alt="loading"
              className="w-32 h-32 object-contain"
            />
            <p className="text-gray-500 font-medium">Ngồi im, tình yêu sẽ đến</p>
          </div>
        </div>
      )}


      <div className="flex h-screen bg-white relative">
        <main className="flex-1 relative">
          <header className="h-20 flex items-center justify-center">
            <div className="text-yellow-500 font-bold text-3xl">Linkie</div>
          </header>

          <div className="flex-1 overflow-hidden relative">
            <button
              onClick={() => setShowFilter(true)}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                         transition rounded-full shadow-sm text-sm text-gray-500 font-medium"
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Bộ lọc</span>
            </button>

            {/* Swipe container gọi API và báo "đã load" */}
            <SwipeContainer
              filters={filters}
              onLoaded={() => setLoading(false)}
            />
            
          </div>

          <FilterModal
            visible={showFilter}
            onClose={() => setShowFilter(false)}
            onApply={(data) => setFilters(data)}
          />
        </main>
      </div>
    </>
  );
};

export default HomePage;

// import React, { useState } from "react";
// import { SlidersHorizontal } from "lucide-react";
// import SwipeContainer from "./components/SwipeContainer";
// import FilterModal from "./components/FilterModal";

// const HomePage: React.FC = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [filters, setFilters] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   return (
//     <div className="flex h-screen bg-white relative">

//       <main className="flex-1 relative">

//         {/* HEADER */}
//         <header className="h-16 flex items-center justify-center border-b">
//           <div className="text-yellow-500 font-bold text-xl">Linkie</div>
//         </header>

//         {/* LOADER — chỉ căn giữa trong phần main */}
//         {loading && (
//           <div className="absolute top-16 inset-x-0 bottom-0 bg-white/90 flex items-center justify-center z-40">
//             <div className="flex flex-col items-center gap-4">
//               <img
//                 src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmZnOTFqb2hlZTZwcHpmeGJnZHVwMjdqZmJqYjE1eGx5ODR0b3A5MiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1ppmWX0wxyIyhyITth/giphy.gif"
//                 alt="loading"
//                 className="w-32 h-32 object-contain"
//               />
//               <p className="text-gray-500 font-medium">Ngồi im, tình yêu sẽ đến</p>
//             </div>
//           </div>
//         )}

//         {/* CONTENT */}
//         <div className="flex-1 overflow-hidden relative">

//           <button
//             onClick={() => setShowFilter(true)}
//             className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
//                        transition rounded-full shadow-sm text-sm text-gray-500 font-medium"
//           >
//             <SlidersHorizontal size={16} />
//             <span className="hidden sm:inline">Filter</span>
//           </button>

//           <SwipeContainer
//             filters={filters}
//             onLoaded={() => setLoading(false)}
//           />
//         </div>

//         <FilterModal
//           visible={showFilter}
//           onClose={() => setShowFilter(false)}
//           onApply={(data) => setFilters(data)}
//         />
//       </main>

//     </div>
//   );
// };

// export default HomePage;
