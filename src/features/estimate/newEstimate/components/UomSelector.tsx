import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { UNITS_OF_MEASURE } from "@/src/consts/unitsOfMeasure";
import { THEMES } from "@/src/common/enums/themes";
import { UnitOfMeasure } from "@/data";
interface UomSelectorProps {
  selectUom: (name: UnitOfMeasure) => void;
}

export default function UomSelector({ selectUom }: UomSelectorProps) {
  const styles = useStyles();
  return (
    <View>
      {Object.keys(UNITS_OF_MEASURE).map((key) => (
        <View key={key} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{key}</Text>
          {UNITS_OF_MEASURE[key].map((uom) => (
            <TouchableOpacity
              key={uom.name}
              style={styles.uomContainer}
              onPress={() => selectUom(uom?.abbreviation)}
            >
              <Text style={styles.uomText}>{uom.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const useStyles = createThemedStyles<{ isLast?: boolean }>(
  ({ colors, numbersAliasTokens, customFonts, props, theme }) => ({
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
  })
);
