import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer, Navbar } from "./pages/sections";
import { useUserContext } from "@/lib/context/authContext/UserContext";

const RootLayout = () => {
  const { state } = useUserContext();
  return (
    <>
      {state.isAuthenticated ? ( // add a user to not be null as a condition to go to homepage
        <section className="min-h-screen relative">
          <div className="bg-silver">
            <Navbar />
          </div>
          <div className="mx-auto w-[85%] mt-4">
            <Outlet />
          </div>
          <div className="bg-silver absolute bottom-0 w-full">
            {/* <Footer /> */}
          </div>
        </section>
      ) : (
        <Navigate to={"/sign-in"} />
      )}
    </>
  );
};

export default RootLayout;
