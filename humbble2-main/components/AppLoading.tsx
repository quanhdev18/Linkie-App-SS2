// import React from "react";
// import { View, Text, ActivityIndicator } from "react-native";

// const AppLoading = ({ text = "Đang tải..." }) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 18,
//       }}
//     >
//       <ActivityIndicator size="large" color="#FF385C" />
//       <Text
//         style={{
//           marginTop: 14,
//           fontSize: 15,
//           color: "#666",
//           textAlign: "center",
//         }}
//       >
//         {text}
//       </Text>
//     </View>
//   );
// };

// export default AppLoading;
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const AppLoading = ({ text = "Đang tải..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF385C" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,              // 🔥 QUAN TRỌNG
    justifyContent: "center", // căn dọc
    alignItems: "center",     // căn ngang
    paddingHorizontal: 18,
  },
  text: {
    marginTop: 14,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
});
