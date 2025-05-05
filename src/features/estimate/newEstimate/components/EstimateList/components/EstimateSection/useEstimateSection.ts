import { useCallback, useContext, useState } from "react";
import type { EstimateSection, EstimateRow, UnitOfMeasure } from "@/data";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import React from "react";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector";

interface UseEstimateSectionProps {
  section: EstimateSection;
}

export function useEstimateSection({ section }: UseEstimateSectionProps) {
  const { addItem } = useEstimateContext();
  const componentContext = useContext(ComponentContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } = componentContext;

  function handleCloseAndSave(newItem: EstimateRow): void {
    addItem(section.id, newItem);
    handleCloseAddItem();
  }

  function handleCloseAddItem(): void {
    closeBottomSheet();
  }

  function handleAddItem(): void {
    setBottomSheetChild(getAddForm());
    openBottomSheet();
  }

  function handleChangeUom(): void {
    setBottomSheetChild(
      React.createElement(UomSelector, {
        selectUom: (uom: UnitOfMeasure) => {
          handleUpdateUom(uom);
        },
        onReturn: handleAddItem,
      })
    );
  }

  function handleUpdateUom(uom: UnitOfMeasure): void {
    handleAddItem();
  }

  function getAddForm(): React.ReactElement {
    return React.createElement(EditForm, {
      mode: "item",
      data: {
        id: "",
        title: "",
        price: 0,
        quantity: 1,
        uom: "EA",
        sectionId: section.id,
      } as EstimateRow,
      onSave: handleCloseAndSave,
      onClose: handleCloseAddItem,
      onDropdownPress: handleChangeUom,
      onDelete: handleCloseAddItem,
    });
  }

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };


  const price = section.rows.reduce((acc, row) => {
    return acc + row.price * row.quantity;
  }, 0);
  
  return {
    title: section.title,
    price,
    isOpen,
    toggleOpen,
    handleAddItem,
  };
}
