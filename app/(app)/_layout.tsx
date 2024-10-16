import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";
import { AuthContext } from "@/providers/AuthProvider";

export default function AppLayout() {
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  // also check if we already have a token or not

  if (!isAuthenticated) {
    console.warn("Not authenticated");
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
