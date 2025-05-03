import { View, Text, Pressable } from "react-native";
import type { EstimateSection as EstimateSectionType } from "@/data";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { useEstimateSection } from "./useEstimateSection";
import { formatCurrency } from "@/src/common/utils/format";
import { Feather } from "@expo/vector-icons";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import AddItemButton from "../AddItemButton";

interface EstimateSectionProps {
  section: EstimateSectionType;
}

export default function EstimateSection({ section }: EstimateSectionProps) {
  const styles = useStyles();
  const { title, price, isOpen, toggleOpen } = useEstimateSection({
    section,
  });

  return (
    <Pressable style={styles.sectionContainer} onPress={toggleOpen}>
      <View style={styles.contentWrapper}>
        <Text style={styles.sectionTitleInfo}>{title}</Text>
        <AddItemButton section={section} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.sectionTitleInfo}>
          {formatCurrency(Number(price))}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={numbersAliasTokens.sizing.icon.lg}
          color={styles.sectionTitleInfo.color}
        />
      </View>
    </Pressable>
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
    },
    contentWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: numbersAliasTokens.spacing.xs,
    },
  })
);
