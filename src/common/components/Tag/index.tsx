import React from "react";
import { View } from "react-native";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { TagType } from "@/src/common/enums";
import { Text } from "@/src/common/components";
type TagProps = {
  type: TagType;
};

const Tag: React.FC<TagProps> = ({ type }) => {
  const styles = useStyles();
  if (type === TagType.DRAFT) {
    return (
      <View style={styles.draftTag}>
        <View style={styles.dot} />
        <Text style={styles.draftText}>Draft</Text>
      </View>
    );
  }
  return null;
};

const useStyles = createThemedStyles(
  ({ colors, numbersAliasTokens, customFonts, themeColors }) => ({
    draftTag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "transparent",
      borderColor: themeColors.badges.washedColors.outline.hollow,
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderRadius: numbersAliasTokens.borderRadius.pill,
      paddingHorizontal: numbersAliasTokens.spacing.sm,
      paddingVertical: numbersAliasTokens.spacing["3xs"],
      alignSelf: "flex-start",
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: numbersAliasTokens.spacing["2xs"],
      backgroundColor: themeColors.badges.washedColors.dot.neutral,
      marginRight: numbersAliasTokens.spacing["2xs"],
      borderColor: themeColors.badges.washedColors.outline.neutral,
    },
    draftText: {
      color: colors.text.tertiary,
      ...customFonts.regular.text.sm,
    },
  })
);

export default Tag;
