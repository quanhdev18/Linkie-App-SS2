// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { Ionicons } from "@expo/vector-icons";
// import { requestVerification } from "../../services/api";
// // import { useRouter, useSearchParams } from "expo-router"; // ✅ expo-router
// import { useRouter, useLocalSearchParams } from "expo-router";

// export default function VerificationCameraScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { poseSampleImage, poseKey, accountId } = params; // ✅ lấy từ query params

//   const cameraRef = useRef(null);
//   const [permission, requestPermission] = useCameraPermissions();
//   const [isCaptured, setIsCaptured] = useState(false);
//   const [photo, setPhoto] = useState(null);

//   // Request permissions
//   useEffect(() => {
//     if (!permission?.granted) {
//       requestPermission();
//     }
//   }, []);

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.center}>
//         <Text>Ứng dụng cần quyền truy cập camera</Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={{ color: "cyan" }}>Cho phép</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (!cameraRef.current) return;
//     const pic = await cameraRef.current.takePictureAsync({
//       quality: 0.8,
//       base64: false,
//     });

//     setIsCaptured(true);
//     setPhoto(pic);
//   };

//   const sendImageToServer = async () => {
//   if (!photo) return;

//   try {
//     await requestVerification(accountId, poseKey, photo.uri);

//     Toast.show({
//       type: "success",
//       text1: "Đã gửi xác thực",
//       text2: "Vui lòng chờ hệ thống duyệt",
//     });

//     router.back();
//   } catch (err) {
//     Toast.show({
//       type: "error",
//       text1: "Gửi ảnh thất bại",
//       text2: err.message,
//     });
//   }
// };

//   return (
//   <View style={styles.container}>
//     {/* HEADER */}
//     <View style={styles.header}>
//       <Image source={{ uri: poseSampleImage }} style={styles.posePreview} />

//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => router.back()}
//       >
//         <Ionicons name="close" size={26} color="#000" />
//       </TouchableOpacity>
//     </View>

//     {/* CAMERA */}
//     <View style={styles.cameraWrapper}>
//       {!isCaptured ? (
//         <CameraView ref={cameraRef} style={styles.camera} facing="front" />
//       ) : (
//         <Image source={{ uri: photo.uri }} style={styles.camera} />
//       )}
//     </View>

//     <Text style={styles.instruction}>
//       Tạo dáng theo đúng pose{"\n"}và bấm chụp để xác minh
//     </Text>

//     {!isCaptured ? (
//       <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//         <Ionicons name="camera" size={30} color="#fff" />
//       </TouchableOpacity>
//     ) : (
//       <TouchableOpacity style={styles.captureButton} onPress={sendImageToServer}>
//         <Text style={{ color: "#fff", fontWeight: "600" }}>Gửi</Text>
//       </TouchableOpacity>
//     )}
//   </View>
// );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff", // ✅ nền trắng
//     alignItems: "center",
//   },

//   /* ===== HEADER ===== */
//   header: {
//     width: "100%",
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   posePreview: {
//     width: 90,
//     height: 110,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },

//   backButton: {
//     padding: 6,
//   },

//   /* ===== CAMERA ===== */
//   cameraWrapper: {
//     width: "90%",
//     height: "55%",
//     marginTop: 20, // ✅ đẩy xuống dưới, không đè pose
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#000",
//   },

//   camera: {
//     width: "100%",
//     height: "100%",
//   },

//   /* ===== TEXT ===== */
//   instruction: {
//     marginTop: 16,
//     color: "#333",
//     textAlign: "center",
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   /* ===== BUTTON ===== */
//   captureButton: {
//     marginTop: 24,
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#FFC107", // ✅ vàng
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 4, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },

//   /* ===== CENTER ===== */
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { requestVerification } from "../../services/api";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function VerificationCameraScreen() {
  const router = useRouter();
  const { poseSampleImage, poseKey, accountId } = useLocalSearchParams();

  const cameraRef = useRef < any > null;
  const [permission, requestPermission] = useCameraPermissions();
  const [isCaptured, setIsCaptured] = useState(false);
  const [photo, setPhoto] = useState < any > null;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Ứng dụng cần quyền truy cập camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "cyan" }}>Cho phép</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const pic = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    setPhoto(pic);
    setIsCaptured(true);
  };

  const sendImageToServer = async () => {
    if (!photo) return;

    try {
      await requestVerification(accountId, poseKey, photo.uri);

      // ✅ quay về màn hình trước 1 cách chắc chắn
      router.replace("/profile"); // ⬅️ đổi đúng route của bạn
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={{ uri: poseSampleImage }} style={styles.posePreview} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        {/* CAMERA */}
        <View style={styles.cameraWrapper}>
          {!isCaptured ? (
            <CameraView ref={cameraRef} style={styles.camera} facing="front" />
          ) : (
            <Image source={{ uri: photo.uri }} style={styles.camera} />
          )}
        </View>

        <Text style={styles.instruction}>
          Tạo dáng theo đúng pose{"\n"}và bấm chụp để xác minh
        </Text>

        {/* BUTTON – FIX BỊ CHE */}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={!isCaptured ? takePicture : sendImageToServer}
        >
          {!isCaptured ? (
            <Ionicons name="camera" size={30} color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "600" }}>Gửi</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  posePreview: {
    width: 90,
    height: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  backButton: {
    padding: 6,
  },

  cameraWrapper: {
    width: "90%",
    height: "55%",
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#000",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  instruction: {
    marginTop: 16,
    color: "#333",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },

  // 🔥 FIX BỊ CHE
  captureButton: {
    position: "absolute",
    bottom: 32, // ⬅️ CHỪA SAFE AREA
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
