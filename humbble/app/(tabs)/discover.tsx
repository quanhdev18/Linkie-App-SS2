// import {
//   StyleSheet,
//   Image,
//   Platform,
//   View,
//   Text,
//   FlatList,
//   ImageBackground,
//   ScrollView,
//   Modal,
//   Pressable,
// } from "react-native";
// import React, { useState } from "react";
// import { Collapsible } from "@/components/Collapsible";
// import { ExternalLink } from "@/components/ExternalLink";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import Header from "@/components/Header";
// import { EvilIcons, Octicons } from "@expo/vector-icons";
// import { matchwithgoalData, RECOMMENDATION_USER } from "@/DB/userDB";
// import UserCard from "@/components/UserCard";

// export default function Discover() {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // nút icon question
//   const button = () => (
//     <Pressable onPress={() => setIsModalVisible(true)}>
//       <EvilIcons name="question" size={24} color="black" />
//     </Pressable>
//   );

//   const GoalSection = () => (
//     <View style={{ marginTop: 10 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 18 }}>
//         Ở gần bạn
//       </Text>

//       <View style={{ marginHorizontal: -18, marginTop: 10 }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingLeft: 18,
//             paddingRight: 18,
//             columnGap: 10,
//           }}
//         >
//           {matchwithgoalData.map((item) => (
//             <UserCard key={item.id} showLikeIcon={true} data={item} size="small" />
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
//   const CommonCommuity = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//           Cùng sở thích
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={matchwithgoalData}
//             renderItem={({ item }) => (
//               <UserCard showLikeIcon={true} data={item} size="small" />
//             )}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </View>
//     );
//   };
//   const SimilarInterest = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//           Cùng mục tiêu
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={matchwithgoalData}
//             renderItem={({ item }) => (
//               <UserCard showLikeIcon={true} data={item} size="small" />
//             )}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </View>
//     );
//   };
//   const Recommendataions = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//           Gợi ý cho bạn
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={RECOMMENDATION_USER}
//             renderItem={({ item }) => (
//               <UserCard showLikeIcon={true} size="large" data={item} />
//             )}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </View>
//     );
//   };
//   return (
//     <>
//       <ScrollView style={{ paddingHorizontal: 18 }}>
//         <Header headerTitle={"AI hẹn hò"} button={button} />
//         <View
//           style={{
//             backgroundColor: "#ffa600",
//             width: 200,
//             borderRadius: 20,
//             paddingHorizontal: 4,
//             paddingVertical: 6,
//             justifyContent: "center",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <Text style={{ fontWeight: "400" }}>Gặp gỡ người mới...</Text>
//         </View>
//         <Text style={{ fontWeight: "300" }}>
//           Kết nối với những người phù hợp với phong cách của bạn, được làm mới mỗi ngày.
//         </Text>
//         {Recommendataions("#fffff")}
//         {GoalSection("#fffff")}
//         {CommonCommuity("#e0dede")}
//         {SimilarInterest("fffff")}
//       </ScrollView>

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Giới thiệu chức năng</Text>
//             <Text style={styles.modalText}>
//               Mục “AI hẹn hò” giúp bạn khám phá những người phù hợp với sở thích,
//               mục tiêu và vị trí của bạn. Hãy bắt đầu khám phá ngay!
//             </Text>
//             <Pressable
//               style={styles.closeButton}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Đóng</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalText: {
//     textAlign: "center",
//     fontSize: 15,
//     color: "#555",
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: "#ffa600",
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });



// import {
//   StyleSheet,
//   Image,
//   Platform,
//   View,
//   Text,
//   FlatList,
//   ImageBackground,
//   ScrollView,
//   Modal,
//   Pressable,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Collapsible } from "@/components/Collapsible";
// import { ExternalLink } from "@/components/ExternalLink";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import Header from "@/components/Header";
// import { EvilIcons, Octicons } from "@expo/vector-icons";
// import { matchwithgoalData } from "@/DB/userDB";
// import UserCard from "@/components/UserCard";
// import axios from "axios";

// export default function Discover() {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recommendations, setRecommendations] = useState<any[]>([]);
//   const user_id = 1; // tạm fix cứng, bạn có thể thay bằng id đăng nhập thực tế

//   // gọi API lấy danh sách gợi ý
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/matching/who-liked-me/${user_id}`
//         );
//         setRecommendations(res.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách gợi ý:", error);
//       }
//     };
//     fetchRecommendations();
//   }, []);

//   // nút icon question
//   const button = () => (
//     <Pressable onPress={() => setIsModalVisible(true)}>
//       <EvilIcons name="question" size={24} color="black" />
//     </Pressable>
//   );

//   const GoalSection = () => (
//     <View style={{ marginTop: 10 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 18 }}>
//         Ở gần bạn
//       </Text>

//       <View style={{ marginHorizontal: -18, marginTop: 10 }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingLeft: 18,
//             paddingRight: 18,
//             columnGap: 10,
//           }}
//         >
//           {matchwithgoalData.map((item) => (
//             <UserCard key={item.id} showLikeIcon={true} data={item} size="small" />
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );

//   const CommonCommuity = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//           Cùng sở thích
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={matchwithgoalData}
//             renderItem={({ item }) => (
//               <UserCard showLikeIcon={true} data={item} size="small" />
//             )}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </View>
//     );
//   };

//   const SimilarInterest = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//           Cùng mục tiêu
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={matchwithgoalData}
//             renderItem={({ item }) => (
//               <UserCard showLikeIcon={true} data={item} size="small" />
//             )}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </View>
//     );
//   };

//   // ✅ Chỉ sửa phần Recommendataions để lấy dữ liệu từ API
//   const Recommendataions = (backgroundColor: string) => {
//     return (
//       <View
//         style={{
//           gap: 5,
//           backgroundColor: backgroundColor,
//           paddingVertical: 15,
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//           Gợi ý cho bạn
//         </Text>
//         <View style={{ width: "100%", padding: 2 }}>
//           <FlatList
//             horizontal={true}
//             data={recommendations}
//             renderItem={({ item }) => (
//               <UserCard
//                 showLikeIcon={true}
//                 size="large"
//                 data={{
//                   id: item.account_id,
//                   name: item.username,
//                   age: item.age,
//                   gender: item.gender,
//                   bio: item.bio,
//                   avatar: item.avatar,
//                   hobbies: item.hobbies,
//                 }}
//               />
//             )}
//             keyExtractor={(item) => item.account_id.toString()}
//             ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
//             showsHorizontalScrollIndicator={false}
//             ListEmptyComponent={
//               <Text style={{ color: "#888", paddingLeft: 18 }}>
//                 Chưa có ai thích bạn 😢
//               </Text>
//             }
//           />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <>
//       <ScrollView style={{ paddingHorizontal: 18 }}>
//         <Header headerTitle={"AI hẹn hò"} button={button} />
//         <View
//           style={{
//             backgroundColor: "#ffa600",
//             width: 200,
//             borderRadius: 20,
//             paddingHorizontal: 4,
//             paddingVertical: 6,
//             justifyContent: "center",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <Text style={{ fontWeight: "400" }}>Gặp gỡ người mới...</Text>
//         </View>
//         <Text style={{ fontWeight: "300" }}>
//           Kết nối với những người phù hợp với phong cách của bạn, được làm mới mỗi ngày.
//         </Text>
//         {Recommendataions("#fffff")}
//         {GoalSection("#fffff")}
//         {CommonCommuity("#e0dede")}
//         {SimilarInterest("fffff")}
//       </ScrollView>

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Giới thiệu chức năng</Text>
//             <Text style={styles.modalText}>
//               Mục “AI hẹn hò” giúp bạn khám phá những người phù hợp với sở thích,
//               mục tiêu và vị trí của bạn. Hãy bắt đầu khám phá ngay!
//             </Text>
//             <Pressable
//               style={styles.closeButton}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Đóng</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalText: {
//     textAlign: "center",
//     fontSize: 15,
//     color: "#555",
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: "#ffa600",
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
  Modal,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Header from "@/components/Header";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import { matchwithgoalData } from "@/DB/userDB";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { Colors } from "@/constants/Colors";

export default function Discover() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const user_id = 1; // tạm fix cứng, bạn có thể thay bằng id đăng nhập thực tế

  // gọi API lấy danh sách gợi ý
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/matching/who-liked-me/${user_id}`
        );
        setRecommendations(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gợi ý:", error);
      }
    };
    fetchRecommendations();
  }, []);

  // nút icon question
  const button = () => (
    <Pressable onPress={() => setIsModalVisible(true)}>
      <EvilIcons name="question" size={24} color={themeColors.text} />
    </Pressable>
  );

  const GoalSection = () => (
    <View style={{ marginTop: 10 }}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Ở gần bạn
      </Text>
      <View style={{ marginHorizontal: -18, marginTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 18,
            paddingRight: 18,
            columnGap: 10,
          }}
        >
          {matchwithgoalData.map((item) => (
            <UserCard key={item.id} showLikeIcon={true} data={item} size="small" />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const CommonCommuity = () => (
    <View
      style={{
        gap: 5,
        backgroundColor: themeColors.cardBackground,
        paddingVertical: 15,
      }}
    >
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Cùng sở thích
      </Text>
      <FlatList
        horizontal
        data={matchwithgoalData}
        renderItem={({ item }) => (
          <UserCard showLikeIcon={true} data={item} size="small" />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 2 }}
      />
    </View>
  );

  const SimilarInterest = () => (
    <View
      style={{
        gap: 5,
        backgroundColor: themeColors.cardBackground,
        paddingVertical: 15,
      }}
    >
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Cùng mục tiêu
      </Text>
      <FlatList
        horizontal
        data={matchwithgoalData}
        renderItem={({ item }) => (
          <UserCard showLikeIcon={true} data={item} size="small" />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 2 }}
      />
    </View>
  );

  // ✅ Chỉ sửa phần Recommendataions để lấy dữ liệu từ API
  const Recommendataions = () => (
    <View
      style={{
        gap: 5,
        backgroundColor: themeColors.background,
        paddingVertical: 15,
      }}
    >
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Gợi ý cho bạn
      </Text>
      <FlatList
        horizontal
        data={recommendations}
        renderItem={({ item }) => (
          <UserCard
            showLikeIcon={true}
            size="large"
            data={{
              id: item.account_id,
              name: item.username,
              age: item.age,
              gender: item.gender,
              bio: item.bio,
              image: item.avatar, // sửa thành image cho đồng bộ UserCard
              hobbies: item.hobbies,
            }}
          />
        )}
        keyExtractor={(item) => item.account_id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: themeColors.text, paddingLeft: 18 }}>
            Chưa có ai thích bạn 😢
          </Text>
        }
        contentContainerStyle={{ padding: 2 }}
      />
    </View>
  );

  return (
    <>
      <ScrollView
        style={{
          paddingHorizontal: 18,
          backgroundColor: themeColors.background,
        }}
      >
        <Header headerTitle={"AI hẹn hò"} button={button} />
        <View
          style={{
            backgroundColor: themeColors.tint,
            width: 200,
            borderRadius: 20,
            paddingHorizontal: 4,
            paddingVertical: 6,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "400", color: themeColors.text }}>
            Gặp gỡ người mới...
          </Text>
        </View>

        <Text style={{ fontWeight: "300", color: themeColors.text }}>
          Kết nối với những người phù hợp với phong cách của bạn, được làm mới mỗi ngày.
        </Text>

        {Recommendataions()}
        {GoalSection()}
        {CommonCommuity()}
        {SimilarInterest()}
      </ScrollView>

      {/* Modal giới thiệu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: themeColors.popupBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Giới thiệu chức năng
            </Text>
            <Text style={[styles.modalText, { color: themeColors.text }]}>
              Mục “AI hẹn hò” giúp bạn khám phá những người phù hợp với sở thích,
              mục tiêu và vị trí của bạn. Hãy bắt đầu khám phá ngay!
            </Text>
            <Pressable
              style={[
                styles.closeButton,
                { backgroundColor: themeColors.tint },
              ]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  closeButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
