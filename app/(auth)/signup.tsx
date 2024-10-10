import { useState } from "react";
import { Alert } from "react-native";

import { signUp } from "@/utils/auth";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import AuthContent from "@/components/Auth/AuthContent";

type credentialsType = {
  email: string;
  username: string;
  password: string;
};

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, username }: credentialsType) {
    setIsAuthenticating(true);
    try {
      await signUp(username, email, password);
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication failed", "Could not create user, please check your input and try again later.");
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
