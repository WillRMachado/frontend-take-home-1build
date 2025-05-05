import type { EstimateRow, UnitOfMeasure } from "@/data";
import { useCallback, useContext, useState } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector";
import React from "react";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";

interface UseEstimateItemProps {
  item: EstimateRow;
  forceRecalculateHeight: () => void;
}

export function useEstimateItem({
  item,
  forceRecalculateHeight,
}: UseEstimateItemProps) {
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
        mode: "item",
        data: { ...item, ...partialItem },
        onSave: handleCloseAndSave,
        onClose: handleCloseEdit,
        onDropdownPress: handleChangeUom,
        onDelete: () => {
          handleRemove();
          handleCloseEdit();
        },
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

  const handleUpdateUom = useCallback(
    (uom: UnitOfMeasure) => {
      updateItem(item.id, { ...item, uom });
      forceRecalculateHeight();
      handleEdit({ uom });
    },
    [updateItem, item, forceRecalculateHeight, handleEdit]
  );

  const getUomSelector = useCallback((): React.ReactElement => {
    return React.createElement(UomSelector, {
      selectUom: (uom: UnitOfMeasure) => {
        handleUpdateUom(uom);
      },
      onReturn: handleEdit,
    });
  }, [handleUpdateUom, handleEdit]);

  const handleChangeUom = useCallback((): void => {
    setBottomSheetChild(getUomSelector());
  }, [setBottomSheetChild, getUomSelector]);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
    supplierLogoUrl: item.supplier?.logoUrl,
    handleEdit,
    handleCloseAndSave,
    handleCloseEdit,
    handleChangeUom,
    getEditForm,
  };
}
