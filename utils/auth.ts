import axios from "axios";
const strapiUrl = process.env.EXPO_PUBLIC_API_URL as string;

export async function signIn(identifier: string, password: string) {
  console.log(strapiUrl);
  console.log(identifier, password);

  const data = {
    identifier: identifier,
    password: password
  };

  const response = await axios.post(`${strapiUrl}/auth/local`, data);
  console.log(response.data);
  return response.data;
}

export async function signUp(username: string, email: string, password: string) {
  const data = {
    username: username,
    email: email,
    password: password
  };
  console.log(strapiUrl);
  console.log(data);
  const response = await axios.post(`${strapiUrl}/auth/local/register`, data);
  console.log(response.data);
  return response.data;
}

export async function signOut(strapiUrl: string) {
  const response = await axios.post(`${strapiUrl}/auth/local/logout`);
}
