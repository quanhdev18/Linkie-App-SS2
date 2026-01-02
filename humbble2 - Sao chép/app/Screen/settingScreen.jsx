// components/SettingsModal.jsx
import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { deactivateAccountByEmail } from "../../services/api";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";


export default function SettingsModal({
  onClose,
  switchValue,
  // toggleSwitch,
  // onLogout,
  // onDeleteAccount,
}) {
  const { theme, toggleTheme } = useTheme();
  const toggleSwitch = () => setSwitchValue((previousState) => !previousState);

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem("access_token");
  //     await AsyncStorage.removeItem("refresh_token");

  //     router.replace("(auth)/login");
  //   } catch (error) {
  //     Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
  //   }
  // };
  const router = useRouter(); // ✅ BẮT BUỘC

  const handleLogout = async () => {
    try {
      // 1️⃣ Xóa toàn bộ dữ liệu đăng nhập
      await AsyncStorage.multiRemove([
        "access_token",
        "refresh_token",
        "user_id",
        "profile_id",
        "user_email",
        "role",
      ]);

      // 2️⃣ Reset navigation stack (GIỐNG WEB)
      
      router.replace("/(auth)/sign-in"); // ⚠️ đổi đúng route login của bạn
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn vô hiệu hóa tài khoản không? Bạn sẽ không thể sử dụng ứng dụng trừ khi đăng ký lại.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Vô hiệu hóa",
          style: "destructive",
          onPress: async () => {
            try {
              const email = await AsyncStorage.getItem("user_email");
              if (!email) {
                Alert.alert("Lỗi", "Không tìm thấy email người dùng.");
                return;
              }

              await deactivateAccountByEmail(email);
              Toast.show({
                type: "success",
                text1: "Tài khoản đã bị vô hiệu hóa",
                position: "top",
              });

              await AsyncStorage.clear();
              router.replace("/");
            } catch (err) {
              Alert.alert(
                "Lỗi",
                err.message || "Không thể vô hiệu hóa tài khoản."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.modalContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.modalTitle}>Cài đặt</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Xong</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <Text style={styles.titleSetting}>Tài khoản</Text>
      <View style={styles.row}>
        <Text style={styles.rowText}>Tạm dừng ghép đôi</Text>
        <Switch onValueChange={toggleSwitch} value={switchValue} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.rowText, { color: Colors[theme].text }]}>
          Giao diện
        </Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            backgroundColor: Colors[theme].tint,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: Colors[theme].background }}>
            {theme === "light" ? "Chuyển Dark" : "Chuyển Light"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>Thông báo</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>Quyền riêng tư</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {/* Footer buttons */}
      <View style={styles.buttonfooter}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Text style={styles.actionText}>Đăng xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          // onPress={onDeleteAccount}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.actionText, styles.deleteText]}>
            Xóa tài khoản
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Linkies</Text>
        <Text style={styles.footerVersion}>Phiên bản 1.0.0</Text>
        <Text style={styles.footerVersion}>Tạo bởi Linkie</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: "row",
    marginBottom: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeText: {
    fontSize: 16,
    color: "green",
  },
  titleSetting: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 7,
  },
  rowText: {
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 14,
    alignSelf: "center",
  },
  buttonfooter: {
    alignItems: "center",
    paddingTop: 50,
  },
  actionButton: {
    width: 250,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
  },
  deleteButton: {
    width: 250,
    borderColor: "red",
  },
  deleteText: {
    color: "red",
  },
  footer: {
    alignItems: "center",
    marginTop: 15,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  footerVersion: {
    fontSize: 12,
  },
});
