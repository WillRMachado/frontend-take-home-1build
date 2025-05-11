import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import IconButton from "@/src/common/components/IconButton";
import { Text } from "@/src/common/components";
import { numbersAliasTokens } from "../../theme/tokens/alias/numbers";
interface BottomSheetHeadersProps {
  title: string;
  rightIcon?: keyof typeof Feather.glyphMap;
  onClickRightIcon?: () => void;
  leftIcon?: keyof typeof Feather.glyphMap;
  onClickLeftIcon?: () => void;
}

export function BottomSheetHeaders({
  title,
  rightIcon,
  onClickRightIcon,
  leftIcon,
  onClickLeftIcon,
}: BottomSheetHeadersProps) {
  const styles = useStyles();
  const colors = useThemedColors();

  return (
    <View style={styles.container}>
      {leftIcon && (
        <IconButton
          iconName={leftIcon}
          onClick={onClickLeftIcon ? onClickLeftIcon : () => {}}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onClickRightIcon ? onClickRightIcon : () => {}}
        >
          <Feather
            name={rightIcon}
            size={numbersAliasTokens.sizing.icon.md}
            color={colors.icon.primary}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacingView} />
      )}
    </View>
  );
}

const useStyles = createThemedStyles(
  ({ numbersAliasTokens, colors, customFonts }) => ({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: numbersAliasTokens.spacing.md,
      paddingHorizontal: numbersAliasTokens.spacing.md,
    },
    title: {
      flex: 1,
      textAlign: "center",
      color: colors.text.primary,
      ...customFonts.bold.text.md,
    },
    iconButton: {
      width: numbersAliasTokens.spacing["3xl"],
      height: numbersAliasTokens.spacing["3xl"],
      alignItems: "center",
      justifyContent: "center",
    },
    spacingView: {
      width: numbersAliasTokens.spacing["3xl"],
      height: numbersAliasTokens.spacing["3xl"],
    },
  })
);
