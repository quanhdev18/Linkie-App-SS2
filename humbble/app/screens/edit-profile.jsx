// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import DropdownModal from "./dropdownModal";
// import {
//   uploadProfileImage,
//   getProfileImage,
//   getProfileById,
//   updateProfile,
//   deleteProfileImage,
//   getAvatarImage,
//   uploadAvatar,
//   deleteAvatarImage,
//   requestPose,
// } from "../../services/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { useCallback } from "react";
// import { useRouter } from "expo-router";

// const EditProfile = () => {
//   const maxLength = 500;
//   const [photos, setPhotos] = useState(Array(6).fill(null));
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [aboutText, setAboutText] = useState("");
//   const [accountId, setAccountId] = useState(null);
//   const [profileId, setProfileId] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [avatarUri, setAvatarUri] = useState(null);
//   const [avatarId, setAvatarId] = useState(null);
//   const [height, setHeight] = useState("");
//   const [job, setJob] = useState("");
//   const [education, setEducation] = useState("");
//   const navigation = useNavigation();
//   const router = useRouter();

//   const pickImage = async () => {
//     if (!profileId) {
//       Toast.show({
//         type: "error",
//         text1: "Chưa sẵn sàng để tải ảnh",
//         text2: "Vui lòng đợi tải xong hồ sơ rồi thử lại",
//       });
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       selectionLimit: 6,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const selectedUris = result.assets.map((a) => a.uri);
//       const newPhotos = [...photos];
//       let insertIndex = 0;
//       for (
//         let i = 0;
//         i < newPhotos.length && insertIndex < selectedUris.length;
//         i++
//       ) {
//         if (newPhotos[i] === null) {
//           newPhotos[i] = selectedUris[insertIndex++];
//         }
//       }
//       setPhotos(newPhotos);

//       try {
//         await uploadProfileImage(profileId, selectedUris);
//         console.log("Uploaded multiple profile images thành công");
//       } catch (error) {
//         console.error("Lỗi upload ảnh:", error.message);
//         Toast.show({
//           type: "error",
//           text1: "Lỗi upload ảnh",
//           text2: error.message,
//         });
//       }
//     }
//   };

//   const removePhoto = async (index) => {
//     const photo = photos[index];
//     if (!photo || !photo.id) return; // Không làm gì nếu ô trống

//     const newPhotos = [...photos];
//     newPhotos[index] = null;
//     setPhotos(newPhotos);

//     try {
//       if (photo.isAvatar) {
//         // NẾU LÀ AVATAR, GỌI HÀM XOÁ AVATAR
//         await deleteAvatarImage(photo.id); // Đồng bộ state của avatar lớn
//         setAvatarUri(null);
//         setAvatarId(null);
//         console.log("Đã xoá avatar khỏi DB (từ lưới ảnh)");
//       } else {
//         // NẾU LÀ ẢNH PROFILE, GỌI HÀM XOÁ PROFILE
//         await deleteProfileImage(photo.id);
//         console.log("Đã xoá ảnh profile khỏi DB");
//       }
//     } catch (error) {
//       console.error("Lỗi xoá ảnh:", error.message); // Khôi phục lại ảnh nếu xoá thất bại
//       newPhotos[index] = photo;
//       setPhotos(newPhotos);
//     }
//   };

//   const pickAvatar = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false, // <--- ĐÃ SỬA Ở ĐÂY
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const localUri = result.assets[0].uri; // Cập nhật state tạm thời để hiển thị ảnh local ngay lập tức

//       const tempPhotos = [...photos];
//       tempPhotos[0] = {
//         uri: localUri,
//         id: avatarId, // Tạm giữ id cũ
//         isAvatar: true,
//       };
//       setPhotos(tempPhotos);
//       setAvatarUri(localUri); // Cập nhật state (đã bị ẩn)

//       try {
//         // Tải ảnh lên server
//         const res = await uploadAvatar(profileId, localUri); // 'res' là object ảnh mới, giả sử có { id, title }

//         const serverAvatarUrl = getAvatarImage(res.title);
//         setAvatarId(res.id);
//         // setAvatarUri(serverAvatarUrl); // Cập nhật state (đã bị ẩn) // Cập nhật lưới ảnh với URL VÀ ID chính xác từ server

//         const finalPhotos = [...tempPhotos]; // Dùng tempPhotos làm gốc
//         finalPhotos[0] = {
//           uri: serverAvatarUrl, // Cập nhật URL từ server
//           id: res.id, // Cập nhật ID mới từ server
//           isAvatar: true,
//         };
//         setPhotos(finalPhotos);

//         Toast.show({
//           type: "success",
//           text1: "Đã cập nhật avatar!",
//         });
//       } catch (error) {
//         console.log("Lỗi upload avatar:", error); // Nếu lỗi, trả lại ảnh cũ
//         setPhotos(photos); // Chỗ này nên sửa lại là: setPhotos(prevPhotos => prevPhotos) hoặc lấy state gốc trước khi pick
//         setAvatarUri(photos[0] ? photos[0].uri : null);

//         Toast.show({
//           type: "error",
//           text1: "Lỗi upload avatar",
//         });
//       }
//     }
//   };

//   const removeAvatar = async () => {
//     if (!avatarId) return;

//     try {
//       await deleteAvatarImage(avatarId);
//       setAvatarUri(null);
//       setAvatarId(null);

//       Toast.show({
//         type: "success",
//         text1: "Đã xoá avatar!",
//       });
//     } catch (error) {
//       console.log("Lỗi xoá avatar:", error);
//     }
//   };

//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentField, setCurrentField] = useState("");
//   const [selectedValues, setSelectedValues] = useState({
//     hobby: [],
//     height: [],
//     purpose: [],
//     gender: [],
//     zodiac: [],
//     job: [], // <--- thêm
//     education: [],
//   });

//   const GENDER_OPTIONS = {
//     male: "Nam",
//     female: "Nữ",
//   };

//   const HOBBY_OPTIONS = {
//     listening_to_music: "Nghe nhạc",
//     singing: "Hát",
//     playing_guitar: "Chơi guitar",
//     running: "Chạy bộ",
//     yoga: "Yoga",
//     reading: "Đọc sách",
//     cooking: "Nấu ăn",
//     photography: "Chụp ảnh",
//     traveling: "Du lịch",
//     video_games: "Chơi game",
//     dog_lover: "Yêu chó",
//     meditation: "Thiền",
//     fashion: "Thời trang",
//     blogging: "Viết blog",
//   };

//   const ZODIAC_MAP = {
//     "Bạch Dương": "aries",
//     "Kim Ngưu": "taurus",
//     "Song Tử": "gemini",
//     "Cự Giải": "cancer",
//     "Sư Tử": "leo",
//     "Xử Nữ": "virgo",
//     "Thiên Bình": "libra",
//     "Bọ Cạp": "scorpio",
//     "Nhân Mã": "sagittarius",
//     "Ma Kết": "capricorn",
//     "Bảo Bình": "aquarius",
//     "Song Ngư": "pisces",
//   };

//   const OPTIONS_MAP = {
//     hobby: Object.values(HOBBY_OPTIONS),
//     // height: ["1m50-1m60", "1m60-1m70", "1m70-1m80", "Trên 1m80"],
//     purpose: [
//       "Người yêu",
//       "Một người bạn đời",
//       "Quan hệ không ràng buộc",
//       "Những người bạn mới",
//       "Mình cũng chưa rõ lắm",
//     ],
//     gender: Object.values(GENDER_OPTIONS),
//     zodiac: [
//       "Bạch Dương",
//       "Kim Ngưu",
//       "Song Tử",
//       "Cự Giải",
//       "Sư Tử",
//       "Xử Nữ",
//       "Thiên Bình",
//       "Bọ Cạp",
//       "Nhân Mã",
//       "Ma Kết",
//       "Bảo Bình",
//       "Song Ngư",
//     ],
//   };
//   const getKeyByValue = (obj, value) => {
//     return Object.keys(obj).find((key) => obj[key] === value);
//   };

//   const openModal = (field) => {
//     setCurrentField(field);
//     setModalVisible(true);
//   };

//   const handleSelect = (values) => {
//     const stringValues = unformatOptions(values);
//     setSelectedValues((prev) => ({ ...prev, [currentField]: stringValues }));
//   };

//   const fields = [
//     {
//       field: "gender",
//       label: "Giới tính",
//       icon: "male-female-outline",
//       buttonText: "Thêm giới tính",
//     },
//     {
//       field: "hobby",
//       label: "Sở thích",
//       icon: "sparkles-outline",
//       buttonText: "Thêm sở thích",
//     },
//     {
//       field: "purpose",
//       label: "Mục đích hẹn hò",
//       icon: "leaf-outline",
//       buttonText: "Thêm mục đích hẹn hò",
//     },
//     {
//       field: "zodiac",
//       label: "Cung hoàng đạo",
//       icon: "heart-outline",
//       buttonText: "Thêm cung hoàng đạo",
//     },
//     {
//       field: "height",
//       label: "Chiều cao ",
//       type: "text",
//       // icon: "resize-outline",
//       // buttonText: "Thêm chiều cao",
//     },

//     {
//       field: "job",
//       label: "Công việc",
//       type: "text",
//       // icon: "heart-outline",
//       // buttonText: "Thêm công việc",
//     },
//     {
//       field: "education",
//       label: "Học vấn",
//       type: "text",
//       // icon: "heart-outline",
//       // buttonText: "Thêm học vấn",
//     },
//   ];

//   const handleApply = async () => {
//     try {
//       const selectedZodiacVi = selectedValues.zodiac[0];
//       const zodiacKey = selectedZodiacVi ? ZODIAC_MAP[selectedZodiacVi] : null;

//       const updateData = {
//         username: profile?.username ?? "",
//         bio: aboutText,
//         gender: getKeyByValue(GENDER_OPTIONS, selectedValues.gender[0]) || null,
//         target_type: selectedValues.purpose[0] || null,
//         hobby: selectedValues.hobby.map((vi) =>
//           getKeyByValue(HOBBY_OPTIONS, vi)
//         ),
//         zodiac_sign: zodiacKey,
//         height,
//         job,
//         education,
//       };
//       const result = await updateProfile(profileId, updateData);
//       Toast.show({
//         type: "success",
//         text1: "Cập nhật thành công!",
//         position: "top",
//         visibilityTime: 3000,
//         topOffset: 50,
//       });
//     } catch (error) {
//       alert("Lỗi cập nhật: " + error.message);
//     }
//   };

//   const handleVerifyProfile = async () => {
//     try {
//       // Lấy account_id trực tiếp từ AsyncStorage giống PreviewProfile
//       const accountId = await AsyncStorage.getItem("account_id");

//       if (!accountId) {
//         return Toast.show({
//           type: "error",
//           text1: "Lỗi",
//           text2: "Không tìm thấy account_id",
//         });
//       }

//       // ⬇️ Gọi API request pose
//       const data = await requestPose(accountId);

//       router.push({
//         // pathname: "/screens/VerificationCameraScreen", 
//         pathname: "/(verify)/VerificationCameraScreen",
//         params: {
//           poseSampleImage: data.pose_sample_image,
//           poseKey: data.pose_key,
//           accountId: accountId,
//         },
//       });
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Lỗi",
//         text2:
//           typeof error === "string"
//             ? error
//             : JSON.stringify(error.detail || error.message || error),
//       });
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const fetchProfile = async () => {
//         try {
//           const id = await AsyncStorage.getItem("profile_id");
//           if (!id) throw new Error("Không tìm thấy profileId");
//           setProfileId(id);
//           const data = await getProfileById(id);

//           let mainAvatarUrl = null;
//           let mainAvatarId = null;

//           // ======================= PHẦN SỬA =======================
//           // 1. Đồng bộ logic lấy Avatar giống hệt component Profile (đang chạy đúng)
//           //    Chúng ta dùng data.avatar.title thay vì data.avatar.id
//           if (data.avatar && data.avatar.title) {
//             mainAvatarUrl = getAvatarImage(data.avatar.title); // Dùng .title
//             mainAvatarId = data.avatar.id; // Nhưng vẫn lưu .id để xoá
//           }

//           // Cập nhật state cho avatar LỚN
//           setAvatarUri(mainAvatarUrl);
//           setAvatarId(mainAvatarId);
//           // ===================== HẾT PHẦN SỬA =====================

//           // 2. Lấy các ảnh profile (Giữ nguyên logic của bạn)
//           const profileImagesUrls = [];
//           if (data.images && data.images.length > 0) {
//             for (const img of data.images) {
//               const url = await getProfileImage(img.title);
//               profileImagesUrls.push({ uri: url, id: img.id });
//             }
//           }

//           // 3. Gộp lại: avatar ở vị trí đầu tiên, sau đó 5 ảnh profile
//           //    SỬA Ở ĐÂY: Dùng 'mainAvatarUrl' vừa lấy được ở trên
//           const mergedPhotos = [
//             mainAvatarUrl
//               ? { uri: mainAvatarUrl, id: mainAvatarId, isAvatar: true }
//               : null,
//             ...profileImagesUrls.slice(0, 5),
//           ];

//           const getZodiacViByEn = (enKey) => {
//             const [viKey] =
//               Object.entries(ZODIAC_MAP).find(([key, val]) => val === enKey) ||
//               [];
//             return viKey;
//           };

//           // 4. Bổ sung cho đủ 6 ô
//           while (mergedPhotos.length < 6) mergedPhotos.push(null);

//           // 5. Cập nhật UI cho LƯỚI ẢNH
//           setPhotos(mergedPhotos);

//           // (Phần còn lại giữ nguyên)
//           setProfileData(data);
//           setAboutText(data.bio || "");
//           setSelectedValues((prev) => ({
//             ...prev,
//             gender: data.gender ? [GENDER_OPTIONS[data.gender]] : [],
//             purpose: data.target_type ? [data.target_type] : [],
//             hobby: (data.hobby || []).map((item) => HOBBY_OPTIONS[item]),
//             zodiac: data.zodiac_sign ? [getZodiacViByEn(data.zodiac_sign)] : [],
//           }));
//           setHeight(data.height ? String(data.height) : "");
//           setJob(data.job || "");
//           setEducation(data.education || "");
//         } catch (error) {
//           console.log("Lỗi khi lấy profile:", error.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProfile();
//     }, [])
//   );

//   const formatOptions = (optionsArray) => {
//     if (!Array.isArray(optionsArray)) return [];
//     return optionsArray.map((item) => ({ label: item, value: item }));
//   };

//   const unformatOptions = (objectsArray) => {
//     if (!Array.isArray(objectsArray)) return [];
//     return objectsArray.map((item) => item.value);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {loading ? (
//         <Text>Đang tải dữ liệu...</Text>
//       ) : (
//         <>
//           {/* Ảnh */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Ảnh</Text>

//             <View style={styles.imageGrid}>
//               {photos.map((photo, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.imageBox}
//                   onPress={() => {
//                     if (index === 0) {
//                       // Ô đầu tiên (Slot 0) luôn là AVATAR
//                       pickAvatar();
//                     } else if (!photo) {
//                       // Các ô khác (Slot 1-5) CHỈ hoạt động khi bị trống
//                       pickImage();
//                     }
//                   }}
//                 >
//                   {photo ? (
//                     <>
//                       <Image
//                         source={{
//                           uri: typeof photo === "string" ? photo : photo.uri,
//                         }}
//                         style={styles.photo}
//                       />
//                       <TouchableOpacity
//                         style={styles.removeButton}
//                         onPress={() => removePhoto(index)}
//                       >
//                         <Text style={styles.removeText}>×</Text>
//                       </TouchableOpacity>
//                     </>
//                   ) : (
//                     <Text style={styles.imageText}>+</Text>
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles.verifyButton}
//             onPress={handleVerifyProfile}
//           >
//             <View style={styles.buttonContent}>
//               <Ionicons
//                 name="shield-checkmark-outline"
//                 size={20}
//                 color="#007AFF"
//                 style={styles.icon}
//               />
//               <Text style={styles.verifyButtonText}>Xác thực hồ sơ</Text>
//               <Ionicons
//                 name="chevron-forward-outline"
//                 size={16}
//                 color="#007AFF"
//               />
//             </View>
//           </TouchableOpacity>

//           {/* Giới thiệu bản thân */}
//           <View style={styles.section}>
//             <Text style={styles.label}>Giới thiệu bản thân</Text>
//             <View style={styles.inputWrapper}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Viết gì đó..."
//                 multiline
//                 maxLength={maxLength}
//                 value={aboutText}
//                 onChangeText={setAboutText}
//               />
//               <Text style={styles.charCount}>
//                 {maxLength - aboutText.length}
//               </Text>
//             </View>
//           </View>
//           {/* Các trường như hobby, gender, purpose... */}
//           {fields.map((item, idx) => (
//             <View key={idx} style={styles.section}>
//               <Text style={styles.label}>{item.label}</Text>
//               {item.type === "text" ? (
//                 <View style={styles.textInputWrapper}>
//                   <Ionicons
//                     name={
//                       item.field === "height"
//                         ? "resize-outline"
//                         : item.field === "job"
//                         ? "briefcase-outline"
//                         : "school-outline"
//                     }
//                     size={18}
//                     color="#555"
//                     style={styles.textInputIcon}
//                   />
//                   <TextInput
//                     style={styles.textInputField}
//                     placeholder={"Thêm " + item.label.toLowerCase()}
//                     value={
//                       item.field === "height"
//                         ? height
//                         : item.field === "job"
//                         ? job
//                         : education
//                     }
//                     onChangeText={(txt) => {
//                       if (item.field === "height") setHeight(txt);
//                       if (item.field === "job") setJob(txt);
//                       if (item.field === "education") setEducation(txt);
//                     }}
//                   />
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   style={styles.selectButton}
//                   onPress={() => openModal(item.field)}
//                 >
//                   <View style={styles.buttonContent}>
//                     <Ionicons
//                       name={item.icon}
//                       size={18}
//                       color="#555"
//                       style={styles.icon}
//                     />
//                     <Text
//                       style={styles.selectButtonText}
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                     >
//                       {(selectedValues[item.field] || []).length > 0
//                         ? (selectedValues[item.field] || []).join(", ")
//                         : item.buttonText}
//                     </Text>

//                     <Ionicons
//                       name="chevron-forward-outline"
//                       size={16}
//                       color="#000"
//                       style={styles.buttonIcon}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}

//           <DropdownModal
//             visible={modalVisible}
//             onClose={() => setModalVisible(false)}
//             title={fields.find((f) => f.field === currentField)?.label || ""}
//             // Áp dụng định dạng cho options và selectedOptions
//             options={formatOptions(OPTIONS_MAP[currentField] || [])}
//             selectedOptions={formatOptions(selectedValues[currentField] || [])}
//             onSelect={handleSelect} // Giữ nguyên, vì đã sửa handleSelect ở trên
//             isMulti={currentField === "hobby"}
//           />
//           {/* Nút áp dụng */}
//           <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
//             <Text style={styles.applyButtonText}>Áp dụng</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 6,
//     fontWeight: "bold",
//   },
//   imageGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     justifyContent: "center",
//   },
//   imageBox: {
//     width: "30%",
//     height: 40,
//     aspectRatio: 1,
//     backgroundColor: "#f8f8f8",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//     overflow: "hidden",
//   },
//   imageText: {
//     fontSize: 30,
//     color: "#999",
//   },
//   photo: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   removeButton: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   removeText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },

//   inputWrapper: {
//     position: "relative",
//   },
//   input: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     paddingBottom: 28,
//     minHeight: 100,
//     textAlignVertical: "top",
//     fontSize: 16,
//     backgroundColor: "#f8f8f8",
//   },
//   charCount: {
//     position: "absolute",
//     bottom: 8,
//     right: 12,
//     fontSize: 12,
//     color: "#888",
//     marginTop: 4,
//   },
//   selectButton: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#555",
//   },
//   selectButtonText: {
//     flex: 1,
//     textAlign: "left",
//     color: "#000",
//     fontSize: 16,
//   },
//   labelRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginRight: 6,
//   },

//   buttonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   buttonIcon: {
//     // marginLeft: 100,
//   },
//   applyButton: {
//     margin: 20,
//     backgroundColor: "pink",
//     paddingVertical: 12,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   textInputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#555",
//     borderRadius: 8,
//     paddingLeft: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     marginTop: 6,
//     backgroundColor: "#fff",
//   },
//   textInputIcon: {
//     marginRight: 8,
//   },
//   textInputField: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 0,
//     color: "black",
//   },
//   verifyButton: {
//     backgroundColor: "#E6F7FF",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#B3E0FF",
//   },
//   verifyButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#007AFF",
//     flex: 1,
//     textAlign: "left",
//   },
// });

// export default EditProfile;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DropdownModal from "./dropdownModal";
import {
  uploadProfileImage,
  getProfileImage,
  getProfileById,
  updateProfile,
  deleteProfileImage,
} from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const EditProfile = () => {
  const maxLength = 500;
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutText, setAboutText] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [profile, setProfile] = useState(null);

  const pickImage = async () => {
    if (!profileId) {
      Toast.show({
        type: "error",
        text1: "Chưa sẵn sàng để tải ảnh",
        text2: "Vui lòng đợi tải xong hồ sơ rồi thử lại",
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 6,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((a) => a.uri);
      const newPhotos = [...photos];
      let insertIndex = 0;
      for (
        let i = 0;
        i < newPhotos.length && insertIndex < selectedUris.length;
        i++
      ) {
        if (newPhotos[i] === null) {
          newPhotos[i] = selectedUris[insertIndex++];
        }
      }
      setPhotos(newPhotos);

      try {
        await uploadProfileImage(profileId, selectedUris);
        console.log("Uploaded multiple profile images thành công");
      } catch (error) {
        console.error("Lỗi upload ảnh:", error.message);
        Toast.show({
          type: "error",
          text1: "Lỗi upload ảnh",
          text2: error.message,
        });
      }
    }
  };

  const removePhoto = async (index) => {
    const photo = photos[index];
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);

    if (photo && typeof photo === "object" && photo.id) {
      try {
        await deleteProfileImage(photo.id);
        console.log("Đã xoá ảnh khỏi DB");
      } catch (error) {
        console.error("Lỗi xoá ảnh:", error.message);
      }
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    hobby: [],
    height: [],
    purpose: [],
    gender: [],
    orientation: [],
  });

  const GENDER_OPTIONS = {
    male: "Nam",
    female: "Nữ",
  };

  const HOBBY_OPTIONS = {
    listening_to_music: "Nghe nhạc",
    singing: "Hát",
    playing_guitar: "Chơi guitar",
    running: "Chạy bộ",
    yoga: "Yoga",
    reading: "Đọc sách",
    cooking: "Nấu ăn",
    photography: "Chụp ảnh",
    traveling: "Du lịch",
    video_games: "Chơi game",
    dog_lover: "Yêu chó",
    meditation: "Thiền",
    fashion: "Thời trang",
    blogging: "Viết blog",
  };
  const OPTIONS_MAP = {
    hobby: Object.values(HOBBY_OPTIONS),
    height: ["1m50-1m60", "1m60-1m70", "1m70-1m80", "Trên 1m80"],
    purpose: [
      "Người yêu",
      "Một người bạn đời",
      "Quan hệ không ràng buộc",
      "Những người bạn mới",
      "Mình cũng chưa rõ lắm",
    ],
    gender: Object.values(GENDER_OPTIONS),
    orientation: ["Dị tính", "Đồng tính", "Song tính", "Chưa rõ"],
  };
  const getKeyByValue = (obj, value) => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  const openModal = (field) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const handleSelect = (values) => {
    const stringValues = unformatOptions(values); 
    setSelectedValues((prev) => ({ ...prev, [currentField]: stringValues }));
  };

  const fields = [
    {
      field: "gender",
      label: "Giới tính",
      icon: "male-female-outline",
      buttonText: "Thêm giới tính",
    },
    {
      field: "hobby",
      label: "Sở thích",
      icon: "sparkles-outline",
      buttonText: "Thêm sở thích",
    },
    {
      field: "purpose",
      label: "Mục đích hẹn hò (comming soon)",
      icon: "leaf-outline",
      buttonText: "Thêm mục đích hẹn hò",
    },
    {
      field: "height",
      label: "Chiều cao (comming soon)",
      icon: "resize-outline",
      buttonText: "Thêm chiều cao",
    },
    {
      field: "orientation",
      label: "Khuynh hướng hẹn hò (comming soon)",
      icon: "heart-outline",
      buttonText: "Thêm khuynh hướng hẹn hò",
    },
  ];

  const handleApply = async () => {
    try {
      const updateData = {
        username: profile?.username ?? "",
        bio: aboutText,
        gender: getKeyByValue(GENDER_OPTIONS, selectedValues.gender[0]) || null,
        target_type: selectedValues.purpose[0] || null,
        hobby: selectedValues.hobby.map((vi) =>
          getKeyByValue(HOBBY_OPTIONS, vi)
        ),
      };
      const result = await updateProfile(profileId, updateData);
      Toast.show({
        type: "success",
        text1: "Cập nhật thành công!",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
    } catch (error) {
      alert("Lỗi cập nhật: " + error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const id = await AsyncStorage.getItem("profile_id");
          if (!id) throw new Error("Không tìm thấy profileId");
          setProfileId(id);
          const data = await getProfileById(id);
          const profileImagesUrls = [];

          if (data.images && data.images.length > 0) {
            for (const imageObj of data.images) {
              console.log("Đang tải ảnh với filename:", imageObj.title);
              const url = await getProfileImage(imageObj.title);
              profileImagesUrls.push({ uri: url, id: imageObj.id });
            }
          }

          setPhotos([
            ...profileImagesUrls,
            ...Array(6 - profileImagesUrls.length).fill(null),
          ]);

          setProfileData(data);
          setAboutText(data.bio || "");
          setSelectedValues((prev) => ({
            ...prev,
            gender: data.gender ? [GENDER_OPTIONS[data.gender]] : [],
            purpose: data.target_type ? [data.target_type] : [],
            hobby: (data.hobby || []).map((item) => HOBBY_OPTIONS[item]),
          }));
        } catch (error) {
          console.log("Lỗi khi lấy profile:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [])
  );

  const formatOptions = (optionsArray) => {
    if (!Array.isArray(optionsArray)) return [];
    return optionsArray.map((item) => ({ label: item, value: item }));
  };

  const unformatOptions = (objectsArray) => {
    if (!Array.isArray(objectsArray)) return [];
    return objectsArray.map((item) => item.value);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : (
        <>
          {/* Ảnh */}
          <View style={styles.section}>
            <Text style={styles.label}>Ảnh</Text>
            <View style={styles.imageGrid}>
              {photos.map((photo, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageBox}
                  onPress={photo ? () => {} : pickImage}
                >
                  {photo ? (
                    <>
                      <Image
                        source={{
                          uri: typeof photo === "string" ? photo : photo.uri,
                        }}
                        style={styles.photo}
                      />
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removePhoto(index)}
                      >
                        <Text style={styles.removeText}>×</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.imageText}>+</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Giới thiệu bản thân */}
          <View style={styles.section}>
            <Text style={styles.label}>Giới thiệu bản thân</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Viết gì đó..."
                multiline
                maxLength={maxLength}
                value={aboutText}
                onChangeText={setAboutText}
              />
              <Text style={styles.charCount}>
                {maxLength - aboutText.length}
              </Text>
            </View>
          </View>
          {/* Các trường như hobby, gender, purpose... */}
          {fields.map((item, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.label}>{item.label}</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => openModal(item.field)}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color="#555"
                    style={styles.icon}
                  />
                  <Text
                    style={styles.selectButtonText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {(selectedValues[item.field] || []).length > 0
                      ? (selectedValues[item.field] || []).join(", ")
                      : item.buttonText}
                  </Text>

                  <Ionicons
                    name="chevron-forward-outline"
                    size={16}
                    color="#000"
                    style={styles.buttonIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
    
          <DropdownModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={fields.find((f) => f.field === currentField)?.label || ""}
            // Áp dụng định dạng cho options và selectedOptions
            options={formatOptions(OPTIONS_MAP[currentField] || [])}
            selectedOptions={formatOptions(selectedValues[currentField] || [])}
            onSelect={handleSelect} // Giữ nguyên, vì đã sửa handleSelect ở trên
            isMulti={currentField === "hobby"}
          />
          {/* Nút áp dụng */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "bold",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  imageBox: {
    width: "30%",
    height: 40,
    aspectRatio: 1,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  imageText: {
    fontSize: 30,
    color: "#999",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    paddingBottom: 28,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  charCount: {
    position: "absolute",
    bottom: 8,
    right: 12,
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  selectButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  selectButtonText: {
    flex: 1,
    textAlign: "left",
    color: "#000",
    fontSize: 16,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    // marginLeft: 100,
  },
  applyButton: {
    margin: 20,
    backgroundColor: "pink",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;