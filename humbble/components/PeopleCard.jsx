// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import Swiper from "react-native-deck-swiper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   getProfiles,
//   likeUser,
//   getLikedUsers,
//   getLocationByAccountId,
//   getLocationName,
// } from "../services/api";
// import { useRouter } from "expo-router";
// import useLocationNames from "../services/useLocationNames";

// const { width, height } = Dimensions.get("window");

// const PeopleCard = ({ filterData }) => {
//   const [accountId, setAccountId] = useState(null);
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [locationNames, setLocationNames] = useState({});
//   const router = useRouter();
//   const locationNames = useLocationNames(profiles);

//   // lấy danh sách profiles
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const token = await AsyncStorage.getItem("access_token");
//         const id = await AsyncStorage.getItem("account_id");

//         if (id) {
//           const parsedId = parseInt(id);
//           setAccountId(parsedId);

//           const [allProfiles, likedUsers] = await Promise.all([
//             getProfiles(token),
//             getLikedUsers(parsedId),
//           ]);

//           const likedIds = likedUsers.map((item) => item.liked_id);

//           let dataFiltered = allProfiles.filter(
//             (user) =>
//               user.account_id !== parsedId &&
//               !likedIds.includes(user.account_id)
//           );

//           if (filterData) {
//             dataFiltered = dataFiltered.filter((user) => {
//               const age =
//                 new Date().getFullYear() -
//                 new Date(user.date_of_birth).getFullYear();

//               const ageMatch =
//                 age >= filterData.minAge && age <= filterData.maxAge;

//               const genderMatch =
//                 !filterData.gender ||
//                 filterData.gender.length === 0 ||
//                 filterData.gender.includes(user.gender);

//               const orientationMatch =
//                 !filterData.orientation ||
//                 filterData.orientation.length === 0 ||
//                 filterData.orientation.includes(user.orientation);

//               const relationshipMatch =
//                 !filterData.relationship ||
//                 filterData.relationship.length === 0 ||
//                 filterData.relationship.includes(user.relationship);

//               return (
//                 ageMatch && genderMatch && orientationMatch && relationshipMatch
//               );
//             });
//           }

//           setProfiles(dataFiltered);
//         }
//       } catch (error) {
//         console.log("Lỗi:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [filterData]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF385C" />;
//   }

//   if (profiles.length === 0) {
//     return (
//       <View style={{ alignItems: "center", marginTop: 50 }}>
//         <Text>Không có hồ sơ nào.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         cards={profiles}
//         renderCard={(card) => {
//           if (!card) return null;
//           // fetchLocationName(card.account_id);

//           const age =
//             new Date().getFullYear() -
//             new Date(card.date_of_birth).getFullYear();

//           return (

//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() =>
//                 router.push({
//                   pathname: "../../Screen/profile-detail",
//                   params: {
//                     id: card.account_id,
//                     name: card.username,
//                     age: age,
//                     location:
//                       locationNames[card.account_id] || "Đang tải vị trí...",
//                   },
//                 })
//               }
//             >
//               <View style={styles.card}>
//                 <ImageBackground
//                   source={{ uri: card.images[0]?.url }}
//                   style={styles.image}
//                 >
//                   <View style={styles.infoSection}>
//                     <Text style={styles.text}>
//                       {card.username}, {age}
//                     </Text>
//                     <Text style={styles.locationText}>
//                       {locationNames[card.account_id] || "Đang tải vị trí..."}
//                     </Text>
//                   </View>
//                 </ImageBackground>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//         onSwipedRight={async (index) => {
//           const likedUser = profiles[index];
//           if (likedUser) {
//             const likerId = await AsyncStorage.getItem("account_id");
//             await likeUser(likedUser.account_id, likerId);
//           }
//         }}
//         infinite
//         backgroundColor="transparent"
//         cardVerticalMargin={10}
//         stackSize={3}
//         overlayLabels={{
//           left: {
//             title: (
//               <View style={[styles.overlayLabel, styles.leftLabel]}>
//                 <AntDesign name="close" size={100} color="red" />
//               </View>
//             ),
//             style: {
//               wrapper: { justifyContent: "center", alignItems: "center" },
//             },
//           },
//           right: {
//             title: (
//               <View style={[styles.overlayLabel, styles.rightLabel]}>
//                 <Ionicons
//                   name="checkmark-circle-sharp"
//                   size={100}
//                   color="green"
//                 />
//               </View>
//             ),
//             style: {
//               wrapper: { justifyContent: "center", alignItems: "center" },
//             },
//           },
//         }}
//         disableTopSwipe
//         disableBottomSwipe
//       />
//     </View>
//   );
// };

// export default PeopleCard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   card: {
//     width: width * 0.9,
//     height: height * 0.8,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     elevation: 5,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "flex-end",
//   },
//   infoSection: {
//     width: "100%",
//     padding: 12,
//     backgroundColor: "rgba(0,0,0,0.6)",
//   },
//   text: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   locationText: {
//     color: "white",
//     fontSize: 16,
//     marginTop: 4,
//   },
//   overlayLabel: {
//     position: "absolute",
//     top: "50%",
//   },
//   leftLabel: {
//     left: 30,
//   },
//   rightLabel: {
//     right: 30,
//   },
// });
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getProfiles,
  likeUser,
  getLikedUsers,
  getLocationByAccountId,
  getLocationName,
} from "../services/api";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const PeopleCard = ({ filterData }) => {
  const [accountId, setAccountId] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationNames, setLocationNames] = useState({});
  const router = useRouter();

  // 📍 lấy danh sách profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const id = await AsyncStorage.getItem("account_id");

        if (id) {
          const parsedId = parseInt(id);
          setAccountId(parsedId);

          const [allProfiles, likedUsers] = await Promise.all([
            getProfiles(token),
            getLikedUsers(parsedId),
          ]);

          const likedIds = likedUsers.map((item) => item.liked_id);

          let dataFiltered = allProfiles.filter(
            (user) =>
              user.account_id !== parsedId &&
              !likedIds.includes(user.account_id)
          );

          if (filterData) {
            dataFiltered = dataFiltered.filter((user) => {
              const age =
                new Date().getFullYear() -
                new Date(user.date_of_birth).getFullYear();

              const ageMatch =
                age >= filterData.minAge && age <= filterData.maxAge;

              const genderMatch =
                !filterData.gender ||
                filterData.gender.length === 0 ||
                filterData.gender.includes(user.gender);

              const orientationMatch =
                !filterData.orientation ||
                filterData.orientation.length === 0 ||
                filterData.orientation.includes(user.orientation);

              const relationshipMatch =
                !filterData.relationship ||
                filterData.relationship.length === 0 ||
                filterData.relationship.includes(user.relationship);

              return (
                ageMatch && genderMatch && orientationMatch && relationshipMatch
              );
            });
          }

          setProfiles(dataFiltered);
        }
      } catch (error) {
        console.log("Lỗi:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filterData]);

  // 📍 lấy tên địa điểm từng user
  // useEffect(() => {
  //   const fetchLocationNames = async () => {
  //     const updated = {};
  //     for (const user of profiles) {
  //       try {
  //         // Lấy toạ độ theo account_id
  //         const loc = await getLocationByAccountId(user.account_id);
  //         if (loc && loc.latitude && loc.longitude) {
  //           const locationData = await getLocationName(
  //             loc.latitude,
  //             loc.longitude
  //           );
  //           updated[user.account_id] = locationData.address || "Không xác định";
  //         } else {
  //           updated[user.account_id] = "Không có vị trí";
  //         }
  //       } catch (error) {
  //         console.log("Lỗi lấy vị trí:", error.message);
  //         updated[user.account_id] = "Không xác định";
  //       }
  //     }
  //     setLocationNames(updated);
  //   };

  //   if (profiles.length > 0) {
  //     fetchLocationNames();
  //   }
  // }, [profiles]);
  // 📍 lấy tên địa điểm từng user
  useEffect(() => {
    const fetchLocationNames = async () => {
      const updated = {};
      for (const user of profiles) {
        try {
          const loc = await getLocationByAccountId(user.account_id);
          if (loc && loc.latitude && loc.longitude) {
            const locationName = await getLocationName(
              loc.latitude,
              loc.longitude
            );

            // 👇 Fix ở đây: backend trả về chuỗi, không có .address
            updated[user.account_id] = locationName || "Không xác định";
          } else {
            updated[user.account_id] = "Không có vị trí";
          }
        } catch (error) {
          console.log("Lỗi lấy vị trí:", error.message);
          updated[user.account_id] = "Không xác định";
        }
      }
      setLocationNames(updated);
    };

    if (profiles.length > 0) {
      fetchLocationNames();
    }
  }, [profiles]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF385C" />;
  }

  if (profiles.length === 0) {
    return (
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text>Không có hồ sơ nào.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={(card) => {
          if (!card) return null;

          const age =
            new Date().getFullYear() -
            new Date(card.date_of_birth).getFullYear();

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "../../Screen/profile-detail",
                  params: {
                    id: card.account_id,
                    name: card.username,
                    age: age,
                    location:
                      locationNames[card.account_id] || "Đang tải vị trí...",
                  },
                })
              }
            >
              <View style={styles.card}>
                <ImageBackground
                  source={{ uri: card.images[0]?.url }}
                  style={styles.image}
                >
                  <View style={styles.infoSection}>
                    <Text style={styles.text}>
                      {card.username}, {age}
                    </Text>
                    <Text style={styles.locationText}>
                      {locationNames[card.account_id] || "Đang tải vị trí..."}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          );
        }}
        onSwipedRight={async (index) => {
          const likedUser = profiles[index];
          if (likedUser) {
            const likerId = await AsyncStorage.getItem("account_id");
            await likeUser(likedUser.account_id, likerId);
          }
        }}
        infinite
        backgroundColor="transparent"
        cardVerticalMargin={10}
        stackSize={3}
        overlayLabels={{
          left: {
            title: (
              <View style={[styles.overlayLabel, styles.leftLabel]}>
                <AntDesign name="close" size={100} color="red" />
              </View>
            ),
            style: {
              wrapper: { justifyContent: "center", alignItems: "center" },
            },
          },
          right: {
            title: (
              <View style={[styles.overlayLabel, styles.rightLabel]}>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={100}
                  color="green"
                />
              </View>
            ),
            style: {
              wrapper: { justifyContent: "center", alignItems: "center" },
            },
          },
        }}
        disableTopSwipe
        disableBottomSwipe
      />
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.9,
    height: height * 0.8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  infoSection: {
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  locationText: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },
  overlayLabel: {
    position: "absolute",
    top: "50%",
  },
  leftLabel: {
    left: 30,
  },
  rightLabel: {
    right: 30,
  },
});
