import axios from "axios";
import { url } from "../context/url";

export async function loginUser(user: { username: string; password: string }) {
  try {
    const response = await axios.post(`${url}/users/api/login/`, user, {
      withCredentials: true, // Include credentials in the request
    });
    // console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
