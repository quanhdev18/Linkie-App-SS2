// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen
//           name="(tabs)"
//           options={{ headerShown: false, title: "chats" }}
//         />
//         <Stack.Screen name="charscreenf" options={{ headerShown: true }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }








// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import Toast from "react-native-toast-message";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" />
//         <Stack.Screen name="(auth)" />
//         <Stack.Screen name="(fill)" />
//         <Stack.Screen name="(tabs)" />
//       </Stack>
//       <StatusBar style="auto" />
//       <Toast />
//     </ThemeProvider>
//   );
// }






// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider as NavigationThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter, useSegments } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import Toast from "react-native-toast-message";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { AppThemeProvider, useTheme } from "../context/ThemeContext";

// SplashScreen.preventAutoHideAsync();

// /* ===================== */
// /* 🔐 AUTH GUARD LAYOUT  */
// /* ===================== */
// function LayoutContent() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const segments = useSegments();
//   const [ready, setReady] = useState(false);

//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) SplashScreen.hideAsync();
//   }, [loaded]);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("access_token");

//       const inAuthGroup = segments[0] === "(auth)";
//       const inTabs = segments[0] === "(tabs)";
//       const isRoot = segments.length === 0; // "/"

//       /**
//        * ❌ CHƯA LOGIN
//        * → chỉ cho vào "/" hoặc "(auth)"
//        */
//       if (!token && inTabs) {
//         router.replace("/");
//       }

//       /**
//        * ✅ ĐÃ LOGIN
//        * → không cho quay lại auth
//        */
//       if (token && inAuthGroup) {
//         router.replace("/(tabs)");
//       }

//       setReady(true);
//     };

//     checkAuth();
//   }, [segments]);

//   if (!loaded || !ready) return null;

//   return (
//     <NavigationThemeProvider
//       value={theme === "dark" ? DarkTheme : DefaultTheme}
//     >
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* Landing page */}
//         <Stack.Screen name="index" />

//         {/* Auth group */}
//         <Stack.Screen name="(auth)" />

//         {/* Onboarding / fill info */}
//         <Stack.Screen name="(fill)" />

//         {/* Main app */}
//         <Stack.Screen name="(tabs)" />
//       </Stack>

//       <StatusBar style="auto" />
//       <Toast />
//     </NavigationThemeProvider>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AppThemeProvider>
//       <LayoutContent />
//     </AppThemeProvider>
//   );
// }





import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider, // 👈 rename để tránh trùng
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { AppThemeProvider, useTheme } from "../context/ThemeContext"; // 👈 đổi tên

SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const { theme } = useTheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(fill)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(payment)" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <LayoutContent />
    </AppThemeProvider>
  );
}
