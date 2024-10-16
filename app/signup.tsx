import { useContext, useState } from "react";
import { Alert } from "react-native";

import { signUp } from "@/utils/auth";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import AuthContent from "@/components/Auth/AuthContent";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
type credentialsType = {
  email: string;
  username: string;
  password: string;
};

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const { push } = useRouter();

  async function signupHandler({ email, password, username }: credentialsType) {
    setIsAuthenticating(true);
    try {
      const data = await signUp(username, email, password);

      authCtx.authenticate(data.jwt, data.user);
      // redirect
      push("/(user)/profile");
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
