import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DailyStatusCloud = ({ content, onPress }: any) => {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      {/* Cloud body */}
      <View style={styles.cloud}>
        <Text style={styles.text} numberOfLines={2}>
          {content || "Ngày hôm nay của bạn thế nào?"}
        </Text>
      </View>

      {/* Cloud tail */}
      <View style={styles.tail} />
    </Pressable>
  );
};

export default DailyStatusCloud;

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 8,
    marginTop: 6,
  },

  cloud: {
    backgroundColor: "#E0F2FE", // sky-100
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    maxWidth: 160,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  text: {
    fontSize: 12,
    color: "#0369A1", // sky-700
    lineHeight: 16,
  },

  tail: {
    position: "absolute",
    left: -6,
    bottom: 6,
    width: 12,
    height: 12,
    backgroundColor: "#E0F2FE",
    transform: [{ rotate: "45deg" }],
    borderBottomLeftRadius: 3,
  },
});
