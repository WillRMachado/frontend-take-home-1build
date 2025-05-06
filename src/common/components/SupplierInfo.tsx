import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Supplier } from "@/data";
import LazyImage from "./LazyImage/LazyImage";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";

export default function SupplierInfo({ supplier }: { supplier: Supplier }) {
  const styles = useStyles();
  if (!supplier) return null;
  return (
    <View style={styles.supplierContainer}>
      <Text style={styles.supplierLabel}>Provided by supplier</Text>
      <TouchableOpacity
        style={styles.supplierLink}
        onPress={() => supplier.productUrl && Linking.openURL(supplier.productUrl)}
        activeOpacity={0.7}
      >
        <Text style={styles.supplierName} numberOfLines={1} ellipsizeMode="tail">
          {supplier.name}
        </Text>
        {!!supplier?.logoUrl && (
          <LazyImage
            uri={supplier.logoUrl}
            size="md"
            style={styles.supplierLogo}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  supplierContainer: {
    backgroundColor: colors.layer.solid.light,
    borderRadius: numbersAliasTokens.borderRadius.md,
    padding: numbersAliasTokens.spacing.sm,
    marginVertical: numbersAliasTokens.spacing.xs,
  },
  supplierLabel: {
    color: colors.text.secondary,
    fontSize: 12,
    marginBottom: numbersAliasTokens.spacing["3xs"],
  },
  supplierLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  supplierName: {
    color: colors.text.primary,
    textDecorationLine: "underline",
    fontSize: 14,
    flex: 1,
  },
  supplierLogo: {
    width: numbersAliasTokens.sizing.icon.md,
    height: numbersAliasTokens.sizing.icon.md,
    marginLeft: numbersAliasTokens.spacing.xs,
    borderRadius: numbersAliasTokens.borderRadius.sm,
  },
})); 