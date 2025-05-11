import { useState } from "react";
import type { EstimateSection, EstimateRow } from "@/data";
import { EstimateForm } from "@/src/common/components/InteractionPanelContents/EstimateForm/EstimateForm";
import React from "react";
import { EstimateMode } from "@/src/common/enums";
import { calculateSectionTotal } from "@/src/common/lib/estimate";
import { useComponentsContext } from "@/src/common/hooks/useComponents";
interface UseEstimateSectionProps {
  section: EstimateSection;
}

export function useEstimateSection({ section }: UseEstimateSectionProps) {
  const componentContext = useComponentsContext();
  const [isOpen, setIsOpen] = useState(false);

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
