import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getComponentTokens } from "../tokens/components";
import { getColors } from "../tokens/alias/colors";
import type { ColorMode } from "../tokens/alias/colors";
import { ThemeScheme } from "../types";
import { getColorWithAlpha } from "@/src/common/lib/colors";
import { numbersAliasTokens } from "../tokens/alias/numbers";
import { customFonts } from "../fonts";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type ThemeParams = {
  themeColors: ReturnType<typeof getComponentTokens>;
  colors: ColorMode;
  getColorWithAlpha: typeof getColorWithAlpha;
  theme: ThemeScheme;
  numbersAliasTokens: typeof numbersAliasTokens;
  customFonts: typeof customFonts;
};

export function useThemedColors() {
  const { theme } = useTheme();
  return getColors(theme);
}

export function useThemedComponentTokens() {
  const { theme } = useTheme();
  return getComponentTokens(theme);
}

export function useThemedAlphaColors() {
  return getColorWithAlpha;
}

export default function createThemedStyles<T extends NamedStyles<T>>(
  styleCreator: (params: ThemeParams) => T
) {
  return () => {
    const { theme } = useTheme();
    const themeColors = useThemedComponentTokens();
    const colors = useThemedColors();
    const getColorWithAlpha = useThemedAlphaColors();
    return StyleSheet.create(
      styleCreator({
        themeColors,
        colors,
        getColorWithAlpha,
        theme,
        numbersAliasTokens,
        customFonts,
      })
    );
  };
}
