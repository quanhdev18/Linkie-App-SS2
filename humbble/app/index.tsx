import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/login.jpg")}
        style={{ width: "100%", height: 530 }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Linkies</Text>
        <Text style={styles.subtitle}>Hẹn hò thế hệ mới - dễ như chat!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={styles.btnText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={styles.btnText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    paddingHorizontal: 25,
  },
  title: {
    paddingTop: 40,
    fontSize: 30,
    fontFamily: "gothamrnd-bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "gothamrnd-medium",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 35,
  },
  btnSignUp: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 99,
    marginBottom: 20,
  },
  btnSignIn: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 99,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    fontFamily: "gothamrnd-medium",
  },
  buttonContainer: {
    marginTop: 30,
  },
});