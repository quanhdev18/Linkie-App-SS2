// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";

// export default function Login() {
//   const router = useRouter();

//   return (
//     <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
//       <Image
//         source={require("../assets/images/login.jpg")}
//         style={{ width: "100%", height: 530 }}
//       />
//       <View style={styles.container}>
//         <Text style={styles.title}>Linkies</Text>
//         <Text style={styles.subtitle}>Hẹn hò thế hệ mới - dễ như chat!</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.btnSignUp}
//             onPress={() => router.push("/(auth)/sign-in")}
//           >
//             <Text style={styles.btnText}>Đăng nhập</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.btnSignIn}
//             onPress={() => router.push("/(auth)/sign-up")}
//           >
//             <Text style={styles.btnText}>Đăng ký</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     marginTop: -20,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     height: "100%",
//     paddingHorizontal: 25,
//   },
//   title: {
//     paddingTop: 40,
//     fontSize: 30,
//     fontFamily: "gothamrnd-bold",
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 20,
//     fontFamily: "gothamrnd-medium",
//     textAlign: "center",
//     marginTop: 10,
//     paddingBottom: 35,
//   },
//   btnSignUp: {
//     padding: 10,
//     backgroundColor: "#fff",
//     borderWidth: 2,
//     borderColor: "#000",
//     borderRadius: 99,
//     marginBottom: 20,
//   },
//   btnSignIn: {
//     padding: 10,
//     backgroundColor: "#fff",
//     borderWidth: 2,
//     borderColor: "#000",
//     borderRadius: 99,
//   },
//   btnText: {
//     textAlign: "center",
//     color: "#000",
//     fontSize: 20,
//     fontFamily: "gothamrnd-medium",
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
// });
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Lấy chiều cao màn hình để tính toán layout một cách tương đối
const { height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();

  return (
    // Sử dụng flex: 1 để container chiếm toàn bộ không gian an toàn của màn hình
    <SafeAreaView edges={["top"]} style={styles.safeArea}>

      {/* Container cho ảnh */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/loginnew.jpg")}
          style={styles.image}
          resizeMode="cover" // Đảm bảo ảnh che phủ khu vực mà không bị méo
        />
      </View>

      {/* Container cho nội dung */}
      <View style={styles.contentContainer}>
        {/* Phần tiêu đề */}
        <View>
          <Text style={styles.title}>Linkies</Text>
          <Text style={styles.subtitle}>Hẹn hò thế hệ mới - dễ như chat!</Text>
        </View>

        {/* Phần các nút bấm */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Đăng ký</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Màu nền cho toàn bộ màn hình
  },
  imageContainer: {
    // Chiếm khoảng 60% chiều cao màn hình
    height: height * 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
    backgroundColor: "#fff",
    marginTop: -30, // Kéo lên trên một chút để tạo đường cong đè lên ảnh
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    // Phân bổ không gian dọc một cách đều đặn
    justifyContent: 'space-around',
    paddingBottom: 20, // Thêm khoảng đệm ở dưới cùng
  },
  title: {
    fontSize: 32,
    fontFamily: "gothamrnd-bold",
    textAlign: "center",
    color: '#1c1c1c',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "gothamrnd-medium",
    textAlign: "center",
    marginTop: 10,
    color: '#555',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 15, // Dùng padding dọc để nút có chiều cao nhất quán
    borderRadius: 99,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "gothamrnd-medium",
  },
  // Nút chính (Primary) - ví dụ: Đăng ký
  primaryButton: {
    backgroundColor: "#000",
    borderColor: "#000",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#fff",
  },
  // Nút phụ (Secondary) - ví dụ: Đăng nhập
  secondaryButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  secondaryButtonText: {
    color: "#000",
  },
});
