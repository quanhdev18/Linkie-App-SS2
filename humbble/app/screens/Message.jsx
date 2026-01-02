// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ToastAndroid,
// } from "react-native";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FontAwesome, Feather } from "@expo/vector-icons";
// import { useLocalSearchParams, Stack } from "expo-router";
// // import defaultAvatar from "../../../assets/images/image.png";
// import defaultAvatar from "../../assets/images/image.png";
// import * as Clipboard from "expo-clipboard";
// import { router } from "expo-router";

// export default function ChatScreen() {
//   const { userId, toUserId, toUsername, toAvatarUrl } = useLocalSearchParams();

//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState("");
//   const scrollRef = useRef(null);
//   const API_BASE_URL = "http://10.0.2.2:8000";

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/messages/history`, {
//           params: {
//             user1_id: parseInt(userId),
//             user2_id: parseInt(toUserId),
//           },
//         });
//         setMessages(res.data);
//       } catch (err) {
//         console.error("❌ Lỗi khi lấy lịch sử:", err);
//       }
//     };

//     fetchHistory();
//   }, [userId, toUserId]);

//   useEffect(() => {
//     const ws = new WebSocket(
//       `${API_BASE_URL.replace("http", "ws")}/ws/chat/${userId}`
//     );

//     ws.onopen = () => {
//       console.log("✅ WebSocket đã kết nối");
//       setSocket(ws);
//     };

//     ws.onmessage = (event) => {
//       try {
//         const msg = JSON.parse(event.data);
//         setMessages((prev) => [...prev, msg]);
//       } catch (error) {
//         console.error("❌ Lỗi khi nhận WebSocket:", error);
//       }
//     };

//     ws.onerror = (err) => {
//       console.error("❌ WebSocket error:", err.message);
//     };

//     return () => ws.close();
//   }, [userId]);

//   const sendMessage = () => {
//     if (!socket || socket.readyState !== 1 || !content.trim()) {
//       console.warn("⚠️ Socket chưa sẵn sàng hoặc nội dung rỗng");
//       return;
//     }

//     const message = {
//       from_user_id: parseInt(userId),
//       to_user_id: parseInt(toUserId),
//       content: content,
//     };

//     socket.send(JSON.stringify(message));
//     setMessages((prev) => [...prev, message]);
//     setContent("");
//   };

//   const handleLongPress = (item) => {
//     Alert.alert("Tin nhắn", "Chọn hành động", [
//       {
//         text: "Sao chép",
//         onPress: () => {
//           Clipboard.setStringAsync(item.content);
//           ToastAndroid.show("Đã sao chép!", ToastAndroid.SHORT);
//         },
//       },
//       {
//         text: "Trả lời",
//         onPress: () => {
//           setContent(`@${item.content} `);
//         },
//       },
//       { text: "Hủy", style: "cancel" },
//     ]);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onLongPress={() => handleLongPress(item)}
//       activeOpacity={0.7}
//     >
//       <View
//         style={[
//           styles.message,
//           item.from_user_id == userId ? styles.myMessage : styles.theirMessage,
//         ]}
//       >
//         <Text style={styles.messageText}>{item.content}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
//       {/* Ẩn header mặc định của expo-router */}
//       <Stack.Screen options={{ headerShown: false }} />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.select({ ios: "padding", android: undefined })}
//       >
//         {/* Header tự custom */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backButton}
//           >
//             <FontAwesome name="chevron-left" size={20} color="black" />
//           </TouchableOpacity>

//           <View style={styles.userInfo}>
//             <Image
//               source={toAvatarUrl ? { uri: toAvatarUrl } : defaultAvatar}
//               style={styles.avatar}
//             />
//             <Text style={styles.username}>{toUsername || "User"}</Text>
//           </View>
          
//           <View style={styles.icons}>
//             <TouchableOpacity
//               onPress={() =>
//                 router.push({
//                   pathname: "/(calls)/VoiceCall",
//                   params: { userId, toUserId, toUsername },
//                 })
//               }
//             >
//               <Feather name="phone" size={24} color="black" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() =>
//                 router.push({
//                   pathname: "/(calls)/VideoCall",
//                   params: { userId, toUserId, toUsername },
//                 })
//               }
//             >
//               <Feather name="video" size={24} color="black" />
//             </TouchableOpacity>

//             <Feather
//               name="more-horizontal"
//               size={20}
//               color="black"
//               style={styles.iconSpacing}
//             />
//           </View>
//         </View>

//         {/* Danh sách tin nhắn */}
//         <FlatList
//           ref={scrollRef}
//           data={messages}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           onContentSizeChange={() =>
//             scrollRef.current?.scrollToEnd({ animated: true })
//           }
//           contentContainerStyle={styles.messageContainer}
//         />

//         {/* Ô nhập tin nhắn */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={content}
//             onChangeText={setContent}
//             placeholder="Nhập tin nhắn..."
//             onSubmitEditing={sendMessage}
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//             <Feather name="send" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
//   messageContainer: { padding: 10 },
//   message: {
//     marginVertical: 4,
//     padding: 10,
//     borderRadius: 8,
//     maxWidth: "80%",
//   },
//   myMessage: { alignSelf: "flex-end", backgroundColor: "#4caf50" },
//   theirMessage: { alignSelf: "flex-start", backgroundColor: "#e0e0e0" },
//   messageText: { color: "#000" },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   backButton: { position: "absolute", left: 10, top: 21, zIndex: 10 },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginLeft: 29,
//   },
//   avatar: { width: 40, height: 40, borderRadius: 18, marginRight: 8 },
//   username: { fontWeight: "bold", fontSize: 20 },
//   icons: { flexDirection: "row", gap: 15 },
//   iconSpacing: { marginRight: 5, alignSelf: "center" },
//   sendButton: { padding: 8, justifyContent: "center", alignItems: "center" },
// });
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

// 1. Import các hàm API mới
import { getMessageHistory, createChatSocket } from "../../services/api"; 
import defaultAvatar from "../../assets/images/image.png";

export default function ChatScreen() {
  const { userId, toUserId, toUsername, toAvatarUrl } = useLocalSearchParams();
  const router = useRouter();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const scrollRef = useRef(null);

  // 2. Sử dụng hàm getMessageHistory
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getMessageHistory(parseInt(userId), parseInt(toUserId));
      setMessages(history);
    };

    if (userId && toUserId) {
        fetchHistory();
    }
  }, [userId, toUserId]);

  // 3. Sử dụng hàm createChatSocket
  useEffect(() => {
    if (!userId) return;

    const ws = createChatSocket(userId);
    if (!ws) return;

    ws.onopen = () => {
      console.log("✅ WebSocket đã kết nối");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        // Chỉ nhận tin nhắn từ người đang chat cùng
        if (msg.from_user_id == toUserId) {
            setMessages((prev) => [...prev, msg]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi nhận WebSocket:", error);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err.message);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userId, toUserId]); // Thêm toUserId để đảm bảo logic onmessage được cập nhật đúng

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !content.trim()) {
      console.warn("⚠️ Socket chưa sẵn sàng hoặc nội dung rỗng");
      return;
    }

    const message = {
      from_user_id: parseInt(userId),
      to_user_id: parseInt(toUserId),
      content: content,
      // Thêm timestamp để sắp xếp và hiển thị nếu cần
      created_at: new Date().toISOString(), 
    };

    socket.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setContent("");
  };

  const handleLongPress = (item) => {
    Alert.alert("Tùy chọn", null, [
      {
        text: "Sao chép",
        onPress: async () => {
          await Clipboard.setStringAsync(item.content);
          ToastAndroid.show("Đã sao chép!", ToastAndroid.SHORT);
        },
      },
      {
        text: "Trả lời",
        onPress: () => {
          setContent(`> ${item.content}\n`);
        },
      },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.message,
          item.from_user_id == userId ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.userInfo}>
                <Image
                    source={toAvatarUrl ? { uri: toAvatarUrl } : defaultAvatar}
                    style={styles.avatar}
                />
                <Text style={styles.username}>{toUsername || "User"}</Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity
                    onPress={() =>
                    router.push({
                        pathname: "/(calls)/VoiceCall",
                        params: { userId, toUserId, toUsername },
                    })
                    }
                >
                    <Feather name="phone" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                    router.push({
                        pathname: "/(calls)/VideoCall",
                        params: { userId, toUserId, toUsername },
                    })
                    }
                >
                    <Feather name="video" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

        <FlatList
          ref={scrollRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="Nhập tin nhắn..."
            onSubmitEditing={sendMessage}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Feather name="send" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ... (Styles không thay đổi)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#f0f0f0",
    },
    backButton: {
      padding: 5,
    },
    userInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      marginLeft: -20, // Bù lại cho nút back
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    username: {
      fontWeight: "bold",
      fontSize: 18,
    },
    headerIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    messageList: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    message: {
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      maxWidth: "80%",
    },
    myMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#007AFF",
    },
    theirMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#E5E5EA",
    },
    messageText: {
      fontSize: 16,
      color: "#000",
    },
    inputContainer: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderColor: "#f0f0f0",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    input: {
      flex: 1,
      backgroundColor: "#f0f0f0",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      marginRight: 10,
    },
    sendButton: {
      padding: 5,
    },
  });
