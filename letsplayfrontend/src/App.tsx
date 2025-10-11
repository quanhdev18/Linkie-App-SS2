import "./index.css";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, ProfileForm, SignInForm, SignUpForm } from "./_auth";
import { Home, RootLayout } from "./_root";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <main className="">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}
