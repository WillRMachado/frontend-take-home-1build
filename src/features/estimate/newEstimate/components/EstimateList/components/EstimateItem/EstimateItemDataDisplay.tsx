import React from "react";
import { View, Text } from "react-native";
import LazyImage from "@/src/common/components/LazyImage/LazyImage";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";

const ItemContent = React.memo(
  ({
    description,
    quantity,
    unitPrice,
    uom,
    total,
    supplierLogoUrl,
  }: {
    description: string;
    quantity: number;
    unitPrice: string;
    uom: string;
    total: string;
    supplierLogoUrl?: string;
  }) => {
    const styles = useStyles();

    return (
      <>
        <View style={styles.description}>
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.quantityText}>
            {quantity} x {unitPrice} / {uom}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.totalText}>{total}</Text>
          {supplierLogoUrl && (
            <View style={styles.supplierLogoContainer}>
              <LazyImage uri={supplierLogoUrl} style={styles.supplierLogo} />
            </View>
          )}
        </View>
      </>
    );
  }
);

const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, customFonts, props }) => ({
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
    rightContent: {
      alignItems: "flex-end",
      gap: numbersAliasTokens.spacing.xs,
    },
    supplierLogoContainer: {
      position: "relative",
      width: numbersAliasTokens.sizing.icon.xl,
      height: numbersAliasTokens.sizing.icon.xl,
    },
    supplierLogo: {
      width: numbersAliasTokens.sizing.icon.xl,
      height: numbersAliasTokens.sizing.icon.xl,
      borderRadius: numbersAliasTokens.borderRadius.sm,
    },
  })
);

export default ItemContent;
