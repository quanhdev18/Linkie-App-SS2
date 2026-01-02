// import {
//   Dimensions,
//   StyleSheet,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import PeopleCard from "@/components/PeopleCard";
// import { Octicons } from "@expo/vector-icons";
// import Header from "@/components/Header";
// import FilterModal from "../Screen/_filter";

// const People = () => {
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [filterData, setFilterData] = useState(null);

//   const button = () => (
//     <Octicons
//       name="filter"
//       size={24}
//       color="black"
//       onPress={() => setFilterVisible(true)}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Header headerTitle={"Humble"} button={button} />
//       <PeopleCard filterData={filterData} />

//       <FilterModal
//         visible={filterVisible}
//         onClose={() => setFilterVisible(false)}
//         onApply={(data) => {
//           setFilterData(data);
//           setFilterVisible(false);
//         }}
//       />
//     </View>
//   );
// };

// export default People;

// const styles = StyleSheet.create({
//   container: {
//     height: Dimensions.get("screen").height,
//     width: Dimensions.get("screen").width,
//     paddingHorizontal: 8,
//   },
// });

// import {
//   Dimensions,
//   StyleSheet,
//   View,
//   useColorScheme,
// } from "react-native";
// import React, { useState } from "react";
// import PeopleCard from "@/components/PeopleCard";
// import { Octicons } from "@expo/vector-icons";
// import Header from "@/components/Header";
// import FilterModal from "../Screen/_filter";
// import { Colors } from "@/constants/Colors";

// const People = () => {
//   const colorScheme = useColorScheme();
//   const themeColors = Colors[colorScheme ?? "light"];

//   const [filterVisible, setFilterVisible] = useState(false);
//   const [filterData, setFilterData] = useState(null);

//   const button = () => (
//     <Octicons
//       name="filter"
//       size={24}
//       color={themeColors.text} // icon theo theme
//       onPress={() => setFilterVisible(true)}
//     />
//   );

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: themeColors.background }, // nền động
//       ]}
//     >
//       <Header headerTitle={"Humble"} button={button} />
//       <PeopleCard filterData={filterData} />

//       <FilterModal
//         visible={filterVisible}
//         onClose={() => setFilterVisible(false)}
//         onApply={(data) => {
//           setFilterData(data);
//           setFilterVisible(false);
//         }}
//       />
//     </View>
//   );
// };

// export default People;

// const styles = StyleSheet.create({
//   container: {
//     height: Dimensions.get("screen").height,
//     width: Dimensions.get("screen").width,
//     paddingHorizontal: 8,
//   },
// });
import {
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import PeopleCard from "@/components/PeopleCard";
import { Octicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import FilterModal from "../screens/_filter";
import { Colors } from "@/constants/Colors";

const People = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState(null);

  const button = () => (
    <Octicons
      name="filter"
      size={24}
      color={themeColors.text} // icon theo theme
      onPress={() => setFilterVisible(true)}
    />
  );

  return (
    // ===== SỬA LẠI CONTAINER CHÍNH =====
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      {/* Áp dụng padding cho Header và các nội dung khác ở đây */}
      <View style={{ paddingHorizontal: 18 }}>
        <Header headerTitle={"Humble"} button={button} />
      </View>

      {/* PeopleCard sẽ chiếm toàn bộ không gian còn lại và tự căn giữa */}
      <PeopleCard filterData={filterData} />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(data) => {
          setFilterData(data);
          setFilterVisible(false);
        }}
      />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});