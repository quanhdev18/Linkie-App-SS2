
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

// const { width, height } = Dimensions.get("window");

// const PeopleCard = ({ filterData }) => {
//   const [accountId, setAccountId] = useState(null);
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [locationNames, setLocationNames] = useState({});
//   const router = useRouter();

//   // 📍 lấy danh sách profiles
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

//   useEffect(() => {
//     const fetchLocationNames = async () => {
//       const updated = {};
//       for (const user of profiles) {
//         try {
//           const loc = await getLocationByAccountId(user.account_id);
//           if (loc && loc.latitude && loc.longitude) {
//             const locationName = await getLocationName(
//               loc.latitude,
//               loc.longitude
//             );

//             // 👇 Fix ở đây: backend trả về chuỗi, không có .address
//             updated[user.account_id] = locationName || "Không xác định";
//           } else {
//             updated[user.account_id] = "Không có vị trí";
//           }
//         } catch (error) {
//           console.log("Lỗi lấy vị trí:", error.message);
//           updated[user.account_id] = "Không xác định";
//         }
//       }
//       setLocationNames(updated);
//     };

//     if (profiles.length > 0) {
//       fetchLocationNames();
//     }
//   }, [profiles]);

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
// // });
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
// import { getProfiles, likeUser, getLikedUsers } from "../services/api";
// import { useRouter } from "expo-router";
// import useLocationNames from "../services/useLocationNames"; 

// const { width, height } = Dimensions.get("window");

// const PeopleCard = ({ filterData }) => {
//   const [accountId, setAccountId] = useState(null);
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // 2. Gọi custom hook để lấy tên vị trí một cách hiệu quả
//   const locationNames = useLocationNames(profiles);

//   // Lấy danh sách profiles
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true); // Bắt đầu loading khi fetch
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

//           const likedIds = new Set(likedUsers.map((item) => item.liked_id));

//           let dataFiltered = allProfiles.filter(
//             (user) =>
//               user.account_id !== parsedId && !likedIds.has(user.account_id)
//           );

//           if (filterData) {
//             dataFiltered = dataFiltered.filter((user) => {
//               const age =
//                 new Date().getFullYear() -
//                 new Date(user.date_of_birth).getFullYear();
//               const ageMatch = age >= filterData.minAge && age <= filterData.maxAge;
//               const genderMatch =
//                 !filterData.gender ||
//                 filterData.gender.length === 0 ||
//                 filterData.gender.includes(user.gender);
//               // ... các bộ lọc khác
//               return ageMatch && genderMatch;
//             });
//           }

//           setProfiles(dataFiltered);
//         }
//       } catch (error) {
//         console.log("Lỗi khi fetch profiles:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [filterData]);

//   // 3. XÓA TOÀN BỘ useEffect cũ để fetchLocationNames ở đây

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF385C" style={{ flex: 1 }} />;
//   }

//   if (profiles.length === 0) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Không có hồ sơ nào phù hợp.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         cards={profiles}
//         renderCard={(card) => {
//           if (!card) return null;

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
//             if (likerId) {
//               await likeUser(likedUser.account_id, parseInt(likerId));
//             }
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
//     height: height * 0.7,
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
//     // Không cần position absolute
//   },
//   leftLabel: {
//     //
//   },
//   rightLabel: {
//     //
//   },
// });
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Button, // Import Button for the "Try Again" feature
} from "react-native";
import Swiper from "react-native-deck-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    getProfiles, 
    likeUser, 
    getLikedUsers, 
    getLocationByAccountId, 
    getLocationName 
} from "../services/api";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const PeopleCard = ({ filterData }) => {
  const [accountId, setAccountId] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [locationNames, setLocationNames] = useState({});
  // 1. Sử dụng state 'status' để quản lý luồng một cách rõ ràng
  // Các trạng thái có thể là: 'loading', 'success', 'error', 'empty'
  const [status, setStatus] = useState('loading'); 
  const router = useRouter();

  // 2. Tách logic fetch data ra một hàm riêng, sử dụng useCallback để tối ưu
  const fetchAllData = useCallback(async () => {
    setStatus('loading'); // Bắt đầu quá trình, set trạng thái 'loading'
    try {
      // --- BƯỚC 1: LẤY PROFILES VÀ FILTER ---
      const token = await AsyncStorage.getItem("access_token");
      const id = await AsyncStorage.getItem("account_id");
      if (!id) {
        throw new Error("User ID not found in storage");
      }

      const parsedId = parseInt(id);
      setAccountId(parsedId);

      const [allProfiles, likedUsers] = await Promise.all([
        getProfiles(token),
        getLikedUsers(parsedId),
      ]);

      const likedIds = new Set(likedUsers.map((item) => item.liked_id));
      let filteredProfiles = allProfiles.filter(
        (user) =>
          user.account_id !== parsedId && !likedIds.has(user.account_id)
      );

      if (filterData) {
        filteredProfiles = filteredProfiles.filter((user) => {
          const age = new Date().getFullYear() - new Date(user.date_of_birth).getFullYear();
          const ageMatch = age >= filterData.minAge && age <= filterData.maxAge;
          const genderMatch = !filterData.gender || filterData.gender.length === 0 || filterData.gender.includes(user.gender);
          // Thêm các điều kiện filter khác nếu có
          return ageMatch && genderMatch;
        });
      }
      
      // --- BƯỚC 2: KIỂM TRA KẾT QUẢ VÀ SET STATUS TƯƠNG ỨNG ---
      if (filteredProfiles.length === 0) {
        setStatus('empty'); // Không có hồ sơ nào => set status 'empty' và dừng lại
        setProfiles([]); // Đảm bảo profiles là mảng rỗng
        return;
      }

      // Nếu có hồ sơ, cập nhật state
      setProfiles(filteredProfiles);

      // --- BƯỚC 3: LẤY VỊ TRÍ NẾU CÓ HỒ SƠ ---
      const locationPromises = filteredProfiles.map(async (user) => {
        try {
          const location = await getLocationByAccountId(user.account_id);
          if (location?.latitude && location?.longitude) {
            const name = await getLocationName(location.latitude, location.longitude);
            return [user.account_id, name || "Không rõ vị trí"];
          }
          return [user.account_id, "Không rõ vị trí"];
        } catch {
          return [user.account_id, "Không rõ vị trí"];
        }
      });

      const locationResults = await Promise.all(locationPromises);
      const newLocationNames = Object.fromEntries(locationResults);
      setLocationNames(newLocationNames);

      // --- BƯỚC 4: TẤT CẢ THÀNH CÔNG ---
      setStatus('success');

    } catch (error) {
      console.error("Error fetching data for PeopleCard:", error.message);
      setStatus('error'); // Nếu có bất kỳ lỗi nào, set status 'error'
    }
  }, [filterData]); // Phụ thuộc vào filterData để fetch lại khi filter thay đổi

  // Gọi hàm fetch khi component được mount hoặc khi filterData thay đổi
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // 3. Render giao diện dựa trên trạng thái 'status'
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" color="#FF385C" style={{ flex: 1 }} />;
      
      case 'error':
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đã xảy ra lỗi khi tải dữ liệu.</Text>
            <Button title="Thử lại" onPress={fetchAllData} color="#FF385C" />
          </View>
        );
      
      case 'empty':
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Không có hồ sơ nào phù hợp.</Text>
          </View>
        );

      case 'success':
        return (
          <Swiper
            cards={profiles}
            renderCard={(card) => {
              if (!card) return null;
              const age = new Date().getFullYear() - new Date(card.date_of_birth).getFullYear();
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
                        location: locationNames[card.account_id] || "Không rõ vị trí",
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
                          {locationNames[card.account_id] || "Không rõ vị trí"}
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
                if (likerId) {
                  await likeUser(likedUser.account_id, parseInt(likerId));
                }
              }
            }}
            infinite
            backgroundColor="transparent"
            cardVerticalMargin={10}
            stackSize={3}
            overlayLabels={{
              left: {
                title: <AntDesign name="close" size={100} color="red" />,
                style: { wrapper: styles.overlayWrapper },
              },
              right: {
                title: <Ionicons name="checkmark-circle-sharp" size={100} color="green" />,
                style: { wrapper: styles.overlayWrapper },
              },
            }}
            disableTopSwipe
            disableBottomSwipe
          />
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

export default PeopleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: 'center', 
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
  overlayWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

