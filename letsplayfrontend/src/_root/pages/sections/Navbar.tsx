import { Logout } from "@/_auth";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="mx-auto w-[85%] py-2">
      <div className="flex justify-between place-items-center">
        <Link to={"/"}>
          <h2 className="flex gap-4 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="hidden sm:block">Lets play tonight</p>
          </h2>
        </Link>

        <div className="flex gap-4 place-items-center">
          <Logout />
          <Profile />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
