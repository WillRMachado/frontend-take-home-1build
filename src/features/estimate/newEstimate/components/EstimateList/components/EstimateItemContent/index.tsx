import React from "react";
import { View, Text } from "react-native";
import LazyImage from "@/src/common/components/LazyImage/LazyImage";

const ItemContent = React.memo(
  ({
    description,
    quantity,
    unitPrice,
    uom,
    total,
    supplierLogoUrl,
    styles,
  }: {
    description: string;
    quantity: number;
    unitPrice: string;
    uom: string;
    total: string;
    supplierLogoUrl?: string;
    styles: any;
  }) => (
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
  )
);

export default ItemContent;
