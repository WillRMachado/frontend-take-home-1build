import { View, Text, TouchableOpacity } from "react-native";
import { useCurrentThemeScheme } from "../../../common/hooks/useCurrentThemeScheme";
import { getComponentTokens } from "../../../common/theme/tokens/components";
import { getColors } from "@/src/common/theme/tokens/alias/colors";


export default function EstimateScreen() {
  const { value: themeScheme, setValue: setThemeScheme } = useCurrentThemeScheme();
  const themeColors = getComponentTokens(themeScheme);
  const colors = getColors(themeScheme);

  const toggleTheme = () => {
    setThemeScheme(themeScheme === "dark" ? "light" : "dark");
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: themeColors.badges.washedColors.backgrounds.neutral
    }}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: themeColors.button.background.primary.idle,
          padding: 10,
          borderRadius: themeColors.button.borderRadius,
          margin: 10,
          alignSelf: "flex-start"
        }}
      >
        <Text style={{ 
          color: themeColors.badges.solidColors.text.neutral,
          fontSize: 16,
        }}>
          Toggle {themeScheme === "dark" ? "Light" : "Dark"} Theme
        </Text>
      </TouchableOpacity>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
        {themeScheme}
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
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
      <Text style={{ 
        color: themeColors.badges.washedColors.text.neutral,
        fontSize: 16,
        marginVertical: 8
      }}>
        New Estimate
      </Text>
    </View>
  );
}
 