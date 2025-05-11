import React, { forwardRef } from "react";
import { View, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, { useThemedColors } from "../../../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../../theme/tokens/alias/numbers";
import { numbersBaseTokens } from "../../../theme/tokens/base/numbers";

interface StepperInputProps {
  value: string | undefined;
  onIncrement: () => void;
  onDecrement: () => void;
  backgroundColor: string;
  props: TextInputProps;
}

export const StepperInput = forwardRef<TextInput, StepperInputProps>(
  ({ value, onIncrement, onDecrement, backgroundColor, props }, ref) => {
    const colors = useThemedColors();
    const styles = useStyles();

    return (
      <View style={[styles.stepperRow, { backgroundColor }]}>
        <TouchableOpacity onPress={onDecrement} style={styles.iconButton}>
          <Feather
            name="minus"
            size={numbersAliasTokens.sizing.icon.md}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <TextInput
          {...props}
          ref={ref}
          value={value}
          style={[
            styles.input,
            {
              borderWidth: 0,
              backgroundColor: "transparent",
              textAlign: "center",
              flex: 1,
            },
          ]}
          keyboardType={props.keyboardType || "decimal-pad"}
        />
        <TouchableOpacity onPress={onIncrement} style={styles.iconButton}>
          <Feather
            name="plus"
            size={numbersAliasTokens.sizing.icon.md}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    );
  }
);

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: numbersAliasTokens.spacing["2xs"],
    borderWidth: numbersAliasTokens.borderWidth.xs,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius.sm,
    paddingHorizontal: numbersAliasTokens.spacing["2xs"],
    paddingVertical: numbersAliasTokens.spacing["3xs"],
  },
  iconButton: {
    paddingHorizontal: numbersAliasTokens.spacing["3xs"],
    paddingVertical: numbersAliasTokens.spacing["2xs"],
  },
  input: {
    fontSize: numbersBaseTokens.typography.size[3],
    color: colors.text.primary,
  },
}));

export default StepperInput; 