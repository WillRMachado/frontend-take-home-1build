import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { UnitOfMeasure } from "@/data";
import { useUomSelector } from "./useUomSelector";
import { THEMES } from "@/src/common/enums";
interface UomSelectorProps {
  selectUom: (name: UnitOfMeasure) => void;
  onReturn: () => void;
  searchTerm?: string;
}

export default function UomSelector({
  selectUom,
  onReturn,
  searchTerm,
}: UomSelectorProps) {
  const styles = useStyles();
  const { filteredUnits } = useUomSelector({
    onSelectUom: selectUom,
    onReturn,
    searchTerm,
  });

  return (
    <View style={styles.container}>
      {Object.keys(filteredUnits).map((key) => (
        <View key={key} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{key}</Text>
          {filteredUnits[key]?.map((uom) => (
            <TouchableOpacity
              key={uom.name}
              style={styles.uomContainer}
              onPress={() => selectUom(uom?.abbreviation)}
            >
              <View style={styles.uomRow}>
                <Text style={styles.uomText}>{uom.name}</Text>
                <Text style={styles.abbreviationText}>{uom.abbreviation}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, customFonts, theme }) => ({
    categoryContainer: {
      backgroundColor: colors.layer.solid.light,
    },
    categoryText: {
      backgroundColor:
        theme === THEMES.LIGHT
          ? colors.layer.solid.light
          : colors.layer.solid.darker,
      color: colors.text.tertiary,
      paddingHorizontal: numbersAliasTokens.spacing.sm,
      paddingBottom: numbersAliasTokens.spacing["2xs"],
      paddingTop: numbersAliasTokens.spacing.md,
      ...customFonts.bold.text.xs,
    },
    uomContainer: {
      backgroundColor: colors.layer.solid.light,
      paddingHorizontal: numbersAliasTokens.spacing.sm,
      paddingVertical: numbersAliasTokens.spacing.xs,
    },
    uomText: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
    },
    uomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    abbreviationText: {
      color: colors.text.secondary,
      ...customFonts.regular.text.md,
    },
  })
);
