import React from "react";
import { View, Image } from "react-native";

const SupplierLogo = React.memo(({ 
  url, 
  style, 
  onLoadStart, 
  onLoadEnd 
}: { 
  url: string; 
  style: any; 
  onLoadStart: () => void; 
  onLoadEnd: () => void;
}) => (
  <View style={style}>
    <Image
      source={{ uri: url }}
      style={style}
      resizeMode="contain"
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  </View>
));

export default SupplierLogo; 