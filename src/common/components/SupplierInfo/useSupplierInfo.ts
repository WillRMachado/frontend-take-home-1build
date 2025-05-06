import { useCallback } from 'react';
import { Linking } from 'react-native';
import { Supplier } from '@/data';

interface UseSupplierInfoProps {
  supplier: Supplier;
  onClose?: () => void;
}

export const useSupplierInfo = ({ supplier, onClose }: UseSupplierInfoProps) => {
  const handleProductPress = useCallback(() => {
    if (supplier.productUrl) {
      Linking.openURL(supplier.productUrl);
    }
  }, [supplier.productUrl]);

  const handleClosePress = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return {
    handleProductPress,
    handleClosePress,
  };
}; 