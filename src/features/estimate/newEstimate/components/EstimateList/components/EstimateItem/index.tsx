import { View, Text, TouchableOpacity } from "react-native";
import type { EstimateRow } from "@/data";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import { colorsBaseTokens } from "@/src/common/theme/tokens/base/colors";
import { useEstimateItem } from "./useEstimateItem";

interface EstimateItemProps {
  item: EstimateRow;
  onRemove: (id: string) => void;
}

export default function EstimateItem({ item, onRemove }: EstimateItemProps) {
  const styles = useStyles();
  const { description, quantity, unitPrice, total, handleRemove } = useEstimateItem({
    item,
    onRemove,
  });

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.quantity}>Qty: {quantity} {item.uom}</Text>
          <Text style={styles.price}>Price: {unitPrice}</Text>
          <Text style={styles.total}>Total: {total}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={handleRemove}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const useStyles = createThemedStyles(
  ({ colors, numbersAliasTokens }) => ({
    itemContainer: {
      flexDirection: "row",
      backgroundColor: colors.layer.solid.medium,
      borderRadius: numbersAliasTokens.borderRadius.sm,
      padding: numbersAliasTokens.spacing.sm,
      marginBottom: numbersAliasTokens.spacing.xs,
      shadowColor: colorsBaseTokens.solid.neutral["900"],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    itemContent: {
      flex: 1,
    },
    description: {
      fontSize: numbersBaseTokens.typography.size["4"],
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: numbersAliasTokens.spacing.xs,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    quantity: {
      fontSize: numbersBaseTokens.typography.size["3"],
      color: colors.text.secondary,
    },
    price: {
      fontSize: numbersBaseTokens.typography.size["3"],
      color: colors.text.secondary,
    },
    total: {
      fontSize: numbersBaseTokens.typography.size["3"],
      fontWeight: "600",
      color: colors.text.primary,
    },
    removeButton: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: numbersAliasTokens.spacing.xs,
    },
    removeButtonText: {
      fontSize: numbersBaseTokens.typography.size["5"],
      color: colors.text.danger,
      fontWeight: "600",
    },
  })
); 