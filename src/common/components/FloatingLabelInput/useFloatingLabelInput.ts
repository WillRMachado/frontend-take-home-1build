import { useState, useRef } from "react";
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface UseFloatingLabelInputProps {
  value?: string;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  showChevron?: boolean;
  onChevronPress?: () => void;
}

interface UseFloatingLabelInputReturn {
  value: string | undefined;
  isFocused: boolean;
  inputRef: React.RefObject<TextInput>;
  handleFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleLabelPress: () => void;
}

export const useFloatingLabelInput = ({
  value,
  onFocus,
  onBlur,
  showChevron,
  onChevronPress,
}: UseFloatingLabelInputProps): UseFloatingLabelInputReturn => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
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

  return {
    value,
    isFocused,
    inputRef,
    handleFocus,
    handleBlur,
    handleLabelPress,
  };
};

export default useFloatingLabelInput; 