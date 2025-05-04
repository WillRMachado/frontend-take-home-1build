import { View, TouchableOpacity } from "react-native";
import { useAddItemButton } from "./useAddItemButton";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import React from "react";
import type { EstimateSection } from "@/data";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";

interface AddItemButtonProps {
  section: EstimateSection;
}

export default function AddItemButton({ section }: AddItemButtonProps) {
  const { handleAddItem } = useAddItemButton({ section });
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleAddItem}>
      <View style={styles.contentWrapper}>
        <Feather
          name="plus"
          size={numbersAliasTokens.sizing.icon.lg}
          color={colors.icon.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

const useStyles = createThemedStyles(
  ({ colors, getColorWithAlpha, numbersAliasTokens }) => ({
    buttonContainer: {
      backgroundColor: getColorWithAlpha(colors.text.tertiary, 12),
      borderRadius: numbersAliasTokens.borderRadius["3xl"],
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      width: numbersAliasTokens.sizing.icon.xl,
      height: numbersAliasTokens.sizing.icon.xl,
    },
    contentWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
