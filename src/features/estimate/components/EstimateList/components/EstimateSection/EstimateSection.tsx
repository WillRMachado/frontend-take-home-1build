import { View, Text, Pressable } from "react-native";
import type { EstimateSection as EstimateSectionType } from "@/data";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { useEstimateSection } from "./useEstimateSection";
import { formatCurrency } from "@/src/common/utils/format";
import { Feather } from "@expo/vector-icons";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import EstimateItem from "../EstimateItem";
import React from "react";
import IconButton from "@/src/common/components/IconButton";

interface EstimateSectionProps {
  section: EstimateSectionType;
}

export default function EstimateSection({ section }: EstimateSectionProps) {
  const styles = useStyles();
  const { title, price, isOpen, toggleOpen, handleAddItem, handleEditSection } =
    useEstimateSection({
      section,
    });

  return (
    <>
      <Pressable style={styles.sectionContainer} onPress={toggleOpen}>
        <View style={styles.row}>
          <View style={styles.leftGroup}>
            <Text
              style={styles.sectionTitleInfo}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <IconButton iconName="plus" onClick={handleAddItem} />
            <IconButton iconName="edit-2" onClick={handleEditSection} />
          </View>
          <View style={styles.priceContainer}>
            <Text
              style={styles.sectionTitleInfo}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatCurrency(Number(price))}
            </Text>
            <Feather
              name={isOpen ? "chevron-down" : "chevron-up"}
              size={numbersAliasTokens.sizing.icon.lg}
              color={styles.sectionTitleInfo.color}
            />
          </View>
        </View>
      </Pressable>
      {isOpen && section?.rows?.length > 0 && (
        <>
          {section.rows.map((row, index) => (
            <EstimateItem
              item={row}
              key={row.id}
              isLast={index === section.rows.length - 1}
            />
          ))}
        </>
      )}
    </>
  );
}

const useStyles = createThemedStyles(
  ({ colors, numbersAliasTokens, customFonts }) => ({
    sectionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: colors.outline.medium,
      backgroundColor: colors.layer.solid.medium,
      padding: numbersAliasTokens.spacing.sm,
    },
    sectionTitleInfo: {
      color: colors.text.primary,
      ...customFonts.bold.text.md,
      flexShrink: 1,
    },
    row: {
      flexDirection: "row",
    },
    leftGroup: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: numbersAliasTokens.spacing.xs,
      minWidth: "50%",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      maxWidth: "50%",
      paddingLeft: numbersAliasTokens.spacing.sm,
      gap: numbersAliasTokens.spacing.xs,
    },
  })
);
