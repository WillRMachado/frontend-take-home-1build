import type { EstimateRow } from "@/data";
import { useCallback, useRef } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { BottomSheet } from "@/src/common/components/BottomSheet";

interface UseEstimateItemProps {
  item: EstimateRow;
}

export function useEstimateItem({ item }: UseEstimateItemProps) {
  const { deleteItem, updateItem, clearSelection } = useEstimateContext();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
  }, [item.id, deleteItem]);

  const handleSaveItem = useCallback(
    (updatedItem: EstimateRow) => {
      updateItem(updatedItem.id, updatedItem);
      bottomSheetRef.current?.dismiss();
    },

    [item.id, updateItem]
  );

  const handleCloseEdit = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleEdit = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
    supplierLogoUrl: item.supplier?.logoUrl,
    handleSaveItem,
    handleCloseEdit,
    bottomSheetRef,
    handleEdit,
  };
}
