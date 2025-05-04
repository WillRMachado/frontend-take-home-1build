import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { Text } from "@/src/common/components/Text";

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
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onClickLeftIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name={leftIcon} size={24} color={colors.icon.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onClickRightIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name={rightIcon} size={24} color={colors.icon.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: numbersAliasTokens.spacing.sm,
    paddingVertical: numbersAliasTokens.spacing.md,
    borderBottomWidth: numbersAliasTokens.borderWidth.xs,
    borderBottomColor: colors.layer.solid.darker,
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: colors.text.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
})); 