import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import api from "@/services/api";

// const API_URL = "http://10.0.2.2:8000";

export default function PremiumPayment() {
  const route = useRoute<any>();
  // const navigation = useNavigation<any>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const planName = route.params?.planName || "Premium";
  const [loading, setLoading] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const router = useRouter();
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<any | null>(null);
  const mode = route.params?.mode || "single"; // single | all
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const groupPackagesByName = (pkgs: any[]) => {
    return pkgs.reduce((acc: any, pkg: any) => {
      if (!acc[pkg.name]) acc[pkg.name] = [];
      acc[pkg.name].push(pkg);
      return acc;
    }, {});
  };

  const groupedPackages = groupPackagesByName(packages);

  const initPayment = async () => {
    try {
      if (!selectedPkg) {
        alert("Vui lòng chọn gói trước khi thanh toán!");
        return;
      }

      setLoading(true);

      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        alert("Bạn cần đăng nhập trước!");
        return;
      }

      // 1️⃣ TẠO PAYMENT INTENT
      // const payRes = await api.post(
      //   `${API_URL}/payment/visa`,
      //   { package_id: selectedPkg.id },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      const payRes = await api.post(
  "/payment/visa",
  { package_id: selectedPkg.id }
);


      // const { client_secret } = payRes.data;
      const {
        client_secret,
        final_price,
        original_price,
        discount_applied,
      } = payRes.data;

      setFinalPrice(final_price);
      setOriginalPrice(original_price);
      setDiscountApplied(discount_applied);


      // 2️⃣ INIT PAYMENT SHEET
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "Linkie",
      });

      if (error) {
        alert(error.message);
        return;
      }
      // 3️⃣ MỞ UI NHẬP THẺ 🔥🔥🔥
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        alert(presentError.message);
        return;
      }
      // 4️⃣ CALLBACK
      // await api.get(`${API_URL}/payment/visa-callback`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await api.get("/payment/visa-callback");


      router.replace("/(payment)/PaymentSuccess");
    } catch (err) {
      console.error(err);
      alert("Thanh toán thất bại");
    } finally {
      setLoading(false);
    }
  };

  // const fetchPackages = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${API_URL}/packages`);
  //     const premiumPkgs = res.data
  //       .filter((p: any) => p.name.toLowerCase() === planName.toLowerCase())
  //       .sort((a: any, b: any) => b.price - a.price);

  //     setPackages(premiumPkgs);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Lỗi tải gói Premium");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchPackages = async () => {
    try {
      setLoading(true);
      // const res = await api.get(`${API_URL}/packages`);
      const res = await api.get("/packages");


      let result = [];

      if (mode === "all") {
        // 🔥 LUỒNG "ĐĂNG KÝ NGAY" → SHOW 4 GÓI
        result = res.data.sort(
          (a: any, b: any) => a.price - b.price
        );
      } else {
        // 🔥 LUỒNG CŨ → CHỈ GÓI PREMIUM
        result = res.data
          .filter(
            (p: any) =>
              p.name.toLowerCase() === planName.toLowerCase()
          )
          .sort((a: any, b: any) => b.price - a.price);
      }

      setPackages(result);
    } catch (err) {
      console.error(err);
      alert("Lỗi tải gói");
    } finally {
      setLoading(false);
    }
  };


  const openPayment = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      alert(`❌ ${error.message}`);
      return;
    }
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        alert("Thiếu token đăng nhập");
        return;
      }

      await api.get(`${API_URL}/payment/visa-callback`, {
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
        paddingTop: 60,
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
      {/* {packages.map((pkg) => (
        <Pressable
          key={pkg.id}
          onPress={() => setSelectedPkg(pkg)}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: selectedPkg?.id === pkg.id ? "#22c55e" : "#e5e7eb",
            backgroundColor: selectedPkg?.id === pkg.id ? "#ecfdf5" : "#fff",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 14, color: "#555" }}>
            Thời hạn {pkg.duration_days} ngày
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {pkg.price.toLocaleString("vi-VN")}₫
          </Text>
        </Pressable>
      ))} */}

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedPackages).map(
          ([packageName, pkgList]: any) => (
            <View key={packageName} style={{ marginBottom: 20 }}>
              {/* 🔥 TIÊU ĐỀ GÓI (PREMIUM / PLUS / VIP...) */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  marginBottom: 10,
                  color: "#111",
                }}
              >
                {packageName}
              </Text>

              {/* 📦 CÁC OPTION TRONG GÓI */}
              {pkgList.map((pkg: any) => (
                <Pressable
                  key={pkg.id}
                  onPress={() => setSelectedPkg(pkg)}
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor:
                      selectedPkg?.id === pkg.id ? "#22c55e" : "#e5e7eb",
                    backgroundColor:
                      selectedPkg?.id === pkg.id ? "#ecfdf5" : "#fff",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#555" }}>
                    Thời hạn {pkg.duration_days} ngày
                  </Text>

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 6,
                    }}
                  >
                    {pkg.price.toLocaleString("vi-VN")}₫
                  </Text>
                </Pressable>
              ))}
              {selectedPkg && (
                <Text style={{ marginTop: 6, fontSize: 16, color: "#666" }}>
                  {discountApplied && finalPrice && originalPrice ? (
                    <>
                      Giá ưu đãi:{" "}
                      <Text style={{ color: "#16a34a", fontWeight: "bold" }}>
                        {finalPrice.toLocaleString("vi-VN")}₫
                      </Text>
                      {"  "}
                      <Text style={{ textDecorationLine: "line-through", color: "#999" }}>
                        {originalPrice.toLocaleString("vi-VN")}₫
                      </Text>
                    </>
                  ) : (
                    <>
                      Giá niêm yết:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {selectedPkg.price.toLocaleString("vi-VN")}₫
                      </Text>
                    </>
                  )}
                </Text>
              )}

            </View>
          )
        )}
      </ScrollView>




      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Pressable
          disabled={!selectedPkg}
          onPress={initPayment}
          style={{
            backgroundColor: selectedPkg ? "#22c55e" : "#ccc",
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            Thanh toán {selectedPkg?.price.toLocaleString("vi-VN")}₫
          </Text>
        </Pressable>

      )}
    </View>
  );
}
