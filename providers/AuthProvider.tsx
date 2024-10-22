import { createContext, useState, PropsWithChildren, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

type StrapiUser = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
};
type AuthData = {
  token: string | null;
  isLoading: boolean;
  user: StrapiUser | null;
  isAuthenticated: boolean;
  authenticate: (token: string, user: StrapiUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthData>({
  token: "",
  user: null,
  isLoading: true,
  isAuthenticated: true,
  authenticate: (token: string, user: StrapiUser) => {},
  logout: () => {}
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<StrapiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  async function authenticate(token: string, user: StrapiUser) {
    setAuthToken(token);
    setUser(user);

    await save("token", token);
    await save("user", JSON.stringify(user));
  }

  async function logout() {
    setAuthToken(null);
    setUser(null);

    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  }

  useEffect(() => {
    //check if user already exists in local storage
    const getToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      const user = await SecureStore.getItemAsync("user");

      if (token && user) {
        console.log("From Auth UseEffect - got user", JSON.parse(user).username);
        setAuthToken(token);
        setUser(JSON.parse(user));
      }
      setIsLoading(false);
    };

    getToken();
    console.log(authToken);
  }, []);

  const value = {
    token: authToken,
    user: user,
    isLoading: isLoading,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
