import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";

const API_URL = "http://10.0.2.2:8000";

export default function PremiumPayment() {
  const route = useRoute<any>();
  // const navigation = useNavigation<any>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const planName = route.params?.planName || "Premium";

  const [loading, setLoading] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const router = useRouter();
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    initPayment();
  }, []);

  const initPayment = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        alert("Bạn cần đăng nhập trước!");
        return;
      }

      // 🔥 LẤY PACKAGE PREMIUM
      const pkgRes = await axios.get(`${API_URL}/packages`);
      const premiumPkg = pkgRes.data.find(
        (p: any) => p.name.toLowerCase() === "premium"
      );

      // 🔥 TẠO PAYMENT INTENT
      const payRes = await axios.post(
        `${API_URL}/payment/visa`,
        { package_id: premiumPkg.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { client_secret, payment_intent_id } = payRes.data;
      setPaymentIntentId(payment_intent_id);

      const initRes = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "Linkie",
      });

      if (!initRes.error) {
        setPaymentReady(true);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khởi tạo thanh toán");
    } finally {
      setLoading(false);
    }
  };

  // const openPayment = async () => {
  //   const { error } = await presentPaymentSheet();
  //   if (error) {
  //     alert(`❌ ${error.message}`);
  //   } else {
  //     alert("🎉 Thanh toán thành công!");
  //     router.replace("/(payment)/PaymentSuccess");

  //     // navigation.replace("PaymentSuccess");
  //   }
  // };

  const openPayment = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      alert(`❌ ${error.message}`);
      return;
    }

    // if (!paymentIntentId) {
    //   alert("Không xác định được giao dịch (payment_intent_id)");
    //   return;
    // }


    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        alert("Thiếu token đăng nhập");
        return;
      }

      // 🔥 GỌI CALLBACK GIỐNG WEB
      await axios.get(`${API_URL}/payment/visa-callback`, {
        // params: {
        //   payment_intent_id: paymentIntentId, // 👈 XEM BƯỚC DƯỚI
        // },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("🎉 Thanh toán thành công!");
      router.replace("/(payment)/PaymentSuccess");
    } catch (err) {
      console.error("Callback error:", err);
      alert("Thanh toán thành công nhưng xác nhận thất bại!");
    }
  };


  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Nâng cấp Premium
      </Text>

      <Text style={{ color: "#666", textAlign: "center", marginBottom: 20 }}>
        Xem ai thích bạn • Không giới hạn lượt thích • Ưu tiên hiển thị
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Pressable
          disabled={!paymentReady}
          onPress={openPayment}
          style={{
            backgroundColor: paymentReady ? "#22c55e" : "#ccc",
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 30,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            Thanh toán Premium
          </Text>
        </Pressable>
      )}
    </View>
  );
}
