import axios from "axios";
import { url } from "../context/url";

export async function createUserAccount(user: {
  username: string;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${url}/users/api/register/`, {
      username: user.username,
      email: user.email,
      first_name: user.firstname,
      last_name: user.lastname,
      password: user.password,
    });
    console.log("User created:", response.data);
  } catch (error) {
    console.error("Error creating user:", error);
  }
  console.log(user);
}
