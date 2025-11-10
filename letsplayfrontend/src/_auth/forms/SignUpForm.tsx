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
// import { createUserAccount } from "@/lib/actions/createUser";
// import Loader from "@/components/shared/Loader";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email(),
//   firstname: z.string().min(2, { message: "Name must be longer than 2" }),
//   lastname: z.string().min(2, { message: "Name must be longer than 2" }),
//   password: z
//     .string()
//     .min(8, { message: "Passwords should be at least 8 characters long" }),
// });

// const SignUpForm = () => {
//   const { dispatch, state } = useUserContext();
//   const { toast } = useToast();
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       firstname: "",
//       lastname: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     dispatch({ type: "LOAD_ON_CREATE_USER" });
//     // Do something with the form values.
//     const response = await createUserAccount(values);
//     dispatch({ type: "CREATE_USER", payload: values });
//     // ✅ This will be type-safe and validated.
//     // console.log(values);
//     dispatch({ type: "LOAD_ON_CREATE_USER" });

//     toast({
//       title: "Success!",
//       description: "Your account was created successfully.",
//     });
//     form.reset();
//     window.location.replace("/sign-in");
//     return response;
//   }

//   return (
//     <section className="">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input type="text" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-between gap-2">
//             <FormField
//               control={form.control}
//               name="firstname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First Name</FormLabel>
//                   <FormControl>
//                     <Input type="text" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lastname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last Name</FormLabel>
//                   <FormControl>
//                     <Input type="text" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button className="w-full" type="submit">
//             {/* Create account */}
//             {state.isCreateAccountLoading ? (
//               <div className="flex gap-2">
//                 <Loader /> Loading...
//               </div>
//             ) : (
//               "Sign Up"
//             )}
//           </Button>
//         </form>
//         <p className="text-pear">
//           Already have an account?{" "}
//           <Link className="underline" to={"/sign-in"}>
//             Sign in here.
//           </Link>
//         </p>
//       </Form>
//     </section>
//   );
// };

// export default SignUpForm;


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
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "@/components/shared/Loader";

// ✅ Import API từ backend (giống app)
import { register, sendOtp, verifyEmail } from "@/services/api";

// ------------------- VALIDATION -------------------
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().optional(),
});

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  // Countdown resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // ------------------- GỬI OTP -------------------
  const handleSendOtp = async () => {
    const email = form.getValues("email");

    if (!email) {
      toast({
        title: "Vui lòng nhập email!",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Gọi API đăng ký (tạo tài khoản trống)
      await register({ email });

      // 2️⃣ Gửi OTP
      await sendOtp({ email });

      toast({
        title: "Đã gửi mã OTP!",
        description: "Vui lòng kiểm tra hộp thư của bạn.",
        variant: "success",
      });

      setOtpSent(true);
      setCountdown(120);
    } catch (error: any) {
      toast({
        title: "Không thể gửi OTP!",
        description: error.response?.data?.detail || "Hãy thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------- XÁC MINH OTP -------------------
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!otpSent) {
      toast({
        title: "Vui lòng gửi OTP trước!",
        variant: "destructive",
      });
      return;
    }

    if (!values.otp || values.otp.length !== 6) {
      toast({
        title: "Mã OTP không hợp lệ",
        description: "Mã phải gồm 6 chữ số.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // const res = await verifyEmail({ email: values.email, otp: values.otp });
      // if (res?.data?.access_token) {
      //   localStorage.clear();

      //   localStorage.setItem("access_token", access_token);
      //   localStorage.setItem("account_id", account_id);
      //   localStorage.setItem("profile_id", profile_id);
      //   localStorage.setItem("access_token", res.data.access_token);
      // }
      const res = await verifyEmail({
        email: values.email,
        otp: Number(values.otp),
      });

      if (res?.data?.access_token) {
        const { access_token, account_id, profile_id } = res.data;

        localStorage.clear();
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("account_id", account_id);
        localStorage.setItem("profile_id", profile_id);
      }



      // ✅ Sau khi xác minh thành công, điều hướng sang bước điền hồ sơ
      toast({
        title: "Xác minh thành công!",
        description: "Vui lòng hoàn thiện hồ sơ của bạn.",
        variant: "success",
      });

      // Truyền email qua URL cho trang điền hồ sơ
      navigate(`/fill-profile?email=${values.email}`);
    } catch (error: any) {
      toast({
        title: "OTP không đúng hoặc đã hết hạn!",
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
          {/* EMAIL FIELD */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email của bạn"
                      {...field}
                      className="h-9 px-3 text-sm flex-1"
                    />
                  </FormControl>

                  {!otpSent && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="h-9 text-xs px-3"
                    >
                      {loading ? "Đang gửi..." : "Tiếp theo"}
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* OTP FIELD */}
          {otpSent && (
            <>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập mã OTP</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={6}
                          placeholder="6 chữ số"
                          {...field}
                          className="h-9 px-3 text-sm flex-1 tracking-widest text-center"
                        />
                      </FormControl>

                      <Button
                        type="button"
                        variant="outline"
                        disabled={countdown > 0 || loading}
                        onClick={handleSendOtp}
                        className="h-9 text-xs px-3"
                      >
                        {countdown > 0 ? `Gửi lại ${countdown}s` : "Gửi lại"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* SUBMIT BUTTON */}
          {otpSent && (
            <Button
              className="w-full h-10 text-sm mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-2">
                  <Loader /> Xác minh...
                </div>
              ) : (
                "Xác minh & Tiếp tục"
              )}
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
};

export default SignUpForm;
