import axios from "axios";
import { url } from "../context/url";

export async function fetchProfile(id: number) {
  try {
    const profileData = await axios.get(`${url}/users/api/profile-data/${id}/`);

    return profileData.data;
  } catch (error) {
    console.log("An error occured:", error);
    return null;
  }
}
