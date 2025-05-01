import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/common/hooks/useTheme";
import { getComponentTokens } from "../../../common/theme/tokens/components";
import { getColors } from "@/src/common/theme/tokens/alias/colors";

export default function EstimateScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const themeColors = getComponentTokens(theme);
  const colors = getColors(theme);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.badges.washedColors.backgrounds.neutral,
      }}
    >
      <TouchableOpacity
        onPress={() => toggleTheme()}
        style={{
          backgroundColor: themeColors.button.background.primary.idle,
          padding: 10,
          borderRadius: themeColors.button.borderRadius,
          margin: 10,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: themeColors.badges.solidColors.text.neutral,
            fontSize: 16,
          }}
        >
          Toggle {isDark ? "Light" : "Dark"} Theme
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
        {theme}
      </Text>
      <Text
        style={{
          color: colors.text.primary,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
      <Text
        style={{
          color: themeColors.badges.washedColors.text.neutral,
          fontSize: 16,
          marginVertical: 8,
        }}
      >
        New Estimate
      </Text>
    </View>
  );
}
