// import { View, ImageBackground, StyleSheet } from "react-native";
// import { EvilIcons } from "@expo/vector-icons";

// interface UserGridCardProps {
//   data: any;
//   showLikeIcon?: boolean;
//   isPremiumBlur?: boolean;
// }

// const BASE_URL = "http://10.0.2.2:8000";

// const UserGridCard = ({
//   data,
//   showLikeIcon = false,
//   isPremiumBlur = false,
// }: UserGridCardProps) => {
//   const avatarUrl = data?.image?.startsWith("http")
//     ? data.image
//     : `${BASE_URL}/${data?.image}`;

//   return (
//     <View style={styles.card}>
//       <ImageBackground
//         source={{ uri: avatarUrl }}
//         style={styles.image}
//         imageStyle={styles.imageRadius}
//       >
//         {/* Overlay tối */}
//         <View
//           style={[
//             StyleSheet.absoluteFillObject,
//             {
//               backgroundColor: isPremiumBlur
//                 ? "rgba(0,0,0,0.45)"
//                 : "rgba(0,0,0,0.3)",
//             },
//           ]}
//         />

//         {showLikeIcon && (
//           <EvilIcons
//             name="heart"
//             size={28}
//             color="#fff"
//             style={styles.likeIcon}
//           />
//         )}
//       </ImageBackground>
//     </View>
//   );
// };

// export default UserGridCard;

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     margin: 6,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     aspectRatio: 3 / 4, // 🔥 hình chữ nhật đứng
//     justifyContent: "flex-end",
//   },
//   imageRadius: {
//     borderRadius: 12,
//   },
//   likeIcon: {
//     position: "absolute",
//     bottom: 8,
//     right: 8,
//   },
// });
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 36) / 2; // 2 cột + margin

const BASE_URL = "http://10.0.2.2:8000";

const UserGridCard = ({ data, showLikeIcon, isPremiumBlur }: any) => {
  const avatarUrl = data?.image?.startsWith("http")
    ? data.image
    : `${BASE_URL}/${data?.image}`;

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: avatarUrl }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: isPremiumBlur
                ? "rgba(0,0,0,0.45)"
                : "rgba(0,0,0,0.3)",
            },
          ]}
        />

        {showLikeIcon && (
          <EvilIcons name="heart" size={28} color="#fff" style={styles.likeIcon} />
        )}
      </ImageBackground>
    </View>
  );
};

export default UserGridCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,   // ✅ QUAN TRỌNG
    margin: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,  // ✅ tất cả bằng nhau
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 12,
  },
  likeIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});
