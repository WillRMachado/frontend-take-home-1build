import React, { useRef, useLayoutEffect, useState } from "react";
import { Animated, View, ViewStyle } from "react-native";

interface AnimateShrinkToDeletionProps {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
  animationDuration?: number;
  style?: ViewStyle;
  trigger?: boolean;
}

const DEFAULT_ANIMATION_DURATION = 200;

export const AnimateShrinkToDeletion: React.FC<
  AnimateShrinkToDeletionProps
> = ({
  children,
  onAnimationComplete,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  style,
  trigger = false,
}) => {
  const [isMeasured, setIsMeasured] = useState(false);
  const height = useRef(new Animated.Value(0)).current;
  const containerRef = useRef<View>(null);

  const _animateToDeletion = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(onAnimationComplete);
  };

  const _measureInitialHeight = () => {
    if (isMeasured || !containerRef.current) return;

    containerRef.current.measure((_x, _y, _width, measuredHeight) => {
      height.setValue(measuredHeight);
      setIsMeasured(true);
    });
  };

  useLayoutEffect(() => {
    if (!trigger || !isMeasured) return;

    _animateToDeletion();
  }, [trigger, height, animationDuration, onAnimationComplete, isMeasured]);

  useLayoutEffect(() => {
    _measureInitialHeight();
  }, [height, isMeasured]);

  return (
    <Animated.View
      style={[
        {
          height: isMeasured ? height : "auto",
          opacity: isMeasured ? 1 : 0,
        },
        style,
      ]}
      ref={containerRef}
    >
      {children}
    </Animated.View>
  );
};

AnimateShrinkToDeletion.displayName = "AnimateShrinkToDeletion";
