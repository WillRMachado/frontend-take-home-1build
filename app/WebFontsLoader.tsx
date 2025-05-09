import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const MIN_FALLBACK_DURATION = 500;

export function WebFontsLoader({
  children,
  fallback,
}: {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const hasFallback = !!fallback;
  const [forceFallback, setForceFallback] = useState(hasFallback);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setForceFallback(false);
    }, MIN_FALLBACK_DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (loaded || error) && !forceFallback ? children : fallback;
}
