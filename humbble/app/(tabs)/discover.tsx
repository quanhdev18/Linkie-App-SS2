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
  const user_id = 1; 

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
      <View style={{ marginHorizontal: -18, marginTop: 3 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 18,
            paddingRight: 18,
            columnGap: 10,
            paddingVertical: 10,
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
        marginTop: 10 
      }}
    >
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Cùng sở thích
      </Text>
      <View style={{ marginHorizontal: -18, marginTop: 3 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 18,
            paddingRight: 18,
            columnGap: 10,
            paddingVertical: 10,
          }}
        >
          {matchwithgoalData.map((item) => (
            <UserCard key={item.id} showLikeIcon={true} data={item} size="small" />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const SimilarInterest = () => (
    <View
      style={{
        marginTop: 10 
      }}
    >
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Cùng mục tiêu
      </Text>
      <View style={{ marginHorizontal: -18, marginTop: 3 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 18,
            paddingRight: 18,
            columnGap: 10,
            paddingVertical: 10,
          }}
        >
          {matchwithgoalData.map((item) => (
            <UserCard key={item.id} showLikeIcon={true} data={item} size="small" />
          ))}
        </ScrollView>
      </View>
    </View>
  );

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
              image: item.avatar, 
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
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
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
