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

import {
  Dimensions,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import PeopleCard from "@/components/PeopleCard";
import { Octicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import FilterModal from "../Screen/_filter";
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
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background }, // nền động
      ]}
    >
      <Header headerTitle={"Humble"} button={button} />
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
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    paddingHorizontal: 8,
  },
});
