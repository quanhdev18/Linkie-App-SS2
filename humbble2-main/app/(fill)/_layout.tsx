// app/_layout.tsx
import { Stack } from "expo-router";
import { ProfileProvider } from "../../context/profileContext";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProfileProvider>
  );
}
