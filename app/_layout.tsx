import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { margin: 0, padding: 0, flex: 1 },
          animation: 'none',
        }}
      />
    </SafeAreaProvider>
  );
}
