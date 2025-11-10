// import { Navigate, Outlet } from "react-router-dom";
// import { useUserContext } from "@/lib/context/authContext/UserContext";

// const AuthLayout = () => {
//   const { state } = useUserContext();

//   return (
//     <section className="bg-auth_background_picture bg-cover bg-center h-screen flex justify-center items-center">
//       {state.isAuthenticated && state.user.username ? (
//         <Navigate to={"/"} />
//       ) : (
//         <section className="sm:w-1/3 md:2/3 px-4">
//           <Outlet />
//         </section>
//       )}
//     </section>
//   );
// };

// export default AuthLayout;
// src/_auth/AuthLayout.tsx

// import { Navigate, Outlet } from "react-router-dom";
// import { useUserContext } from "@/lib/context/authContext/UserContext";

// const AuthLayout = () => {
//   const { state } = useUserContext();
//   console.log("AUTH LAYOUT STATE:", state.isAuthenticated);

//   return (
//     <section className="bg-auth_background_picture bg-cover bg-center h-screen flex justify-center items-center">

//       {/* SỬA Ở ĐÂY: Đổi Navigate to={"/"} thành to={"/home"} */}
//       {false && state.isAuthenticated ? (
//         <Navigate to={"/home"} />
//       ) : (
//         <section className="sm:w-1/3 md:2/3 px-4">
//           <Outlet />
//         </section>
//       )}

//     </section>
//   );
// };

// export default AuthLayout;


// src/_auth/AuthLayout.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/lib/context/authContext/UserContext";

const AuthLayout = () => {
  const { state } = useUserContext();

  // Thêm dòng này để debug
  console.log("AUTH LAYOUT STATE:", state.isAuthenticated);

  return (
    <section className="bg-auth_background_picture bg-cover bg-center h-screen flex justify-center items-center">

      {/* Thêm "false &&" vào trước để buộc trang Login hiện ra */}
      {false && state.isAuthenticated ? (
        <Navigate to={"/home"} />
      ) : (
        <section className="sm:w-1/3 md:2/3 px-4">
          <Outlet />
        </section>
      )}

    </section>
  );
};

export default AuthLayout;