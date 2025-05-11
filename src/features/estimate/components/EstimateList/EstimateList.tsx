import { View, Text, ScrollView } from "react-native";
import { useEstimateContext } from "@/src/common/hooks/useEstimate";

import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import EstimateSection from "./components/EstimateSection/EstimateSection";

export default function EstimateList() {
  const { estimate } = useEstimateContext();
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
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

const useStyles = createThemedStyles(({ colors, numbersAliasTokens }) => ({
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
}));
