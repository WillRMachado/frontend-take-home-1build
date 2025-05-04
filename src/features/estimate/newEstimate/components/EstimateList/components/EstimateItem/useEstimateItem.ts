import type { EstimateRow } from "@/data";
import { useCallback, useContext } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { View, Text } from "react-native";

interface UseEstimateItemProps {
  item: EstimateRow;
}

export function useEstimateItem({ item }: UseEstimateItemProps) {
  const { deleteItem, updateItem, clearSelection } = useEstimateContext();
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
  }, [item.id, deleteItem]);

  const handleSaveItem = useCallback(
    (updatedItem: EstimateRow) => {
      updateItem(updatedItem.id, updatedItem);
      closeBottomSheet();
    },
    [updateItem, closeBottomSheet]
  );

  const handleEdit = useCallback((component: React.ReactNode) => {
    setBottomSheetChild(component);
    openBottomSheet();
  }, [openBottomSheet, setBottomSheetChild]);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
    supplierLogoUrl: item.supplier?.logoUrl,
    handleEdit,
  };
}
