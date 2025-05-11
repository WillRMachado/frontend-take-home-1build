import { useThemeSwitch } from "./useThemeSwitch";
import { numbersBaseTokens } from "../../theme/tokens/base/numbers";
import Feather from "@expo/vector-icons/Feather";
import { useThemedColors } from "../../theme/utils/createThemedStyles";
import Switcher from "../Switcher";

export default function ThemeSwitch() {
  const { isDark, toggleTheme } = useThemeSwitch();
  const colors = useThemedColors();

  const sunIcon = (
    <Feather
      name="sun"
      size={numbersBaseTokens.typography.size[4]}
      color={isDark ? colors.icon.tertiary : colors.icon.secondary}
    />
  );

  const moonIcon = (
    <Feather
      name="moon"
      size={numbersBaseTokens.typography.size[4]}
      color={isDark ? colors.icon.secondary : colors.icon.tertiary}
    />
  );

  return (
    <Switcher
      isActive={isDark}
      onToggle={toggleTheme}
      primaryComponent={sunIcon}
      secondaryComponent={moonIcon}
    />
  );
}
