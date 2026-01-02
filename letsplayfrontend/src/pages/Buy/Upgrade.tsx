import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "@/assets/image/image.png";
import { getUsersWhoLikedMe, getNearbyUsers, getSameTargetUsers, baseURL } from "@/services/api";
import SwipeContainer from "../Home/components/SwipeContainer";

const Upgrade: React.FC = () => {
    const navigate = useNavigate();
    const [likedUsers, setLikedUsers] = useState<any[]>([]);
    const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
    const [goalUsers, setGoalUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSwipePopup, setShowSwipePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);


    const [users, setUsers] = useState([]);
    const [canViewPhotos, setCanViewPhotos] = useState(false);

    const buildImageUrl = (path: string) => {
        if (!path) return defaultAvatar;

        if (path.startsWith("http")) return path;

        if (path.startsWith("static/")) return `${baseURL}/${path}`;

        return `${baseURL}/static/images/profile/${path}`;
    };

    useEffect(() => {
        const fetchLikedMe = async () => {
            try {
                const accountId = localStorage.getItem("account_id");
                if (!accountId) throw new Error("Không tìm thấy account_id");

                const [liked, nearby, goals] = await Promise.all([
                    getUsersWhoLikedMe(accountId),
                    getNearbyUsers(accountId, 10),
                    getSameTargetUsers(),
                ]);

                setLikedUsers(liked);
                setNearbyUsers(nearby);
                setGoalUsers(goals.profiles || []);
                setCanViewPhotos(goals.can_view_photos ?? false);

            } catch (err) {
                console.error("Lỗi khi tải danh sách:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedMe();
    }, []);

    const UserGrid = ({
        title,
        users,
        canViewPhotos
    }: {
        title: string;
        users: any[];
        canViewPhotos: boolean;
    }) => (
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
                                src={buildImageUrl(user.avatar_url)}
                                alt={user.username}
                                className="w-full h-full object-cover"
                                style={{
                                    filter: canViewPhotos ? "none" : "blur(12px) brightness(0.8)",
                                }}
                                onClick={() => {
                                    if (!canViewPhotos) return;

                                    const formattedUser = {
                                        ...user,
                                        images: user.images?.length
                                            ? user.images.map((img: any) => ({
                                                url: buildImageUrl(img.url),
                                            }))
                                            : [{ url: buildImageUrl(user.avatar_url) }],
                                    };

                                    setSelectedUser(formattedUser);
                                    setShowSwipePopup(true);
                                }}
                            />

                        </div>
                    ))}
                </div>
            )}
        </div>
    );



    return (
        <div className="flex flex-col items-center w-full h-screen bg-white overflow-hidden ">
            {/* 🟡 Header cố định */}
            <header className="sticky top-0 z-10 w-full h-20 flex items-center justify-center border-b bg-white relative">
                <div className="text-yellow-500 font-bold text-xl">Linkie AI</div>
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
                        {/* <button className="bg-black text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-gray-800 transition mb-8">
                            Nâng cấp Premium
                        </button> */}
                        <button
                            onClick={() => navigate("/spotlight-payment?plan=premium")}
                            className="bg-black text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-gray-800 transition mb-8"
                        >
                            Nâng cấp Premium
                        </button>

                    </div>

                    {/* 🖼️ Danh sách người thích mình */}
                    <UserGrid title="Những người đã thích bạn" users={likedUsers} canViewPhotos={canViewPhotos} />

                    {/* 🧭 Danh sách người ở gần bạn */}
                    <UserGrid title="Người ở gần bạn" users={nearbyUsers} canViewPhotos={canViewPhotos} />

                    {/* 💫 Danh sách cùng mục tiêu hẹn hò */}
                    <UserGrid title="Cùng mục tiêu hẹn hò" users={goalUsers} canViewPhotos={canViewPhotos} />

                    <div />
                </div>
            </main>

            {showSwipePopup && selectedUser && (
                <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center">

                    {/* Box chứa SwipeContainer */}
                    <div className="relative w-full max-w-[1100px] h-[706px] rounded-2xl overflow-hidden">

                        {/* Nút đóng — luôn đè lên trên card */}
                        <button
                            className="absolute top-4 right-4 z-[1000] bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
                            onClick={() => setShowSwipePopup(false)}
                        >
                            ✕
                        </button>

                        {/* SwipeContainer FULL không bị ép */}
                        {/* <SwipeContainer
                            filters={{}}
                            singleProfile={selectedUser}
                            onLoaded={() => { }}
                        /> */}
                        <SwipeContainer
                            filters={{}}
                            singleProfile={selectedUser}
                            onLikedUser={(id: number) => {
                                // XÓA user khỏi 3 danh sách
                                setLikedUsers(prev => prev.filter(u => u.id !== id));
                                setNearbyUsers(prev => prev.filter(u => u.id !== id));
                                setGoalUsers(prev => prev.filter(u => u.id !== id));

                                // ĐÓNG POPUP
                                setShowSwipePopup(false);
                                setSelectedUser(null);
                            }}
                        />

                    </div>
                </div>
            )}


        </div>
    );
};

export default Upgrade;

