import { View } from "react-native";
import { TextInput } from "react-native";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { useEstimateTitle } from "./useEstimateTitle";

export default function EstimateTitle() {
  const styles = useStyles();
  const { title, updateTitle } = useEstimateTitle();

  const colors = useThemedColors();

  return (
    <View style={styles.titleContainer}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={updateTitle}
        placeholder="Enter estimate title"
        placeholderTextColor={colors.text.secondary}
        multiline={true}
      />
    </View>
  );
}

const useStyles = createThemedStyles(({ colors, customFonts }) => ({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: colors.text.primary,
    flex: 1,
    ...customFonts.bold.headline.sm,
  },
}));
