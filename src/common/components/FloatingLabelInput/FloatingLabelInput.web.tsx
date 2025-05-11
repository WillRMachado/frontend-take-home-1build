import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Animated,
  TextInputProps,
  TextStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemedColors } from "../../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../theme/tokens/alias/numbers";
import StepperInput from "./components/StepperInput";
import StandardInput from "./components/StandardInput";
import { ChevronInput } from "./components/ChevronInput";

export interface FloatingLabelInputWebProps extends TextInputProps {
  label: string;
  backgroundColor: string;
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  showChevron?: boolean;
  onChevronPress?: () => void;
  leftIconName?: keyof typeof Feather.glyphMap;
  dropdownList?: React.ReactNode;
  isOpen?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputWebProps> = ({
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
  dropdownList,
  isOpen = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useState(new Animated.Value(value ? 1 : 0))[0];
  const inputRef = React.useRef<TextInput>(null);
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
          dropdownList={dropdownList}
          isOpen={isOpen}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
    <View
      style={{
        zIndex: isOpen ? 2 : 1,
      }}
    >
      <Animated.Text style={labelStyle} onPress={handleLabelPress}>
        {label}
      </Animated.Text>
      {renderInput()}
    </View>
  );
};

export default FloatingLabelInput;
