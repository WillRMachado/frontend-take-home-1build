import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { UNITS_OF_MEASURE } from "@/src/consts/unitsOfMeasure";
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

  // Filtered units by search
  const filteredUnits = Object.keys(UNITS_OF_MEASURE).reduce((acc, key) => {
    const filtered = UNITS_OF_MEASURE[key].filter((uom) =>
      uom.name.toLowerCase().includes(search.toLowerCase()) ||
      uom.abbreviation.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) acc[key] = filtered;
    return acc;
  }, {} as typeof UNITS_OF_MEASURE);

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
          style={styles.searchInput}
          placeholderTextColor="#A0A3BD"
          autoCorrect={false}
          autoCapitalize="none"
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    abbreviationText: {
      color: '#A0A3BD',
      ...customFonts.regular.text.md,
    },
    searchInputContainer: {
      paddingHorizontal: numbersAliasTokens.spacing.md,
      paddingBottom: numbersAliasTokens.spacing.xs,
    },
    searchInput: {
      color: '#fff',
      borderRadius: 12,
      padding: 12,
      backgroundColor: '#23262F',
    },
  })
);
