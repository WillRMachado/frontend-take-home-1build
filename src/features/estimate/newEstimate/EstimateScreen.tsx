import { View } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { ThemeSwitch } from "@/src/common/components";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import EstimateList from "./components/EstimateList";
import IconButton from "@/src/common/components/IconButton";
import { useNewEstimateScreen } from "./useNewEstimateScreen";

export default function EstimateScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = useStyles();
  const { handleAddNewSection } = useNewEstimateScreen();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ThemeSwitch />
        
        <IconButton
          iconName="plus"
          onClick={handleAddNewSection}
          label="Add"
        />
      </View>
      <EstimateList />
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