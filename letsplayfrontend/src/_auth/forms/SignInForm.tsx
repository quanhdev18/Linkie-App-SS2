// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useUserContext } from "@/lib/context/authContext/UserContext";
// import { useToast } from "@/components/ui/use-toast";
// import { Link } from "react-router-dom";
// import Loader from "@/components/shared/Loader";
// import { useState, useEffect } from "react";

// // ✅ Import các API từ backend FastAPI
// import { sendOtp, login } from "@/services/api"; // <-- đổi đường dẫn đúng với thư mục API của bạn

// // ------------------- VALIDATION SCHEMA -------------------
// const formSchema = z.object({
//   username: z.string().email("Email không hợp lệ"),
//   otp: z.string().optional(),
// });

// const SignInForm = () => {
//   const { dispatch, state } = useUserContext();
//   const { toast } = useToast();

//   const [otpSent, setOtpSent] = useState(false);
//   const [counter, setCounter] = useState(0);

//   // Form setup
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       otp: "",
//     },
//   });

//   // Countdown timer cho resend OTP
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (counter > 0) {
//       timer = setTimeout(() => setCounter(counter - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [counter]);

//   // ------------------- GỬI OTP -------------------
//   const handleSendOtp = async () => {
//     const email = form.getValues("username");
//     if (!email) {
//       toast({
//         title: "Vui lòng nhập email trước khi gửi OTP",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await sendOtp({ email });
//       setOtpSent(true);
//       setCounter(120);

//       toast({
//         title: "Đã gửi OTP!",
//         description: "Vui lòng kiểm tra hộp thư email của bạn.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Không thể gửi OTP",
//         description: error.message || "Hãy thử lại sau ít phút.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ------------------- ĐĂNG NHẬP -------------------
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (!otpSent) {
//       toast({
//         title: "Vui lòng gửi OTP trước khi đăng nhập",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!values.otp || values.otp.trim().length !== 6) {
//       toast({
//         title: "OTP không hợp lệ",
//         description: "Vui lòng nhập mã OTP 6 chữ số.",
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch({ type: "LOAD_ON_LOGIN_USER" });

//     try {
//       // Gọi API login bằng OTP
//       const response = await login({ email: values.username, otp: values.otp });
//       const { access_token, account_id, profile_id } = response.data;

//       // Lưu session vào context (hoặc localStorage)
//       dispatch({
//         type: "CREATE_USER_SESSION",
//         payload: { access_token, account_id, profile_id, email: values.username },
//       });

//       toast({
//         title: "Đăng nhập thành công!",
//       });

//       // Nếu muốn chuyển hướng sau đăng nhập, thêm ở đây:
//       // navigate("/dashboard");

//     } catch (error: any) {
//       toast({
//         title: "Đăng nhập thất bại!",
//         description: error.message || "OTP không chính xác hoặc đã hết hạn.",
//         variant: "destructive",
//       });
//     } finally {
//       dispatch({ type: "LOAD_ON_LOGIN_USER" });
//     }
//   };

//   // ------------------- JSX -------------------
//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* EMAIL */}
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="Nhập email của bạn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* GỬI OTP */}
//           {!otpSent && (
//             <Button
//               type="button"
//               onClick={handleSendOtp}
//               className="w-full"
//               disabled={state.isLoginLoading}
//             >
//               Gửi OTP
//             </Button>
//           )}

//           {/* NHẬP OTP */}
//           {otpSent && (
//             <>
//               <FormField
//                 control={form.control}
//                 name="otp"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OTP</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         placeholder="Nhập mã OTP 6 chữ số"
//                         maxLength={6}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Nút gửi lại OTP */}
//               <div className="flex items-center justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   disabled={counter > 0}
//                   onClick={handleSendOtp}
//                 >
//                   {counter > 0 ? `Gửi lại sau ${counter}s` : "Gửi lại OTP"}
//                 </Button>
//               </div>
//             </>
//           )}

//           {/* LOGIN */}
//           <Button className="w-full" type="submit">
//             {state.isLoginLoading ? (
//               <div className="flex gap-2">
//                 <Loader /> Đăng nhập...
//               </div>
//             ) : (
//               "Đăng nhập"
//             )}
//           </Button>
//         </form>

//         <p className="text-xanthous mt-4">
//           Bạn chưa có tài khoản?{" "}
//           <Link className="underline" to={"/sign-up"}>
//             Đăng ký ngay.
//           </Link>
//         </p>
//       </Form>
//     </section>
//   );
// };

// export default SignInForm;
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useUserContext } from "@/lib/context/authContext/UserContext";
// import { useToast } from "@/components/ui/use-toast";
// import { Link, useNavigate } from "react-router-dom"; // ✅ Thêm useNavigate
// import Loader from "@/components/shared/Loader";
// import { useState, useEffect } from "react";

// // ✅ Import các API từ backend FastAPI
// import { sendOtp, login } from "@/services/api";

// // ------------------- VALIDATION SCHEMA -------------------
// const formSchema = z.object({
//   username: z.string().email("Email không hợp lệ"),
//   otp: z.string().optional(),
// });

// const SignInForm = () => {
//   const { dispatch, state } = useUserContext();
//   const { toast } = useToast();
//   const navigate = useNavigate(); // ✅ Khởi tạo điều hướng

//   const [otpSent, setOtpSent] = useState(false);
//   const [counter, setCounter] = useState(0);

//   // Form setup
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       otp: "",
//     },
//   });

//   // Countdown timer cho resend OTP
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (counter > 0) {
//       timer = setTimeout(() => setCounter(counter - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [counter]);

//   // ------------------- GỬI OTP -------------------
//   const handleSendOtp = async () => {
//     const email = form.getValues("username");
//     if (!email) {
//       toast({
//         title: "Vui lòng nhập email trước khi gửi OTP",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await sendOtp({ email });
//       setOtpSent(true);
//       setCounter(120);

//       toast({
//         title: "Đã gửi OTP!",
//         description: "Vui lòng kiểm tra hộp thư email của bạn.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Không thể gửi OTP",
//         description: error.message || "Hãy thử lại sau ít phút.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ------------------- ĐĂNG NHẬP -------------------
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (!otpSent) {
//       toast({
//         title: "Vui lòng gửi OTP trước khi đăng nhập",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!values.otp || values.otp.trim().length !== 6) {
//       toast({
//         title: "OTP không hợp lệ",
//         description: "Vui lòng nhập mã OTP 6 chữ số.",
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch({ type: "LOAD_ON_LOGIN_USER" });

//     try {
//       const response = await login({ email: values.username, otp: values.otp });
//       const { access_token, account_id, profile_id } = response.data;

//       dispatch({
//         type: "CREATE_USER_SESSION",
//         payload: { access_token, account_id, profile_id, email: values.username },
//       });

//       toast({
//         title: "Đăng nhập thành công!",
//       });

//       // ✅ Điều hướng sau khi login thành công
//       navigate("/"); // ← chuyển về trang Home

//     } catch (error: any) {
//       toast({
//         title: "Đăng nhập thất bại!",
//         description: error.message || "OTP không chính xác hoặc đã hết hạn.",
//         variant: "destructive",
//       });
//     } finally {
//       dispatch({ type: "LOAD_ON_LOGIN_USER" });
//     }
//   };

//   // ------------------- JSX -------------------
//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* EMAIL */}
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="Nhập email của bạn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* GỬI OTP */}
//           {!otpSent && (
//             <Button
//               type="button"
//               onClick={handleSendOtp}
//               className="w-full"
//               disabled={state.isLoginLoading}
//             >
//               Gửi OTP
//             </Button>
//           )}

//           {/* NHẬP OTP */}
//           {otpSent && (
//             <>
//               <FormField
//                 control={form.control}
//                 name="otp"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OTP</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         placeholder="Nhập mã OTP 6 chữ số"
//                         maxLength={6}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex items-center justify-between">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   disabled={counter > 0}
//                   onClick={handleSendOtp}
//                 >
//                   {counter > 0 ? `Gửi lại sau ${counter}s` : "Gửi lại OTP"}
//                 </Button>
//               </div>
//             </>
//           )}

//           {/* LOGIN */}
//           <Button className="w-full" type="submit">
//             {state.isLoginLoading ? (
//               <div className="flex gap-2">
//                 <Loader /> Đăng nhập...
//               </div>
//             ) : (
//               "Đăng nhập"
//             )}
//           </Button>
//         </form>

//         <p className="text-xanthous mt-4">
//           Bạn chưa có tài khoản?{" "}
//           <Link className="underline" to={"/sign-up"}>
//             Đăng ký ngay.
//           </Link>
//         </p>
//       </Form>
//     </section>
//   );
// };

// export default SignInForm;


import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserContext } from "@/lib/context/authContext/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useState, useEffect } from "react";

// ✅ Import API từ backend
import { sendOtp, login } from "@/services/api";

// ------------------- VALIDATION SCHEMA -------------------
const formSchema = z.object({
  username: z.string().email("Email không hợp lệ"),
  otp: z.string().optional(),
});

const SignInForm = () => {
  const { dispatch } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      otp: "",
    },
  });

  // Countdown cho resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  // ------------------- GỬI OTP -------------------
  const handleSendOtp = async () => {
    const email = form.getValues("username");

    if (!email) {
      toast({
        title: "Vui lòng nhập email trước khi gửi OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await sendOtp({ email });
      setOtpSent(true);
      setCounter(120);

      toast({
        title: "Đã gửi OTP!",
        description: "Vui lòng kiểm tra hộp thư email của bạn.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Không thể gửi OTP",
        description: error.message || "Hãy thử lại sau ít phút.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------- ĐĂNG NHẬP -------------------
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!otpSent) {
      toast({
        title: "Vui lòng gửi OTP trước khi đăng nhập",
        variant: "destructive",
      });
      return;
    }

    if (!values.otp || values.otp.trim().length !== 6) {
      toast({
        title: "OTP không hợp lệ",
        description: "Vui lòng nhập mã OTP 6 chữ số.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email: values.username, otp: values.otp });
      const { access_token, account_id, profile_id } = response.data;

      // Lưu session vào context
      dispatch({
        type: "CREATE_USER_SESSION",
        payload: {
          access_token,
          account_id,
          profile_id,
          email: values.username,
        },
      });

      // ✅ Lưu vào localStorage để Sidebar và các phần khác có thể dùng
      localStorage.setItem("profile_id", profile_id.toString());
      localStorage.setItem("access_token", access_token); // (nếu cần dùng API token)
      localStorage.setItem("account_id", account_id.toString());

      // toast({ title: "Đăng nhập thành công!" });
      toast({
        title: `Chào mừng trở lại!`,
        description: `Xin chào ${values.username}!`,
        variant: "success",
      });


      // ✅ Điều hướng sang Home
      navigate("/home");
    } catch (error: any) {
      toast({
        title: "Đăng nhập thất bại!",
        description: error.message || "OTP không chính xác hoặc đã hết hạn.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

  };

  // ------------------- JSX -------------------
  return (
    <section className="max-w-sm mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL + GỬI OTP */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      className="h-9 px-3 text-sm flex-1"
                      {...field}
                    />
                  </FormControl>

                  {!otpSent && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="h-9 text-xs px-3"
                    >
                      Gửi
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NHẬP OTP */}
          {otpSent && (
            <>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nhập mã OTP"
                          maxLength={6}
                          className="h-9 px-3 text-sm flex-1"
                          {...field}
                        />
                      </FormControl>

                      <Button
                        type="button"
                        variant="outline"
                        disabled={counter > 0 || loading}
                        onClick={handleSendOtp}
                        className="h-9 text-xs px-3"
                      >
                        {counter > 0 ? `Gửi lại ${counter}s` : "Gửi lại"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* LOGIN */}
          <Button
            className="w-full h-10 text-sm mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex gap-2">
                <Loader /> Đăng nhập...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        <p className="text-xanthous mt-4 text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <Link className="underline" to={"/sign-up"}>
            Đăng ký ngay
          </Link>
        </p>
      </Form>
    </section>

  );
};

export default SignInForm;
