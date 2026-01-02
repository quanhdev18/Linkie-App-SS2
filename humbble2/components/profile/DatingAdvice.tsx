
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Pressable,
//     Linking,
//     Image,
// } from "react-native";

// const DatingAdvice = () => {
//     const videos = [
//         {
//             authur: "Tun Cảm Ơn",
//             title: "Cách để một mối tình đẹp không còn dang dở",
//             thumbnail: "https://i.pinimg.com/736x/62/da/9a/62da9a454941be6c63e51b718ff674cc.jpg",
//             url: "https://youtu.be/6ZrQxrH_2YQ?si=UOEVEFSZjvAXfkrC",
//         },
//         {
//             authur: "Minh Niệm",
//             title: "Tình yêu không đủ mạnh mẽ dễ làm tổn thương nhau",
//             thumbnail: "https://i.pinimg.com/736x/01/2c/95/012c95fef530c31036661fe4dc125705.jpg",
//             url: "https://youtu.be/Bmkx8QaM0dM?si=_9T8VcUSVE7nO6cW",
//         },
//         {
//             authur: "Vietcetera",
//             title: "Chỉ yêu thôi thì chưa đủ",
//             thumbnail: "https://i.pinimg.com/736x/9f/1b/ca/9f1bca74524548b31a75018903c776c8.jpg",
//             url: "https://youtu.be/ECiKtkjDrbw?si=kyNDwe-Jn-UXbCow",
//         },
//         {
//             authur: "Vì sao thế nhỉ?",
//             title: "Yêu một người bằng hết con tim là đúng hay sai?",
//             thumbnail: "https://i.pinimg.com/1200x/86/61/9e/86619e483dabafaee4ab10a9a4064f11.jpg",
//             url: "https://youtu.be/5ZKcfdbA3nQ?si=-U2_8TpV-8VdS5N5",
//         },
//     ];

//     const tips = [
//         { title: "4 Tip cho một mối quan hệ lành mạnh" },
//         { title: "Những lời nói yêu hằng ngày cho cặp đôi" },
//         { title: "'Chiến tranh lạnh' là chuyện bình thường" },
//         { title: "Giao tiếp tốt hơn với đối phương" },
//     ];

//     return (
//         <ScrollView
//             style={{ flex: 1 }}
//             showsVerticalScrollIndicator={false}
//         >
//             {/* Short Videos */}
//             <Text style={styles.subTitle}>Video/ Podcast hay về tình yêu</Text>
//             {/* Modified Video Scroll Section */}
//             <View style={{  marginTop: 10 }}>
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={{
//                         paddingLeft: 18,
//                         paddingRight: 18,
//                         columnGap: 12,
//                     }}
//                 >
//                     {videos.map((video, index) => (
//                         <Pressable
//                             key={index}
//                             style={styles.videoCard}
//                             onPress={() => Linking.openURL(video.url)}
//                         >
//                             <Image
//                                 source={{ uri: video.thumbnail }}
//                                 style={styles.thumbnail}
//                             />
//                             <View style={styles.authorBox}>
//                                 <Text style={styles.authorText}>{video.authur}</Text>
//                             </View>
//                             {/* Title overlay */}
//                             <View style={styles.overlay}>
//                                 <Text numberOfLines={2} style={styles.videoTitle}>
//                                     {video.title}
//                                 </Text>
//                             </View>
//                         </Pressable>
//                     ))}
//                 </ScrollView>
//             </View>

//             {/* Tips */}
//             <Text style={styles.subTitlee}>Tips & Tâm sự</Text>
//             {/* Modified Tips Scroll Section */}
//             <View style={{ marginTop: 10 }}> {/* Added parent View for marginHorizontal */}
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={{
//                         paddingLeft: 18,
//                         paddingRight: 18,
//                         columnGap: 10,
//                         paddingVertical: 10,
//                     }}
//                 >
//                     {tips.map((tip, index) => (
//                         <View key={index} style={styles.tipCard}>
//                             <Text style={styles.tipText}>{tip.title}</Text>
//                         </View>
//                     ))}
//                 </ScrollView>
//             </View>

//         </ScrollView>
//     );
// };

// export default DatingAdvice;

// const styles = StyleSheet.create({
//     subTitle: {
//         fontSize: 16,
//         fontWeight: "600",
//         marginBottom: 4,
//         paddingHorizontal: 18,
//     },
//     subTitlee: {
//         fontSize: 16,
//         fontWeight: "600",
//         marginTop: 25,
//         marginBottom: 4,
//         paddingHorizontal: 18,
//     },
//     videoCard: {
//         width: 220,
//         height: 350,
//         borderRadius: 12,
//         backgroundColor: "#000",
//         overflow: "hidden",
//         position: "relative",
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 2,
//     },
//     thumbnail: {
//         width: "100%",
//         height: "100%",
//     },
//     overlay: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         // backgroundColor: "rgba(0,0,0,0.5)", 
//         padding: 8,
//     },
//     videoTitle: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#fff",
//         marginBottom: 4,
//     },

//     authorBox: {
//         position: "absolute",
//         top: 8,
//         left: 8,
//         backgroundColor: "rgba(0,0,0,0.6)",
//         paddingHorizontal: 6,
//         paddingVertical: 3,
//         borderRadius: 6,
//     },
//     authorText: {
//         fontSize: 12,
//         fontWeight: "500",
//         color: "#fff",
//     },

//     tipCard: {
//         backgroundColor: "#f5f5f5",
//         borderRadius: 10,
//         padding: 12,
//         width: 150,
//         height: 180,
//         justifyContent: "center",
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 2,
//     },
//     tipText: {
//         fontSize: 14,
//         fontWeight: "500",
//     },

// });









import React, { useState, useEffect } from "react";
import { /* ... các import khác ... */ } from "react-native";
// 1. IMPORT HÀM MỚI TỪ FILE API
import {
    View,
    Text,
    StyleSheet, // <--- THÊM DÒNG NÀY
    ScrollView,
    Pressable,
    Linking,
    Image,
} from "react-native";
import { getDatingAdvice } from "../../services/api"; // Sửa lại đường dẫn nếu cần

const DatingAdvice = () => {
    const [videos, setVideos] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                // 2. GỌI API THẬT
                const data = await getDatingAdvice();

                // 3. SET STATE VỚI DỮ LIỆU TỪ API
                setVideos(data.videos);
                setTips(data.tips);

            } catch (error) {
                console.error("Lỗi khi tải dating advice:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvice(); // 4. BỎ COMMENT DÒNG NÀY
    }, []);

    if (loading) { // Sửa lại logic loading một chút
        return <View><Text>Loading...</Text></View>;
    }

    // ... phần return JSX của bạn giữ nguyên ...
    // (Nhớ là key nên dùng video.id và tip.id thay vì index)
    return (
        <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Short Videos */}
            <Text style={styles.subTitle}>Video/ Podcast hay về tình yêu</Text>
            {/* Modified Video Scroll Section */}
            <View style={{ marginTop: 10 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 18,
                        paddingRight: 18,
                        columnGap: 12,
                    }}
                >
                    {videos.map((video, index) => (
                        <Pressable
                            key={index}
                            style={styles.videoCard}
                            onPress={() => Linking.openURL(video.url)}
                        >
                            {/* <Image
                                source={{ uri: video.thumbnail }}
                                style={styles.thumbnail}
                            />
                            <View style={styles.authorBox}>
                                <Text style={styles.authorText}>{video.authur}</Text>
                            </View> */}
                            <Image
                                source={{ uri: video.thumbnail_url }} // SỬA Ở ĐÂY
                                style={styles.thumbnail}
                            />
                            <View style={styles.authorBox}>
                                <Text style={styles.authorText}>{video.author}</Text> {/* SỬA Ở ĐÂY */}
                            </View>
                            {/* Title overlay */}
                            <View style={styles.overlay}>
                                <Text numberOfLines={2} style={styles.videoTitle}>
                                    {video.title}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Tips */}
            <Text style={styles.subTitlee}>Tips & Tâm sự</Text>
            {/* Modified Tips Scroll Section */}
            <View style={{ marginTop: 10 }}> {/* Added parent View for marginHorizontal */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 18,
                        paddingRight: 18,
                        columnGap: 10,
                        paddingVertical: 10,
                    }}
                >
                    {tips.map((tip, index) => (
                        <View key={index} style={styles.tipCard}>
                            <Text style={styles.tipText}>{tip.title}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

        </ScrollView>
    );
};
export default DatingAdvice;

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        paddingHorizontal: 18,
    },
    subTitlee: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 25,
        marginBottom: 4,
        paddingHorizontal: 18,
    },
    videoCard: {
        width: 220,
        height: 350,
        borderRadius: 12,
        backgroundColor: "#000",
        overflow: "hidden",
        position: "relative",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    thumbnail: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: "rgba(0,0,0,0.5)", 
        padding: 8,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },

    authorBox: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
    },
    authorText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
    },

    tipCard: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 12,
        width: 150,
        height: 180,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tipText: {
        fontSize: 14,
        fontWeight: "500",
    },

});
