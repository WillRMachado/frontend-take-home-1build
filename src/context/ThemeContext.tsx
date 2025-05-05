import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { storage } from "@/src/common/lib/imports";
import { STORAGE_KEYS, THEMES } from "@/src/common/enums";
import { ThemeScheme } from "@/src/common/theme/types";
import { handleError } from "@/src/common/utils/errorHandler";

interface ThemeContextType {
  theme: THEMES;
  toggleTheme: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useColorScheme();

  const appFallbackTheme = THEMES.LIGHT;

  const [theme, setTheme] = useState<ThemeScheme>(
    (deviceTheme as ThemeScheme) || THEMES.LIGHT
  );

  const loadTheme = async () => {
    const savedTheme = await storage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) return setTheme(savedTheme as ThemeScheme);
    if (deviceTheme) return setTheme(deviceTheme as ThemeScheme);
    return setTheme(appFallbackTheme);
  };

  useEffect(() => {
    loadTheme();
  }, [deviceTheme]);

  const toggleTheme = async (themeName?: ThemeScheme) => {
    try {
      if (themeName) return setTheme(themeName);
      const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      setTheme(newTheme);
      await storage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === THEMES.DARK,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
