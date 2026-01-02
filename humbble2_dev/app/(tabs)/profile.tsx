import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  useColorScheme,

} from "react-native";
import Header from "@/components/Header";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import DatingAdvice from "@/components/profile/DatingAdvice";
import { useRouter } from "expo-router";
import SettingsModal from "../Screen/settingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfileById, getAvatarImage, getPackages, getUserDailyStatus } from "../../services/api";
import defaultAvatar from "../../assets/images/image.png";
import { Colors } from "@/constants/Colors";
import DailyStatusCloud from "@/components/DailyStatusCloud";
import DailyStatusModal from "@/components/DailyStatusModal";

const PLANS = [
  { plan: "Thêm lượt thích 5 lần", p1: true, p2: true, p3: true, p4: true },
  { plan: "Tăng tốc lượt thích của bạn mỗi ngày", p1: true, p2: true, p3: true, p4: true },
  { plan: "Thích không giới hạn", p1: true, p2: true, p3: false, p4: false },
  { plan: "Xem ai đã thích bạn", p1: true, p2: true, p3: false, p4: false },
  { plan: "Xem ai ở gần bạn", p1: true, p2: true, p3: false, p4: false },
  { plan: "Xem ai cùng mục tiêu hẹn hò", p1: true, p2: true, p3: false, p4: false },
  { plan: "Bộ lọc nâng cao", p1: true, p2: true, p3: false, p4: false },
  { plan: "Thêm trạng thái mỗi ngày", p1: true, p2: false, p3: false, p4: false },

];

const Profile = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("pay"); // pay | advice
  const [showSettings, setShowSettings] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [profile, setProfile] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [packages, setPackages] = useState([]);
  const toggleSwitch = () => setSwitchValue((prev) => !prev);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const [dailyStatus, setDailyStatus] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const accountId = await AsyncStorage.getItem("account_id");
      if (!accountId) return;

      const data = await getUserDailyStatus(Number(accountId));
      setDailyStatus(data?.content ? data : null);
    };
    fetchStatus();
  }, []);


  const headerbutton = () => (
    <AntDesign
      name="setting"
      size={24}
      color="black"
      onPress={() => setShowSettings(true)} // mở modal
    />
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const idStr = await AsyncStorage.getItem("profile_id");
        if (!idStr) throw new Error("Chưa có profile_id trong AsyncStorage");

        const profileId = parseInt(idStr, 10);
        const data = await getProfileById(profileId);
        console.log("Dữ liệu hồ sơ:", data);
        setProfile(data);

        if (data?.avatar?.title) {
          const avatarUrl = getAvatarImage(data.avatar.title);
          setAvatarUri(avatarUrl);
        }
      } catch (err) {
        console.error("Lỗi khi tải profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();

        // ✅ Lọc chỉ giữ 1 bản cho mỗi nhóm: Newbie, Plus, Boost, Premium
        const uniqueNames = ["Newbie", "Plus", "Boost", "Premium"];
        const filtered = uniqueNames
          .map((name) => data.find((pkg) => pkg.name === name))
          .filter(Boolean);

        setPackages(filtered);
      } catch (error) {
        console.error("Lỗi khi tải packages:", error);
      }
    };

    fetchPackages();
  }, []);


  console.log(avatarUri);

  return (
    // <ScrollView style={{ paddingHorizontal: 18, backgroundColor: themeColors.background }}>
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: 30,
          flexGrow: 1,
        }}
      >

        <View style={{ gap: 10, backgroundColor: "#FFFFFF" }}>
          <Header headerTitle={"Hồ sơ"} button={headerbutton} />

          {/* Avatar + info */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={avatarUri ? { uri: avatarUri } : defaultAvatar}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{profile?.username || "Đang tải..."}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("/Screen/profileScreen")}
              >
              
                <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
            </View>
            <DailyStatusCloud
                  content={dailyStatus?.content}
                  onPress={() => setOpenStatusModal(true)}
                />
          </View>

          {/* Tab buttons */}
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <Button
              style={{
                flex: 1,
                backgroundColor: selectedTab === "pay" ? "#ff885a" : "#ebebeb",
              }}
              textStyle={{
                color: selectedTab === "pay" ? "#fff" : "#1c1c1c",
              }}
              onPress={() => setSelectedTab("pay")}
            >
              Nâng cấp trả phí
            </Button>
            <Button
              style={{
                flex: 1,
                backgroundColor: selectedTab === "advice" ? "#ff885a" : "#ebebeb",
              }}
              textStyle={{
                color: selectedTab === "advice" ? "#fff" : "#1c1c1c",
              }}
              onPress={() => setSelectedTab("advice")}
            >
              Lời khuyên hẹn hò
            </Button>

          </View>

          {/* Nội dung hiển thị theo tab */}
          {selectedTab === "pay" ? (
            <>
              {/* Spotlight cards */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <View style={styles.spotlightCard}>
                  <View style={styles.circle}>
                    <AntDesign name="star" size={24} color="black" />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "800" }}>Spotlight</Text>
                    <Text>Nổi bật</Text>
                  </View>
                </View>
                <View style={styles.spotlightCard}>
                  <View style={styles.circle}>
                    <AntDesign name="star" size={24} color="black" />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "800" }}>SupperSwipe</Text>
                    <Text>Được chú ý</Text>
                  </View>
                </View>
              </View>

              {/* Premium scroll cards */}
              <View style={{ marginHorizontal: -18, marginTop: 10 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingLeft: 18,
                    paddingRight: 18,
                    columnGap: 8,
                  }}
                >
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <View key={pkg.id} style={styles.planCard}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                          {pkg.name}
                        </Text>
                        <Text
                          style={{ fontWeight: "300", textAlign: "center" }}
                          numberOfLines={2}
                        >
                          {pkg.description}
                        </Text>
                        {/* <Text style={{ fontWeight: "600", marginTop: 6 }}>
                        {pkg.price.toLocaleString("vi-VN")}đ / {pkg.duration_days} ngày
                      </Text> */}
                        <Button
                          style={{ backgroundColor: "#1c1c1c" }}
                          textStyle={{ color: "#ebebeb" }}
                        >
                          Đăng ký {pkg.name} ngay
                        </Button>
                      </View>
                    ))
                  ) : (
                    <Text>Đang tải gói...</Text>
                  )}
                </ScrollView>
              </View>

              {/* Table - Cột trái cố định + phần phải cuộn ngang */}
              <View style={styles.tableContainer}>
                {/* Cột trái cố định */}
                <View style={styles.leftColumn}>
                  <View style={styles.leftHeader}>
                    <Text style={[styles.leftText, { fontWeight: "bold" }]}>Thông tin gói:</Text>
                  </View>
                  {PLANS.map((planitem) => (
                    <View key={planitem.plan} style={styles.leftRow}>
                      <Text style={[styles.leftText, { fontWeight: "300" }]}>{planitem.plan}</Text>
                    </View>
                  ))}
                </View>

                {/* Cột phải cuộn ngang */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexDirection: "row" }}
                >
                  {/* Cột Premium+ */}
                  <View style={styles.rightColumn}>
                    <View style={styles.rightHeader}>
                      <Text style={styles.headerText}>Premium</Text>
                    </View>
                    {PLANS.map((planitem, index) => (
                      <View key={index} style={styles.rightRow}>
                        <Ionicons
                          name="checkmark-outline"
                          size={24}
                          color={planitem.p1 ? "black" : "#bdb9b9"}
                        />
                      </View>
                    ))}
                  </View>

                  {/* Cột Premium */}
                  <View style={styles.rightColumn}>
                    <View style={styles.rightHeader}>
                      <Text style={styles.headerText}>Plus</Text>
                    </View>
                    {PLANS.map((planitem, index) => (
                      <View key={index} style={styles.rightRow}>
                        <Ionicons
                          name="checkmark-outline"
                          size={24}
                          color={planitem.p2 ? "black" : "#bdb9b9"}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.rightColumn}>
                    <View style={styles.rightHeader}>
                      <Text style={styles.headerText}>Boost</Text>
                    </View>
                    {PLANS.map((planitem, index) => (
                      <View key={index} style={styles.rightRow}>
                        <Ionicons
                          name="checkmark-outline"
                          size={24}
                          color={planitem.p3 ? "black" : "#bdb9b9"}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.rightColumn}>
                    <View style={styles.rightHeader}>
                      <Text style={styles.headerText}>Newbie</Text>
                    </View>
                    {PLANS.map((planitem, index) => (
                      <View key={index} style={styles.rightRow}>
                        <Ionicons
                          name="checkmark-outline"
                          size={24}
                          color={planitem.p4 ? "black" : "#bdb9b9"}
                        />
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>

            </>
          )
            : (
              <View style={{
                marginTop: 20, marginHorizontal: -18
                // alignItems: "center"
              }}>
                {/* <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Dating Advice
            </Text>
            <Text style={{ marginTop: 10, color: "#999" }}>Coming soon...</Text> */}
                <DatingAdvice />
              </View>
            )
          }
        </View>
        <Modal visible={showSettings} animationType="slide">
          <SettingsModal
            switchValue={switchValue}
            toggleSwitch={toggleSwitch}
            onClose={() => setShowSettings(false)}
            onLogout={() => {
              console.log("Logout");
              setShowSettings(false);
            }}
            onDeleteAccount={() => {
              console.log("Delete account");
              setShowSettings(false);
            }}
          />
        </Modal>
        <DailyStatusModal
          visible={openStatusModal}
          status={dailyStatus}
          onClose={() => setOpenStatusModal(false)}
          onUpdated={async () => {
            const accountId = await AsyncStorage.getItem("account_id");
            const data = await getUserDailyStatus(Number(accountId));
            setDailyStatus(data?.content ? data : null);
          }}
        />

      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  spotlightCard: {
    flexDirection: "row",
    gap: 5,
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: "#f0eded",
    backgroundColor: "#ffe0b3",
  },
  circle: {
    borderRadius: 40,
    height: 40,
    width: 40,
    backgroundColor: "#ff885a",
    justifyContent: "center",
    alignItems: "center",
  },
  planCard: {
    backgroundColor: "#ff885a",
    height: 160,
    width: 300,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },

  // tableItem: {
  //   flexDirection: "row",
  //   borderBottomWidth: 2,
  //   paddingVertical: 5,
  //   borderColor: "#f0eded",
  // },
  // row1: { width: "50%" },
  // row2: { width: "25%", alignItems: "center" },
  // row3: { width: "25%", alignItems: "center" },
  // headerCol: { width: "25%", alignItems: "center" },
  // headerText: { fontWeight: "bold" },
  // table: { width: "100%", gap: 4, marginTop: 10 },
  // tableContainer: {
  //   flexDirection: "row",
  //   marginTop: 15,
  //   borderTopWidth: 2,
  //   borderColor: "#f0eded",
  // },

  // leftColumn: {
  //   width: "45%", // cột trái cố định
  //   borderRightWidth: 2,
  //   borderColor: "#f0eded",
  // },

  // leftHeader: {
  //   paddingVertical: 8,
  //   borderBottomWidth: 2,
  //   borderColor: "#f0eded",
  // },

  // leftRow: {
  //   paddingVertical: 6,
  //   borderBottomWidth: 1,
  //   borderColor: "#f0eded",
  // },

  // leftText: {
  //   fontSize: 13,
  //   color: "#1c1c1c",
  // },

  // rightColumn: {
  //   width: 120,
  //   borderRightWidth: 2,
  //   borderColor: "#f0eded",
  //   alignItems: "center",
  // },

  // rightHeader: {
  //   paddingVertical: 8,
  //   borderBottomWidth: 2,
  //   borderColor: "#f0eded",
  //   alignItems: "center",
  // },

  // rightRow: {
  //   paddingVertical: 6,
  //   borderBottomWidth: 1,
  //   borderColor: "#f0eded",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // headerText: {
  //   fontWeight: "bold",
  //   fontSize: 14,
  // },
  tableContainer: {
    flexDirection: "row",
    marginTop: 15,
    // ❌ bỏ borderTopWidth và borderColor
  },

  leftColumn: {
    width: "45%", // cột trái cố định
    // ❌ bỏ borderRightWidth và borderColor
    paddingRight: 8,
  },

  leftHeader: {
    paddingVertical: 8,
    // ❌ bỏ borderBottomWidth và borderColor
    marginBottom: 6,
  },

  leftRow: {
    paddingVertical: 6,
    // ❌ bỏ borderBottomWidth và borderColor
    marginBottom: 8,
  },

  leftText: {
    fontSize: 13,
    color: "#1c1c1c",
  },

  rightColumn: {
    width: 120,
    // ❌ bỏ borderRightWidth và borderColor
    alignItems: "center",
    marginRight: 10,
  },

  rightHeader: {
    paddingVertical: 8,
    // ❌ bỏ borderBottomWidth và borderColor
    alignItems: "center",
    marginBottom: 6,
  },

  rightRow: {
    paddingVertical: 6,
    // ❌ bỏ borderBottomWidth và borderColor
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 14,
  },


  editButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#ebebeb",
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "#1c1c1c",
    fontSize: 14,
    fontWeight: "500",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  name: {
    fontSize: 23,
    fontFamily: "gothamrnd-bold",
    // marginBottom: 6,
    fontWeight: "600"
  },
});
