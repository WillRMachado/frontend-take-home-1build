import { View, TouchableOpacity } from "react-native";
import { numbersAliasTokens } from "../theme/tokens/alias/numbers";
import { numbersBaseTokens } from "../theme/tokens/base/numbers";
import createThemedStyles from "../theme/utils/createThemedStyles";
import React from "react";

interface SwitcherProps {
  isActive: boolean;
  onToggle: () => void;
  primaryComponent: React.ReactNode;
  secondaryComponent: React.ReactNode;
}

export default function Switcher({
  isActive,
  onToggle,
  primaryComponent,
  secondaryComponent,
}: SwitcherProps) {
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.switchContainer} onPress={() => onToggle()}>
      <View style={styles.selectorContainer}>
        <View
          style={[
            styles.selector,
            { left: isActive ? undefined : 0, right: isActive ? 0 : undefined },
          ]}
        />
      </View>
      <View style={styles.iconsWrapper}>
        <View style={styles.componentContainer}>{primaryComponent}</View>
        <View style={styles.componentContainer}>{secondaryComponent}</View>
      </View>
    </TouchableOpacity>
  );
}

const useStyles = createThemedStyles(({ colors }) => ({
  switchContainer: {
    backgroundColor: colors.layer.solid.dark,
    minWidth: numbersBaseTokens.globalScale[22],
    minHeight: numbersBaseTokens.globalScale[8],
    borderRadius: numbersAliasTokens.borderRadius.sm,
    overflow: "hidden",
  },
  selectorContainer: {
    position: "absolute",
    minHeight: numbersBaseTokens.globalScale[8],
    width: "100%",
  },
  selector: {
    position: "absolute",
    backgroundColor: colors.layer.solid.light,
    width: "50%",
    height: "100%",
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
  componentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
