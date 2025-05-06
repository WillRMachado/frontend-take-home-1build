import React from "react";
import { TouchableOpacity, Text, TextStyle } from "react-native";
import createThemedStyles from "../theme/utils/createThemedStyles";
import { numbersBaseTokens } from "../theme/tokens/base/numbers";

type PrimaryButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  children,
  disabled = false,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && { opacity: 0.5 }]}
      disabled={disabled}
    >
      <Text style={[styles.text]}>{children}</Text>
    </TouchableOpacity>
  );
};

const useStyles = createThemedStyles(
  ({ numbersAliasTokens, themeColors, customFonts }) => ({
    button: {
      backgroundColor: themeColors.button.background.primary.idle,
      borderRadius: numbersAliasTokens.borderRadius["2xl"],
      height: numbersBaseTokens.globalScale["12"],
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: numbersAliasTokens.spacing.lg,
    },
    text: {
      color: "#fff",
      ...customFonts.regular.text.md,
    },
  })
);
