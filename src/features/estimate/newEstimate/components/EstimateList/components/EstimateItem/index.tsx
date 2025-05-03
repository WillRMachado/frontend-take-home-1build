import {
  View,
  Text,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { useLayoutEffect, useRef, useCallback, useState } from "react";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import type { EstimateRow } from "@/data";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { useEstimateItem } from "./useEstimateItem";
import { Feather } from "@expo/vector-icons";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";

interface EstimateItemProps {
  item: EstimateRow;
  isLast: boolean;
}

const SWIPE_THRESHOLD = 196;
const DELETE_ANIMATION_DURATION = 200;
const DELETE_OFFSET = -500;

export default function EstimateItem({ item, isLast }: EstimateItemProps) {
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  const styles = useStyles({ isLast });
  const colors = useThemedColors();
  const { description, quantity, unitPrice, total, handleRemove } =
    useEstimateItem({
      item,
    });

  const containerRef = useRef<View>(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const height = useRef(new Animated.Value(0)).current;

  const animateDelete = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: DELETE_OFFSET,
        duration: DELETE_ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(height, {
        toValue: 0,
        duration: DELETE_ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start(handleRemove);
  }, [translateX, height, handleRemove, measuredHeight]);

  const resetPosition = useCallback(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  const handlePanResponderMove = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (gestureState.dx < 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    [translateX]
  );

  const handlePanResponderRelease = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (gestureState.dx < -SWIPE_THRESHOLD) {
        animateDelete();
      } else {
        resetPosition();
      }
    },
    [animateDelete, resetPosition]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 15;
      },
      onPanResponderGrant: () => {
        return true;
      },
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: resetPosition,
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  const getTranslationX = useCallback(() => {
    return {
      transform: [{ translateX }],
    };
  }, [translateX]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, measuredHeight) => {
        setMeasuredHeight(measuredHeight);
        height.setValue(measuredHeight);
      });
    }
  }, []);

  return (
    <Animated.View
      style={[styles.wrapper, measuredHeight !== null && { height }]}
      ref={containerRef}
    >
      <Animated.View style={styles.deleteButtonContainer}>
        <Feather
          name="trash-2"
          size={numbersBaseTokens.globalScale[6]}
          color={colors.icon.white}
        />
      </Animated.View>

      <Animated.View
        style={[getTranslationX(), styles.container]}
        {...panResponder.panHandlers}
      >
        <View style={styles.description}>
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.quantityText}>
            {quantity} x {unitPrice} / {item.uom}
          </Text>
        </View>
        <View>
          <Text style={styles.totalText}>{total}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, customFonts, props }) => ({
    wrapper: {},
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: numbersAliasTokens.spacing.sm,
      paddingRight: numbersAliasTokens.spacing["3xl"],
      backgroundColor: colors.layer.solid.dark,
      borderBottomWidth: props.isLast ? 0 : numbersAliasTokens.borderWidth.xs,
      borderColor: colors.layer.solid.darker,
      gap: numbersAliasTokens.spacing["2xs"],
    },
    description: {
      flexDirection: "column",
      gap: numbersAliasTokens.spacing["2xs"],
      flex: 1,
    },
    title: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
      flexWrap: "wrap",
    },
    quantityText: {
      color: colors.text.secondary,
      ...customFonts.regular.text.sm,
    },
    totalText: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
      flex: 1,
    },
    deleteButtonContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: SWIPE_THRESHOLD,
      backgroundColor: colors.core.red.base,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: numbersAliasTokens.spacing.sm,
      zIndex: 0,
    },
  })
);
// import {
//   View,
//   Text,
//   Animated,
//   PanResponder,
//   GestureResponderEvent,
//   PanResponderGestureState,
// } from "react-native";
// import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
// import type { EstimateRow } from "@/data";
// import createThemedStyles, {
//   useThemedColors,
// } from "@/src/common/theme/utils/createThemedStyles";
// import { useEstimateItem } from "./useEstimateItem";
// import { Feather } from "@expo/vector-icons";
// import { useRef, useCallback, useState } from "react";
// import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";

// interface EstimateItemProps {
//   item: EstimateRow;
//   isLast: boolean;
// }

// const SWIPE_THRESHOLD = 196;
// const DELETE_ANIMATION_DURATION = 200;
// const DELETE_OFFSET = -500;

// export default function EstimateItem({ item, isLast }: EstimateItemProps) {
//   const styles = useStyles({ isLast });
//   const colors = useThemedColors();
//   const { description, quantity, unitPrice, total, handleRemove } =
//     useEstimateItem({
//       item,
//     });

//   const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
//   const translateX = useRef(new Animated.Value(0)).current;
//   const height = useRef(new Animated.Value(0)).current;

//   const onLayout = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
//     if (measuredHeight === null) {
//       const h = event.nativeEvent.layout.height;
//       setMeasuredHeight(h);
//       height.setValue(h);
//     }
//   }, [measuredHeight, height]);

//   const animateDelete = useCallback(() => {
//     if (measuredHeight === null) return;
//     Animated.parallel([
//       Animated.timing(translateX, {
//         toValue: DELETE_OFFSET,
//         duration: DELETE_ANIMATION_DURATION,
//         useNativeDriver: true,
//       }),
//       Animated.timing(height, {
//         toValue: 0,
//         duration: DELETE_ANIMATION_DURATION,
//         useNativeDriver: false,
//       }),
//     ]).start(() => {
//       handleRemove();
//     });
//   }, [translateX, height, handleRemove, measuredHeight]);

//   const resetPosition = useCallback(() => {
//     Animated.parallel([
//       Animated.spring(translateX, {
//         toValue: 0,
//         useNativeDriver: true,
//       }),
//       Animated.spring(height, {
//         toValue: measuredHeight ?? 0,
//         useNativeDriver: false,
//       }),
//     ]).start();
//   }, [translateX, height, measuredHeight]);

//   const handlePanResponderMove = useCallback(
//     (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
//       if (gestureState.dx < 0) {
//         translateX.setValue(gestureState.dx);
//       }
//     },
//     [translateX]
//   );

//   const handlePanResponderRelease = useCallback(
//     (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
//       if (gestureState.dx < -SWIPE_THRESHOLD) {
//         animateDelete();
//       } else {
//         resetPosition();
//       }
//     },
//     [animateDelete, resetPosition]
//   );

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         return Math.abs(gestureState.dx) > 15;
//       },
//       onPanResponderGrant: () => {
//         return true;
//       },
//       onPanResponderMove: handlePanResponderMove,
//       onPanResponderRelease: handlePanResponderRelease,
//       onPanResponderTerminate: resetPosition,
//       onPanResponderTerminationRequest: () => false,
//     })
//   ).current;

//   const getItemStyle = useCallback(() => {
//     return {
//       transform: [{ translateX }],
//     };
//   }, [translateX]);

//   return (
//     <Animated.View
//       style={[styles.wrapper, measuredHeight !== null && { height }]}
//       onLayout={onLayout}
//     >
//       <Animated.View style={styles.deleteButtonContainer}>
//         <Feather
//           name="trash-2"
//           size={numbersBaseTokens.globalScale[6]}
//           color={colors.icon.white}
//         />
//       </Animated.View>

//       <Animated.View
//         style={[getItemStyle(), styles.container]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.description}>
//           <Text style={styles.title}>{description}</Text>
//           <Text style={styles.quantityText}>
//             {quantity} x {unitPrice} / {item.uom}
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.totalText}>{total}</Text>
//         </View>
//       </Animated.View>
//     </Animated.View>
//   );
// }
// const useStyles = createThemedStyles<{ isLast?: boolean }>(
//   ({ colors, numbersAliasTokens, customFonts, props }) => ({
//     wrapper: {},
//     container: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "flex-start",
//       padding: numbersAliasTokens.spacing.sm,
//       paddingRight: numbersAliasTokens.spacing["3xl"],
//       backgroundColor: colors.layer.solid.dark,
//       borderBottomWidth: props.isLast ? 0 : numbersAliasTokens.borderWidth.xs,
//       borderColor: colors.layer.solid.darker,
//       gap: numbersAliasTokens.spacing["2xs"],
//     },
//     description: {
//       flexDirection: "column",
//       gap: numbersAliasTokens.spacing["2xs"],
//       flex: 1,
//     },
//     title: {
//       color: colors.text.primary,
//       ...customFonts.regular.text.md,
//       flexWrap: 'wrap',
//     },
//     quantityText: {
//       color: colors.text.secondary,
//       ...customFonts.regular.text.sm,
//     },
//     totalText: {
//       color: colors.text.primary,
//       ...customFonts.regular.text.md,
//       flex: 1,
//     },
//     deleteButtonContainer: {
//       position: "absolute",
//       right: 0,
//       top: 0,
//       bottom: 0,
//       width: SWIPE_THRESHOLD,
//       backgroundColor: colors.core.red.base,
//       justifyContent: "center",
//       alignItems: "flex-end",
//       paddingRight: numbersAliasTokens.spacing.sm,
//       zIndex: 0,
//     },
//   })
// );
