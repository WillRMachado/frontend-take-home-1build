import { View, TouchableOpacity } from "react-native";
import { useAddItemButton } from "./useIconButton";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import React from "react";
import type { EstimateSection } from "@/data";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { Text } from "../Text";
import { numbersBaseTokens } from "../../theme/tokens/base/numbers";
interface AddItemButtonProps {
  onClick: () => void;
  iconName: keyof typeof Feather.glyphMap;
  label?: string;
}

export default function IconButton({
  iconName,
  onClick,
  label,
}: AddItemButtonProps) {
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={
        label ? styles.labeledButtonContainer : styles.standaloneButtonContainer
      }
      onPress={onClick}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <Feather
            name={iconName}
            size={numbersAliasTokens.sizing.icon.lg}
            color={colors.icon.primary}
          />
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const useStyles = createThemedStyles(
  ({ colors, getColorWithAlpha, numbersAliasTokens }) => ({
    labeledButtonContainer: {
      backgroundColor: getColorWithAlpha(colors.text.tertiary, 12),
      paddingLeft: numbersBaseTokens.globalScale[5],
      paddingRight: numbersBaseTokens.globalScale[5],
      paddingTop: numbersBaseTokens.globalScale[3],
      paddingBottom: numbersBaseTokens.globalScale[3],
      borderRadius: numbersAliasTokens.borderRadius["3xl"],
      alignSelf: "flex-start",
    },
    standaloneButtonContainer: {
      backgroundColor: getColorWithAlpha(colors.text.tertiary, 12),
      borderRadius: numbersAliasTokens.borderRadius["3xl"],
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      width: numbersAliasTokens.spacing["3xl"],
      height: numbersAliasTokens.spacing["3xl"],
    },
    contentWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapper: {
      paddingHorizontal: numbersAliasTokens.spacing["3xs"],
    },
    label: {
      paddingLeft: numbersAliasTokens.spacing["3xs"],
      paddingRight: numbersAliasTokens.spacing["3xs"],
      color: colors.text.primary,
    },
  })
);
