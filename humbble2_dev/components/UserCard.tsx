// import { View, Text, ImageBackground } from "react-native";
// import { EvilIcons, Octicons } from "@expo/vector-icons";
// interface UserCardProp {
//   data: any;
//   size: "small" | "large";
//   showLikeIcon: boolean;
// }
// const UserCard = ({
//   data,
//   size = "small",
//   showLikeIcon = false,
// }: UserCardProp) => {
//   const isLarge = size === "large";

//   return (
//     <View
//       style={{
//         padding: 16,
//         gap: isLarge ? 10 : 5,
//         backgroundColor: "#ffffff",
//         borderRadius: 12,
//         elevation: 2,
//       }}
//     >
//       <ImageBackground
//         source={{ uri: data?.image }}
//         style={{
//           width: isLarge ? 240 : 180,
//           height: isLarge ? 300 : 200,
//           borderRadius: 10,
//           overflow: "hidden",
//         }}
//       />
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "800" }}>
//           {/* {data?.name[0].toUpperCase()}, {data.age} */}
//           {data?.name}, {data.age}

//         </Text>
//         {showLikeIcon && <EvilIcons name="heart" size={24} color="black" />}
//       </View>
//     </View>
//   );
// };

// export default UserCard;

import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { EvilIcons, Octicons } from "@expo/vector-icons"; // Thêm Octicons để dùng biểu tượng khóa

interface UserCardProp {
  data: any;
  size: "small" | "large";
  showLikeIcon: boolean;
  isPremiumBlur?: boolean; // 🔥 Thêm thuộc tính này
}

const BASE_URL = "http://10.0.2.2:8000";

const UserCard = ({
  data,
  size = "small",
  showLikeIcon = false,
  isPremiumBlur = false, // 🔥 Mặc định là false
}: UserCardProp) => {
  const isLarge = size === "large";

  const avatarUrl = data?.image?.startsWith("http")
    ? data.image
    : `${BASE_URL}/${data?.image}`;

  return (
    <View
      style={{
        borderRadius: 12,
        overflow: "hidden", // 🔥 QUAN TRỌNG — để overlay và ảnh bo góc đúng
        backgroundColor: "#f5f5f5",
      }}
    >
      <ImageBackground
        source={{ uri: avatarUrl }}
        style={{
          width: isLarge ? 240 : 180,
          height: isLarge ? 300 : 200,
          justifyContent: "flex-end",
        }}
        imageStyle={{
          borderRadius: 12,
          // 🔥 Có thể áp dụng blur trực tiếp vào ImageStyle, nhưng làm overlay sẽ tốt hơn
          // nếu không muốn phụ thuộc vào thư viện/props của RN ImageBackground
          // filter: isPremiumBlur ? "blur(8px)" : "none", // Thuộc tính này không hoạt động trong RN
        }}
        // 🎉 Trong RN, để làm mờ ảnh nền, bạn có thể dùng thuộc tính blurRadius
        // Tuy nhiên, việc này làm mờ ảnh CẢ DƯỚI LỚP PHỦ.
        // Để đạt hiệu ứng giống web (làm mờ và bị che một phần), cách tốt nhất là
        // dùng một lớp phủ *opacity cao* và biểu tượng khóa.
        // Dùng ImageBackground/Image's blurRadius, nếu có:
        // blurRadius={isPremiumBlur ? 8 : 0} // Chỉ dùng nếu mục đích là làm mờ ảnh gốc
      >
        {/* 🔥 Overlay mờ phủ toàn bộ ảnh (cho hiệu ứng tối) */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: isPremiumBlur ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.35)", // Tăng opacity nếu là Premium Blur
            zIndex: 1,
          }}
        />

        {/* 🔥 LỚP PHỦ PREMIUM BLUR (Màn hình mờ chống xem) */}
        {isPremiumBlur && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(245, 245, 245, 0.6)", // Màu nền sáng hơn một chút với độ mờ cao
              zIndex: 3, // Phải cao hơn lớp Overlay tối mờ (zIndex: 1)
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Octicons name="lock" size={30} color="#000" />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", marginTop: 8 }}>
              Premium
            </Text> */}
          </View>
        )}

        {/* 🔥 Text nằm trên overlay (zIndex: 2, nên nằm dưới lớp mờ Premium) */}
        <View style={{ padding: 10, zIndex: 2 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: "800", color: "white" }}>
            {data?.name}, {data?.age}
          </Text> */}

          {showLikeIcon && (
            <EvilIcons
              name="heart"
              size={27}
              color="#fff"
              style={{ marginTop: 4 }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserCard;