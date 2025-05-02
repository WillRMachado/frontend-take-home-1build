import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EstimateProvider } from "@/src/context/EstimateContext";
import { ThemeProvider, ThemeContext } from "@/src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

function ThemedContent() {
  const { theme } = useTheme();
  const colors = getColors(theme);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.layer.solid.medium,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <EstimateProvider>
            <ThemedContent />
          </EstimateProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
