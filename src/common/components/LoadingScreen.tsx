import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemedColors } from '@/src/common/theme/utils/createThemedStyles';

export const LoadingScreen = () => {
  const colors = useThemedColors();
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.icon.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 