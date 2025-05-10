import { View } from "react-native";
import { Text } from "../../common/components/Text";
import { useNewEstimateScreen } from "./useEstimateScreen";
import ThemeSwitch from "@/src/common/components/ThemeSwitch";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import Tag from "@/src/common/components/Tag";
import { TagType } from "@/src/common/enums";
import EstimateList from "./components/EstimateList/EstimateList";
import { useComponentsContext } from "@/src/common/hooks/useComponents";
import EstimateTitle from "./components/EstimateTitle/EstimateTitle";

export default function EstimateScreenDesktop() {
  const { estimateTotal } = useNewEstimateScreen();

  const componentContext = useComponentsContext();

  const { isBottomSheetOpen, bottomSheetChild } = componentContext;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Tag type={TagType.DRAFT} />
        <ThemeSwitch />
      </View>

      <View style={styles.titleContainer}>
        <EstimateTitle />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Left side - Table */}
        <View style={styles.tableContainer}>
          <EstimateList />

          <View style={styles.estimateTotal}>
            <Text style={styles.totalAmountText}>Total:</Text>
            <Text style={styles.totalAmountText}>
              ${estimateTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Right side - Edit form */}
        {isBottomSheetOpen && (
          <View style={styles.formContainer}>{bottomSheetChild}</View>
        )}
      </View>
    </View>
  );
}

const useStyles = createThemedStyles(
  ({ colors, numbersAliasTokens, customFonts }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.layer.solid.light,
      padding: numbersAliasTokens.spacing.sm,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tableContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.outline.medium,
      borderRadius: numbersAliasTokens.borderRadius.md,
      overflow: "hidden",
    },
    estimateTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: numbersAliasTokens.spacing.md,
      backgroundColor: colors.layer.solid.dark,
      marginTop: numbersAliasTokens.spacing.md,
    },
    totalAmountText: {
      color: colors.text.primary,
      ...customFonts.regular.text.sm,
    },
    formContainer: {
      flex: 0.3,
      alignSelf: 'flex-start',
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.outline.medium,
      backgroundColor: colors.layer.solid.light,
      paddingHorizontal: numbersAliasTokens.spacing.md,
      paddingTop: numbersAliasTokens.spacing.md,
      marginLeft: numbersAliasTokens.spacing.md,
      borderRadius: numbersAliasTokens.borderRadius.md,
    },
    content: {
      flex: 1,
      flexDirection: "row",
    },
    titleContainer: {
      marginTop: numbersAliasTokens.spacing.md,
    },
  })
);
