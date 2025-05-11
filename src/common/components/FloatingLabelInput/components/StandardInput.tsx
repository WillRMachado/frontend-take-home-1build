import React, { forwardRef } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "../../../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../../theme/tokens/alias/numbers";
import { numbersBaseTokens } from "../../../theme/tokens/base/numbers";

interface StandardInputProps {
  value: string | undefined;
  leftIconName?: keyof typeof Feather.glyphMap;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
  props: TextInputProps;
}

export const StandardInput = forwardRef<TextInput, StandardInputProps>(
  ({ value, leftIconName, onFocus, onBlur, props }, ref) => {
    const colors = useThemedColors();
    const styles = useStyles();

    return (
      <View style={styles.inputWithIconWrapper}>
        {leftIconName && (
          <Feather
            name={leftIconName}
            size={numbersAliasTokens.sizing.icon.sm}
            color={colors.text.secondary}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          {...props}
          ref={ref}
          value={value}
          style={[
            styles.input,
            {
              paddingLeft: leftIconName
                ? numbersAliasTokens.spacing["3xl"]
                : numbersAliasTokens.spacing.xs,
            },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    );
  }
);

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  input: {
    borderWidth: numbersAliasTokens.borderWidth.xs,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius.sm,
    padding: numbersAliasTokens.spacing.xs,
    paddingTop: numbersAliasTokens.spacing.md,
    fontSize: numbersBaseTokens.typography.size[3],
    color: colors.text.primary,
  },
  inputWithIconWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  leftIcon: {
    position: "absolute",
    left: numbersAliasTokens.spacing.sm,
    top: "50%",
    marginTop: -numbersAliasTokens.spacing["2xs"],
    zIndex: 2,
  },
}));

export default StandardInput;
