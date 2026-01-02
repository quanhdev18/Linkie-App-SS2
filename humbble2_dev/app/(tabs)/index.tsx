// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React from "react";
// import Header from "@/components/Header";
// import { Octicons } from "@expo/vector-icons";

// const LikedYou = () => {
//   const button = () => <Octicons name="filter" size={24} color="black" />;
//   return (
//     <ScrollView style={{ paddingHorizontal: 8 }}>
//       <Header headerTitle={"Người thích bạn"} button={button} />
//       <Text style={{ fontWeight: "300" }}>
//         Khi mọi người thích bạn, họ sẽ xuất hiện ở đây.
//       </Text>
//       <View
//         style={{
//           alignSelf: "center",
//           alignItems: "center",
//           position: "relative",
//           top: 100,
//           gap: 8,
//           paddingHorizontal: 10,
//         }}
//       >
//         <Image
//           source={{
//             uri: "https://plus.unsplash.com/premium_vector-1732639583203-83ff3f727fe8?q=80&w=2842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//           }}
//           style={{ width: 200, height: 200, borderRadius: 20 }}
//         />
//         <Text
//           style={{
//             fontSize: 24,
//             fontWeight: "bold",
//             color: "#1a1a1a",
//             textAlign: "center",
//           }}
//         >
//           Get Spotlight for more likes
//         </Text>
//         <Text
//           style={{
//             fontSize: 18,
//             color: "#1a1a1a",
//             textAlign: "center",
//             fontWeight: "300",
//           }}
//         >
//           You'll be shown ahead of other people for 30 minutes.
//         </Text>
//         <Pressable
//           style={{
//             width: 200,
//             backgroundColor: "#1a1a1a",
//             padding: 10,
//             borderRadius: 30,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text style={{ color: "white", fontSize: 20 }}>Get Spotlight</Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// export default LikedYou;

// const styles = StyleSheet.create({});







import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
// import UserCard from "@/components/UserCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWhoLikedMe } from "@/services/api";
import { Modal } from "react-native";
import { FlatList } from "react-native";
import UserGridCard from "@/components/UserGridCard";
import { useRouter } from "expo-router";


const LikedYou = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  // const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [canViewPhotos, setCanViewPhotos] = useState(true); // hoặc false nếu muốn blur
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const router = useRouter();


  const button = () => (
    <Octicons
      name="filter"
      size={24}
      color={themeColors.text} // icon theo theme
    />
  );

  const Recommendations = ({
    likedUsers,
    canViewPhotos,
    themeColors,
  }: any) => (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: themeColors.text }}>
        Gợi ý cho bạn
      </Text>

      <FlatList
        data={likedUsers}
        keyExtractor={(item) => item.account_id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <UserGridCard
            data={{
              image: item.avatar_url,
            }}
            showLikeIcon
            isPremiumBlur={!canViewPhotos}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: themeColors.text, marginTop: 10 }}>
            Chưa có ai thích bạn 😢
          </Text>
        }
      />
    </View>
  );

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const accountId = await AsyncStorage.getItem("account_id");
        if (!accountId) return;

        const liked = await getWhoLikedMe(accountId);
        setLikedUsers(liked || []);
      } catch (err) {
        console.error("Fetch liked users error:", err);
      }
    };

    fetchLikedUsers();
  }, []);


  return (
    <>

      <FlatList
        style={{
          flex: 1,
          backgroundColor: themeColors.background,
        }}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        data={showRecommendations ? likedUsers : []}
        keyExtractor={(item) => item.account_id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header headerTitle={"Người thích bạn"} button={button} />
            <Text
              style={{
                fontWeight: "300",
                color: themeColors.text,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Khi mọi người thích bạn, họ sẽ xuất hiện ở đây.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <UserGridCard
            data={{ image: item.avatar_url }}
            showLikeIcon
            isPremiumBlur={!canViewPhotos}
          />
        )}
        ListEmptyComponent={
          showRecommendations ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: themeColors.text }}>
                Chưa có ai thích bạn 😢
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          showRecommendations ? (
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <Pressable
                style={{
                  width: "80%",
                  backgroundColor: themeColors.tint,
                  paddingVertical: 14,
                  borderRadius: 30,
                  alignItems: "center",
                }}
                onPress={() => {
                  // 👉 mở màn thanh toán Premium
                  router.push({
                    pathname: "/PremiumPayment",
                    params: {
                      planName: "Premium",
                    },
                  });

                }}
              >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                  🔥 Đăng ký Premium ngay
                </Text>
              </Pressable>
            </View>
          ) : null
        }

      />

      {/* ✅ MODAL PHẢI Ở TRONG RETURN */}
      <Modal
        animationType="fade"
        transparent
        visible={isSpotlightVisible}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: themeColors.popupBackground },
            ]}
          >
            <Pressable
              // onPress={() => setIsSpotlightVisible(false)}
              onPress={() => {
                setIsSpotlightVisible(false);
                setShowRecommendations(true); // ✅ cho hiện list
              }}

              style={styles.closeButton}
            >
              <Octicons name="x" size={24} color={themeColors.text} />
            </Pressable>

            <Image
              source={{
                uri: "https://i.pinimg.com/1200x/5c/a5/90/5ca590c5011710bbd79ef8edc599ce06.jpg"
              }}
              style={styles.image}
            />

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: themeColors.text,
                textAlign: "center",
              }}
            > Soulmate là có thật
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: themeColors.text,
                textAlign: "center",
                fontWeight: "300",
                marginBottom: 12,
              }}
            >
              Đăng ký các gói hẹn hò ngay để có trải nghiệm tuyệt vời nhất với Linkie
            </Text>

            <Pressable
              style={{
                width: 200,
                backgroundColor:
                  colorScheme === "dark"
                    ? themeColors.buttonBackground
                    : themeColors.tint,
                padding: 10,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setIsSpotlightVisible(false);
                setShowRecommendations(true);
              }}

            >

              <Text style={{ color: "#fff", fontSize: 20 }}>
                Đăng ký ngay
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );


};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    position: "relative",
    top: 100,
    gap: 8,
    paddingHorizontal: 10,
  },
  image: {
    width: 330,
    height: 260,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },


});

export default LikedYou;
