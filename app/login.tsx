import { useContext, useState } from "react";
import { Alert } from "react-native";

import { signIn } from "@/utils/auth";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import AuthContent from "@/components/Auth/AuthContent";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

type credentialsType = {
  email: string;
  password: string;
};

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const { push } = useRouter();

  async function loginHandler({ email, password }: credentialsType) {
    setIsAuthenticating(true);
    try {
      const data = await signIn(email, password);
      const token = data.jwt;
      authCtx.authenticate(token, data.user);
      // push("/(user)/profile");
      push("/");
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again later!");
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
