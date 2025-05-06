import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import SupplierLogo from "../SupplierLogo";

const ItemContent = React.memo(({ 
  description, 
  quantity, 
  unitPrice, 
  uom, 
  total, 
  supplierLogoUrl, 
  isImageLoading, 
  onImageLoadStart, 
  onImageLoadEnd,
  styles,
  colors
}: {
  description: string;
  quantity: number;
  unitPrice: string;
  uom: string;
  total: string;
  supplierLogoUrl?: string;
  isImageLoading: boolean;
  onImageLoadStart: () => void;
  onImageLoadEnd: () => void;
  styles: any;
  colors: any;
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
          <SupplierLogo
            url={supplierLogoUrl}
            style={styles.supplierLogo}
            onLoadStart={onImageLoadStart}
            onLoadEnd={onImageLoadEnd}
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
  </>
));

export default ItemContent; 