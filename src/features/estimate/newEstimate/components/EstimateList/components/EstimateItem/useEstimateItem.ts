import type { EstimateRow } from "@/data";
import { useRef, useCallback } from "react";
import { Animated, PanResponder } from "react-native";
import { formatCurrency } from "@/src/common/utils/format";

interface UseEstimateItemProps {
  item: EstimateRow;
  onRemove: (id: string) => void;
}

const SWIPE_THRESHOLD = 120;

export function useEstimateItem({ item, onRemove }: UseEstimateItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const itemHeight = useRef(new Animated.Value(0)).current;

  const handleRemove = () => {
    onRemove(item.id);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Delete animation
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: -500,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(itemHeight, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start(() => {
            handleRemove();
          });
        } else {
          // Reset position
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const getItemStyle = useCallback(() => {
    return {
      transform: [{ translateX }],
    };
  }, [translateX]);

  const getDeleteButtonStyle = useCallback(() => {
    const opacity = translateX.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return {
      opacity,
    };
  }, [translateX]);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    panResponder,
    getItemStyle,
    getDeleteButtonStyle,
  };
} 