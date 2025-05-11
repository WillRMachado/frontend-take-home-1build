import React, { forwardRef } from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "../../../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../../theme/tokens/alias/numbers";

export const ChevronInput = forwardRef<
  TextInput,
  {
    value: string | undefined;
    onChevronPress: () => void;
    backgroundColor: string;
    props: TextInputProps;
    dropdownList?: React.ReactNode;
    isOpen?: boolean;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  }
>(({ value, onChevronPress, backgroundColor, props }, ref) => {
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.inputRow, { backgroundColor }]}
      onPress={onChevronPress}
    >
      <TextInput
        {...props}
        ref={ref}
        value={value}
        style={styles.dropdown}
        editable={false}
        pointerEvents="none"
      />
      <Feather
        name="chevron-down"
        size={numbersAliasTokens.sizing.icon.md}
        color={colors.text.secondary}
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
});

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: numbersAliasTokens.borderWidth.xs,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius.sm,
    padding: numbersAliasTokens.spacing.xs,
    paddingTop: numbersAliasTokens.spacing.md,
  },
  dropdown: {
    borderWidth: 0,
    color: colors.text.primary,
    paddingRight: numbersAliasTokens.spacing.xs,
  },
  chevronIcon: {
    marginLeft: numbersAliasTokens.spacing["2xs"],
  },
}));

export default ChevronInput;
