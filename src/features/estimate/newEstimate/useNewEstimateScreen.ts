import { useContext } from "react";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EstimateForm } from "@/src/common/components/BottomSheetContents/EstimateForm/EstimateForm";
import React from "react";
import type { EstimateSection } from "@/data";
import { EstimateMode } from "@/src/common/enums";
import { calculateEstimateTotal } from "@/src/common/lib/estimate";

export function useNewEstimateScreen() {
  const { addSection, estimate } = useEstimateContext();
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

  const handleAddNewSection = () => {
    const newSection: EstimateSection = {
      id: `section-${Math.random().toString(36).substring(2, 9)}`,
      title: "",
      rows: [],
    };

    setBottomSheetChild(
      React.createElement(EstimateForm, {
        mode: EstimateMode.ADD_SECTION,
        data: newSection,
        onSave: (updates) => {
          addSection({ ...newSection, ...updates });
          closeBottomSheet();
        },
        onClose: closeBottomSheet,
        onDelete: closeBottomSheet,
      })
    );
    openBottomSheet();
  };

  // ${calculateEstimateTotal(estimate).toFixed(2)}
  const estimateTotal = calculateEstimateTotal(estimate);

  return {
    handleAddNewSection,
    estimateTotal,
  };
}
