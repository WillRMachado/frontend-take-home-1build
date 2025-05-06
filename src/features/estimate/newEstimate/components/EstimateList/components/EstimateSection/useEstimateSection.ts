import { useContext, useState } from "react";
import type { EstimateSection, EstimateRow } from "@/data";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EstimateForm } from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import React from "react";
import { EstimateMode } from "@/src/common/enums/estimate";

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

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

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

  function getAddForm(): React.ReactElement {
    return React.createElement(EstimateForm, {
      mode: EstimateMode.ADD_ITEM,
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
