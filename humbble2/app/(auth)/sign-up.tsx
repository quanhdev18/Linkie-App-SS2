import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { register, sendOtp } from "../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const isValidEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleContinue = async () => {
    if (!email.trim()) {
      setErrEmail("Vui lòng nhập email của bạn!");
      return;
    }

    if (!isValidEmail(email)) {
      setErrEmail("Email không hợp lệ!");
      return;
    }

    try {
      await register({ email });
      await sendOtp({ email });

      router.push({
        pathname: "/(auth)/verify-otp",
        params: {
          email,
          mode: "register",
        },
      });
    } catch (err) {
      console.error("Đăng ký lỗi: ", err);
      Alert.alert("Lỗi", "Email đã được sử dụng hoặc không thể gửi mã.");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value.trim()) {
      setErrEmail("Vui lòng nhập email của bạn!");
    } else {
      setErrEmail("");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Bạn có thể chia sẻ email không?</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.inputControl}
          placeholder="Nhập email của bạn"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          value={email}
          onChangeText={handleEmailChange}
        />
        {errEmail ? <Text style={styles.errMessage}>{errEmail}</Text> : null}

        <Text style={styles.subtitle}>
          Chúng tôi sẽ gửi mã xác thực qua email để đảm bảo đây là bạn. Vui lòng
          kiểm tra hộp thư của bạn.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    lineHeight: 50,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    paddingHorizontal: 20,
    fontFamily: "gothamrnd-bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#929292",
    fontFamily: "gothamrnd",
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  inputControl: {
    width: "100%",
    paddingLeft: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  errMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#000",
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});