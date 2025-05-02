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
  console.log("🚀 ~ useEstimateList ~ estimate:", estimate);

  //   const addItem = (item: Omit<EstimateItem, "id" | "total">) => {
  //     const newItem: EstimateItem = {
  //       ...item,
  //       id: Date.now().toString(),
  //       total: item.quantity * item.unitPrice,
  //     };
  //     setItems((prev) => [...prev, newItem]);
  //   };

  //   const removeItem = (id: string) => {
  //     setItems((prev) => prev.filter((item) => item.id !== id));
  //   };

  return {
    estimate,
    // addItem,
    // removeItem,
    updateItem,
    updateSection,
    selectItem,
    selectSection,
    clearSelection,
  };
}
