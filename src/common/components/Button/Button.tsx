import React, { forwardRef } from "react";
import { Pressable, Text, TextStyle, View } from "react-native";
import createThemedStyles from "../../theme/utils/createThemedStyles";
import { numbersBaseTokens } from "../../theme/tokens/base/numbers";
import { useButton } from "./useButton";

type PrimaryButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: "primary" | "destructive";
};

type ButtonComponent = React.ForwardRefExoticComponent<
  PrimaryButtonProps & React.RefAttributes<typeof Pressable>
>;

const Button = forwardRef<View, PrimaryButtonProps>((props, ref) => {
  const { children, disabled = false, variant = "primary" } = props;

  const styles = useStyles({ variant });
  const { isHovered, isPressed, handleHoverIn, handleHoverOut, handlePressIn, handlePressOut } = useButton({ disabled });

  return (
    <Pressable
      ref={ref}
      style={[
        styles.button,
        isHovered && styles.buttonHovered,
        isPressed && styles.buttonPressed,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}) as ButtonComponent;

Button.displayName = "Button";

export { Button };

const useStyles = createThemedStyles<{ variant: "primary" | "destructive" }>(
  ({ numbersAliasTokens, themeColors, customFonts, props, colors }) => ({
    button: {
      backgroundColor:
        props.variant === "destructive"
          ? "transparent"
          : themeColors.button.background.primary.idle,
      borderRadius: numbersAliasTokens.borderRadius["2xl"],
      height: numbersBaseTokens.globalScale["12"],
      justifyContent: "center",
      alignItems: "center",
      flex:1,
      paddingHorizontal: numbersAliasTokens.spacing.lg,
    },
    buttonHovered: {
      backgroundColor:
        props.variant === "destructive"
          ? themeColors.button.background.destructive.hover
          : themeColors.button.background.primary.hover,
    },
    buttonPressed: {
      backgroundColor:
        props.variant === "destructive"
          ? themeColors.button.background.destructive.pressed
          : themeColors.button.background.primary.pressed,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      color:
        props.variant === "destructive"
          ? colors.text.danger
          : colors.text.white,
      ...customFonts.regular.text.md,
    },
  })
);
