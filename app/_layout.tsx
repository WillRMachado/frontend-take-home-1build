import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EstimateProvider } from "@/src/context/EstimateContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import {
  ComponentProvider,
  ComponentContext,
} from "@/src/context/ComponentContext";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import {
  BottomSheet,
  BottomSheetBackdropProps,
} from "@/src/common/lib/imports";
import {
  EstimateForm,
  EstimateFormProps,
} from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import { useCallback, useContext } from "react";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { THEMES } from "@/src/common/enums";
import { ToastProvider } from "@/src/common/lib/imports";
import { WebFontsLoader } from "./WebFontsLoader";

type BottomSheetChildProps =
  | EstimateFormProps
  | {
      selectUom: (name: string) => void;
      onReturn: () => void;
    };

type BottomSheetChild = React.ReactElement<BottomSheetChildProps>;

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

  const _getBottomSheetKey = useCallback((child: BottomSheetChild) => {
    if (child.type === EstimateForm) {
      const props = child.props as EstimateFormProps;
      return `bottom-sheet-${props.mode}-${props.data.id || "new"}`;
    }
    return "bottom-sheet";
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.layer.solid.medium,
        zIndex: 32,

      }}
    >
      <StatusBar
        barStyle={theme === THEMES.DARK ? "light-content" : "dark-content"}
        backgroundColor={colors.layer.solid.medium}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      {isBottomSheetOpen && bottomSheetChild && Platform.OS !== "web" && (
        <BottomSheet.Wrapper
          key={_getBottomSheetKey(bottomSheetChild as BottomSheetChild)}
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
    <ToastProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaProvider>
            <EstimateProvider>
              <ComponentProvider>
                {Platform.OS === "web" ? (
                  <WebFontsLoader fallback={<></>}>
                    <ThemedContent />
                  </WebFontsLoader>
                ) : (
                  <ThemedContent />
                )}
              </ComponentProvider>
            </EstimateProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
}
