import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { ThemeSwitch } from "@/src/common/components";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";

export default function EstimateScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ThemeSwitch />
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

const useStyles = createThemedStyles(({ themeColors, colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.layer.solid.medium,
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
}));
