
// import "./index.css";
// import { Route, Routes } from "react-router-dom";
// import { Toaster } from "@/components/ui/toaster";

// // Auth
// import AuthLayout from "@/_auth/AuthLayout";
// import SignInForm from "@/_auth/forms/SignInForm";
// import SignUpForm from "@/_auth/forms/SignUpForm";
// // import ProfileForm from "@/_auth/forms/ProfileForm";
// import ProfileForm from "@/pages/EditProfile/ProfileForm";
// import PreviewProfile from "@/pages/EditProfile/PreviewProfile";
// // Root pages/layouts
// import RootLayout from "@/_root/RootLayout";
// import Home from "@/pages/Home/HomePage";
// import ChatPage from "@/pages/Chat/ChatPage";
// import Upgrade from "./pages/Buy/Upgrade";
// import SpotlightPayment from "./pages/Home/components/SpotlightPayment";
// import PaymentSuccess from "./pages/Home/components/PaymentSuccess";
// import SettingsPage from "./pages/EditProfile/SettingsPage";

// export default function App() {
//   return (
//     <main className="">
//       <Routes>
//         {/* Root layout (Dành cho user đã đăng nhập) */}
//         <Route element={<RootLayout />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/profile" element={<ProfileForm />} />
//           <Route path="/chat/:chatId" element={<ChatPage />} />
//           <Route path="/profile/preview" element={<PreviewProfile />} />
//           <Route path="/upgrade" element={<Upgrade />} />
//           <Route path="/settings" element={<SettingsPage />} />
          
//         </Route>
//         <Route path="/spotlight-payment" element={<SpotlightPayment />} />
//         <Route path="/payment-success" element={<PaymentSuccess />} />
      

//         {/* Auth layout (Dành cho user chưa đăng nhập) */}
//         <Route element={<AuthLayout />}>
//           <Route path="/sign-up" element={<SignUpForm />} />
          
//           {/* SỬA Ở ĐÂY: đổi path="/sign-in" thành path="/" */}
//           <Route path="/" element={<SignInForm />} /> 
//         </Route>
//       </Routes>
//       <Toaster />
//     </main>
//   );
// }



import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import AuthLayout from "@/_auth/AuthLayout";
import SignInForm from "@/_auth/forms/SignInForm";
import SignUpForm from "@/_auth/forms/SignUpForm";

import RootLayout from "@/_root/RootLayout";
import HomeLayout from "@/layouts/HomeLayout"; // ✅ Thêm dòng này
import Home from "@/pages/Home/HomePage";
import ChatPage from "@/pages/Chat/ChatPage";
import Upgrade from "@/pages/Buy/Upgrade";
import SpotlightPayment from "@/pages/Home/components/SpotlightPayment";
import PaymentSuccess from "@/pages/Home/components/PaymentSuccess";
import SettingsPage from "@/pages/EditProfile/SettingsPage";
import ProfileForm from "@/pages/EditProfile/ProfileForm";
import PreviewProfile from "@/pages/EditProfile/PreviewProfile";
import FillProfile from "@/_auth/forms/FillProfileForm";
import UploadPhoto from "@/_auth/forms/UploadPhoto";

export default function App() {
  return (
    <main>
      <Routes>
        {/* RootLayout bao bọc toàn bộ phần user login */}
        <Route element={<RootLayout />}>
          {/* HomeLayout chứa Sidebar cố định */}
          <Route element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/profile/preview" element={<PreviewProfile />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/settings" element={<SettingsPage />} /> {/* ✅ Sidebar vẫn giữ nguyên */}
          </Route>

          {/* Những route không cần Sidebar */}
          <Route path="/spotlight-payment" element={<SpotlightPayment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/fill-profile" element={<FillProfile />} />
          <Route path="/upload" element={<UploadPhoto />} />
          <Route path="/" element={<SignInForm />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}
