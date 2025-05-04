import {
  View,
  Text,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLayoutEffect, useRef, useCallback, useState } from "react";
import type { EstimateRow, UnitOfMeasure } from "@/data";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { useEstimateItem } from "./useEstimateItem";
import { Feather } from "@expo/vector-icons";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import { EditForm } from "@/src/features/estimate/components/EditForm";
import React from "react";
interface EstimateItemProps {
  item: EstimateRow;
  isLast: boolean;
}

const SWIPE_THRESHOLD = 196;
const SHOW_DELETE_THRESHOLD = SWIPE_THRESHOLD / 2;
const DELETE_ANIMATION_DURATION = 200;
const DELETE_OFFSET = -500;

export default function EstimateItem({ item, isLast }: EstimateItemProps) {
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const styles = useStyles({ isLast });
  const colors = useThemedColors();
  const {
    description,
    quantity,
    unitPrice,
    total,
    handleRemove,
    supplierLogoUrl,
    handleSaveItem,
    handleCloseEdit,
    handleEdit,
  } = useEstimateItem({
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
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderGrant: () => {
        return true;
      },
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: resetPosition,
      onPanResponderTerminationRequest: () => true,
    })
  ).current;

  const getTranslationX = useCallback(() => {
    return {
      transform: [{ translateX }],
    };
  }, [translateX]);

  const getDeleteButtonOpacity = useCallback(() => {
    return {
      opacity: translateX.interpolate({
        inputRange: [-SHOW_DELETE_THRESHOLD, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
    };
  }, [translateX]);

  const forceRecalculateHeight = () => {
    setMeasuredHeight(null);
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, measuredHeight) => {
        setMeasuredHeight(measuredHeight);
        height.setValue(measuredHeight);
      });
    }
  }, []);

  const handleChangeUom = () => {
    handleEdit(
      <View>
        <Text>Change UOM</Text>
      </View>
    );
  };

  return (
    <>
      <Animated.View
        style={measuredHeight !== null && { height }}
        ref={containerRef}
      >
        <Animated.View
          style={[styles.deleteButtonContainer, getDeleteButtonOpacity()]}
        >
          <Feather
            name="trash-2"
            size={numbersBaseTokens.globalScale[6]}
            color={colors.icon.white}
          />
        </Animated.View>

        <Animated.View style={getTranslationX()} {...panResponder.panHandlers}>
          <TouchableOpacity
            style={[styles.editButtonWrapper]}
            onPress={() =>
              handleEdit(
                <EditForm
                  mode="item"
                  data={item}
                  onSave={(updatedItem) => {
                    handleSaveItem(updatedItem);
                    forceRecalculateHeight();
                  }}
                  onClose={handleCloseEdit}
                  onDropdownPress={handleChangeUom}
                />
              )
            }
          >
            <View style={styles.description}>
              <Text style={styles.title}>{description}</Text>
              <Text style={styles.quantityText}>
                {quantity} x {unitPrice} / {item.uom}
              </Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.totalText}>{total}</Text>
              {supplierLogoUrl && (
                <View style={styles.supplierLogoContainer}>
                  <Image
                    source={{ uri: supplierLogoUrl }}
                    style={styles.supplierLogo}
                    resizeMode="contain"
                    onLoadStart={() => setIsImageLoading(true)}
                    onLoadEnd={() => setIsImageLoading(false)}
                  />
                  {isImageLoading && (
                    <ActivityIndicator
                      size="small"
                      color={colors.icon.primary}
                      style={styles.loadingIndicator}
                    />
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </>
  );
}
const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, customFonts, props }) => ({
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
      paddingRight: numbersAliasTokens.spacing.md,
      zIndex: 0,
    },
    rightContent: {
      alignItems: "flex-end",
      gap: numbersAliasTokens.spacing.xs,
    },
    supplierLogoContainer: {
      position: "relative",
      width: numbersAliasTokens.sizing.icon.xl,
      height: numbersAliasTokens.sizing.icon.xl,
    },
    loadingIndicator: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    supplierLogo: {
      width: numbersAliasTokens.sizing.icon.xl,
      height: numbersAliasTokens.sizing.icon.xl,
      borderRadius: numbersAliasTokens.borderRadius.sm,
    },
  })
);
