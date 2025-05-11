import React from "react";
import {
  Image,
  ActivityIndicator,
  View,
  StyleProp,
  ImageStyle,
} from "react-native";
import createThemedStyles from "@/src/common/theme/utils/createThemedStyles";
import { useLazyImage } from "./useLazyImage";

export type LazyImageSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export default function LazyImage({
  uri,
  size,
  style,
}: {
  uri: string;
  size?: LazyImageSize;
  style?: StyleProp<ImageStyle>;
}) {
  const { loading, onLoadStart, onLoadEnd, dimension } = useLazyImage(size);
  const styles = useStyles({ dimension });
  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator style={styles.activityIndicator} size="small" />
      )}
      <Image
        source={{ uri }}
        style={styles.image, style}
        resizeMode="contain"
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
}

const useStyles = createThemedStyles<{ dimension: number | string }>(
  ({ props, numbersAliasTokens }) => ({
    container: {
      position: "relative",
        width: props.dimension,
        height: props.dimension,
      borderRadius: numbersAliasTokens.borderRadius.xs,
      overflow: "hidden",
    },
    activityIndicator: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: numbersAliasTokens.borderRadius.xs,
    },
  })
);
