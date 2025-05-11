import React from "react";
import { View, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import StepperInput from "./components/StepperInput";
import StandardInput from "./components/StandardInput";
import { ChevronInput } from "./components/ChevronInput";
import AnimateFloatLabel from "./components/AnimateFloatLabel";
import useFloatingLabelInput from "./useFloatingLabelInput";

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
  const { isFocused, inputRef, handleFocus, handleBlur, handleLabelPress } =
    useFloatingLabelInput({
      value,
      onFocus,
      onBlur,
      showChevron,
      onChevronPress,
    });

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
      <AnimateFloatLabel
        label={label}
        isFocused={isFocused}
        hasValue={!!value}
        leftIconName={leftIconName}
        onPress={handleLabelPress}
        backgroundColor={backgroundColor}
      />
      {renderInput()}
    </View>
  );
};

export default FloatingLabelInput;
