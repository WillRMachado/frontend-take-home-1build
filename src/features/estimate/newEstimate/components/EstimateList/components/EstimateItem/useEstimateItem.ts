import type { EstimateRow } from "@/data";
import { useCallback, useContext } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import React from "react";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import { EstimateMode } from "@/src/common/types/estimate";

interface UseEstimateItemProps {
  item: EstimateRow;
  forceRecalculateHeight: () => void;
}

export function useEstimateItem({
  item,
  forceRecalculateHeight,
}: UseEstimateItemProps) {
  const { deleteItem, updateItem } = useEstimateContext();
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
  }, [item.id, deleteItem]);

  const handleCloseAndSave = useCallback(
    (updatedItem: EstimateRow) => {
      updateItem(updatedItem.id, updatedItem);
      handleCloseEdit();
      forceRecalculateHeight();
    },
    [updateItem, closeBottomSheet, forceRecalculateHeight]
  );

  const handleCloseEdit = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);

  const getEditForm = useCallback(
    (partialItem?: Partial<EstimateRow>): React.ReactElement => {
      return React.createElement(EditForm, {
        mode: EstimateMode.EditItem,
        data: { ...item, ...partialItem },
        onSave: handleCloseAndSave,
        onClose: handleCloseEdit,
        onDelete: () => {
          handleRemove();
          handleCloseEdit();
        },
      });
    },
    [item, handleCloseAndSave, handleCloseEdit, handleRemove, item]
  );

  const handleEdit = useCallback(
    (partialItem?: Partial<EstimateRow>) => {
      setBottomSheetChild(getEditForm(partialItem));
      openBottomSheet();
    },
    [openBottomSheet, setBottomSheetChild, getEditForm]
  );

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
