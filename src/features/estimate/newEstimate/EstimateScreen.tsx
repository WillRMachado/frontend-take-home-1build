import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getComponentTokens } from "../../../common/theme/tokens/components";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import type { ColorMode } from "../../../common/theme/tokens/alias/colors";

export default function EstimateScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const themeColors = getComponentTokens(theme);
  const colors = getColors(theme);
  const styles = createStyles(themeColors, colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => toggleTheme()}
        style={styles.themeToggleButton}
      >
        <Text style={styles.themeToggleText}>
          Toggle {isDark ? "Light" : "Dark"} Theme
        </Text>
      </TouchableOpacity>
      <Text style={styles.estimateText}>
        New Estimate
        {theme}
      </Text>
      <Text style={styles.estimateTextPrimary}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
      <Text style={styles.estimateText}>New Estimate</Text>
    </View>
  );
}

const createStyles = (
  themeColors: ReturnType<typeof getComponentTokens>,
  colors: ColorMode
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.badges.washedColors.backgrounds.neutral,
    },
    themeToggleButton: {
      backgroundColor: themeColors.button.background.primary.idle,
      padding: 10,
      borderRadius: themeColors.button.borderRadius,
      margin: 10,
      alignSelf: "flex-start",
    },
    themeToggleText: {
      color: themeColors.badges.solidColors.text.neutral,
      fontSize: 16,
    },
    estimateText: {
      color: themeColors.badges.washedColors.text.neutral,
      fontSize: 16,
      marginVertical: 8,
    },
    estimateTextPrimary: {
      color: colors.text.primary,
      fontSize: 16,
      marginVertical: 8,
    },
  });
