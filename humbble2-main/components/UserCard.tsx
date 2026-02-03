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

import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons, Octicons } from "@expo/vector-icons"; // Thêm Octicons để dùng biểu tượng khóa
import { useRouter } from "expo-router";

interface UserCardProp {
  data: any;
  size: "small" | "large";
  showLikeIcon: boolean;
  isPremiumBlur?: boolean; 
}

const BASE_URL = "http://10.0.2.2:8000";

const UserCard = ({
  data,
  size = "small",
  showLikeIcon = false,
  isPremiumBlur = false, 
}: UserCardProp) => {
  const isLarge = size === "large";

  const avatarUrl = data?.image?.startsWith("http")
    ? data.image
    : `${BASE_URL}/${data?.image}`;
  
  const router = useRouter();

  const handlePress = () => {
    if (!data?.profileId) return;

    router.push({
      pathname: "/Screen/profile-detail",
      params: {
        profileId: data.profileId,
        name: data.name,
        age: data.age,
        location: data.location,
        avatar: avatarUrl,
      },
    });
  };

  return (
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={handlePress}
      style={{
        borderRadius: 12,
        overflow: "hidden", 
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
        }}
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
              backgroundColor: "rgba(245, 245, 245, 0.6)", 
              zIndex: 3, 
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </View>
        )}

        {/* 🔥 Text nằm trên overlay (zIndex: 2, nên nằm dưới lớp mờ Premium) */}
        <View style={{ padding: 10, zIndex: 2 }}>
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
    </TouchableOpacity>
  );
};

export default UserCard;