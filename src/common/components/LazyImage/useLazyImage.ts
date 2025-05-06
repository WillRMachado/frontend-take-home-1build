import { useState, useCallback } from "react";
import { getIconSize, LazyImageSize } from "@/src/common/utils/getIconSize";

export function useLazyImage(size?: LazyImageSize) {
  const [loading, setLoading] = useState(true);
  const dimension = getIconSize(size);

  const onLoadStart = useCallback(() => setLoading(true), []);
  const onLoadEnd = useCallback(() => setLoading(false), []);

  return {
    loading,
    onLoadStart,
    onLoadEnd,
    dimension,
  };
}
