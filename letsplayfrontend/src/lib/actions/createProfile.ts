import axios from "axios";
import { url } from "../context/url";

export async function createProfile(values) {
  try {
    const profileInfo = await axios.post(
      "http://localhost:8000/users/api/profile/",
      values
    );

    return profileInfo;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(id, values) {
  try {
    const profileInfo = await axios.patch(
      `${url}/users/api/profile/update/`,
      values
    );

    console.log(profileInfo);
    return profileInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
