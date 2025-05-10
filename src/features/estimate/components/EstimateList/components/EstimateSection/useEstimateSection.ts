import { useContext, useState } from "react";
import type { EstimateSection, EstimateRow } from "@/data";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EstimateForm } from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import React from "react";
import { EstimateMode } from "@/src/common/enums";
import { calculateSectionTotal } from "@/src/common/lib/estimate";
interface UseEstimateSectionProps {
  section: EstimateSection;
}

export function useEstimateSection({ section }: UseEstimateSectionProps) {
  const componentContext = useContext(ComponentContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet } = componentContext;

  function handleAddItem(): void {
    setBottomSheetChild(getAddForm());
    openBottomSheet();
  }

  function handleEditSection(): void {
    setBottomSheetChild(getEditSectionForm());
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
    });
  }

  function getEditSectionForm(): React.ReactElement {
    return React.createElement(EstimateForm, {
      mode: EstimateMode.EDIT_SECTION,
      data: section,
    });
  }

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const price = calculateSectionTotal(section);

  return {
    title: section.title,
    price,
    isOpen,
    toggleOpen,
    handleAddItem,
    handleEditSection,
  };
}
