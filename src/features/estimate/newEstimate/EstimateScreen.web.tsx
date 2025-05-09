import { View } from "react-native";
import { Text } from "../../../common/components/Text";
import { useNewEstimateScreen } from "./useNewEstimateScreen";
import ThemeSwitch from "@/src/common/components/ThemeSwitch";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import Tag from "@/src/common/components/Tag";
import { TagType } from "@/src/common/enums";
import EstimateList from "./components/EstimateList/EstimateList";
import { useContext } from "react";
import { ComponentContext } from "@/src/context/ComponentContext";
import EstimateTitle from "./components/EstimateTitle/EstimateTitle";
export default function EstimateScreenDesktop() {
  const { handleAddNewSection, estimateTotal } = useNewEstimateScreen();

  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { isBottomSheetOpen, bottomSheetChild } = componentContext;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Tag type={TagType.DRAFT} />
        <ThemeSwitch />
      </View>

      <EstimateTitle />

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
  ({ colors, theme, numbersAliasTokens, customFonts }) => ({
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
      flex: 0.5,
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.outline.medium,
      backgroundColor: colors.layer.solid.light,
      padding: numbersAliasTokens.spacing.md,
      marginLeft: numbersAliasTokens.spacing.md,
      borderRadius: numbersAliasTokens.borderRadius.md,
    },
    content: {
      flex: 1,
      flexDirection: "row",
    },
  })
);

// const styles = StyleSheet.create({
//   header: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//     backgroundColor: "#ffffff",
//   },
//   titleInput: {
//     fontSize: 24,
//     fontWeight: "bold",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   content: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   tableContainer: {
//     flex: 2,
//     padding: 16,
//   },

//   section: {
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     marginBottom: 16,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   selectedSection: {
//     backgroundColor: "#e6f0ff",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#f8f8f8",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   tableRow: {
//     flexDirection: "row",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     cursor: "pointer",
//   },
//   selectedRow: {
//     backgroundColor: "#f0f7ff",
//   },
//   rowLeftContent: {
//     flex: 1,
//     marginRight: 16,
//   },
//   rowTitle: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   rowDetails: {
//     opacity: 0.7,
//   },
//   rowPriceDetails: {
//     fontSize: 14,
//   },
//   estimateTotal: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     marginTop: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   noSelection: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
