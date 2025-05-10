import { View, Animated, Button } from "react-native";
import {
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import type { EstimateRow } from "@/data";
import { useEstimateItem } from "./useEstimateItem";
import React from "react";
import { DeleteButton } from "./DeleteButton";
import { DIRECTIONS } from "@/src/common/enums/directions";
import { EstimateItemButton } from "./EstimateItemButton";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import { useTheme } from "@/src/common/hooks/useTheme";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";

interface EstimateItemProps {
  item: EstimateRow;
  isLast: boolean;
}

const SWIPE_THRESHOLD = 196;
const ANIMATION_DURATION = 200;
const DELETE_OFFSET = 500;

const EstimateItem = React.memo(({ item, isLast }: EstimateItemProps) => {
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  const forceRecalculateHeight = useCallback(() => {
    setMeasuredHeight(null);
  }, []);

  useEffect(() => {
    forceRecalculateHeight();
  }, [item.title, forceRecalculateHeight]);

  const {
    description,
    quantity,
    unitPrice,
    total,
    handleRemove,
    supplierLogoUrl,
    handleEdit,
  } = useEstimateItem({
    item,
  });

  const containerRef = useRef<View>(null);
  const height = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const animateMinimizeToDeletion = useCallback(() => {
    Animated.timing(height, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(handleRemove);
  }, [height, handleRemove]);

  const handleSwipeComplete = useCallback(() => {
    animateMinimizeToDeletion();
  }, [animateMinimizeToDeletion]);

  useLayoutEffect(() => {
    if (containerRef.current && !measuredHeight) {
      containerRef.current.measure((x, y, width, measuredHeight) => {
        setMeasuredHeight(measuredHeight);
        height.setValue(measuredHeight);
      });
    }
  }, [measuredHeight, height]);

  return (
    <>
      <Animated.View
        style={measuredHeight !== null && { height }}
        ref={containerRef}
      >
        <DeleteButton
          position={DIRECTIONS.RIGHT}
          translateX={translateX}
          swipeThreshold={SWIPE_THRESHOLD}
        />
        <DeleteButton
          position={DIRECTIONS.LEFT}
          translateX={translateX}
          swipeThreshold={SWIPE_THRESHOLD}
        />

        <EstimateItemButton
          handleEdit={handleEdit}
          item={item}
          description={description}
          quantity={quantity}
          unitPrice={unitPrice}
          total={total}
          supplierLogoUrl={supplierLogoUrl}
          isLast={isLast}
          onSwipeComplete={handleSwipeComplete}
          swipeThreshold={SWIPE_THRESHOLD}
          translateX={translateX}
          animationDuration={ANIMATION_DURATION}
          deleteOffset={DELETE_OFFSET}
        />
      </Animated.View>
    </>
  );
});

EstimateItem.displayName = "EstimateItem";

export default EstimateItem;
