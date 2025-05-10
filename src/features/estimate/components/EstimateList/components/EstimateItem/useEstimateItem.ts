import type { EstimateRow } from "@/data";
import { useCallback, useContext, useState } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import React from "react";
import { EstimateForm } from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import { EstimateMode } from "@/src/common/enums";
import { useToast } from "@/src/common/utils/toast";

interface UseEstimateItemProps {
  item: EstimateRow;
}

interface FormattedEstimateItem {
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  handleRemove: () => void;
  supplierLogoUrl?: string;
  handleEdit: (partialItem?: Partial<EstimateRow>) => void;
  shouldAnimate: boolean;
  handleSwipeComplete: () => void;
}

export function useEstimateItem({
  item,
}: UseEstimateItemProps): FormattedEstimateItem {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { deleteItem, updateItem } = useEstimateContext();
  const componentContext = useContext(ComponentContext);
  const { show } = useToast();

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
    show("Item deleted");
  }, [item.id, deleteItem, show]);

  const handleSwipeComplete = useCallback(() => {
    setShouldAnimate(true);
  }, []);

  const handleCloseAndSave = useCallback(
    (updatedItem: EstimateRow) => {
      updateItem(updatedItem.id, updatedItem);
      handleCloseEdit();
    },
    [updateItem, closeBottomSheet]
  );

  const handleCloseEdit = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);

  const getEditForm = useCallback(
    (partialItem?: Partial<EstimateRow>): React.ReactElement => {
      return React.createElement(EstimateForm, {
        mode: EstimateMode.EDIT_ITEM,
        data: { ...item, ...partialItem },
      });
    },
    [item, handleCloseAndSave, handleCloseEdit, handleRemove]
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
    shouldAnimate,
    handleSwipeComplete,
  };
}
