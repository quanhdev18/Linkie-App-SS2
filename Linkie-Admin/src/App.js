import "./App.css";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import SlideBar from "./components/SlideBar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="w-[100%] h-[100vh] ">
      <NavBar />
      <SlideBar />
    </div>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import SlideBar from "./components/SlideBar";

// function App() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <div className="w-[100%] h-[100vh]">
//       {/* Giữ nguyên bố cục cũ */}
//       <NavBar />
//       <SlideBar />
//     </div>
//   );
// }

// export default App;
