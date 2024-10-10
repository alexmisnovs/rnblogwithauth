import { useState } from "react";
import { Alert } from "react-native";

import { signIn } from "@/utils/auth";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import AuthContent from "@/components/Auth/AuthContent";

type credentialsType = {
  email: string;
  password: string;
};

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }: credentialsType) {
    setIsAuthenticating(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again later!");
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
