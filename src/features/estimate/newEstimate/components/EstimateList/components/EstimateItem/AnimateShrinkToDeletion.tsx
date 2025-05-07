import React, { useRef, useEffect } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

interface AnimateShrinkToDeletionProps {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
  animationDuration?: number;
  style?: ViewStyle;
}

const DEFAULT_ANIMATION_DURATION = 200;

export const AnimateShrinkToDeletion: React.FC<AnimateShrinkToDeletionProps> = ({
  children,
  onAnimationComplete,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  style,
}) => {
  const height = useRef(new Animated.Value(0)).current;
  const containerRef = useRef<View>(null);

  const animateMinimizeToDeletion = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(onAnimationComplete);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, measuredHeight) => {
        height.setValue(measuredHeight);
      });
    }
  }, [height]);

  return (
    <Animated.View style={[{ height }, style]} ref={containerRef}>
      {children}
    </Animated.View>
  );
};

AnimateShrinkToDeletion.displayName = 'AnimateShrinkToDeletion'; 