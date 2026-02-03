import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function PaymentSuccess() {
  const navigation = useNavigation<any>();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecfdf5",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", color: "#16a34a" }}>
        ✅ Thanh toán thành công!
      </Text>

      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: "#16a34a",
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 20,
        }}
        // onPress={() => navigation.navigate("Profile")}
        onPress={() => router.replace("/(tabs)/profile")}

      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          Quay về trang cá nhân
        </Text>
      </Pressable>
    </View>
  );
}
