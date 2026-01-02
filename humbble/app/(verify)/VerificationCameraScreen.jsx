// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { Ionicons } from "@expo/vector-icons";
// import { sendVerifyRequest } from "../../services/api"; // thêm dòng này

// export default function VerificationCameraScreen({ navigation, route }) {
//   const { poseSampleImage, poseKey, accountId } = route.params;

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
//     if (!photo) return;

//     try {
//       const res = await sendVerifyRequest({
//         account_id: accountId,
//         pose_key: poseKey,
//         fileUri: photo.uri,
//       });

//       console.log("API Response:", res.data);

//       if (res.data.status === "pending") {
//         alert("Ảnh đã gửi, chờ admin duyệt!");
//         navigation.goBack();
//       }
//     } catch (err) {
//       console.log("Upload error:", err);
//       alert("Lỗi: " + err?.response?.data?.detail || "Không thể upload ảnh");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Pose image small */}
//       <Image source={{ uri: poseSampleImage }} style={styles.posePreview} />

//       {/* Back button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="close" size={26} color="#fff" />
//       </TouchableOpacity>

//       {/* Camera preview */}
//       <View style={styles.cameraWrapper}>
//         {!isCaptured ? (
//           <CameraView ref={cameraRef} style={styles.camera} facing="front" />
//         ) : (
//           <Image source={{ uri: photo.uri }} style={styles.camera} />
//         )}
//       </View>

//       {/* Instruction text */}
//       <Text style={styles.instruction}>
//         Tạo dáng theo đúng pose{`\n`}và bấm chụp để xác minh
//       </Text>

//       {/* Capture Button */}
//       {!isCaptured ? (
//         <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//           <Ionicons name="heart-outline" size={32} color="#fff" />
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           style={styles.captureButton}
//           onPress={sendImageToServer}
//         >
//           <Text style={{ color: "white" }}>Gửi</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     alignItems: "center",
//   },

//   posePreview: {
//     width: 85,
//     height: 100,
//     borderRadius: 6,
//     position: "absolute",
//     top: 40,
//     left: 20,
//     borderWidth: 1,
//     borderColor: "#fff",
//   },

//   backButton: {
//     position: "absolute",
//     top: 45,
//     right: 20,
//     padding: 6,
//   },

//   cameraWrapper: {
//     width: "86%",
//     height: "60%",
//     marginTop: 120,
//     borderRadius: 16,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },

//   camera: {
//     width: "100%",
//     height: "100%",
//   },

//   instruction: {
//     marginTop: 20,
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 14,
//   },

//   captureButton: {
//     marginTop: 20,
//     width: 70,
//     height: 70,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });



import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { sendVerifyRequest } from "../../services/api"; // giữ nguyên
import { useRouter, useSearchParams } from "expo-router"; // ✅ expo-router

export default function VerificationCameraScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { poseSampleImage, poseKey, accountId } = params; // ✅ lấy từ query params

  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCaptured, setIsCaptured] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Request permissions
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
      base64: false,
    });

    setIsCaptured(true);
    setPhoto(pic);
  };

  const sendImageToServer = async () => {
    if (!photo) return;

    try {
      const res = await sendVerifyRequest({
        account_id: accountId,
        pose_key: poseKey,
        fileUri: photo.uri,
      });

      console.log("API Response:", res.data);

      if (res.data.status === "pending") {
        alert("Ảnh đã gửi, chờ admin duyệt!");
        router.back(); // ✅ expo-router quay lại màn trước
      }
    } catch (err) {
      console.log("Upload error:", err);
      alert("Lỗi: " + err?.response?.data?.detail || "Không thể upload ảnh");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: poseSampleImage }} style={styles.posePreview} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="close" size={26} color="#fff" />
      </TouchableOpacity>

      <View style={styles.cameraWrapper}>
        {!isCaptured ? (
          <CameraView ref={cameraRef} style={styles.camera} facing="front" />
        ) : (
          <Image source={{ uri: photo.uri }} style={styles.camera} />
        )}
      </View>

      <Text style={styles.instruction}>
        Tạo dáng theo đúng pose{`\n`}và bấm chụp để xác minh
      </Text>

      {!isCaptured ? (
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="heart-outline" size={32} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.captureButton} onPress={sendImageToServer}>
          <Text style={{ color: "white" }}>Gửi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  posePreview: {
    width: 85,
    height: 100,
    borderRadius: 6,
    position: "absolute",
    top: 40,
    left: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 45,
    right: 20,
    padding: 6,
  },
  cameraWrapper: {
    width: "86%",
    height: "60%",
    marginTop: 120,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  instruction: {
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  captureButton: {
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
