import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Supplier } from "@/data";
import LazyImage from "../LazyImage/LazyImage";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { numbersAliasTokens } from "../../theme/tokens/alias/numbers";
import Feather from "@expo/vector-icons/Feather";
import { useSupplierInfo } from "./useSupplierInfo";

interface SupplierInfoProps {
  supplier: Supplier;
  onClose?: () => void;
  isCloseable?: boolean;
}

export default function SupplierInfo({
  supplier,
  onClose,
  isCloseable = true,
}: SupplierInfoProps) {
  const styles = useStyles();
  const colors = useThemedColors();
  const { handleProductPress, handleClosePress } = useSupplierInfo({
    supplier,
    onClose,
  });

  if (!supplier) return null;
  return (
    <View style={styles.supplierContainer}>
      <View style={styles.infoRow}>
        <View style={styles.infoRowLeft}>
          <Text style={styles.supplierLabel}>Provided by supplier</Text>
          <Feather
            name="info"
            size={numbersAliasTokens.sizing.icon.sm}
            color={colors.icon.primary}
          />
        </View>

        {isCloseable && (
          <TouchableOpacity onPress={handleClosePress}>
            <Feather
              name="x"
              size={numbersAliasTokens.sizing.icon.lg}
              color={colors.icon.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.supplierLink}
        onPress={handleProductPress}
        activeOpacity={0.7}
      >
        <Text
          style={styles.supplierName}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {supplier.name}
        </Text>
        {!!supplier?.logoUrl && (
          <LazyImage
            uri={supplier.logoUrl}
            size={numbersAliasTokens.spacing["4xl"]}
            style={styles.supplierImage}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const useStyles = createThemedStyles(
  ({ numbersAliasTokens, colors, customFonts }) => ({
    supplierContainer: {
      backgroundColor: colors.layer.solid.medium,
      borderRadius: numbersAliasTokens.borderRadius.md,
      padding: numbersAliasTokens.spacing.sm,
      marginBottom: numbersAliasTokens.spacing.xs,
      // zIndex: -1,
      // position: "relative",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: numbersAliasTokens.spacing["2xs"],
    },
    infoRowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: numbersAliasTokens.spacing["2xs"],
      justifyContent: "space-between",
    },
    supplierLabel: {
      color: colors.text.secondary,
      marginBottom: numbersAliasTokens.spacing["3xs"],
      ...customFonts.regular.text.xs,
    },
    supplierLink: {
      flexDirection: "row",
      alignItems: "center",
    },
    supplierName: {
      flex: 1,
      color: colors.text.hyperlink,
      textDecorationLine: "underline",
      ...customFonts.regular.text.sm,
    },
    supplierImage: {
      borderRadius: numbersAliasTokens.borderRadius.sm,
    },
  })
);
