import React, { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
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
>(
  (
    {
      value,
      onChevronPress,
      backgroundColor,
      props,
      dropdownList,
      isOpen = false,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const colors = useThemedColors();
    const styles = useStyles();

    return (
      <View style={{ position: "relative" }}>
        <View
          style={[
            styles.inputRow,
            { backgroundColor },
            styles.webDropdownStyle,
          ]}
        >
          <TextInput
            {...props}
            ref={ref}
            value={value}
            style={[styles.dropdown, { flex: 1 }]}
            onFocus={onFocus}
            onEndEditing={onBlur}
          />
          <TouchableOpacity
            onPress={() => {
              onChevronPress?.();
            }}
            style={styles.chevronButton}
          >
            <Feather
              name="chevron-down"
              size={numbersAliasTokens.sizing.icon.md}
              color={colors.text.secondary}
              style={[
                styles.chevronIcon,
                { marginLeft: numbersAliasTokens.spacing.sm },
              ]}
            />
          </TouchableOpacity>
        </View>

        {isOpen && <View style={styles.dropdownContainer}>{dropdownList}</View>}
      </View>
    );
  }
);

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
  webDropdownStyle: {
    paddingHorizontal: numbersAliasTokens.spacing.md,
    alignItems: "center",
  },
  chevronButton: {
    padding: numbersAliasTokens.spacing["2xs"],
  },
  dropdownContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
  },
}));

export default ChevronInput;
