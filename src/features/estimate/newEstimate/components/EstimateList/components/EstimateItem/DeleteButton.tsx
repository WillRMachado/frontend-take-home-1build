import { Animated } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { DIRECTIONS } from "@/src/common/enums/directions";

export interface DeleteButtonProps {
  position: DIRECTIONS;
  translateX: Animated.Value;
  swipeThreshold: number;
}

const getOpacityInterpolation = (
  translateX: Animated.Value,
  isLeft: boolean,
  swipeThreshold: number
) => {
  const showDeleteThreshold = swipeThreshold / 2;
  return {
    opacity: translateX.interpolate({
      inputRange: [-showDeleteThreshold, 0, showDeleteThreshold],
      outputRange: isLeft ? [0, 0, 1] : [1, 0, 0],
      extrapolate: "clamp",
    }),
  };
};

export const DeleteButton = React.memo(
  ({ position, translateX, swipeThreshold }: DeleteButtonProps) => {
    console.log(`DeleteButton ${position} rendered`);

    const colors = useThemedColors();
    const styles = useStyles({ swipeThreshold });
    const isLeft = position === DIRECTIONS.LEFT;

    const opacityStyle = React.useMemo(
      () => getOpacityInterpolation(translateX, isLeft, swipeThreshold),
      [translateX, isLeft, swipeThreshold]
    );

    return (
      <Animated.View
        style={[
          styles.deleteButtonContainer,
          isLeft ? styles.deleteButtonRight : styles.deleteButtonLeft,
          opacityStyle,
        ]}
      >
        <Feather
          name="trash-2"
          size={numbersBaseTokens.globalScale[6]}
          color={colors.icon.white}
        />
      </Animated.View>
    );
  }
);

const useStyles = createThemedStyles<{ swipeThreshold: number }>(
  ({ colors, numbersAliasTokens, props }) => ({
    deleteButtonContainer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: props.swipeThreshold,
      backgroundColor: colors.core.red.base,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: numbersAliasTokens.spacing.md,
      zIndex: 0,
    },
    deleteButtonLeft: {
      right: 0,
    },
    deleteButtonRight: {
      left: 0,
    },
  })
);

DeleteButton.displayName = "DeleteButton";
