import axios from "axios";
const strapiUrl = process.env.EXPO_PUBLIC_API_URL as string;
export async function signIn(identifier: string, password: string) {
  const response = await axios.post(`${strapiUrl}/auth/local`, {
    identifier,
    password
  });

  return response.data;
}

export async function signUp(username: string, email: string, password: string) {
  const response = await axios.post(`${strapiUrl}/auth/local/register`, {
    username,
    email,
    password
  });

  return response.data;
}

export async function signOut(strapiUrl: string) {
  const response = await axios.post(`${strapiUrl}/auth/local/logout`);
}
