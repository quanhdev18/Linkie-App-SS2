// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createProfile } from "@/services/api";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Loader from "@/components/shared/Loader";

// // ✅ Schema xác thực dữ liệu đầu vào
// const profileSchema = z.object({
//     username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
//     gender: z.enum(["male", "female"], { required_error: "Chọn giới tính" }),
//     date_of_birth: z.string().min(1, "Chọn ngày sinh"),
//     bio: z.string().optional(),
//     target_type: z.string().optional(),
//     hobby: z.array(z.string()).optional(),
// });

// type ProfileFormData = z.infer<typeof profileSchema>;

// const FillProfileForm = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//     } = useForm<ProfileFormData>({
//         resolver: zodResolver(profileSchema),
//     });

//     const hobbies = [
//         { value: "listening_to_music", label: "Nghe nhạc" },
//         { value: "reading", label: "Đọc sách" },
//         { value: "traveling", label: "Du lịch" },
//         { value: "cooking", label: "Nấu ăn" },
//         { value: "sports", label: "Thể thao" },
//     ];

//     const gender = watch("gender");

//     //   const onSubmit = async (data: ProfileFormData) => {
//     //     setErrorMessage("");
//     //     setLoading(true);

//     //     try {
//     //       const token = localStorage.getItem("access_token");
//     //       if (!token) {
//     //         throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
//     //       }

//     //       // Format lại ngày sinh về YYYY-MM-DD (theo backend yêu cầu)
//     //       const formattedBirth = new Date(data.date_of_birth).toISOString().split("T")[0];

//     //       const payload = {
//     //         ...data,
//     //         date_of_birth: formattedBirth,
//     //       };

//     //       const res = await createProfile(payload, token);

//     //       if (res?.status === 200) {
//     //         console.log("Profile created:", res.data);
//     //         localStorage.setItem("profile_id", res.data.id.toString());
//     //         navigate("/upload"); // 👉 sau khi tạo xong thì chuyển sang upload ảnh
//     //       }
//     //     } catch (err: any) {
//     //       console.error("Create profile error:", err);
//     //       setErrorMessage(err.message || "Có lỗi xảy ra khi tạo hồ sơ");
//     //     } finally {
//     //       setLoading(false);
//     //     }
//     //   };
//     const onSubmit = async (data: ProfileFormData) => {
//         setErrorMessage("");
//         setLoading(true);

//         try {
//             const token = localStorage.getItem("access_token");
//             if (!token) throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");

//             // ✅ Chuẩn hóa dữ liệu
//             const formattedBirth = data.date_of_birth
//                 ? new Date(data.date_of_birth).toISOString().split("T")[0]
//                 : null;

//             const payload = {
//                 username: data.username.trim(),
//                 gender: data.gender,
//                 date_of_birth: formattedBirth,
//                 bio: data.bio || "",
//                 target_type: data.target_type || "dating",
//                 hobby: Array.isArray(data.hobby) ? data.hobby : [],
//             };

//             console.log("📤 Sending payload:", payload);

//             const res = await createProfile(payload, token);

//             if (res?.status === 200) {
//                 console.log("✅ Profile created:", res.data);
//                 localStorage.setItem("profile_id", res.data.id.toString());
//                 navigate("/upload");
//             }
//         } catch (err: any) {
//             console.error("Create profile error:", err);
//             setErrorMessage(err.message || "Có lỗi xảy ra khi tạo hồ sơ");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-2xl font-semibold mb-4 text-center">Hoàn thiện hồ sơ của bạn</h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Tên người dùng */}
//                 <div>
//                     <label className="block text-sm font-medium">Tên hiển thị</label>
//                     <input
//                         {...register("username")}
//                         className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         placeholder="Nhập tên của bạn"
//                     />
//                     {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
//                 </div>

//                 {/* Giới tính */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Giới tính</label>
//                     <Select onValueChange={(value) => setValue("gender", value)}>
//                         <SelectTrigger className="w-full border rounded-md px-3 py-2">
//                             <SelectValue placeholder="Chọn giới tính" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="male">Nam</SelectItem>
//                             <SelectItem value="female">Nữ</SelectItem>
//                         </SelectContent>
//                     </Select>
//                     {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
//                 </div>

//                 {/* Ngày sinh */}
//                 <div>
//                     <label className="block text-sm font-medium">Ngày sinh</label>
//                     <input
//                         type="date"
//                         {...register("date_of_birth")}
//                         className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                     {errors.date_of_birth && (
//                         <p className="text-red-500 text-sm mt-1">{errors.date_of_birth.message}</p>
//                     )}
//                 </div>

//                 {/* Tiểu sử */}
//                 <div>
//                     <label className="block text-sm font-medium">Giới thiệu bản thân</label>
//                     <textarea
//                         {...register("bio")}
//                         className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         placeholder="Viết vài dòng về bạn..."
//                         rows={3}
//                     />
//                 </div>

//                 {/* Loại mối quan hệ mong muốn */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Mục tiêu</label>
//                     <Select onValueChange={(value) => setValue("target_type", value)}>
//                         <SelectTrigger className="w-full border rounded-md px-3 py-2">
//                             <SelectValue placeholder="Chọn mục tiêu" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="dating">Hẹn hò</SelectItem>
//                             <SelectItem value="friendship">Kết bạn</SelectItem>
//                             <SelectItem value="chat">Trò chuyện</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 {/* Sở thích */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Sở thích</label>
//                     <div className="grid grid-cols-2 gap-2">
//                         {hobbies.map((hobby) => (
//                             <label key={hobby.value} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     value={hobby.value}
//                                     onChange={(e) => {
//                                         const checked = e.target.checked;
//                                         const current = watch("hobby") || [];
//                                         if (checked) setValue("hobby", [...current, hobby.value]);
//                                         else setValue("hobby", current.filter((v) => v !== hobby.value));
//                                     }}
//                                 />
//                                 <span>{hobby.label}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-60"
//                 >
//                     {loading ? <Loader /> : "Tạo hồ sơ"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default FillProfileForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfile } from "@/services/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/shared/Loader";

// ✅ Schema xác thực dữ liệu đầu vào
const profileSchema = z.object({
    username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    gender: z.enum(["male", "female"], { required_error: "Chọn giới tính" }),
    date_of_birth: z.string().min(1, "Chọn ngày sinh"),
    bio: z.string().optional(),
    target_type: z.string().optional(),
    hobby: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const FillProfileForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    // ✅ Giá trị hobby đúng Enum backend
    const hobbies = [
        { value: "listening_to_music", label: "Nghe nhạc" },
        { value: "reading", label: "Đọc sách" },
        { value: "traveling", label: "Du lịch" },
        { value: "cooking", label: "Nấu ăn" },
        { value: "photography", label: "Chụp ảnh" },
        { value: "yoga", label: "Yoga" },
        { value: "video_games", label: "Chơi game" },
        { value: "fashion", label: "Thời trang" },
    ];

    const targetTypes = [
        { value: "Người yêu", label: "Người yêu" },
        { value: "Một người bạn đời", label: "Một người bạn đời" },
        { value: "Quan hệ không ràng buộc", label: "Quan hệ không ràng buộc" },
        { value: "Những người bạn mới", label: "Những người bạn mới" },
        { value: "Mình cũng chưa rõ lắm", label: "Mình cũng chưa rõ lắm" },
    ];

    const onSubmit = async (data: ProfileFormData) => {
        setErrorMessage("");
        setLoading(true);

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");

            const formattedBirth = data.date_of_birth
                ? new Date(data.date_of_birth).toISOString().split("T")[0]
                : null;

            const payload = {
                username: data.username.trim(),
                gender: data.gender,
                date_of_birth: formattedBirth,
                bio: data.bio || "",
                target_type: data.target_type || "dating",
                hobby: Array.isArray(data.hobby) ? data.hobby : [],
            };

            console.log("📤 Sending payload:", payload);
            const res = await createProfile(payload, token);

            console.log("📥 Server response:", res);

            // ✅ Fix check response
            if (res && (res.id || res.data?.id)) {
                const id = res.id || res.data.id;
                localStorage.setItem("profile_id", id.toString());
                navigate("/upload");
            } else {
                throw new Error("Phản hồi không hợp lệ từ server");
            }
        } catch (err: any) {
            console.error("❌ Create profile error:", err);
            setErrorMessage(err.message || "Có lỗi xảy ra khi tạo hồ sơ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Hoàn thiện hồ sơ của bạn
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Tên người dùng */}
                <div>
                    <label className="block text-sm font-medium">Tên hiển thị</label>
                    <input
                        {...register("username")}
                        className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nhập tên của bạn"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Giới tính */}
                <div>
                    <label className="block text-sm font-medium mb-1">Giới tính</label>
                    <Select onValueChange={(value) => setValue("gender", value)}>
                        <SelectTrigger className="w-full border rounded-md px-3 py-2">
                            <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                    )}
                </div>

                {/* Ngày sinh */}
                <div>
                    <label className="block text-sm font-medium">Ngày sinh</label>
                    <input
                        type="date"
                        {...register("date_of_birth")}
                        className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.date_of_birth && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.date_of_birth.message}
                        </p>
                    )}
                </div>

                {/* Tiểu sử */}
                <div>
                    <label className="block text-sm font-medium">Giới thiệu bản thân</label>
                    <textarea
                        {...register("bio")}
                        className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Viết vài dòng về bạn..."
                        rows={3}
                    />
                </div>

                {/* Mục tiêu */}
                <div>
                    <label className="block text-sm font-medium mb-1">Mục đích hẹn hò</label>
                    {/* <Select onValueChange={(value) => setValue("target_type", value)}>
            <SelectTrigger className="w-full border rounded-md px-3 py-2">
              <SelectValue placeholder="Chọn mục đích hẹn hò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dating">Hẹn hò</SelectItem>
              <SelectItem value="friendship">Kết bạn</SelectItem>
              <SelectItem value="chat">Trò chuyện</SelectItem>
            </SelectContent>
          </Select> */}
                    <Select onValueChange={(value) => setValue("target_type", value)}>
                        <SelectTrigger className="w-full border rounded-md px-3 py-2">
                            <SelectValue placeholder="Chọn mục tiêu" />
                        </SelectTrigger>
                        <SelectContent>
                            {targetTypes.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>

                {/* Sở thích */}
                <div>
                    <label className="block text-sm font-medium mb-1">Sở thích</label>
                    <div className="grid grid-cols-2 gap-2">
                        {hobbies.map((hobby) => (
                            <label key={hobby.value} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={hobby.value}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const current = watch("hobby") || [];
                                        if (checked) setValue("hobby", [...current, hobby.value]);
                                        else setValue(
                                            "hobby",
                                            current.filter((v) => v !== hobby.value)
                                        );
                                    }}
                                />
                                <span>{hobby.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-60"
                >
                    {loading ? <Loader /> : "Tạo hồ sơ"}
                </button>
            </form>
        </div>
    );
};

export default FillProfileForm;
