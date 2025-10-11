import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/lib/context/authContext/UserContext";

const AuthLayout = () => {
  const { state } = useUserContext();

  return (
    <section className="bg-auth_background_picture bg-cover bg-center h-screen flex justify-center items-center">
      {state.isAuthenticated && state.user.username ? (
        <Navigate to={"/"} />
      ) : (
        <section className="sm:w-1/3 md:2/3 px-4">
          <Outlet />
        </section>
      )}
    </section>
  );
};

export default AuthLayout;
