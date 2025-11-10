// import { Redirect, Tabs, useRouter, useSegments } from "expo-router";
// import React, { useEffect } from "react";
// import { Platform } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import {
//   FontAwesome,
//   FontAwesome6,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: Colors[colorScheme ?? "light"].background,
//       }}
//     >
//       <Tabs
//         initialRouteName="people"
//         screenOptions={{
//           animation: "shift",
//           tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//           headerShown: false,
//           tabBarButton: HapticTab,
//           tabBarBackground: TabBarBackground,
//           tabBarStyle: Platform.select({
//             ios: {
//               position: "absolute",
//             },
//             default: {},
//           }),
//         }}
//       >
//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: "Profile",
//             tabBarIcon: ({ color }) => (
//               <FontAwesome name="user" size={24} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="discover"
//           options={{
//             title: "Discover",
//             tabBarIcon: ({ color }) => (
//               <MaterialCommunityIcons
//                 name="compass-outline"
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="people"
//           options={{
//             title: "People",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="person.3.fill" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="(chats)"
//           options={{
//             title: "Chats",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="chatbubble" size={24} color={color} />
//             ),
//           }}
//         />
//         {/* <Tabs.Screen
//           name="likedYou"
//           options={{
//             title: "liked You",
//             tabBarIcon: ({ color, focused }) => (
//               <Ionicons name={"heart"} size={24} color={color} />
//             ),
//           }}
//         /> */}
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "liked You",
//             tabBarIcon: ({ color, focused }) => (
//               <Ionicons name={"heart"} size={24} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </SafeAreaView>
//   );
// }



import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <Tabs
          initialRouteName="people"
          screenOptions={{
            animation: "shift",
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: { position: "absolute" },
              default: {},
            }),
          }}
        >
          {/* Profile Tab */}
          <Tabs.Screen
            name="profile"
            options={{
              title: "Hồ sơ",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" size={22} color={color} />
              ),
            }}
          />

          {/* Discover Tab */}
          <Tabs.Screen
            name="discover"
            options={{
              title: "Dating AI",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="compass-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />

          {/* People Tab */}
          <Tabs.Screen
            name="people"
            options={{
              title: "People",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={26} name="person.3.fill" color={color} />
              ),
            }}
          />

          {/* Chats Tab */}
          <Tabs.Screen
            name="(chats)"
            options={{
              title: "Hộp thư",
              tabBarIcon: ({ color }) => (
                <Ionicons name="chatbubble" size={23} color={color} />
              ),
            }}
          />

          {/* Liked You Tab */}
          <Tabs.Screen
            name="index"
            options={{
              title: "Thích bạn",
              tabBarIcon: ({ color }) => (
                <Ionicons name="heart" size={23} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// import React from "react";
// import { Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Tabs } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// import { HapticTab } from "@/components/HapticTab";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { Ionicons } from "@expo/vector-icons"; // Chỉ cần import Ionicons

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: Colors[colorScheme ?? "light"].background,
//         }}
//       >
//         <Tabs
//           initialRouteName="people"
//           screenOptions={{
//             animation: "shift",
//             headerShown: false,
//             tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//             tabBarButton: HapticTab,
//             tabBarBackground: TabBarBackground,
//             tabBarStyle: Platform.select({
//               ios: { position: "absolute",
//                 height: 90, 
//                 paddingTop: 10,
//                },
//               default: {
//                 height: 60, 
//                 paddingVertical: 5, 
//               },
//             }),
//           }}
//         >
//           {/* Profile Tab */}
//           <Tabs.Screen
//             name="profile"
//             options={{
//               title: "Hồ sơ",
//               tabBarIcon: ({ color }) => (
//                 <Ionicons name="person-outline" size={24} color={color} />
//               ),
//             }}
//           />

//           {/* Discover Tab */}
//           <Tabs.Screen
//             name="discover"
//             options={{
//               title: "Hẹn hò AI",
//               tabBarIcon: ({ color }) => (
//                 <Ionicons name="finger-print-outline" size={24} color={color} />
//               ),
//             }}
//           />

//           {/* People Tab */}
//           <Tabs.Screen
//             name="people"
//             options={{
//               title: "Trang chủ",
//               tabBarIcon: ({ color }) => (
//                 <Ionicons name="rose-outline" size={24} color={color} />
//               ),
//             }}
//           />

//           {/* Chats Tab */}
//           <Tabs.Screen
//             name="(chats)"
//             options={{
//               title: "Hộp thư",
//               tabBarIcon: ({ color }) => (
//                 <Ionicons name="chatbubble-outline" size={24} color={color} />
//               ),
//             }}
//           />

//           {/* Liked You Tab */}
//           <Tabs.Screen
//             name="index"
//             options={{
//               title: "Thích bạn",
//               tabBarIcon: ({ color }) => (
//                 <Ionicons name="heart-outline" size={24} color={color} />
//               ),
//             }}
//           />
//         </Tabs>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }
