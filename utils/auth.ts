import axios from "axios";
const strapiUrl = process.env.EXPO_PUBLIC_API_URL as string;

export async function signIn(identifier: string, password: string) {
  const data = {
    identifier: identifier,
    password: password
  };

  const response = await axios.post(`${strapiUrl}/auth/local`, data);

  return response.data;
}

export async function signUp(username: string, email: string, password: string) {
  const data = {
    username: username,
    email: email,
    password: password
  };

  const response = await axios.post(`${strapiUrl}/auth/local/register`, data);

  return response.data;
}

export async function signOut(strapiUrl: string) {
  const response = await axios.post(`${strapiUrl}/auth/local/logout`);
}

export async function getUserDetails(token: string) {
  const config = {};

  try {
    const response = await axios.get(`${strapiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Respons from helper", response.data);
    return response.data;
  } catch (error) {
    console.log("Error from helper", error);
  }
}
