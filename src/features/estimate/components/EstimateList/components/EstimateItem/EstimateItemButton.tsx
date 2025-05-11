import {
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  TouchableHighlight,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import ItemContent from "./EstimateItemDataDisplay";
import type { EstimateRow } from "@/data";
import createThemedStyles, {
  useThemedAlphaColors,
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";

interface EstimateItemContentProps {
  handleEdit: () => void;
  item: EstimateRow;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  supplierLogoUrl?: string;
  isLast: boolean;
  onSwipeComplete?: () => void;
  swipeThreshold?: number;
  translateX: Animated.Value;
  animationDuration?: number;
  deleteOffset?: number;
}

const _getSwipeDirection = (dx: number): -1 | 1 => {
  const isRight = dx > 0;
  if (isRight) {
    return 1;
  }
  return -1;
};

export const EstimateItemButton = React.memo(
  ({
    handleEdit,
    item,
    description,
    quantity,
    unitPrice,
    total,
    supplierLogoUrl,
    isLast,
    onSwipeComplete,
    swipeThreshold = 196,
    translateX,
    animationDuration = 200,
    deleteOffset = 500,
  }: EstimateItemContentProps) => {
    const colors = useThemedColors();
    const styles = useStyles({ isLast });
    const getColorWithAlpha = useThemedAlphaColors();

    const animateReturnToPosition = useCallback(() => {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, [translateX]);

    const handlePanResponderMove = useCallback(
      (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        translateX.setValue(gestureState.dx);
      },
      [translateX]
    );

    const animateMoveButtonToDirection = useCallback(
      (gestureState: PanResponderGestureState) => {
        const direction = _getSwipeDirection(gestureState.dx);

        Animated.timing(translateX, {
          toValue: direction * Math.abs(deleteOffset),
          duration: animationDuration,
          useNativeDriver: true,
        }).start(onSwipeComplete);
      },
      [
        translateX,
        swipeThreshold,
        deleteOffset,
        animationDuration,
        onSwipeComplete,
      ]
    );

    const handlePanResponderRelease = useCallback(
      (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (Math.abs(gestureState.dx) > swipeThreshold) {
          animateMoveButtonToDirection(gestureState);
        } else {
          animateReturnToPosition();
        }
      },
      [
        translateX,
        swipeThreshold,
        deleteOffset,
        animationDuration,
        onSwipeComplete,
        animateReturnToPosition,
      ]
    );

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 25;
          },
          onPanResponderGrant: () => true,
          onPanResponderMove: handlePanResponderMove,
          onPanResponderRelease: handlePanResponderRelease,
          onPanResponderTerminate: animateReturnToPosition,
          onPanResponderTerminationRequest: () => false,
        }),
      [
        handlePanResponderMove,
        handlePanResponderRelease,
        animateReturnToPosition,
      ]
    );

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        {...panResponder.panHandlers}
      >
        <TouchableHighlight
          underlayColor={getColorWithAlpha(colors.layer.solid.light, 60)}
          style={styles.editButtonWrapper}
          onPress={handleEdit}
        >
          <ItemContent
            description={description}
            quantity={quantity}
            unitPrice={unitPrice}
            uom={item.uom}
            total={total}
            supplierLogoUrl={supplierLogoUrl}
          />
        </TouchableHighlight>
      </Animated.View>
    );
  }
);

const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, props }) => ({
    editButtonWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: numbersAliasTokens.spacing.sm,
      paddingRight: numbersAliasTokens.spacing["3xl"],
      backgroundColor: colors.layer.solid.light,
      borderBottomWidth: props.isLast ? 0 : numbersAliasTokens.borderWidth.xs,
      borderColor: colors.layer.solid.darker,
      gap: numbersAliasTokens.spacing["2xs"],
    },
  })
);

EstimateItemButton.displayName = "EstimateItemContent";
