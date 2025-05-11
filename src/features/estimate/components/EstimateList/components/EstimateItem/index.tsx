import { Animated } from "react-native";
import { useRef } from "react";
import type { EstimateRow } from "@/data";
import { useEstimateItem } from "./useEstimateItem";
import React from "react";
import { DeleteButton } from "./DeleteButton";
import { DIRECTIONS } from "@/src/common/enums/directions";
import { EstimateItemButton } from "./EstimateItemButton";
import { AnimateShrinkToDeletion } from "@/src/common/components/AnimateShrinkToDeletion";

interface EstimateItemProps {
  item: EstimateRow;
  isLast: boolean;
}

const SWIPE_THRESHOLD = 196;
const ANIMATION_DURATION = 200;
const DELETE_OFFSET = 500;

const EstimateItem = React.memo(({ item, isLast }: EstimateItemProps) => {
  const {
    description,
    quantity,
    unitPrice,
    total,
    handleRemove,
    supplierLogoUrl,
    handleEdit,
    shouldAnimate,
    handleSwipeComplete,
  } = useEstimateItem({
    item,
  });

  const translateX = useRef(new Animated.Value(0)).current;

  return (
    <AnimateShrinkToDeletion
      onAnimationComplete={handleRemove}
      animationDuration={ANIMATION_DURATION}
      trigger={shouldAnimate}
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
    </AnimateShrinkToDeletion>
  );
});

EstimateItem.displayName = "EstimateItem";

export default EstimateItem;
