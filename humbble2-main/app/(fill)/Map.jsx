import React, { useEffect, useState } from "react";
import { router, useRouter, useNavigation } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  LayoutAnimation,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasLocationPermission(true);
      } else {
        alert("Bạn cần cấp quyền truy cập vị trí để tiếp tục.");
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (hasLocationPermission) {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
    };
    getCurrentLocation();
  }, [hasLocationPermission]);

  const handleAccept = async () => {
    if (!location) {
      alert("Không thể cập nhật vị trí.");
      // Vẫn cho phép chuyển tab
      router.replace("/(tabs)/profile");
      return;
    }

    try {
      await axios.post("http://10.0.2.2:8000/users/location", {
        account_id: 1,
        lat: location.latitude,
        lng: location.longitude,
      });
      alert("Đã cập nhật vị trí!");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Có lỗi khi cập nhật vị trí.");
    } finally {
      // Dù có lỗi hay không cũng chuyển sang tab mới
      router.replace("/(tabs)/profile");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* <View style={styles.card}> */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Bạn sống ở thành phố nào?</Text>
        <Text style={styles.subtitle}>
          Mở cài đặt vị trí để xem ai đang ở gần. Bạn sẽ không thể match nếu
          không chia sẻ thông tin này.
        </Text>

        <View style={styles.iconContainer}>
          <Image
            source={require("../../assets/images/location.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setShowExplanation(!showExplanation);
          }}
        >
          <Text style={styles.explanationToggle}>
            {showExplanation ? "▲" : "▼"} Thông tin vị trí của bạn sẽ được sử
            dụng như thế nào?
          </Text>
        </TouchableOpacity>

        {showExplanation && (
          <Text style={styles.explanation}>
            Vị trí của bạn giúp chúng tôi hiển thị cho bạn những người gần đó.
            Thông tin này sẽ không được chia sẻ công khai một phần.
          </Text>
        )}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  // card: {
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexBasis: 0,
  //   paddingHorizontal: 24,
  //   paddingBottom: 16,
  // },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: "relative",
    marginLeft: -16,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    marginTop: 20,
    textAlign: "center",
    fontStyle: "gothamrnd-bold",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24,
  },
  iconContainer: {
    paddingBottom: 190,
    paddingTop: 150,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 120,
    height: 120,
  },
  button: {
    height: 50,
    borderRadius: 40,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  explanationToggle: {
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  explanation: {
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
});

export default Map;

// import React, { useEffect, useState } from "react";
// import { router, useRouter, useNavigation } from "expo-router";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   LayoutAnimation,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import * as Location from "expo-location";

// const Map = () => {
//   const router = useRouter();
//   const navigation = useNavigation();
//   const [location, setLocation] = useState(null);
//   const [hasLocationPermission, setHasLocationPermission] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);

//   // 🔐 Giả sử bạn có user object (bạn cần truyền từ props/context hoặc hardcode test)
//   const user = { id: 1 }; // Thay bằng logic thật

//   useEffect(() => {
//     const requestPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         setHasLocationPermission(true);
//       } else {
//         alert("Bạn cần cấp quyền truy cập vị trí để tiếp tục.");
//       }
//     };
//     requestPermission();
//   }, []);

//   useEffect(() => {
//     const getCurrentLocation = async () => {
//       if (hasLocationPermission) {
//         const { coords } = await Location.getCurrentPositionAsync({});
//         setLocation(coords);
//       }
//     };
//     getCurrentLocation();
//   }, [hasLocationPermission]);

//   const handleAccept = async () => {
//     if (!location || !user?.id) {
//       alert("Không thể cập nhật vị trí.");
//       return;
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:8000/users/location", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: user.id,
//           lat: location.latitude,
//           lng: location.longitude,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Lỗi phản hồi từ server");
//       }

//       alert("Đã cập nhật vị trí!");
//       router.push("/(main)/star");
//     } catch (err) {
//       console.error("Lỗi cập nhật:", err);
//       alert("Có lỗi khi cập nhật vị trí.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <FontAwesome name="chevron-left" size={24} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.title}>Bạn sống ở thành phố nào?</Text>
//         <Text style={styles.subtitle}>
//           Mở cài đặt vị trí để xem ai đang ở gần. Bạn sẽ không thể match nếu không chia sẻ thông tin này.
//         </Text>

//         <View style={styles.iconContainer}>
//           <Image
//             source={require("../../assets/images/location.png")}
//             style={styles.icon}
//             resizeMode="contain"
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleAccept}>
//           <Text style={styles.buttonText}>Tiếp theo</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => {
//             LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//             setShowExplanation(!showExplanation);
//           }}
//         >
//           <Text style={styles.explanationToggle}>
//             {showExplanation ? "▲" : "▼"} Thông tin vị trí của bạn sẽ được sử dụng như thế nào?
//           </Text>
//         </TouchableOpacity>

//         {showExplanation && (
//           <Text style={styles.explanation}>
//             Vị trí của bạn giúp chúng tôi hiển thị cho bạn những người gần đó. Thông tin này sẽ không được chia sẻ công khai một phần.
//           </Text>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//   },
//   card: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     paddingHorizontal: 24,
//     paddingBottom: 16,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "700",
//     color: "#1D2A32",
//     marginBottom: 6,
//     marginTop: 20,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 15,
//     lineHeight: 24,
//     fontWeight: "500",
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   iconContainer: {
//     paddingBottom: 190,
//     paddingTop: 150,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   icon: {
//     width: 120,
//     height: 120,
//   },
//   button: {
//     height: 50,
//     borderRadius: 40,
//     backgroundColor: "#000",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   explanationToggle: {
//     fontSize: 13,
//     marginTop: 8,
//     textAlign: "center",
//   },
//   explanation: {
//     fontSize: 13,
//     marginTop: 10,
//     textAlign: "center",
//   },
// });

// export default Map;
