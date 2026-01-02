// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import Header from "@/components/Header";
// import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
// import Avatar from "@/components/Avatar";
// import { useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { fetchMatches, getAvatarImage } from "../../../services/api";
// import defaultAvatar from "../../../assets/images/image.png";

// const Chats = () => {
//   const router = useRouter();
//   const button = () => <AntDesign name="search1" size={24} color="black" />;
//   const [loading, setLoading] = useState(true);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [matches, setMatches] = useState<any[]>([]);
//   const [conversations, setConversations] = useState<any[]>([]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const loadData = async () => {
//         setLoading(true);
//         try {
//           const storedId = await AsyncStorage.getItem("account_id");
//           if (storedId) {
//             const parsedId = parseInt(storedId, 10);
//             setAccountId(parsedId);

//             const [matchRes, convRes] = await Promise.all([
//               fetchMatches(parsedId),
//               axios.get(`http://10.0.2.2:8000/messages/conversations/${parsedId}`),
//             ]);

//             setMatches(matchRes);
//             setConversations(convRes.data);
//           }
//         } catch (error) {
//           console.error("Lỗi khi load dữ liệu:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadData();
//       return () => { };
//     }, [])
//   );

//   const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
//     if (!toUserId || !accountId) return;

//     const avatarUrl = avatarObj
//       ? getAvatarImage(avatarObj.title || avatarObj)
//       : null;

//     router.push({
//       pathname: "/Screen/Message",
//       params: {
//         userId: accountId,
//         toUserId,
//         toUsername,
//         toAvatarUrl: avatarUrl,
//       },
//     });
//   };

//   const handleReport = (reportedUserId: number) => {
//     if (!accountId || !reportedUserId) return;

//     router.push({
//       pathname: "/(chats)/ReportUser",
//       params: {
//         reporterId: accountId.toString(),
//         reportedId: reportedUserId.toString(),
//       },
//     });
//   };

//   return (
//     <ScrollView style={{ paddingHorizontal: 18 }}>
//       <View style={{ gap: 10 }}>
//         <Header headerTitle={"Tin nhắn"} button={button} />

//         {/* --- Tương tác mới --- */}
//         <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 10 }}>
//           Tương tác mới
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{ marginVertical: 10 }}
//         >
//           {matches
//             .filter(
//               (matchUser) =>
//                 !conversations.some((conv) => conv.partner_id === matchUser.id)
//             )
//             .map((user, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={{ alignItems: "center", marginRight: 12 }}
//                 onPress={() =>
//                   goToChat(
//                     user.id,
//                     user.username || "Người dùng",
//                     user.avatar || null
//                   )
//                 }
//               >
//                 <Avatar
//                   size={80}
//                   image={
//                     user.avatar
//                       ? getAvatarImage(user.avatar.title || user.avatar)
//                       : defaultAvatar
//                   }
//                 />
//                 <Text style={{ marginTop: 5 }}>
//                   {user.username || "Chưa đặt tên"}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//         </ScrollView>

//         {/* --- Danh sách tin nhắn --- */}
//         <View style={styles.headerSection}>
//           <Text style={styles.logo}>Tin nhắn</Text>
//           <MaterialCommunityIcons name="sort-variant" size={24} color="black" />
//         </View>

//         {conversations.length === 0 ? (
//           <Text style={{ color: "gray", fontStyle: "italic", textAlign: "center" }}>
//             Tin nhắn của bạn sẽ hiển thị tại đây sau khi có cuộc trò chuyện đầu
//             tiên.
//           </Text>
//         ) : (

//           conversations.map((conv) => (
//             <TouchableOpacity
//               key={conv.partner_id}
//               style={styles.messageItem}
//               onPress={() =>
//                 goToChat(conv.partner_id, conv.partner_name, conv.partner_avatar)
//               }
//             >
//               <Avatar
//                 size={60}
//                 image={
//                   conv.partner_avatar
//                     ? getAvatarImage(conv.partner_avatar.title || conv.partner_avatar)
//                     : defaultAvatar
//                 }
//               />
//               <View style={{ marginLeft: 12, flex: 1 }}>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                   <Text style={{ fontWeight: "600", fontSize: 16 }}>
//                     {conv.partner_name}
//                   </Text>
//                   {conv.last_sender_id !== accountId && conv.last_message && (
//                     // <Text style={{ color: "#ff3366", fontSize: 13 }}>Đến lượt bạn</Text>
//                     <View
//                       style={{
//                         backgroundColor: "#FFD700", // vàng
//                         paddingVertical: 4,
//                         paddingHorizontal: 8,
//                         borderRadius: 8,
//                         alignSelf: "flex-end",
//                       }}
//                     >
//                       <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
//                         Đến lượt bạn
//                       </Text>
//                     </View>

//                   )}
//                 </View>

//                 <Text numberOfLines={1} style={{ color: "gray" }}>
//                   {conv.last_message}
//                 </Text>

//                 <Text style={{ fontSize: 12, color: "#999" }}>
//                   {new Date(conv.last_time).toLocaleString()}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))


//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Chats;

// const styles = StyleSheet.create({
//   headerSection: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingVertical: 8,
//     marginBottom: 6,
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: "bold",
//     letterSpacing: 1,
//     color: "#1a1a1a",
//   },
//   messageItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
// });
// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import Header from "@/components/Header";
// import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
// import Avatar from "@/components/Avatar";
// import { useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { fetchMatches, getAvatarImage } from "../../../services/api";
// import defaultAvatar from "../../../assets/images/image.png";
// import { Swipeable } from "react-native-gesture-handler";

// const Chats = () => {
//   const router = useRouter();
//   const button = () => <AntDesign name="search1" size={24} color="black" />;
//   const [loading, setLoading] = useState(true);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [matches, setMatches] = useState<any[]>([]);
//   const [conversations, setConversations] = useState<any[]>([]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const loadData = async () => {
//         setLoading(true);
//         try {
//           const storedId = await AsyncStorage.getItem("account_id");
//           if (storedId) {
//             const parsedId = parseInt(storedId, 10);
//             setAccountId(parsedId);

//             const [matchRes, convRes] = await Promise.all([
//               fetchMatches(parsedId),
//               axios.get(`http://10.0.2.2:8000/messages/conversations/${parsedId}`),
//             ]);

//             setMatches(matchRes);
//             setConversations(convRes.data);
//           }
//         } catch (error) {
//           console.error("Lỗi khi load dữ liệu:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadData();
//       return () => {};
//     }, [])
//   );

//   const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
//     if (!toUserId || !accountId) return;

//     const avatarUrl = avatarObj
//       ? getAvatarImage(avatarObj.title || avatarObj)
//       : null;

//     router.push({
//       pathname: "/Screen/Message",
//       params: {
//         userId: accountId,
//         toUserId,
//         toUsername,
//         toAvatarUrl: avatarUrl,
//       },
//     });
//   };

//   const handleReport = (reportedUserId: number) => {
//     if (!accountId || !reportedUserId) return;

//     router.push({
//       pathname: "/(chats)/ReportUser",
//       params: {
//         reporterId: accountId.toString(),
//         reportedId: reportedUserId.toString(),
//       },
//     });
//   };

//   // 🧱 Hàm xóa hội thoại
//   const handleUnmatch = async (partnerId: number) => {
//     try {
//       await axios.delete(
//         `http://10.0.2.2:8000/conversations/${partnerId}?account_id=${accountId}`
//       );
//       setConversations((prev) =>
//         prev.filter((conv) => conv.partner_id !== partnerId)
//       );
//     } catch (err) {
//       console.error("Lỗi khi xóa hội thoại:", err);
//     }
//   };

//   // ⚙️ Hàm tạo hành động vuốt
//   const renderRightActions = (onUnmatch: () => void, onReport: () => void) => (
//     <View style={{ flexDirection: "row" }}>
//       <TouchableOpacity
//         onPress={onUnmatch}
//         style={[styles.swipeButton, { backgroundColor: "#757575" }]}
//       >
//         <Text style={styles.swipeButtonText}>Xóa</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={onReport}
//         style={[styles.swipeButton, { backgroundColor: "#d32f2f" }]}
//       >
//         <Text style={styles.swipeButtonText}>Báo cáo</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ScrollView style={{ paddingHorizontal: 18 }}>
//       <View style={{ gap: 10 }}>
//         <Header headerTitle={"Tin nhắn"} button={button} />

//         {/* --- Tương tác mới --- */}
//         <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 10 }}>
//           Tương tác mới
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{ marginVertical: 10 }}
//         >
//           {matches
//             .filter(
//               (matchUser) =>
//                 !conversations.some((conv) => conv.partner_id === matchUser.id)
//             )
//             .map((user, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={{ alignItems: "center", marginRight: 12 }}
//                 onPress={() =>
//                   goToChat(
//                     user.id,
//                     user.username || "Người dùng",
//                     user.avatar || null
//                   )
//                 }
//               >
//                 <Avatar
//                   size={80}
//                   image={
//                     user.avatar
//                       ? getAvatarImage(user.avatar.title || user.avatar)
//                       : defaultAvatar
//                   }
//                 />
//                 <Text style={{ marginTop: 5 }}>
//                   {user.username || "Chưa đặt tên"}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//         </ScrollView>

//         {/* --- Danh sách tin nhắn --- */}
//         <View style={styles.headerSection}>
//           <Text style={styles.logo}>Tin nhắn</Text>
//           <MaterialCommunityIcons name="sort-variant" size={24} color="black" />
//         </View>

//         {conversations.length === 0 ? (
//           <Text
//             style={{
//               color: "gray",
//               fontStyle: "italic",
//               textAlign: "center",
//             }}
//           >
//             Tin nhắn của bạn sẽ hiển thị tại đây sau khi có cuộc trò chuyện đầu
//             tiên.
//           </Text>
//         ) : (
//           conversations.map((conv) => (
//             <Swipeable
//               key={conv.partner_id}
//               renderRightActions={() =>
//                 renderRightActions(
//                   () => handleUnmatch(conv.partner_id),
//                   () => handleReport(conv.partner_id)
//                 )
//               }
//             >
//               <TouchableOpacity
//                 style={styles.messageItem}
//                 onPress={() =>
//                   goToChat(
//                     conv.partner_id,
//                     conv.partner_name,
//                     conv.partner_avatar
//                   )
//                 }
//               >
//                 <Avatar
//                   size={60}
//                   image={
//                     conv.partner_avatar
//                       ? getAvatarImage(
//                           conv.partner_avatar.title || conv.partner_avatar
//                         )
//                       : defaultAvatar
//                   }
//                 />
//                 <View style={{ marginLeft: 12, flex: 1 }}>
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Text style={{ fontWeight: "600", fontSize: 16 }}>
//                       {conv.partner_name}
//                     </Text>
//                     {conv.last_sender_id !== accountId && conv.last_message && (
//                       <View
//                         style={{
//                           backgroundColor: "#FFD700",
//                           paddingVertical: 4,
//                           paddingHorizontal: 8,
//                           borderRadius: 8,
//                           alignSelf: "flex-end",
//                         }}
//                       >
//                         <Text
//                           style={{
//                             color: "white",
//                             fontWeight: "600",
//                             fontSize: 12,
//                           }}
//                         >
//                           Đến lượt bạn
//                         </Text>
//                       </View>
//                     )}
//                   </View>

//                   <Text numberOfLines={1} style={{ color: "gray" }}>
//                     {conv.last_message}
//                   </Text>

//                   <Text style={{ fontSize: 12, color: "#999" }}>
//                     {new Date(conv.last_time).toLocaleString()}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </Swipeable>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Chats;

// const styles = StyleSheet.create({
//   headerSection: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingVertical: 8,
//     marginBottom: 6,
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: "bold",
//     letterSpacing: 1,
//     color: "#1a1a1a",
//   },
//   messageItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     backgroundColor: "#fff",
//   },
//   swipeButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 90,
//     height: "100%",
//   },
//   swipeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });





// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   useColorScheme,
// } from "react-native";
// import React, { useState } from "react";
// import Header from "@/components/Header";
// import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
// import Avatar from "@/components/Avatar";
// import { useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { fetchMatches, getAvatarImage } from "../../../services/api";
// import defaultAvatar from "../../../assets/images/image.png";
// import { Swipeable } from "react-native-gesture-handler";
// import { Colors } from "@/constants/Colors";

// const Chats = () => {
//   const router = useRouter();
//   const colorScheme = useColorScheme();
//   const themeColors = Colors[colorScheme ?? "light"];

//   const button = () => (
//     <AntDesign name="search1" size={24} color={themeColors.text} />
//   );

//   const [loading, setLoading] = useState(true);
//   const [accountId, setAccountId] = useState<number | null>(null);
//   const [matches, setMatches] = useState<any[]>([]);
//   const [conversations, setConversations] = useState<any[]>([]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const loadData = async () => {
//         setLoading(true);
//         try {
//           const storedId = await AsyncStorage.getItem("account_id");
//           if (storedId) {
//             const parsedId = parseInt(storedId, 10);
//             setAccountId(parsedId);

//             const [matchRes, convRes] = await Promise.all([
//               fetchMatches(parsedId),
//               axios.get(`http://10.0.2.2:8000/messages/conversations/${parsedId}`),
//             ]);

//             setMatches(matchRes);
//             setConversations(convRes.data);
//           }
//         } catch (error) {
//           console.error("Lỗi khi load dữ liệu:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadData();
//       return () => {};
//     }, [])
//   );

//   const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
//     if (!toUserId || !accountId) return;

//     const avatarUrl = avatarObj
//       ? getAvatarImage(avatarObj.title || avatarObj)
//       : null;

//     router.push({
//       pathname: "/Screen/Message",
//       params: {
//         userId: accountId,
//         toUserId,
//         toUsername,
//         toAvatarUrl: avatarUrl,
//       },
//     });
//   };

//   const handleReport = (reportedUserId: number) => {
//     if (!accountId || !reportedUserId) return;

//     router.push({
//       pathname: "/(chats)/ReportUser",
//       params: {
//         reporterId: accountId.toString(),
//         reportedId: reportedUserId.toString(),
//       },
//     });
//   };

//   // 🧱 Xóa hội thoại
//   const handleUnmatch = async (partnerId: number) => {
//     try {
//       await axios.delete(
//         `http://10.0.2.2:8000/conversations/${partnerId}?account_id=${accountId}`
//       );
//       setConversations((prev) =>
//         prev.filter((conv) => conv.partner_id !== partnerId)
//       );
//     } catch (err) {
//       console.error("Lỗi khi xóa hội thoại:", err);
//     }
//   };

//   // ⚙️ Hành động vuốt phải
//   const renderRightActions = (onUnmatch: () => void, onReport: () => void) => (
//     <View style={{ flexDirection: "row" }}>
//       <TouchableOpacity
//         onPress={onUnmatch}
//         style={[styles.swipeButton, { backgroundColor: themeColors.gray }]}
//       >
//         <Text style={styles.swipeButtonText}>Xóa</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={onReport}
//         style={[styles.swipeButton, { backgroundColor: themeColors.danger }]}
//       >
//         <Text style={styles.swipeButtonText}>Báo cáo</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ScrollView
//       style={{
//         flex: 1,
//         paddingHorizontal: 18,
//         backgroundColor: themeColors.background,
//       }}
//     >
//       <View style={{ gap: 10 }}>
//         <Header headerTitle={"Tin nhắn"} button={button} />

//         {/* --- Tương tác mới --- */}
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: "700",
//             marginTop: 10,
//             color: themeColors.text,
//           }}
//         >
//           Tương tác mới
//         </Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{ marginVertical: 10 }}
//         >
//           {matches
//             .filter(
//               (matchUser) =>
//                 !conversations.some((conv) => conv.partner_id === matchUser.id)
//             )
//             .map((user, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={{ alignItems: "center", marginRight: 12 }}
//                 onPress={() =>
//                   goToChat(
//                     user.id,
//                     user.username || "Người dùng",
//                     user.avatar || null
//                   )
//                 }
//               >
//                 <Avatar
//                   size={80}
//                   image={
//                     user.avatar
//                       ? getAvatarImage(user.avatar.title || user.avatar)
//                       : defaultAvatar
//                   }
//                 />
//                 <Text style={{ marginTop: 5, color: themeColors.text }}>
//                   {user.username || "Chưa đặt tên"}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//         </ScrollView>

//         {/* --- Danh sách tin nhắn --- */}
//         <View style={styles.headerSection}>
//           <Text style={[styles.logo, { color: themeColors.text }]}>
//             Tin nhắn
//           </Text>
//           <MaterialCommunityIcons
//             name="sort-variant"
//             size={24}
//             color={themeColors.text}
//           />
//         </View>

//         {conversations.length === 0 ? (
//           <Text
//             style={{
//               color: themeColors.mutedText,
//               fontStyle: "italic",
//               textAlign: "center",
//             }}
//           >
//             Tin nhắn của bạn sẽ hiển thị tại đây sau khi có cuộc trò chuyện đầu
//             tiên.
//           </Text>
//         ) : (
//           conversations.map((conv) => (
//             <Swipeable
//               key={conv.partner_id}
//               renderRightActions={() =>
//                 renderRightActions(
//                   () => handleUnmatch(conv.partner_id),
//                   () => handleReport(conv.partner_id)
//                 )
//               }
//             >
//               <TouchableOpacity
//                 style={[
//                   styles.messageItem,
//                   { backgroundColor: themeColors.card },
//                 ]}
//                 onPress={() =>
//                   goToChat(
//                     conv.partner_id,
//                     conv.partner_name,
//                     conv.partner_avatar
//                   )
//                 }
//               >
//                 <Avatar
//                   size={60}
//                   image={
//                     conv.partner_avatar
//                       ? getAvatarImage(
//                           conv.partner_avatar.title || conv.partner_avatar
//                         )
//                       : defaultAvatar
//                   }
//                 />
//                 <View style={{ marginLeft: 12, flex: 1 }}>
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontWeight: "600",
//                         fontSize: 16,
//                         color: themeColors.text,
//                       }}
//                     >
//                       {conv.partner_name}
//                     </Text>
//                     {conv.last_sender_id !== accountId && conv.last_message && (
//                       <View
//                         style={{
//                           backgroundColor: themeColors.tint,
//                           paddingVertical: 4,
//                           paddingHorizontal: 8,
//                           borderRadius: 8,
//                         }}
//                       >
//                         <Text
//                           style={{
//                             color: "#fff",
//                             fontWeight: "600",
//                             fontSize: 12,
//                           }}
//                         >
//                           Đến lượt bạn
//                         </Text>
//                       </View>
//                     )}
//                   </View>

//                   <Text numberOfLines={1} style={{ color: themeColors.mutedText }}>
//                     {conv.last_message}
//                   </Text>

//                   <Text style={{ fontSize: 12, color: themeColors.mutedText }}>
//                     {new Date(conv.last_time).toLocaleString()}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </Swipeable>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Chats;

// const styles = StyleSheet.create({
//   headerSection: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingVertical: 8,
//     marginBottom: 6,
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   messageItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   swipeButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 90,
//     height: "100%",
//   },
//   swipeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });




import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { fetchMatches, getAvatarImage, fetchConversations, unmatchConversation } from "../../../services/api";
import defaultAvatar from "../../../assets/images/image.png";
import { Swipeable } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

const Chats = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  // State
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchAnim = useRef(new Animated.Value(0)).current; // animation

  // Toggle hiển thị thanh tìm kiếm
  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  // Hiệu ứng trượt xuống
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [searchVisible]);

  const button = () => (
    <AntDesign
      name="search1"
      size={24}
      color={themeColors.text}
      onPress={toggleSearch}
    />
  );

  // --- Load dữ liệu ---
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const storedId = await AsyncStorage.getItem("account_id");
          if (storedId) {
            const parsedId = parseInt(storedId, 10);
            setAccountId(parsedId);

            // 👇 Sửa lại đoạn này
            const [matchRes, conversationsData] = await Promise.all([
              fetchMatches(parsedId),
              fetchConversations(parsedId), // Gọi hàm mới
            ]);

            setMatches(matchRes);
            setConversations(conversationsData); // Không cần .data nữa
          }
        } catch (error) {
          console.error("Lỗi khi load dữ liệu:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
      // ...
      return () => { };
    }, [])
  );

  const goToChat = (toUserId: number, toUsername: string, avatarObj: any) => {
    if (!toUserId || !accountId) return;
    setSearchVisible(false); // ✅ đóng search khi mở chat
    const avatarUrl = avatarObj
      ? getAvatarImage(avatarObj.title || avatarObj)
      : null;
    router.push({
      pathname: "/Screen/Message",
      params: {
        userId: accountId,
        toUserId,
        toUsername,
        toAvatarUrl: avatarUrl,
      },
    });
  };


  const handleReport = (reportedUserId: number) => {
    if (!accountId || !reportedUserId) return;
    router.push({
      pathname: "/(chats)/ReportUser",
      params: {
        reporterId: accountId.toString(),
        reportedId: reportedUserId.toString(),
        from: "chats",
      },
    });
  };

  const handleUnmatch = async (partnerId: number) => {
    if (!accountId) return; // Thêm kiểm tra cho chắc chắn

    try {
      // 👇 Sửa lại đoạn này
      // await unmatchConversation(partnerId, accountId); 
      await unmatchConversation(accountId, partnerId); // ✅ đúng


      setConversations((prev) =>
        prev.filter((conv) => conv.partner_id !== partnerId)
      );
    } catch (err) {
      console.error("Lỗi khi xóa hội thoại:", err);
    }
  };

  const renderRightActions = (onUnmatch: () => void, onReport: () => void) => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onUnmatch}
        style={[styles.swipeButton, { backgroundColor: themeColors.gray }]}
      >
        <Text style={styles.swipeButtonText}>Xóa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onReport}
        style={[styles.swipeButton, { backgroundColor: themeColors.danger }]}
      >
        <Text style={styles.swipeButtonText}>Báo cáo</Text>
      </TouchableOpacity>
    </View>
  );

  // Lọc theo tên
  const filteredConversations = conversations.filter((conv) =>
    conv.partner_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: themeColors.background,
      }}
    >
      <View style={{ gap: 10 }}>
        <Header headerTitle={"Tin nhắn"} button={button} />

        {/* 🔍 Thanh tìm kiếm (ẩn/hiện bằng animation) */}
        <Animated.View
          style={{
            overflow: "hidden",
            height: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50],
            }),
            marginBottom: searchVisible ? 10 : 0,
          }}
        >
          <View
            style={{
              backgroundColor: themeColors.card,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              height: 50,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <AntDesign
              name="search1"
              size={20}
              color={themeColors.mutedText}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Tìm kiếm theo tên..."
              placeholderTextColor={themeColors.mutedText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, color: themeColors.text, fontSize: 16 }}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <AntDesign
                  name="closecircle"
                  size={18}
                  color={themeColors.gray}
                />
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* --- Tương tác mới --- */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginTop: 10,
            color: themeColors.text,
          }}
        >
          Tương tác mới
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {matches
            .filter(
              (matchUser) =>
                !conversations.some((conv) => conv.partner_id === matchUser.id)
            )
            .map((user, index) => (
              <TouchableOpacity
                key={index}
                style={{ alignItems: "center", marginRight: 12 }}
                onPress={() =>
                  goToChat(
                    user.id,
                    user.username || "Người dùng",
                    user.avatar || null
                  )
                }
              >
                <Avatar
                  size={70}
                  image={
                    user.avatar
                      ? getAvatarImage(user.avatar.title || user.avatar)
                      : defaultAvatar
                  }
                />
                <Text style={{ marginTop: 5, color: themeColors.text }}>
                  {user.username || "Chưa đặt tên"}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* --- Danh sách tin nhắn --- */}
        <View style={styles.headerSection}>
          <Text style={[styles.logo, { color: themeColors.text }]}>
            Tin nhắn
          </Text>
          <MaterialCommunityIcons
            name="sort-variant"
            size={24}
            color={themeColors.text}
          />
        </View>

        {filteredConversations.length === 0 ? (
          <Text
            style={{
              color: themeColors.mutedText,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {searchQuery
              ? "Không tìm thấy hội thoại nào khớp."
              : "Tin nhắn của bạn sẽ hiển thị tại đây sau khi có cuộc trò chuyện đầu tiên."}
          </Text>
        ) : (
          filteredConversations.map((conv) => (
            <Swipeable
              key={conv.partner_id}
              renderRightActions={() =>
                renderRightActions(
                  () => handleUnmatch(conv.partner_id),
                  () => handleReport(conv.partner_id)
                )
              }
            >
              <TouchableOpacity
                style={[
                  styles.messageItem,
                  { backgroundColor: themeColors.card },
                ]}
                onPress={() =>
                  goToChat(
                    conv.partner_id,
                    conv.partner_name,
                    conv.partner_avatar
                  )
                }
              >
                <Avatar
                  size={70}
                  image={
                    conv.partner_avatar
                      ? getAvatarImage(
                        conv.partner_avatar.title || conv.partner_avatar
                      )
                      : defaultAvatar
                  }
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 16,
                        color: themeColors.text,
                      }}
                    >
                      {conv.partner_name}
                    </Text>
                    {conv.last_sender_id !== accountId && conv.last_message && (
                      <View
                        style={{
                          backgroundColor: themeColors.tint,
                          paddingVertical: 4,
                          paddingHorizontal: 8,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: 12,
                          }}
                        >
                          Đến lượt bạn
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text numberOfLines={1} style={{ color: themeColors.mutedText }}>
                    {conv.last_message}
                  </Text>

                  <Text style={{ fontSize: 12, color: themeColors.mutedText }}>
                    {new Date(conv.last_time).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  headerSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 6,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  swipeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: "100%",
  },
  swipeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
