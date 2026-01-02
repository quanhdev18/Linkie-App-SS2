// // VoiceCallScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import RtcEngine, { ChannelProfile, ClientRole } from "react-native-agora";

// const APP_ID = "44242130d5634981affc223fc65f126b"; // Thay bằng AppID trong Agora console
// const TOKEN = null; // Có thể dùng token hoặc để null nếu bật "App Certificate = Disabled"
// const CHANNEL_NAME = "Linkie";

// export default function VoiceCallScreen({ navigation }) {
//   const [engine, setEngine] = useState(null);
//   const [joined, setJoined] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       const rtcEngine = await RtcEngine.create(APP_ID);
//       setEngine(rtcEngine);

//       await rtcEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
//       await rtcEngine.setClientRole(ClientRole.Broadcaster);

//       rtcEngine.addListener("JoinChannelSuccess", () => {
//         setJoined(true);
//         console.log("✅ Voice: joined channel");
//       });

//       rtcEngine.addListener("UserJoined", (uid) => {
//         console.log("👤 Voice: user joined", uid);
//       });

//       rtcEngine.addListener("UserOffline", (uid) => {
//         console.log("👋 Voice: user offline", uid);
//       });

//       await rtcEngine.joinChannel(TOKEN, CHANNEL_NAME, null, 0);
//     };

//     init();

//     return () => {
//       if (engine) {
//         engine.leaveChannel();
//         engine.destroy();
//       }
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>{joined ? "Đang gọi thoại..." : "Đang kết nối..."}</Text>
//       <Button title="Kết thúc" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   text: { fontSize: 20, marginBottom: 20 },
// });

// import React from "react";
// import { View } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import {
//   ZegoUIKitPrebuiltCall,
//   ONE_ON_ONE_VOICE_CALL_CONFIG,
// } from "@zegocloud/zego-uikit-prebuilt-call-rn";
// import { ZEGO_APP_ID, ZEGO_APP_SIGN } from "@/constants/zego";

// export default function VoiceCall() {
//   const router = useRouter();
//   const { roomId, toUserId, toUsername } = useLocalSearchParams();

//   const userId = String(Math.floor(Math.random() * 100000)); // hoặc userId thật
//   const userName = "You";

//   return (
//     <View style={{ flex: 1 }}>
//       <ZegoUIKitPrebuiltCall
//         appID={ZEGO_APP_ID}
//         appSign={ZEGO_APP_SIGN}
//         userID={userId}
//         userName={userName}
//         callID={roomId as string}
//         config={{
//           ...ONE_ON_ONE_VOICE_CALL_CONFIG,
//           onCallEnd: () => {
//             router.back();
//           },
//         }}
//       />
//     </View>
//   );
// }
