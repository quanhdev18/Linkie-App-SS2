import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from "react-native";
import Header from "@/components/Header";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import DatingAdvice from "@/components/profile/DatingAdvice";
import { useRouter } from "expo-router";
import SettingsModal from "../Screen/settingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfileById, getAvatarImage } from "../../services/api";
import defaultAvatar from "../../assets/images/image.png";

const PLANS = [
  { plan: "Xem thông tin chi tiết ảnh độc quyển", p1: true, p2: true },
  { plan: "Tăng tốc lượt thích của bạn", p1: true, p2: true },
  { plan: "Nổi bật mỗi ngày", p1: true, p2: true },
  { plan: "Thích không giới hạn", p1: true, p2: false },
  { plan: "Xem ai đã thích bạn", p1: true, p2: false },
  { plan: "Bộ lọc nâng cao", p1: true, p2: false },
  { plan: "Chế độ ẩn danh", p1: true, p2: false },
  { plan: "Hai lời khen mỗi tuần", p1: true, p2: true },
];

const Profile = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("pay"); // pay | advice
  const [showSettings, setShowSettings] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [profile, setProfile] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  
  const toggleSwitch = () => setSwitchValue((prev) => !prev);
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

  console.log(avatarUri);

  return (
    <ScrollView style={{ paddingHorizontal: 18 }}>
      <View style={{ gap: 10 }}>
        <Header headerTitle={"Hồ sơ"} button={headerbutton} />

        {/* Avatar + info */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* <Avatar
            size={80}
            image=''
          /> */}
          <Image
            source={avatarUri ? { uri: avatarUri } : defaultAvatar}
            style={styles.avatar}
          />
          <View>
            {/* <Text style={{ fontSize: 22, fontWeight: "600" }}>Quang Anh, 22</Text> */}
            <Text style={styles.name}>{profile?.username || "Đang tải..."}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/Screen/profileScreen")}
            >
              <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab buttons */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <Button
            style={{
              flex: 1,
              backgroundColor: selectedTab === "pay" ? "#ffa600" : "#ebebeb",
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
              backgroundColor: selectedTab === "advice" ? "#ffa600" : "#ebebeb",
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
                <View style={styles.planCard}>
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    Premium+
                  </Text>
                  <Text style={{ fontWeight: "300", textAlign: "center" }}>
                    Nhận được gói VIP và tận hưởng những cách tốt hơn để kết nối với những người tuyệt vời
                  </Text>
                  <Button
                    style={{ backgroundColor: "#1c1c1c" }}
                    textStyle={{ color: "#ebebeb" }}
                  >
                    Khám phá Premium+
                  </Button>
                </View>
                <View style={styles.planCard}>
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    Premium
                  </Text>
                  <Text style={{ fontWeight: "300", textAlign: "center" }}>
                    Mở khóa thêm nhiều tính năng để nâng cao trải nghiệm của bạn
                  </Text>
                  <Button
                    style={{ backgroundColor: "#1c1c1c" }}
                    textStyle={{ color: "#ebebeb" }}
                  >
                    Khám phá Premium
                  </Button>
                </View>
              </ScrollView>
            </View>

            {/* Table */}
            <View style={styles.table}>
              <View style={styles.tableItem}>
                <Text style={[styles.row1, { fontWeight: "bold" }]}>
                  What you get:
                </Text>
                <View style={styles.headerCol}>
                  <Text style={styles.headerText}>Premium+</Text>
                </View>
                <View style={styles.headerCol}>
                  <Text style={styles.headerText}>Premium</Text>
                </View>
              </View>

              {PLANS.map((planitem) => (
                <View style={styles.tableItem} key={planitem.plan}>
                  <Text style={[styles.row1, { fontWeight: "300" }]}>
                    {planitem.plan}
                  </Text>
                  <View style={styles.row2}>
                    <Ionicons
                      name="checkmark-outline"
                      size={24}
                      color={planitem.p1 ? "black" : "#bdb9b9"}
                    />
                  </View>
                  <View style={styles.row3}>
                    <Ionicons
                      name="checkmark-outline"
                      size={24}
                      color={planitem.p2 ? "black" : "#bdb9b9"}
                    />
                  </View>
                </View>
              ))}
            </View>
          </>
        )
          : (
            <View style={{ marginTop: 20, alignItems: "center" }}>
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
    </ScrollView>
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
    backgroundColor: "#ffa600",
    justifyContent: "center",
    alignItems: "center",
  },
  planCard: {
    backgroundColor: "#ffa600",
    height: 160,
    width: 300,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  tableItem: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingVertical: 5,
    borderColor: "#f0eded",
  },
  row1: { width: "50%" },
  row2: { width: "25%", alignItems: "center" },
  row3: { width: "25%", alignItems: "center" },
  headerCol: { width: "25%", alignItems: "center" },
  headerText: { fontWeight: "bold" },
  table: { width: "100%", gap: 4, marginTop: 10 },
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
