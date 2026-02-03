// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import React, { useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";

// const reasons = {
//   fake_account: [
//     "Tài khoản giả mạo tôi",
//     "Tài khoản giả mạo bạn của tôi",
//     "Tài khoản giả mạo người nổi tiếng",
//   ],
//   harassment: [
//     "Ngôn từ thù ghét",
//     "Tin nhắn không mong muốn",
//     "Quấy rối ngoài đời thực",
//   ],
//   scam: ["Lừa đảo tình cảm", "Yêu cầu gửi tiền"],
// };

// const reasonLabels = {
//   fake_account: "Giả mạo tài khoản",
//   harassment: "Quấy rối",
//   scam: "Lừa đảo",
// };

// export default function ReportUser() {
//   const router = useRouter();
//   const { reporterId, reportedId } = useLocalSearchParams();
//   const [selectedReason, setSelectedReason] = useState("");
//   const [selectedDescription, setSelectedDescription] = useState("");
//   const [detailDescription, setDetailDescription] = useState("");

//   const showToast = (type, text1, text2 = "") => {
//     Toast.show({
//       type,
//       text1,
//       text2,
//       position: "top",
//       visibilityTime: 3000,
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedReason || !selectedDescription) {
//       showToast("error", "Thiếu thông tin", "Hãy chọn đầy đủ lý do và tình huống.");
//       return;
//     }

//     try {
//       await axios.post("http://10.0.2.2:8000/reports/account", {
//         reporter_id: parseInt(reporterId),
//         reported_id: parseInt(reportedId),
//         reason: reasonLabels[selectedReason],
//         description: selectedDescription,
//         detail_description: detailDescription || null,
//       });

//       showToast("success", "Thành công", "Đã gửi báo cáo.");
//       router.back();
//     } catch (error) {
//       console.error("Lỗi gửi báo cáo:", error.response?.data || error.message);
//       showToast("error", "Lỗi", "Gửi báo cáo thất bại.");
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Báo cáo người dùng</Text>

//         <Text style={styles.subtitle}>Chọn lý do:</Text>
//         {Object.keys(reasons).map((reason) => (
//           <TouchableOpacity
//             key={reason}
//             style={[
//               styles.option,
//               selectedReason === reason && styles.selectedOption,
//             ]}
//             onPress={() => {
//               setSelectedReason(reason);
//               setSelectedDescription(""); // reset tình huống nếu đổi lý do
//             }}
//           >
//             <Text>{reasonLabels[reason]}</Text>
//           </TouchableOpacity>
//         ))}

//         {selectedReason !== "" && (
//           <>
//             <Text style={styles.subtitle}>Chọn tình huống:</Text>
//             {reasons[selectedReason].map((desc) => (
//               <TouchableOpacity
//                 key={desc}
//                 style={[
//                   styles.option,
//                   selectedDescription === desc && styles.selectedOption,
//                 ]}
//                 onPress={() => setSelectedDescription(desc)}
//               >
//                 <Text>{desc}</Text>
//               </TouchableOpacity>
//             ))}

//             <Text style={styles.subtitle}>Mô tả chi tiết (tùy chọn):</Text>
//             <TextInput
//               style={styles.textInput}
//               multiline
//               placeholder="Bạn có thể nhập thêm chi tiết về vấn đề..."
//               value={detailDescription}
//               onChangeText={setDetailDescription}
//             />
//           </>
//         )}

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Gửi báo cáo</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 15,
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 15,
//   },
//   subtitle: {
//     fontWeight: "600",
//     marginTop: 12,
//   },
//   option: {
//     padding: 12,
//     backgroundColor: "#eee",
//     borderRadius: 8,
//     marginTop: 6,
//   },
//   selectedOption: {
//     backgroundColor: "#c8e6c9",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginTop: 8,
//     padding: 10,
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   submitButton: {
//     backgroundColor: "#d32f2f",
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   useColorScheme,
// } from "react-native";
// import React, { useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import axios from "axios";
// import Toast from "react-native-toast-message";
// import { Colors } from "@/constants/Colors";

// const reasons = {
//   fake_account: [
//     "Tài khoản giả mạo tôi",
//     "Tài khoản giả mạo bạn của tôi",
//     "Tài khoản giả mạo người nổi tiếng",
//   ],
//   harassment: [
//     "Ngôn từ thù ghét",
//     "Tin nhắn không mong muốn",
//     "Quấy rối ngoài đời thực",
//   ],
//   scam: ["Lừa đảo tình cảm", "Yêu cầu gửi tiền"],
// };

// const reasonLabels = {
//   fake_account: "Giả mạo tài khoản",
//   harassment: "Quấy rối",
//   scam: "Lừa đảo",
// };

// export default function ReportUser() {
//   const router = useRouter();
//   const { reporterId, reportedId } = useLocalSearchParams();
//   const [selectedReason, setSelectedReason] = useState("");
//   const [selectedDescription, setSelectedDescription] = useState("");
//   const [detailDescription, setDetailDescription] = useState("");

//   // 👉 dùng theme để đổi màu nền và chữ
//   const colorScheme = useColorScheme();
//   const theme = Colors[colorScheme ?? "light"];

//   const showToast = (type, text1, text2 = "") => {
//     Toast.show({
//       type,
//       text1,
//       text2,
//       position: "top",
//       visibilityTime: 3000,
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedReason || !selectedDescription) {
//       showToast("error", "Thiếu thông tin", "Hãy chọn đầy đủ lý do và tình huống.");
//       return;
//     }

//     try {
//       await axios.post("http://10.0.2.2:8000/reports/account", {
//         reporter_id: parseInt(reporterId),
//         reported_id: parseInt(reportedId),
//         reason: reasonLabels[selectedReason],
//         description: selectedDescription,
//         detail_description: detailDescription || null,
//       });

//       showToast("success", "Thành công", "Đã gửi báo cáo.");
//       router.back();
//     } catch (error) {
//       console.error("Lỗi gửi báo cáo:", error.response?.data || error.message);
//       showToast("error", "Lỗi", "Gửi báo cáo thất bại.");
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView
//         contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 30, flexGrow: 1 }}
//         style={{ flex: 1 }}
//       >
//         <Text style={[styles.title, { color: theme.text }]}>Báo cáo người dùng</Text>

//         <Text style={[styles.subtitle, { color: theme.text }]}>Chọn lý do:</Text>
//         {Object.keys(reasons).map((reason) => (
//           <TouchableOpacity
//             key={reason}
//             style={[
//               styles.option,
//               {
//                 backgroundColor:
//                   selectedReason === reason ? "#c8e6c9" : theme.background === "#151718" ? "#1e1e1e" : "#eee",
//               },
//             ]}
//             onPress={() => {
//               setSelectedReason(reason);
//               setSelectedDescription("");
//             }}
//           >
//             <Text style={{ color: theme.text }}>{reasonLabels[reason]}</Text>
//           </TouchableOpacity>
//         ))}

//         {selectedReason !== "" && (
//           <>
//             <Text style={[styles.subtitle, { color: theme.text }]}>Chọn tình huống:</Text>
//             {reasons[selectedReason].map((desc) => (
//               <TouchableOpacity
//                 key={desc}
//                 style={[
//                   styles.option,
//                   {
//                     backgroundColor:
//                       selectedDescription === desc
//                         ? "#c8e6c9"
//                         : theme.background === "#151718"
//                         ? "#1e1e1e"
//                         : "#eee",
//                   },
//                 ]}
//                 onPress={() => setSelectedDescription(desc)}
//               >
//                 <Text style={{ color: theme.text }}>{desc}</Text>
//               </TouchableOpacity>
//             ))}

//             <Text style={[styles.subtitle, { color: theme.text }]}>
//               Mô tả chi tiết (tùy chọn):
//             </Text>
//             <TextInput
//               style={[
//                 styles.textInput,
//                 {
//                   borderColor: theme.icon,
//                   color: theme.text,
//                   backgroundColor: theme.background === "#151718" ? "#1e1e1e" : "#fff",
//                 },
//               ]}
//               multiline
//               placeholder="Bạn có thể nhập thêm chi tiết về vấn đề..."
//               placeholderTextColor={theme.icon}
//               value={detailDescription}
//               onChangeText={setDetailDescription}
//             />
//           </>
//         )}

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Gửi báo cáo</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 15,
//   },
//   subtitle: {
//     fontWeight: "600",
//     marginTop: 12,
//   },
//   option: {
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 6,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 8,
//     padding: 10,
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   submitButton: {
//     backgroundColor: "#d32f2f",
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });






import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

const reasons = {
  fake_account: [
    "Tài khoản giả mạo tôi",
    "Tài khoản giả mạo bạn của tôi",
    "Tài khoản giả mạo người nổi tiếng",
  ],
  harassment: [
    "Ngôn từ thù ghét",
    "Tin nhắn không mong muốn",
    "Quấy rối ngoài đời thực",
  ],
  scam: ["Lừa đảo tình cảm", "Yêu cầu gửi tiền"],
};

const reasonLabels = {
  fake_account: "Giả mạo tài khoản",
  harassment: "Quấy rối",
  scam: "Lừa đảo",
};

export default function ReportUser() {
  const router = useRouter();
  const { reporterId, reportedId } = useLocalSearchParams();
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [detailDescription, setDetailDescription] = useState("");

  const showToast = (type, text1, text2 = "") => {
    Toast.show({
      type,
      text1,
      text2,
      position: "top",
      visibilityTime: 3000,
    });
  };

  const handleSubmit = async () => {
    if (!selectedReason || !selectedDescription) {
      showToast("error", "Thiếu thông tin", "Hãy chọn đầy đủ lý do và tình huống.");
      return;
    }

    try {
      await axios.post("http://10.0.2.2:8000/reports/account", {
        reporter_id: parseInt(reporterId),
        reported_id: parseInt(reportedId),
        reason: reasonLabels[selectedReason],
        description: selectedDescription,
        detail_description: detailDescription || null,
      });

      showToast("success", "Thành công", "Đã gửi báo cáo.");
      router.back();
    } catch (error) {
      console.error("Lỗi gửi báo cáo:", error.response?.data || error.message);
      showToast("error", "Lỗi", "Gửi báo cáo thất bại.");
    }
  };

  return (
    <>
      {/* Ẩn header để không bị chừa khoảng trên cùng */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Báo cáo người dùng</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.subtitle}>Chọn lý do:</Text>
          {Object.keys(reasons).map((reason) => (
            <TouchableOpacity
              key={reason}
              style={[
                styles.option,
                selectedReason === reason && styles.selectedOption,
              ]}
              onPress={() => {
                setSelectedReason(reason);
                setSelectedDescription("");
              }}
            >
              <Text>{reasonLabels[reason]}</Text>
            </TouchableOpacity>
          ))}

          {selectedReason !== "" && (
            <>
              <Text style={styles.subtitle}>Chọn tình huống:</Text>
              {reasons[selectedReason].map((desc) => (
                <TouchableOpacity
                  key={desc}
                  style={[
                    styles.option,
                    selectedDescription === desc && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedDescription(desc)}
                >
                  <Text>{desc}</Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.subtitle}>Mô tả chi tiết (tùy chọn):</Text>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Bạn có thể nhập thêm chi tiết về vấn đề..."
                value={detailDescription}
                onChangeText={setDetailDescription}
              />
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Gửi báo cáo</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  backButton: {
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  subtitle: {
    fontWeight: "600",
    marginTop: 12,
  },
  option: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 6,
  },
  selectedOption: {
    backgroundColor: "#c8e6c9",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
