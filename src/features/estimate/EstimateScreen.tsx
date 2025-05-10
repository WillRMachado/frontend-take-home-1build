import { View } from "react-native";
import { ThemeSwitch } from "@/src/common/components";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import EstimateList from "./components/EstimateList/EstimateList";
import IconButton from "@/src/common/components/IconButton";
import { useNewEstimateScreen } from "./useNewEstimateScreen";
import EstimateTitle from "./components/EstimateTitle/EstimateTitle";
import Tag from "@/src/common/components/Tag";
import { TagType } from "@/src/common/enums";

export default function EstimateScreen() {
  const styles = useStyles();
  const { handleAddNewSection } = useNewEstimateScreen();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.actionsContainer}>
          <ThemeSwitch />

          <IconButton
            iconName="plus"
            onClick={handleAddNewSection}
            label="Add"
          />
        </View>
        <View style={styles.titleContainer}>
          <Tag type={TagType.DRAFT} />
          <EstimateTitle />
        </View>
      </View>

      <EstimateList />
    </View>
  );
}

const useStyles = createThemedStyles(({ colors, numbersAliasTokens }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.layer.solid.medium,
    flexDirection: "column",
  },

  headerWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: numbersAliasTokens.spacing.xs,
    paddingHorizontal: numbersAliasTokens.spacing.sm,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: numbersAliasTokens.spacing.xs,
  },

  titleContainer: {
    paddingVertical: numbersAliasTokens.spacing.sm,
    width: "100%",
    alignItems: "center",
    gap: numbersAliasTokens.spacing.xs,
  },
}));
