import { UserState } from "@/lib/types";

export const store: UserState = {
  isUpdatingProfile: false,
  isAuthenticated: false,
  isCreateAccountLoading: false,
  isLoginLoading: false,
  loginError: false,
  user: { id: 0, username: "", email: "", first_name: "", last_name: "" },
  user_profile: {
    id: 0,
    user: 0,
    dob: "",
    location: "",
    gender: null,
    bio: "",
    phone: "",
  },
};
