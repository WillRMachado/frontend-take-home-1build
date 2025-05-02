import { View, StyleSheet } from "react-native";
import { useThemeSwitch } from "./useThemeSwitch";
import { numbersAliasTokens } from "../../theme/tokens/alias/numbers";
import { numbersBaseTokens } from "../../theme/tokens/base/numbers";
import { THEMES } from "../../enums";
import Feather from "@expo/vector-icons/Feather";
import createThemedStyles, {
  useThemedColors,
} from "../../theme/utils/createThemedStyles";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function ThemeSwitch() {
  const { isDark, toggleTheme } = useThemeSwitch();
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.switchContainer}
      onPress={() => toggleTheme()}
    >
      <>
        <View style={styles.selector}></View>
        <View style={styles.iconsWrapper}>
          <Feather
            name="sun"
            size={numbersBaseTokens.typography.size[4]}
            color={isDark ? colors.icon.tertiary : colors.icon.secondary}
          />
          <Feather
            name="moon"
            size={numbersBaseTokens.typography.size[4]}
            color={isDark ? colors.icon.secondary : colors.icon.tertiary}
          />
        </View>
      </>
    </TouchableOpacity>
  );
}

const useStyles = createThemedStyles(({ colors, theme }) =>
  StyleSheet.create({
    switchContainer: {
      backgroundColor: colors.layer.solid.dark,
      width: numbersBaseTokens.globalScale[22],
      height: numbersBaseTokens.globalScale[8],
      borderRadius: numbersAliasTokens.borderRadius.sm,
      flexDirection: theme === THEMES.DARK ? "row-reverse" : "row",
    },
    selector: {
      position: "absolute",
      backgroundColor: colors.layer.solid.light,
      width: numbersBaseTokens.globalScale[11],
      height: numbersBaseTokens.globalScale[8],
      borderRadius: numbersAliasTokens.borderRadius.sm,
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.outline.medium,
    },
    iconsWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);
