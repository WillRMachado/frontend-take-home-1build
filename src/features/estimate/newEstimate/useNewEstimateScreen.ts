import { useContext } from "react";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { ComponentContext } from "@/src/context/ComponentContext";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import React from "react";
import type { EstimateSection } from "@/data";

export function useNewEstimateScreen() {
  const { addSection } = useEstimateContext();
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
      React.createElement(EditForm, {
        mode: "section",
        data: newSection,
        onSave: (updates) => {
          addSection({ ...newSection, ...updates });
          closeBottomSheet();
        },
        onClose: closeBottomSheet,
        onDropdownPress: () => {},
        onDelete: () => {},
      })
    );
    openBottomSheet();
  };

  return {
    handleAddNewSection,
  };
}
