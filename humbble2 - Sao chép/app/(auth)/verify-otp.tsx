import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  login,
  sendOtp,
  verifyEmail,
  updateLocation,
} from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Geolocation from "react-native-geolocation-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function VerifyOtp() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  const mode = params.mode as string;

  const textInput = useRef<TextInput>(null);
  const lengthInput = 6;

  const [internalVal, setInternalVal] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(lengthInput).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(120);

  const requestLocation = async (account_id: number) => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn("Quyền truy cập vị trí bị từ chối");
          return;
        }
      }
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await updateLocation(account_id, latitude, longitude);
        },
        (error) => {
          console.warn("Không thể lấy vị trí:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.warn("Lỗi xin quyền vị trí:", error);
    }
  };

  const onChangeText = async (val: string) => {
    const numericVal = val.replace(/[^0-9]/g, "");
    setInternalVal(numericVal);

    const newOtpDigits = Array(lengthInput).fill("");
    for (let i = 0; i < numericVal.length; i++) {
      newOtpDigits[i] = numericVal[i];
    }
    setOtpDigits(newOtpDigits);

    if (numericVal.length === lengthInput) {
      try {
        setIsSubmitting(true);
        let response;
        if (mode === "register") {
          response = await verifyEmail({ email, otp: numericVal });
        } else {
          response = await login({ email, otp: numericVal });
        }
        console.log("OTP API response:", response);

        if (response?.data?.access_token) {
          const { access_token, account_id, profile_id } = response.data;

          await AsyncStorage.setItem("access_token", access_token);
          await AsyncStorage.setItem("user_email", email);

          if (account_id != null) {
            await AsyncStorage.setItem("account_id", account_id.toString());
            requestLocation(account_id);
          }

          if (profile_id != null) {
            await AsyncStorage.setItem("profile_id", profile_id.toString());
          }

          // 👇 Phân nhánh điều hướng rõ ràng
          if (mode === "register") {
            // Sau khi đăng ký → luôn điền hồ sơ
            router.replace({
              pathname: "/(fill)/Profile",
              params: { status: "verified" },
            });
          } else {
            // Login → nếu có hồ sơ thì vào tabs, nếu chưa thì điền hồ sơ
            if (profile_id) {
              router.replace("/(tabs)");
            } else {
              router.replace("/(fill)/Profile");
            }
          }
        } else {
          Alert.alert("Lỗi", "Mã OTP không đúng hoặc đã hết hạn");
        }
      } catch (error) {
        console.error("OTP Error:", error);
        Alert.alert("Lỗi", "Xác minh OTP thất bại");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      await sendOtp({ email });

      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Mã OTP đã được gửi lại!",
        position: "top",
      });

      setCountdown(120);
    } catch (error) {
      console.error("Resend OTP Error:", error);

      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Gửi lại mã OTP thất bại!",
        position: "top",
      });
    } finally {
      setResending(false);
    }
  };

  const focusTextInput = () => {
    textInput.current?.focus();
  };

  useEffect(() => {
    focusTextInput();
  }, []);

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.containerAvoidingView}
      >
        <Text style={styles.title}>Nhập mã của bạn</Text>

        <TextInput
          ref={textInput}
          onChangeText={onChangeText}
          style={styles.hiddenInput}
          value={internalVal}
          maxLength={lengthInput}
          keyboardType="number-pad"
          autoFocus
        />

        <TouchableOpacity activeOpacity={1} onPress={focusTextInput}>
          <View style={styles.containerInput}>
            {otpDigits.map((digit, index) => (
              <View key={index} style={styles.cellView}>
                <Text style={styles.cellText}>{digit}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResendOtp}
          disabled={resending || countdown > 0}
          style={[styles.resendBtn, countdown > 0 && styles.disabledBtn]}
        >
          <Text
            style={[styles.resendText, countdown > 0 && styles.disabledText]}
          >
            {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 31,
    marginTop: 20,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    textAlign: "center",
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderColor: "#000",
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
  },
  hiddenInput: {
    width: 0,
    height: 0,
    opacity: 0,
    position: "absolute",
  },
  resendBtn: {
    marginTop: 20,
  },
  resendText: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  disabledBtn: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
    textDecorationLine: "none",
  },
});
