import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import Button from "@/components/ui/Button";

export default function TabTwoScreen() {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not Authenticated</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>hello your token is: {authCtx.token}</Text>
      <Text style={styles.title}>Protected</Text>
      <Button onPress={() => authCtx.logout()}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
