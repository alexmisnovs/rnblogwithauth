import { createContext, useState, PropsWithChildren } from "react";

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
  user: StrapiUser | null;
  isAuthenticated: boolean;
  authenticate: (token: string, user: StrapiUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthData>({
  token: "",
  user: null,
  isAuthenticated: false,
  authenticate: (token: string, user: StrapiUser) => {},
  logout: () => {}
});

function AuthContextProvider({ children }: PropsWithChildren) {
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<StrapiUser | null>(null);
  function authenticate(token: string, user: StrapiUser) {
    setAuthToken(token);
    setUser(user);
  }

  function logout() {
    setAuthToken(null);
    setUser(null);
  }

  const value = {
    token: authToken,
    user: user,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
