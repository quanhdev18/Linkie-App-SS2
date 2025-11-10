import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/pages/Home/components/Sidebar";

const HomeLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung động bên phải */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
