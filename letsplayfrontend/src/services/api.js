// const baseURL = "http://10.0.2.2:8000";
// const baseURL = "http://localhost:8000";

import axios from "axios";
const BASE_IP = window.location.hostname || "localhost";
export const baseURL = `http://${BASE_IP}:8000`;
export const WS_BASE_URL = `ws://${BASE_IP}:8000`;

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

{
  /* Dang ky/dang nhap */
}
export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network error");
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network error");
  }
};

export const sendOtp = async (data) => {
  try {
    const response = await api.post("/auth/send-otp", data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network error");
  }
};

export const register = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network error");
  }
};

export const refreshToken = async (data) => {
  try {
    const response = await api.post("/auth/refresh", data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network error");
  }
};

export const verifyEmail = async (data) => {
  try {
    const response = await api.post("/auth/verify-email", data);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.detail || "Network error");
    console.error(
      "❌ verifyEmail error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getLikedUsers = async (userId) => {
  try {
    const response = await api.get("/interactions/interactions", {
      params: {
        user_id: userId,
      },
    });

    return response.data; // VD: [12, 15, 18]
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đã like:", error);
    throw new Error(
      error.response?.data?.detail || "Lỗi khi lấy danh sách đã like"
    );
  }
};

export const updateLocation = async (accountId, lat, lng) => {
  await api.post(`/location/update_location/${accountId}`, null, {
    params: { latitude: lat, longitude: lng },
  });
};

export const getNearbyUsers = async (accountId, radius) => {
  const response = await api.get("/location/nearby_users_by_account", {
    params: {
      account_id: accountId,
      radius,
    },
  });
  return response.data; // Trả thẳng danh sách (không .nearby_users nữa nếu API trả List[])
};

export const getLocationName = async (lat, lng) => {
  try {
    const response = await api.get("/location/get_location_name", {
      params: { latitude: lat, longitude: lng },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tên địa điểm:", error);
    return "Không rõ địa điểm";
  }
};

export const getLocationByAccountId = async (accountId) => {
  try {
    const response = await api.get(`/location/by_account_id/${accountId}`);
    return response.data; // { latitude: ..., longitude: ..., last_updated: ... }
  } catch (error) {
    console.error("Lỗi khi lấy vị trí từ account ID:", error);
    return null;
  }
};

export const fetchMatches = async (accountId) => {
  const response = await api.get(`/interactions/matches/${accountId}`);
  return response.data;
};

{
  /* Profile */
}
// export const createProfile = async (data, token) => {
//   try {
//     const response = await api.post("/profiles/create", data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Network error");
//   }
// };
export const createProfile = async (data, token) => {
  try {
    const response = await api.post("/profiles/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("🔴 Backend error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Network error");
  }
};

export const getProfiles = async (token) => {
  try {
    const response = await api.get("/profiles/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataWithFullImageUrl = response.data.map((profile) => ({
      ...profile,
      images:
        profile.images?.map((img) => ({
          ...img,
          url: `${baseURL}/${img.url}`,
        })) || [],
    }));

    return dataWithFullImageUrl;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách profile:", error);
    throw new Error(error.response?.data?.detail || "Lỗi kết nối");
  }
};

{
  /* Location */
}

{
  /* Like */
}
export const likeUser = async (likedId, likerId) => {
  try {
    const response = await api.post(`/interactions/like/${likedId}/${likerId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi like:", error);
    throw new Error(error.response?.data?.detail || "Lỗi khi like người dùng");
  }
};

{
  /* Upload anh */
}

// export const uploadProfileImage = async (profileId, imageUris) => {
//   const formData = new FormData();

//   for (let index = 0; index < imageUris.length; index++) {
//     const uri = imageUris[index];
//     const filename = uri.split("/").pop();
//     const match = /\.(\w+)$/.exec(filename ?? "");
//     const type = match ? `image/${match[1]}` : `image/jpeg`;

//     const response = await fetch(uri);
//     const blob = await response.blob();

//     formData.append("files", {
//       uri,
//       name: filename || `profile${index}.jpg`,
//       type,
//     });
//   }

//   try {
//     const response = await api.post(`/images/profile/${profileId}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("Upload profile ảnh thành công");
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Upload profile image failed",
//       error.response?.data || error.message
//     );
//     throw new Error("Upload profile image failed");
//   }
// };

export const uploadProfileImage = async (profileId, images) => {
  const formData = new FormData();

  for (let index = 0; index < images.length; index++) {
    const item = images[index];

    // ✅ Nếu là File object (web)
    if (item instanceof File) {
      formData.append("files", item);
      continue;
    }

    // ✅ Nếu là URI string (mobile / base64)
    if (typeof item === "string") {
      const filename = item.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      const response = await fetch(item);
      const blob = await response.blob();

      formData.append(
        "files",
        new File([blob], filename || `profile${index}.jpg`, { type })
      );
    }
  }

  try {
    const response = await api.post(`/images/profile/${profileId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Upload profile ảnh thành công");
    return response.data;
  } catch (error) {
    console.error(
      "❌ Upload profile image failed:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.detail || "Upload profile image failed"
    );
  }
};

// export const getProfileImage = async (title) => {
//   try {
//     return `http://10.0.2.2:8000/static/images/profile/${title}`;
//   } catch (error) {
//     throw new Error("Cannot generate profile image URL");
//   }
// };
export const getProfileImage = (title) => {
  if (!title) return null;
  return `${baseURL}/static/images/profile/${title}`;
};

export const deleteProfileImage = async (imageId) => {
  try {
    const response = await api.delete(`/images/profile/${imageId}`);
    console.log("Xóa ảnh thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Xóa ảnh thất bại", error.response?.data || error.message);
    throw new Error("Delete profile image failed");
  }
};

export const uploadAvatar = async (email, imageUri) => {
  const formData = new FormData();

  const filename = imageUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename ?? "");
  const type = match ? `image/${match[1]}` : `image/jpeg`;

  formData.append("file", {
    uri: imageUri,
    name: filename || "avatar.jpg",
    type,
  });

  try {
    const response = await api.post(`/images/account/${email}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload avatar thành công");
    return response.data;
  } catch (error) {
    console.error(
      "Upload avatar failed",
      error.response?.data || error.message
    );
    throw new Error("Upload avatar failed");
  }
};

// export const getAvatarImage = (title) => {
//   return `http://10.0.2.2:8000/static/images/avatar/${title}`;
// };
export const getAvatarImage = (titleOrPath) => {
  // Nếu là đường dẫn có "static/", cắt tên file ra
  const filename = titleOrPath?.split("\\").pop(); // hoặc .split("/").pop() nếu dùng dấu /

  return `http://10.0.2.2:8000/static/images/avatar/${filename}`;
};

{
  /* Profile */
}

export const getProfileById = async (profileId) => {
  try {
    // Lấy access_token từ AsyncStorage
    const token = await localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Không có access_token");
    }

    // Gọi API với header Authorization
    const response = await api.get(`/profiles/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy profile:",
      error.response?.data || error.message
    );
    throw new Error("Không thể tải hồ sơ người dùng");
  }
};

export const updateProfile = async (profile_id, data) => {
  try {
    // Lấy access_token từ AsyncStorage
    const token = await localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Không có access_token");
    }

    // Gọi API với header Authorization
    const response = await api.put(`/profiles/update/${profile_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const detail =
      error.response?.data?.detail || error.message || "Network error";
    throw new Error(
      typeof detail === "string" ? detail : JSON.stringify(detail)
    );
  }
};

/**
 * Lấy danh sách các cuộc hội thoại của một người dùng
 * @param {number} accountId ID của người dùng
 */
export const fetchConversations = async (accountId) => {
  try {
    const response = await api.get(`/messages/conversations/${accountId}`);
    return response.data; // Trả về thẳng data cho tiện
  } catch (error) {
    console.error("API Error: fetchConversations", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch conversations"
    );
  }
};

/**
 * Xóa một cuộc hội thoại (unmatch)
 * @param {number} partnerId ID của người mình muốn unmatch
 * @param {number} accountId ID của chính mình
 */
export const unmatchConversation = async (partnerId, accountId) => {
  try {
    const response = await api.delete(`/conversations/${partnerId}`, {
      params: { account_id: accountId },
    });
    return response.data;
  } catch (error) {
    console.error("API Error: unmatchConversation", error);
    throw new Error(
      error.response?.data?.message || "Failed to unmatch conversation"
    );
  }
};

// export const getMessageHistory = async (user1_id, user2_id) => {
//   try {
//     const response = await apiClient.get("/messages/history", {
//       params: {
//         user1_id,
//         user2_id,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy lịch sử tin nhắn:", error);
//     // Trả về mảng rỗng để không làm crash app
//     return [];
//   }
// };

export const getMessageHistory = async (user1_id, user2_id) => {
  try {
    // SỬA LỖI TẠI ĐÂY: Dùng `api` thay vì `apiClient`
    const response = await api.get("/messages/history", {
      params: { user1_id, user2_id },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy lịch sử tin nhắn:", error);
    return [];
  }
};

// Hàm tạo kết nối WebSocket cho một user
// export const createChatSocket = (userId) => {
//   if (!userId) {
//     console.error("Cần có userId để tạo WebSocket.");
//     return null;
//   }
//   const ws = new WebSocket(`${WS_BASE_URL}/ws/chat/${userId}`);
//   return ws;
// };

export const createChatSocket = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("❌ Không tìm thấy access_token trong localStorage.");
    return null;
  }

  // Tạo kết nối WebSocket có token trong query param
  const ws = new WebSocket(`${WS_BASE_URL}/ws/chat?token=${token}`);

  // Log hỗ trợ debug
  ws.onopen = () => console.log("✅ WebSocket connected:", ws.url);
  ws.onerror = (err) => console.error("⚠️ WebSocket error:", err);

  return ws;
};

export const createNotificationSocket = (userId) => {
  if (!userId) {
    console.error("❌ userId không hợp lệ để tạo Notification WebSocket.");
    return null;
  }

  const ws = new WebSocket(`${WS_BASE_URL}/ws/notifications/${userId}`);
  ws.onopen = () => console.log("✅ Notification WebSocket connected:", ws.url);
  ws.onerror = (err) => console.error("⚠️ Notification WebSocket error:", err);
  return ws;
};

export const getDatingAdvice = async () => {
  try {
    // Dùng 'api.get' và gọi đến endpoint đã tạo ở backend
    const response = await api.get("/dating-advice/");
    // Trả về thẳng data (nơi chứa 'videos' và 'tips')
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Không thể tải nội dung.");
  }
};

// 🆕 Lấy danh sách người đã thích mình
// export const getUsersWhoLikedMe = async (userId) => {
//   try {
//     const response = await api.get(`/interactions/liked-me/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy danh sách người đã thích mình:", error);
//     return [];
//   }
// };
export const getUsersWhoLikedMe = async (userId) => {
  console.log("📡 Gọi API getUsersWhoLikedMe với userId:", userId);
  try {
    const response = await api.get(`/interactions/liked-me/${userId}`);
    console.log("✅ Kết quả từ API liked-me:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách người đã thích mình:", error);
    return [];
  }
};

// export const getWhoLikedMe = async (user_id) => {
//   try {
//     const res = await axios.get(`/matching/who-liked-me/${user_id}`);
//     return res.data;
//   } catch (error) {
//     console.error("Lỗi API getWhoLikedMe:", error.message);
//     throw error;
//   }
// };
