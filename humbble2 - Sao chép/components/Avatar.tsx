// import { Image, View } from "react-native";

// const Avatar = ({ size }) => {
//   return (
//     <View
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "100%",
//         overflow: "hidden",
//         borderWidth: 3,
//       }}
//     >
//       <Image
//         style={{ width: "100%", height: "100%" }}
//         source={{
//           uri: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         }}
//       />
//     </View>
//   );
// };
// export default Avatar;
import { Image, View } from "react-native";

const Avatar = ({ size = 60, image }) => {
  const source =
    typeof image === "string"
      ? { uri: image }   // ảnh từ server
      : image;           // ảnh local require(...)

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#eee",
      }}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;
