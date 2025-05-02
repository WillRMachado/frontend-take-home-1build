import { useTheme } from "@/src/common/hooks/useTheme";

export const useThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();

  return {
    isDark,
    toggleTheme,
  };
}; 