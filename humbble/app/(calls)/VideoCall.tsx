// // VideoCallScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Button, StyleSheet } from "react-native";
// import RtcEngine, { ChannelProfile, ClientRole } from "react-native-agora";
// import { RtcLocalView, RtcRemoteView } from "react-native-agora";

// const APP_ID = "44242130d5634981affc223fc65f126b";
// const TOKEN = null;
// const CHANNEL_NAME = "Linkie";

// export default function VideoCallScreen({ navigation }) {
//   const [engine, setEngine] = useState(null);
//   const [joined, setJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       const rtcEngine = await RtcEngine.create(APP_ID);
//       setEngine(rtcEngine);

//       await rtcEngine.enableVideo();
//       await rtcEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
//       await rtcEngine.setClientRole(ClientRole.Broadcaster);

//       rtcEngine.addListener("JoinChannelSuccess", () => {
//         setJoined(true);
//         console.log("✅ Video: joined channel");
//       });

//       rtcEngine.addListener("UserJoined", (uid) => {
//         setRemoteUid(uid);
//       });

//       rtcEngine.addListener("UserOffline", () => {
//         setRemoteUid(null);
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
//       {joined && (
//         <RtcLocalView.SurfaceView style={styles.local} channelId={CHANNEL_NAME} />
//       )}
//       {remoteUid !== null && (
//         <RtcRemoteView.SurfaceView
//           style={styles.remote}
//           uid={remoteUid}
//           channelId={CHANNEL_NAME}
//         />
//       )}
//       <Button title="Kết thúc" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   local: { width: "40%", height: "30%", position: "absolute", top: 10, right: 10 },
//   remote: { flex: 1 },
// });
