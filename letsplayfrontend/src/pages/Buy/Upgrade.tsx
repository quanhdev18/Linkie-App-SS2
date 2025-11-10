import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "@/assets/image/image.png";
import { getUsersWhoLikedMe } from "@/services/api";

const Upgrade: React.FC = () => {
    const navigate = useNavigate();
    const [likedUsers, setLikedUsers] = useState<any[]>([]);
    const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
    const [goalUsers, setGoalUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedMe = async () => {
            try {
                const accountId = localStorage.getItem("account_id");
                if (!accountId) throw new Error("Không tìm thấy account_id");

                // 🟢 Tạm thời dùng cùng API cho cả 3 nhóm
                const [liked, nearby, goals] = await Promise.all([
                    getUsersWhoLikedMe(accountId),
                    getUsersWhoLikedMe(accountId),
                    getUsersWhoLikedMe(accountId),
                ]);

                setLikedUsers(liked);
                setNearbyUsers(nearby);
                setGoalUsers(goals);
            } catch (err) {
                console.error("Lỗi khi tải danh sách:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedMe();
    }, []);

    // 🧩 Component hiển thị 1 nhóm user
    // const UserGrid = ({ title, users }: { title: string; users: any[] }) => (
    //     <div className="w-full mb-10">
    //         <p className="text-base font-semibold mb-4 text-gray-800">{title}</p>
    //         {loading ? (
    //             <p className="text-gray-500">Đang tải...</p>
    //         ) : users.length === 0 ? (
    //             <p className="text-gray-500 text-sm italic">Chưa có dữ liệu.</p>
    //         ) : (
    //             <div className="grid grid-cols-3 gap-6 pb-4">
    //                 {users.map((user) => (
    //                     <div
    //                         key={user.id}
    //                         className="w-36 h-52 rounded-2xl overflow-hidden shadow-md relative"
    //                     >
    //                         <img
    //                             src={user.avatar || defaultAvatar}
    //                             alt={user.username}
    //                             className="w-full h-full object-cover"
    //                             style={{ filter: "blur(8px) brightness(0.9)" }}
    //                         />
    //                         <div className="absolute bottom-0 bg-black/60 w-full text-center text-white text-xs py-1">
    //                             {user.username}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // );
    const UserGrid = ({ title, users }: { title: string; users: any[] }) => (
        <div className="w-full mb-10 flex flex-col items-center">
            <p className="text-base font-semibold mb-4 text-gray-800">{title}</p>
            {loading ? (
                <p className="text-gray-500">Đang tải...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Chưa có dữ liệu.</p>
            ) : (
                <div className="grid grid-cols-3 gap-6 pb-4 place-items-center mx-auto">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="w-36 h-52 rounded-2xl overflow-hidden shadow-md relative"
                        >
                            <img
                                src={user.avatar || defaultAvatar}
                                alt={user.username}
                                className="w-full h-full object-cover"
                                style={{ filter: "blur(8px) brightness(0.9)" }}
                            />
                            <div className="absolute bottom-0 bg-black/60 w-full text-center text-white text-xs py-1">
                                {user.username}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


    return (
        <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden ">
            {/* 🟡 Header cố định */}
            <header className="sticky top-0 z-10 w-full h-16 flex items-center justify-center border-b bg-white relative">
                <div className="text-yellow-500 font-bold text-xl">Linkie AI (coming soon)</div>
                <button
                    onClick={() => navigate("/home")}
                    className="absolute right-5 text-gray-500 hover:text-red-500 transition text-xl"
                >
                    ✕
                </button>
            </header>

            {/* 🟢 Nội dung chính */}
            <main className="flex-1 overflow-y-auto w-full flex justify-center pt-6 pb-16 h-full">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl flex flex-col items-center ">
                    {/* 🩷 Nhóm 1 */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">
                            <span className="text-gray-600 text-2xl">♡</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                            Xem ai đã thích bạn
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
                            Nâng cấp <span className="font-semibold">Premium</span> để xem những người đã thích bạn.
                        </p>
                        <button className="bg-black text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-gray-800 transition mb-8">
                            Nâng cấp Premium
                        </button>
                    </div>

                    {/* 🖼️ Danh sách người thích mình */}
                    <UserGrid title="Những người đã thích bạn" users={likedUsers} />

                    {/* 🧭 Danh sách người ở gần bạn */}
                    <UserGrid title="Người ở gần bạn" users={nearbyUsers} />

                    {/* 💫 Danh sách cùng mục tiêu hẹn hò */}
                    <UserGrid title="Cùng mục tiêu hẹn hò" users={goalUsers} />

                    <div />
                </div>
            </main>
        </div>
    );
};

export default Upgrade;

