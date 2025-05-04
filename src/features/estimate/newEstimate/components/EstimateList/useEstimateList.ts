import { useState } from "react";
import { useEstimateContext } from "@/src/context/EstimateContext";
import type { EstimateRow, EstimateSection } from "@/data";

export interface EstimateItem extends EstimateRow {}

export function useEstimateList() {
  const {
    estimate,
    editMode,
    updateTitle,
    updateItem,
    updateSection,
    selectItem,
    selectSection,
    clearSelection,
  } = useEstimateContext();

  return {
    estimate,
    updateItem,
    updateSection,
    selectItem,
    selectSection,
    clearSelection,
  };
}
