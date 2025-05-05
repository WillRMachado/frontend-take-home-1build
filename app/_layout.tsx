import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EstimateProvider } from "@/src/context/EstimateContext";
import { ThemeProvider, ThemeContext } from "@/src/context/ThemeContext";
import {
  ComponentProvider,
  ComponentContext,
} from "@/src/context/ComponentContext";
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import { BottomSheet } from "@/src/common/lib/imports";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import { useCallback, useContext, useEffect } from "react";
import { EstimateRow, EstimateSection } from "@/data";
import BottomSheetWrapper, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";

function ThemedContent() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { bottomSheetRef, bottomSheetChild, isBottomSheetOpen } =
    componentContext;

  const { top, bottom, left, right } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheet.Backdrop
        {...props}
        disappearsOnIndex={-1}
        enableTouchThrough={false}
        opacity={1.5}
        style={{ backgroundColor: "#000" }}
        pressBehavior="close"
      />
    ),
    []
  );

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
        <BottomSheet.Wrapper
          key={JSON.stringify(bottomSheetChild)}
          backgroundStyle={{ backgroundColor: colors.layer.solid.light }}
          ref={bottomSheetRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          topInset={top + numbersAliasTokens.spacing.lg}
        >
          <BottomSheet.ScrollView>{bottomSheetChild}</BottomSheet.ScrollView>
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
