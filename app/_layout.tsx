import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EstimateProvider } from "@/src/context/EstimateContext";
import { ThemeProvider, ThemeContext } from "@/src/context/ThemeContext";
import {
  ComponentProvider,
  ComponentContext,
} from "@/src/context/ComponentContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import { BottomSheet } from "@/src/common/lib/imports";
import { EditForm } from "@/src/features/estimate/components/EditForm";
import { useContext } from "react";
import { EstimateRow, EstimateSection } from "@/data";
import BottomSheetWrapper from "@gorhom/bottom-sheet";

function ThemedContent() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { bottomSheetRef, bottomSheetChild, isBottomSheetOpen } =
    componentContext;

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

      {isBottomSheetOpen && (
        <BottomSheet.Wrapper ref={bottomSheetRef}>
          <BottomSheet.View>{bottomSheetChild}</BottomSheet.View>
        </BottomSheet.Wrapper>
      )}
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <EstimateProvider>
            <ComponentProvider>
              <ThemedContent />
            </ComponentProvider>
          </EstimateProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
