import React, { useState, useEffect, forwardRef } from "react";
import {
  View,
  TextInput,
  Animated,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../theme/tokens/alias/numbers";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  backgroundColor: string;
  containerStyle?: StyleProp<ViewStyle>;
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  showChevron?: boolean;
  onChevronPress?: () => void;
  leftIconName?: keyof typeof Feather.glyphMap;
}

const StepperInput = forwardRef<TextInput, {
  value: string | undefined;
  onIncrement: () => void;
  onDecrement: () => void;
  backgroundColor: string;
  style?: StyleProp<TextStyle>;
  props: TextInputProps;
}>(({ value, onIncrement, onDecrement, backgroundColor, style, props }, ref) => {
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
          style,
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

const ChevronInput = forwardRef<TextInput, {
  value: string | undefined;
  onChevronPress: () => void;
  backgroundColor: string;
  style?: StyleProp<TextStyle>;
  props: TextInputProps;
}>(({ value, onChevronPress, backgroundColor, style, props }, ref) => {
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
        style={[styles.dropdown, style]}
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

const StandardInput = forwardRef<TextInput, {
  value: string | undefined;
  leftIconName?: keyof typeof Feather.glyphMap;
  style?: StyleProp<TextStyle>;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
  props: TextInputProps;
}>(({ value, leftIconName, style, onFocus, onBlur, props }, ref) => {
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <View style={styles.inputWithIconWrapper}>
      {leftIconName && (
        <Feather
          name={leftIconName}
          size={20}
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
          leftIconName ? styles.inputWithLeftIcon : {},
          style,
        ]}
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
  style,
  containerStyle,
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
    left: 12,
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
          style={style}
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
          style={style}
          props={props}
          ref={inputRef}
        />
      );
    }

    return (
      <StandardInput
        value={value}
        leftIconName={leftIconName}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        props={props}
        ref={inputRef}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle as any]}>
      <Animated.Text 
        style={labelStyle}
        onPress={handleLabelPress}
      >
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
    borderWidth: 1,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius["sm"],
    padding: numbersAliasTokens.spacing.xs,
    paddingTop: numbersAliasTokens.spacing.md,
    fontSize: numbersAliasTokens.sizing.icon.sm,
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
    borderWidth: 1,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius["sm"],
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
    gap: 8,
    borderWidth: numbersAliasTokens.borderWidth.xs,
    borderColor: colors.outline.dark,
    borderRadius: numbersAliasTokens.borderRadius["sm"],
    paddingHorizontal: numbersAliasTokens.spacing["2xs"],
    paddingVertical: numbersAliasTokens.spacing["3xs"],
  },
  iconButton: {
    paddingHorizontal: numbersAliasTokens.spacing["3xs"],
    paddingVertical: numbersAliasTokens.spacing["2xs"],
  },
  inputWithIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -10,
    zIndex: 2,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
}));
