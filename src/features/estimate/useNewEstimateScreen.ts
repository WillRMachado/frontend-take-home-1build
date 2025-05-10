import { useContext } from "react";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EstimateForm } from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import React from "react";
import type { EstimateSection } from "@/data";
import { EstimateMode } from "@/src/common/enums";
import { calculateEstimateTotal } from "@/src/common/lib/estimate";
import { uuid } from "@/src/common/lib/imports";

export function useNewEstimateScreen() {
  const { estimate } = useEstimateContext();
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet } = componentContext;

  const handleAddNewSection = () => {
    const newSection: EstimateSection = {
      id: `section-${uuid.v4()}`,
      title: "",
      rows: [],
    };

    setBottomSheetChild(
      React.createElement(EstimateForm, {
        mode: EstimateMode.ADD_SECTION,
        data: newSection,
      })
    );
    openBottomSheet();
  };

  const estimateTotal = calculateEstimateTotal(estimate);

  return {
    handleAddNewSection,
    estimateTotal,
  };
}
