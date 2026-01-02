// import { Button, Checkbox, Form, Input } from 'antd'
// import React from 'react'

// import { FaPhone } from "react-icons/fa6";

// const onFinish = values => {
//     console.log('Success:', values);
// };
// const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
// };

// function Login() {
//     return (
//         <div className="w-full h-[100vh] bg-gray-100 flex justify-center items-center ">
//             <div className="w-1/3 p-5 pb-1 border bg-white border-gray-200 rounded-[10px] shadow-2xl">
//                 <h1 className='text-[25px] font-bold my-3 text-center mb-5'> Login</h1>

//                 <Form
//                     name="basic"

//                     style={{ width: '100%', padding: '10px 15px' }}
//                     initialValues={{ remember: true }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                     autoComplete="off"
//                 >
//                     <Form.Item

//                         name="username"
//                         rules={[{ required: true, message: 'Please input your username!' }]}
//                     >
//                         <Input size="large" placeholder="Your email" prefix={<FaPhone />} />
//                     </Form.Item>

//                     <Form.Item name="remember" valuePropName="checked" label={null}>
//                         <Checkbox>Remember me</Checkbox>
//                     </Form.Item>

//                     <Form.Item label={null}>
//                         <Button type="primary" className='w-full h-10' htmlType="submit">
//                             Đăng nhập
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </div>
//     )
// }

// export default Login

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// ✅ Validate email + otp
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, getValues, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", otp: "" },
  });

  useEffect(() => {
    let timer;
    if (counter > 0)
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  // -------------------- GỬI OTP --------------------
  const handleSendOtp = async () => {
    const email = getValues("email");
    if (!email) return setMessage("⚠️ Vui lòng nhập email!");

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/auth/send-otp", { email });
      setOtpSent(true);
      setCounter(120);
      setMessage("✅ OTP đã được gửi tới email!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Gửi OTP thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- ĐĂNG NHẬP --------------------
  const onSubmit = async (values) => {
    if (!otpSent) return setMessage("⚠️ Bạn cần gửi OTP trước!");
    if (!values.otp || values.otp.length !== 6)
      return setMessage("⚠️ Mã OTP không hợp lệ!");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login-admin",
        values
      );

      const { access_token, account_id, profile_id, role } = res.data;

      if (role !== "ADMIN") {
        setMessage("⛔ Tài khoản không có quyền admin!");
        return;
      }

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("account_id", account_id);
      localStorage.setItem("profile_id", profile_id);
      localStorage.setItem("email", values.email);
      localStorage.setItem("role", role);

      setMessage("🎉 Đăng nhập thành công!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setMessage("❌ OTP sai hoặc đăng nhập thất bại.");
    } finally {
      setLoading(false);
      reset({ otp: "" });
    }
  };

  // -------------------- GIAO DIỆN --------------------
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Đăng nhập Admin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="flex gap-2 mt-1">
              <input
                {...register("email")}
                type="email"
                className="border w-full px-3 py-2 rounded-md text-sm"
                placeholder="Nhập email admin"
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="bg-blue-600 text-white px-2 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition"
                >
                  {loading ? "Đang gửi..." : "Gửi"}
                </button>
              )}
            </div>
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mã OTP
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  {...register("otp")}
                  type="text"
                  maxLength={6}
                  className="border w-full px-3 py-2 rounded-md text-sm"
                  placeholder="Nhập mã OTP"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={counter > 0 || loading}
                  className="bg-gray-200 px-3 py-2 rounded-md text-sm"
                >
                  {counter > 0 ? `${counter}s` : "Gửi lại"}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-3 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
