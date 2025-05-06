import { Toast } from "@/src/common/lib/imports";
import { getColors } from "@/src/common/theme/tokens/alias/colors";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import { useTheme } from "@/src/common/hooks/useTheme";

export function useToast() {
  const { theme } = useTheme();
  const colors = getColors(theme);

  function show(message: string) {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      backgroundColor: colors.core.flat.inverse,
      textColor: colors.text.inverse,
      shadow: false,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      containerStyle: {
        borderRadius: numbersAliasTokens.borderRadius.sm,
        paddingHorizontal: numbersAliasTokens.spacing.lg,
        paddingVertical: numbersAliasTokens.spacing.md,
      },
      textStyle: {
        fontSize: numbersBaseTokens.typography.size["4"],
        fontWeight: "400",
      },
    });
  }

  return { show };
}
