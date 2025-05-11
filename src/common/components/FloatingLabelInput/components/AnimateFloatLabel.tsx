import React from "react";
import { Animated, TextStyle } from "react-native";
import { useThemedColors } from "../../../theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../../theme/tokens/alias/numbers";

interface AnimateFloatLabelProps {
  label: string;
  isFocused: boolean;
  hasValue: boolean;
  leftIconName?: string;
  onPress: () => void;
  backgroundColor: string;
}

export const AnimateFloatLabel: React.FC<AnimateFloatLabelProps> = ({
  label,
  isFocused,
  hasValue,
  leftIconName,
  onPress,
  backgroundColor,
}) => {
  const colors = useThemedColors();
  const labelAnim = React.useState(new Animated.Value(hasValue ? 1 : 0))[0];

  React.useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue]);

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
    backgroundColor:  backgroundColor,
    paddingHorizontal: 4,
    zIndex: 1,
  };

  return (
    <Animated.Text style={labelStyle} onPress={onPress}>
      {label}
    </Animated.Text>
  );
};

export default AnimateFloatLabel; 