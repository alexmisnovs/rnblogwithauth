import { HTMLInputTypeAttribute, useState } from "react";
import { StyleSheet, View } from "react-native";

import Input from "./input";
import Button from "../ui/Button";

type AuthFormType = {
  isLogin: boolean;
  onSubmit: (credentials: { email: string; username: string; confirmEmail: string; password: string; confirmPassword: string }) => void;
  credentialsInvalid: {
    username: boolean;
    email: boolean;
    confirmEmail: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
};

function AuthForm(this: any, { isLogin, onSubmit, credentialsInvalid }: AuthFormType) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const { email: emailIsInvalid, confirmEmail: emailsDontMatch, username: usernameIsInvalid, password: passwordIsInvalid, confirmPassword: passwordsDontMatch } = credentialsInvalid;

  function updateInputValueHandler(inputType: HTMLInputTypeAttribute, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      username: enteredUsername,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input label="Email Address" onUpdateValue={updateInputValueHandler.bind(this, "email")} value={enteredEmail} keyboardType="email-address" isInvalid={emailIsInvalid} />
        {!isLogin && <Input label="Username" onUpdateValue={updateInputValueHandler.bind(this, "username")} value={enteredUsername} keyboardType="default" isInvalid={usernameIsInvalid} />}
        {!isLogin && <Input label="Confirm Email Address" onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")} value={enteredConfirmEmail} keyboardType="email-address" isInvalid={emailsDontMatch} />}
        <Input label="Password" onUpdateValue={updateInputValueHandler.bind(this, "password")} secure value={enteredPassword} isInvalid={passwordIsInvalid} />
        {!isLogin && <Input label="Confirm Password" onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")} secure value={enteredConfirmPassword} isInvalid={passwordsDontMatch} />}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>{isLogin ? "Log In" : "Sign Up"}</Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12
  },
  form: {}
});
