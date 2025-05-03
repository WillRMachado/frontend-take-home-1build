import { StyleSheet } from 'react-native';
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { useThemedColors } from "@/src/common/theme/utils/createThemedStyles";
import { customFonts } from "@/src/common/theme/fonts";

export const useStyles = () => {
  const colors = useThemedColors();

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: numbersAliasTokens.spacing.sm,
      paddingRight: numbersAliasTokens.spacing["3xl"],
      backgroundColor: colors.layer.solid.dark,
      borderBottomWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.layer.solid.darker,
      gap: numbersAliasTokens.spacing["2xs"],
    },
    content: {
      flexDirection: "column",
      gap: numbersAliasTokens.spacing["2xs"],
    },
    description: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
    },
    quantity: {
      color: colors.text.secondary,
      ...customFonts.regular.text.sm,
    },
    unitPrice: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
    },
    total: {
      color: colors.text.primary,
      ...customFonts.regular.text.md,
    },
    removeButton: {
      backgroundColor: colors.core.red.base,
      padding: numbersAliasTokens.spacing.sm,
    },
    removeButtonText: {
      color: colors.icon.white,
      ...customFonts.regular.text.md,
    },
  });
}; 