import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { UNITS_OF_MEASURE, UomEntry } from "@/src/consts/unitsOfMeasure";
import { THEMES } from "@/src/common/enums/themes";
import { UnitOfMeasure } from "@/data";
import { BottomSheetHeaders } from "@/src/common/components/BottomSheetHeaders";
import { FloatingLabelInput } from "@/src/common/components/FloatingLabelInput";

interface UomSelectorProps {
  selectUom: (name: UnitOfMeasure) => void;
  onReturn: () => void;
}

export default function UomSelector({ selectUom, onReturn }: UomSelectorProps) {
  const styles = useStyles();
  const [search, setSearch] = useState("");


  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(search.toLowerCase());

  const filterUnitsByCategory = (units: UomEntry[]) =>
    units.filter(
      (uom) =>
        matchesSearch(uom.name) ||
        matchesSearch(uom.abbreviation) ||
        matchesSearch(uom.key)
    );

  const filteredUnits = Object.entries(UNITS_OF_MEASURE).reduce(
    (acc, [category, units]) => {
      const filtered = filterUnitsByCategory(units);
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as typeof UNITS_OF_MEASURE
  );

  return (
    <View>
      <BottomSheetHeaders
        title="Unit of measurement"
        leftIcon="arrow-left"
        onClickLeftIcon={() => onReturn()}
      />
      <View style={styles.searchInputContainer}>
        <FloatingLabelInput
          label="Search"
          value={search}
          onChangeText={setSearch}
          backgroundColor={styles.searchInput.backgroundColor}
          placeholderTextColor={styles.searchInput.backgroundColor}
          autoCorrect={false}
          leftIconName="search"
        />
      </View>
      {Object.keys(filteredUnits).map((key) => (
        <View key={key} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{key}</Text>
          {filteredUnits[key].map((uom) => (
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
    categoryContainer: {},
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
    searchInputContainer: {
      paddingHorizontal: numbersAliasTokens.spacing.md,
      paddingBottom: numbersAliasTokens.spacing.xs,
    },
    searchInput: {
      color: colors.text.primary,
      borderRadius: numbersAliasTokens.borderRadius.md,
      padding: numbersAliasTokens.spacing.sm,
      backgroundColor: colors.layer.solid.light,
    },
  })
);
