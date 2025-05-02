import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useAddSectionButton } from "./useAddSectionButton";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import Feather from "@expo/vector-icons/Feather";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import React from "react";
import { Text } from "react-native";

export default function AddSectionButton() {
  const { handleAddSection } = useAddSectionButton();
  const colors = useThemedColors();
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleAddSection}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <Feather
            name="plus"
            size={numbersBaseTokens.typography.size[4]}
            color={colors.icon.primary}
          />
        </View>
        <Text style={styles.addText}>Add</Text>
      </View>
    </TouchableOpacity>
  );
}

const useStyles = createThemedStyles(
  ({ colors, getColorWithAlpha, numbersAliasTokens }) =>
    StyleSheet.create({
      buttonContainer: {
        backgroundColor: getColorWithAlpha(colors.text.tertiary, 12),
        paddingLeft: numbersBaseTokens.globalScale[5],
        paddingRight: numbersBaseTokens.globalScale[5],
        paddingTop: numbersBaseTokens.globalScale[3],
        paddingBottom: numbersBaseTokens.globalScale[3],
        borderRadius: numbersAliasTokens.borderRadius["3xl"],
        alignSelf: "flex-start",
      },
      contentWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      iconWrapper: {
        paddingHorizontal: numbersAliasTokens.spacing["3xs"],
      },
      addText: {
        paddingLeft: numbersAliasTokens.spacing["3xs"],
        paddingRight: numbersAliasTokens.spacing["3xs"],
        color: colors.text.primary,
      },
    })
);
