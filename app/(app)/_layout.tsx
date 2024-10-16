import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export default function AppLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  console.warn("isAuthenticated: ", isAuthenticated);

  // You can keep the splash screen open, or render a loading screen like we do here.
  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isAuthenticated) {
    console.warn("got to this layout first");
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
