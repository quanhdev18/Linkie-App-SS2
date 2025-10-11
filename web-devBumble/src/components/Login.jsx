// import SignupForm from "./Signup";
// import React, { useContext, useEffect, useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { saveToken } from "../auth/authTokenStorage";
// import AuthContext from "../auth/context";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const authContext = useContext(AuthContext);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (errorMessage?.length > 0) {
//       setTimeout(() => setErrorMessage(""), 10000);
//     } else {
//       return;
//     }
//   }, [errorMessage]);

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   return (
//     <Formik
//       initialValues={{
//         emailId: "",
//         password: "",
//       }}
//       validationSchema={Yup.object({
//         emailId: Yup.string()
//           .email("Invalid email address")
//           .required("Required"),
//         password: Yup.string().required("Required"),
//       })}
//       onSubmit={async (values, { setSubmitting }) => {
//         try {
//           const res = await axios.post(
//             `${BASE_URL}/login`,
//             {
//               emailId: values.emailId,
//               password: values.password,
//             },
//             {
//               withCredentials: true,
//             }
//           );

//           console.log("Response ", res);
//           // dispatch(addUser(res?.data.data));
//           saveToken(res?.data.token);
//           authContext.setUser(res?.data.data);
//           navigate("/");
//         } catch (error) {
//           console.error("Error login " + error?.response?.data);
//           setErrorMessage(error?.response?.data?.message);
//         }
//       }}
//     >
//       <Form className="flex flex-col items-start justify-center space-y-5 border shadow-lg border-base-200 rounded-lg bg-base-200 w-full md:w-8/12 self-center mx-auto my-2 p-2 py-4">
//         <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
//           <label htmlFor="emailId">Email </label>
//           <Field
//             name="emailId"
//             type="email"
//             className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
//             placeholder="johndoe@gmail.com"
//           />
//           <ErrorMessage name="emailId" className="text-red-700" />
//         </div>
//         <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
//           <label htmlFor="password">Nhập OTP</label>
//           <div className="relative w-full">
//             <Field
//               name="OTP"
//               type={showPassword ? "text" : "password"}
//               placeholder="Nhập mã OTP"
//               className="w-full rounded-lg p-2 border border-base-200 pr-10 focus:outline-none"
//             />
//             <button
//               type="button"
//               onClick={togglePassword}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2"
//               tabIndex={-1}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//           <ErrorMessage name="password" className="text-red-700" />
//         </div>
//         {errorMessage && (
//           <div className="my-2 flex items-center justify-center text-[#E94141] font font-geistMono font-medium p-3">
//             {errorMessage}
//           </div>
//         )}
//         <button
//           type="submit"
//           className="w-48 p-2 m-2 bg-gray-700  text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg  border border-base-200 self-start  "
//         >
//           Login
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// export default Login;

// import React, { useContext, useEffect, useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { saveToken } from "../auth/authTokenStorage";
// import AuthContext from "../auth/context";
// import { sendOtp, login } from "../services/api";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [email, setEmail] = useState("");
//   const authContext = useContext(AuthContext);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (errorMessage?.length > 0) {
//       const timer = setTimeout(() => setErrorMessage(""), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [errorMessage]);

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   // Gửi mã OTP
//   const handleSendOTP = async (emailId) => {
//     try {
//       const res = await sendOtp({ email: emailId });
//       console.log("Send OTP:", res.data);
//       setOtpSent(true);
//       setEmail(emailId);
//     } catch (error) {
//       console.error("Send OTP error:", error?.response?.data);
//       setErrorMessage(
//         error?.response?.data?.message || "Không thể gửi OTP, vui lòng thử lại."
//       );
//     }
//   };

//   // Xác minh OTP
//   const handleVerifyOTP = async (otp, setSubmitting) => {
//     try {
//       const res = await login({ email, otp }); // gọi /auth/login
//       console.log("Login:", res.data);

//       if (res?.data?.access_token) saveToken(res.data.access_token);
//       if (res?.data?.user) {
//         authContext.setUser(res.data.user);
//         dispatch(addUser(res.data.user));
//       }

//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error?.response?.data);
//       setErrorMessage(
//         error?.response?.data?.message || "OTP không chính xác hoặc đã hết hạn."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{ emailId: "", OTP: "" }}
//       validationSchema={Yup.object({
//         emailId: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
//         OTP: Yup.string().min(4, "OTP ít nhất 4 ký tự"),
//       })}
//       onSubmit={async (values, { setSubmitting }) => {
//         if (!otpSent) {
//           await handleSendOTP(values.emailId);
//           setSubmitting(false);
//         } else {
//           await handleVerifyOTP(values.OTP, setSubmitting);
//         }
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className="flex flex-col items-start justify-center space-y-5 border shadow-lg border-base-200 rounded-lg bg-base-200 w-full md:w-8/12 self-center mx-auto my-2 p-2 py-4">
//           <div className="flex flex-col items-start space-y-2 p-2 w-11/12">
//             <label htmlFor="emailId">Email</label>
//             <Field
//               name="emailId"
//               type="email"
//               className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
//               placeholder="johndoe@gmail.com"
//               disabled={otpSent}
//             />
//             <ErrorMessage
//               name="emailId"
//               component="div"
//               className="text-red-700"
//             />
//           </div>

//           {otpSent && (
//             <div className="flex flex-col items-start space-y-2 p-2 w-11/12">
//               <label htmlFor="OTP">Nhập OTP</label>
//               <div className="relative w-full">
//                 <Field
//                   name="OTP"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Nhập mã OTP"
//                   className="w-full rounded-lg p-2 border border-base-200 pr-10 focus:outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePassword}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               <ErrorMessage
//                 name="OTP"
//                 component="div"
//                 className="text-red-700"
//               />
//             </div>
//           )}

//           {errorMessage && (
//             <div className="my-2 text-center text-[#E94141] font-medium">
//               {errorMessage}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-48 p-2 m-2 bg-gray-700 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg border border-base-200"
//           >
//             {otpSent ? "Xác nhận OTP" : "Gửi mã OTP"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../auth/authTokenStorage";
import AuthContext from "../auth/context";
import { sendOtp, login } from "../services/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0); // countdown gửi lại OTP
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage?.length > 0) {
      const timer = setTimeout(() => setErrorMessage(""), 8000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Gửi OTP
  const handleSendOTP = async (emailId) => {
    try {
      const res = await sendOtp({ email: emailId });
      console.log("Send OTP:", res.data);
      setOtpSent(true);
      setEmail(emailId);
      setResendTimer(60); // bắt đầu countdown 60s
    } catch (error) {
      console.error("Send OTP error:", error?.response?.data);
      setErrorMessage(
        error?.response?.data?.message || "Không thể gửi OTP, vui lòng thử lại."
      );
    }
  };

  // Gửi lại OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return; // đang cooldown
    await handleSendOTP(email);
  };

  // Xác minh OTP
  // const handleVerifyOTP = async (otp, setSubmitting) => {
  //   try {
  //     const res = await login({ email, otp });
  //     console.log("Login:", res.data);

  //     if (res?.data?.access_token) saveToken(res.data.access_token);
  //     if (res?.data?.user) {
  //       authContext.setUser(res.data.user);
  //       dispatch(addUser(res.data.user));
  //     }

  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login error:", error?.response?.data);
  //     setErrorMessage(
  //       error?.response?.data?.message || "OTP không chính xác hoặc đã hết hạn."
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  const handleVerifyOTP = async (otp, setSubmitting) => {
    try {
      const res = await login({ email, otp });
      console.log("Login:", res.data);

      if (res?.data?.access_token) saveToken(res.data.access_token);
      if (res?.data?.user) {
        authContext.setUser(res.data.user);
        dispatch(addUser(res.data.user));
      }

      // navigate trước khi setSubmitting
      navigate("/");
    } catch (error) {
      console.error("Login error:", error?.response?.data);
      setErrorMessage(
        error?.response?.data?.message || "OTP không chính xác hoặc đã hết hạn."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ emailId: "", OTP: "" }}
      validationSchema={Yup.object({
        emailId: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
        OTP: Yup.string().min(4, "OTP ít nhất 4 ký tự"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        if (!otpSent) {
          await handleSendOTP(values.emailId);
          setSubmitting(false);
        } else {
          await handleVerifyOTP(values.OTP, setSubmitting);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-start justify-center space-y-5 border shadow-lg border-base-200 rounded-lg bg-base-200 w-full md:w-8/12 self-center mx-auto my-2 p-2 py-4">
          <div className="flex flex-col items-start space-y-2 p-2 w-11/12">
            <label htmlFor="emailId">Email</label>
            <Field
              name="emailId"
              type="email"
              className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
              placeholder="johndoe@gmail.com"
              disabled={otpSent}
            />
            <ErrorMessage
              name="emailId"
              component="div"
              className="text-red-700"
            />
          </div>

          {otpSent && (
            <div className="flex flex-col items-start space-y-2 p-2 w-11/12">
              <label htmlFor="OTP">Nhập OTP</label>
              <Field
                name="OTP"
                type="text" // bỏ che chữ đi
                placeholder="Nhập mã OTP"
                className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
              />
              <ErrorMessage
                name="OTP"
                component="div"
                className="text-red-700"
              />
              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={handleResendOTP}
                className={`mt-2 px-3 py-1 rounded-lg border ${
                  resendTimer > 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {resendTimer > 0
                  ? `Gửi lại OTP sau ${resendTimer}s`
                  : "Gửi lại OTP"}
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="my-2 text-center text-[#E94141] font-medium">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-48 p-2 m-2 bg-gray-700 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg border border-base-200"
          >
            {otpSent ? "Xác nhận OTP" : "Gửi mã OTP"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
