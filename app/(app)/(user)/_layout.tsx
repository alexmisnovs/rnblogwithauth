import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e"
        },
        headerShown: true,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="profile" options={{}} />
    </Stack>
  );
}
