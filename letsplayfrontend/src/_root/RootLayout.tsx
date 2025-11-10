// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { Footer, Navbar } from "./pages/sections";
// import { useUserContext } from "@/lib/context/authContext/UserContext";

// const RootLayout = () => {
//   const { state } = useUserContext();
//   return (
//     <>
//       {state.isAuthenticated ? ( // add a user to not be null as a condition to go to homepage
//         <section className="min-h-screen relative">
//           <div className="bg-silver">
//             <Navbar />
//           </div>
//           <div className="mx-auto w-[85%] mt-4">
//             <Outlet />
//           </div>
//           <div className="bg-silver absolute bottom-0 w-full">
//             {/* <Footer /> */}
//           </div>
//         </section>
//       ) : (
//         <Navigate to={"/sign-in"} />
//       )}
//     </>
//   );
// };

// export default RootLayout;
// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Footer, Navbar } from "./pages/sections";

// const RootLayout = () => {
//   return (
//     <section className="min-h-screen relative">
//       <div className="bg-silver">
//         <Navbar />
//       </div>
//       <div className="mx-auto w-[85%] mt-4">
//         <Outlet />
//       </div>
//       <div className="bg-silver absolute bottom-0 w-full">
//         {/* <Footer /> */}
//       </div>
//     </section>
//   );
// };

// export default RootLayout;
// src/_root/RootLayout.tsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "@/pages/Home/components/Sidebar";

// const RootLayout: React.FC = () => {
//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Left sidebar (fixed) */}
//       <aside className="w-72 min-w-[260px] max-w-[320px] border-r bg-white">
//         <Sidebar />
//       </aside>

//       {/* Main content */}
//       <main className="flex-1">
//         <div className="mx-auto w-full">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RootLayout;
// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "@/pages/Home/components/Sidebar";

// const RootLayout: React.FC = () => {
//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       {/* Sidebar cố định bên trái */}
//       <aside className="w-72 min-w-[260px] max-w-[320px] border-r bg-white">
//         <Sidebar />
//       </aside>

//       {/* Main content cố định bên phải */}
//       <main className="flex-1 flex justify-center items-center">
//         {/* Outlet giữ nguyên kích thước khung */}
//         <div className="mx-auto w-full">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RootLayout;
import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "@/pages/Home/components/Sidebar";

const RootLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar — bỏ width cứng */}
      {/* <Sidebar /> */}

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
