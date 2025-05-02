import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { ThemeSwitch } from "@/src/common/components";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import AddSectionButton from "./components/AddSectionButton";

export default function EstimateScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ThemeSwitch />
        <AddSectionButton />
      </View>
    </View>
  );
}

const useStyles = createThemedStyles(({ themeColors, colors, numbersAliasTokens }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.layer.solid.medium,
    flexDirection: "column",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: numbersAliasTokens.spacing["2xs"],
    marginTop: numbersAliasTokens.spacing.xs,
  },
}));