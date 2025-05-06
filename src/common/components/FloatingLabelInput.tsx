import React, { useState, useEffect, forwardRef } from "react";
import {
  View,
  TextInput,
  Animated,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../theme/tokens/alias/numbers";
import { numbersBaseTokens } from "../theme/tokens/base/numbers";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  backgroundColor: string;
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  showChevron?: boolean;
  onChevronPress?: () => void;
  leftIconName?: keyof typeof Feather.glyphMap;
}

const StepperInput = forwardRef<
  TextInput,
  {
    value: string | undefined;
    onIncrement: () => void;
    onDecrement: () => void;
    backgroundColor: string;
    props: TextInputProps;
  }
>(({ value, onIncrement, onDecrement, backgroundColor, props }, ref) => {
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
});

const ChevronInput = forwardRef<
  TextInput,
  {
    value: string | undefined;
    onChevronPress: () => void;
    backgroundColor: string;
    props: TextInputProps;
  }
>(({ value, onChevronPress, backgroundColor, props }, ref) => {
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.inputRow, { backgroundColor }]}
      activeOpacity={0.7}
      onPress={onChevronPress}
    >
      <TextInput
        {...props}
        ref={ref}
        value={value}
        style={[styles.dropdown]}
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

const StandardInput = forwardRef<
  TextInput,
  {
    value: string | undefined;
    leftIconName?: keyof typeof Feather.glyphMap;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    props: TextInputProps;
  }
>(({ value, leftIconName, onFocus, onBlur, props }, ref) => {
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
        style={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
});

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onFocus,
  onBlur,
  backgroundColor,
  showStepper = false,
  onIncrement,
  onDecrement,
  showChevron = false,
  onChevronPress,
  leftIconName,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useState(new Animated.Value(value ? 1 : 0))[0];
  const inputRef = React.useRef<TextInput>(null);
  const styles = useStyles();
  const colors = useThemedColors();

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: "absolute",
    left: leftIconName
      ? numbersAliasTokens.spacing["2xl"]
      : numbersAliasTokens.spacing.xs,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: colors.text.secondary,
    backgroundColor: backgroundColor,
    paddingHorizontal: 4,
    zIndex: 1,
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleLabelPress = () => {
    if (!showChevron) {
      inputRef.current?.focus();
    } else if (onChevronPress) {
      onChevronPress();
    }
  };

  const renderInput = () => {
    if (showStepper) {
      return (
        <StepperInput
          value={value}
          onIncrement={onIncrement!}
          onDecrement={onDecrement!}
          backgroundColor={backgroundColor}
          props={props}
          ref={inputRef}
        />
      );
    }

    if (showChevron) {
      return (
        <ChevronInput
          value={value}
          onChevronPress={onChevronPress!}
          backgroundColor={backgroundColor}
          props={props}
          ref={inputRef}
        />
      );
    }

    return (
      <StandardInput
        value={value}
        leftIconName={leftIconName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        props={props}
        ref={inputRef}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle} onPress={handleLabelPress}>
        {label}
      </Animated.Text>
      {renderInput()}
    </View>
  );
};

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  container: {
    position: "relative",
    marginBottom: numbersAliasTokens.spacing.xs,
  },
  input: {
    borderWidth: numbersAliasTokens.borderWidth.xs,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius.sm,
    padding: numbersAliasTokens.spacing.xs,
    paddingTop: numbersAliasTokens.spacing.md,
    fontSize: numbersBaseTokens.typography.size[3],
    color: colors.text.primary,
  },
  dropdown: {
    borderWidth: 0,
    color: colors.text.primary,
    paddingRight: numbersAliasTokens.spacing.xs,
  },
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
  chevronIcon: {
    marginLeft: numbersAliasTokens.spacing["2xs"],
  },
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
