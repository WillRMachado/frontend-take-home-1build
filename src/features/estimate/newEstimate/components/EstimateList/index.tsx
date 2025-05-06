import { View, Text, ScrollView } from "react-native";
import { useEstimateList } from "./useEstimateList";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import EstimateSection from "./components/EstimateSection";
import Tag from "@/src/common/components/Tag";
import { TagType } from "@/src/common/enums";

export default function EstimateList() {
  const { estimate } = useEstimateList();
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Tag type={TagType.DRAFT} />

        <Text style={styles.title}>{estimate.title}</Text>
      </View>
      {estimate.sections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No sections added yet</Text>
        </View>
      ) : (
        estimate.sections.map((section) => (
          <EstimateSection key={section.id} section={section} />
        ))
      )}
    </ScrollView>
  );
}

const useStyles = createThemedStyles(
  ({ colors, numbersAliasTokens, customFonts }) => ({
    titleContainer: {
      padding: numbersAliasTokens.spacing.sm,
    },

    title: {
      marginTop: numbersAliasTokens.spacing.xs,
      color: colors.text.primary,
      ...customFonts.bold.headline.sm,
    },
    container: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: numbersAliasTokens.spacing.xl,
    },
    emptyStateText: {
      fontSize: numbersBaseTokens.typography.size["4"],
      color: colors.text.secondary,
      textAlign: "center",
    },
  })
);
