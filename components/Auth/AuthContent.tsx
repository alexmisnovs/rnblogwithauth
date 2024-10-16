import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";

import { Colors } from "@/constants/styles";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "expo-router";

type AuthContentProps = {
  isLogin: boolean;
  onAuthenticate: (credentials: { email: string; password: string; username: string }) => void;
};

type credentialsType = {
  email: string;
  username: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const { push } = useNavigation<NativeStackNavigationProp<any>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    username: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      push("signup");
    } else {
      console.log("Is login: ", isLogin);
      push("login");
    }
  }

  function submitHandler(credentials: credentialsType) {
    let { username, email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const usernameValid = username.length > 0;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual))) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        username: !usernameValid,
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual
      });
      return;
    }
    onAuthenticate({ email, password, username });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm isLogin={isLogin} onSubmit={submitHandler} credentialsInvalid={credentialsInvalid} />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>{isLogin ? "Create a new user" : "Log in instead"}</FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4
  },
  buttons: {
    marginTop: 8
  }
});
