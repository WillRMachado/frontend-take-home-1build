import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getComponentTokens } from "../tokens/components";
import { getColors } from "../tokens/alias/colors";
import type { ColorMode } from "../tokens/alias/colors";
import { ThemeScheme } from "../types";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type ThemeParams = {
  themeColors: ReturnType<typeof getComponentTokens>;
  colors: ColorMode;
  theme: ThemeScheme;
};

export function useThemedColors() {
  const { theme } = useTheme();
  return getColors(theme);
}

export function useThemedComponentTokens() {
  const { theme } = useTheme();
  return getComponentTokens(theme);
}

export default function createThemedStyles<T extends NamedStyles<T>>(
  styleCreator: (params: ThemeParams) => T
) {
  return () => {
    const { theme } = useTheme();
    const themeColors = useThemedComponentTokens();
    const colors = useThemedColors();
    return StyleSheet.create(styleCreator({ themeColors, colors, theme }));
  };
}
