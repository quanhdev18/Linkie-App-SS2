import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Errors from "../components/Errors";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Report from "../pages/Report";
import Setting from "../pages/Setting";
import Advice from "../pages/Advice";
import User from "../pages/User";
import Login from "../pages/Login";
import Package from "../pages/Package";
import Verification from "../pages/Verification";
import LocationAdmin from "../pages/LocationDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { Navigate } from "react-router-dom";
// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: (
//             <ProtectedRoute>
//                 <App />
//             </ProtectedRoute>
//         ),
//         errorElement: <Errors />,
//         children: [
//             { index: true, element: <Dashboard /> },
//             { path: "analytics", element: <Analytics /> },
//             { path: "report", element: <Report /> },
//             { path: "advice", element: <Advice /> },
//             { path: "package", element: <Package /> },
//             { path: "settings", element: <Setting /> },
//             { path: "users", element: <User /> },
//             { path: "verification", element: <Verification /> },
//             { path: "location", element: <LocationAdmin /> },
//         ]
//     },
//     {
//         path: "/login",
//         element: <Login />
//     }
// ]);
export const router = createBrowserRouter([
    // Redirect mặc định vào login
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },

    // Route login
    {
        path: "/login",
        element: <Login />
    },

    // Route admin (có protected)
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        errorElement: <Errors />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "analytics", element: <Analytics /> },
            { path: "report", element: <Report /> },
            { path: "advice", element: <Advice /> },
            { path: "package", element: <Package /> },
            { path: "settings", element: <Setting /> },
            { path: "users", element: <User /> },
            { path: "verification", element: <Verification /> },
            { path: "location", element: <LocationAdmin /> },
        ]
    },
]);

// export const router = createBrowserRouter([
//     {
//         errorElement: <Errors />,
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 index: true,
//                 element: <Dashboard />,
//             },
//             {
//                 path: "/analytics",
//                 element: <Analytics />,
//             },
//             {
//                 path: "/report",
//                 element: <Report />,
//             },
//             {
//                 path: "/advice",
//                 element: <Advice />,
//             },
//             {
//                 path: "/package",
//                 element: <Package />,
//             },
//             {
//                 path: "/settings",
//                 element: <Setting />,
//             },
//             {
//                 path: "/users",
//                 element: <User />,
//             },
//             {
//                 path: "/verification",
//                 element: <Verification />,
//             },
//             {
//                 path: "/location",
//                 element: <LocationAdmin />,
//             },
//         ],

//     },
//     {
//         path: "/login",
//         element: <Login />
//     }
// ]);