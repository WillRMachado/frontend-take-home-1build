import { View, Text, Animated, ViewStyle, TextStyle } from "react-native";
import type { EstimateRow } from "@/data";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import { useEstimateItem } from "./useEstimateItem";
import { Feather } from "@expo/vector-icons";

interface EstimateItemProps {
  item: EstimateRow;
  onRemove: (id: string) => void;
  isLast: boolean;
}

const SWIPE_THRESHOLD = 120;

export default function EstimateItem({
  item,
  onRemove,
  isLast,
}: EstimateItemProps) {
  const styles = useStyles({ isLast });
  const {
    description,
    quantity,
    unitPrice,
    total,
    panResponder,
    getItemStyle,
    getDeleteButtonStyle,
  } = useEstimateItem({
    item,
    onRemove,
  });

  return (
    <View style={styles.wrapper}>
      {/* <Animated.View style={[styles.deleteButtonContainer, getDeleteButtonStyle()]}>
        <Feather name="trash-2" size={24} color="white" />
      </Animated.View> */}

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.quantityText}>
            {quantity} x {unitPrice} / {item.uom}
          </Text>
        </View>
        <View>
          <Text style={styles.totalText}>{total}</Text>
        </View>
      </View>
    </View>
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
    },
    title: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
    },
    quantityText: {
      fontSize: numbersBaseTokens.typography.size["3"],
      color: colors.text.secondary,
    },
    totalText: {
      fontSize: numbersBaseTokens.typography.size["4"],
      color: colors.text.primary,
    },



    
    deleteButtonContainer: {
      // position: "absolute",
      // right: 0,
      // top: 0,
      // bottom: 0,
      // width: SWIPE_THRESHOLD,
      // backgroundColor: "#E74C3C",
      // justifyContent: "center",
      // alignItems: "center",
    },
    mainContent: {
      // flex: 1,
      // gap: numbersAliasTokens.spacing.xs,
    },


    priceContainer: {
      marginLeft: numbersAliasTokens.spacing.md,
    },
    price: {
      fontSize: numbersBaseTokens.typography.size["4"],
      color: colors.text.primary,
      fontWeight: "500",
    },
  })
);
