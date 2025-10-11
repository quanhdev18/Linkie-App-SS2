import axios from "axios";
import { url } from "../context/url";

export async function logoutUser() {
  try {
    const logout = await axios.post(`${url}/users/api/logout/`, {});
    return logout;
  } catch (error) {
    console.log(error);
  }
}
