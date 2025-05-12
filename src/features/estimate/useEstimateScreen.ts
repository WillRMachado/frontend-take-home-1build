import { useEstimateContext } from "@/src/common/hooks/useEstimate";
import { EstimateForm } from "@/src/common/components/InteractionPanelContents/EstimateForm/EstimateForm";
import React from "react";
import type { EstimateSection } from "@/data";
import { EstimateMode } from "@/src/common/enums";
import { calculateEstimateTotal } from "@/src/common/lib/estimate";
import { uuid } from "@/src/common/lib/imports";
import { useComponentsContext } from "@/src/common/hooks/useComponents";
import { formatCurrency } from "@/src/common/utils/format";

export function useNewEstimateScreen() {
  const { estimate } = useEstimateContext();
  const componentContext = useComponentsContext();

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

  const estimateTotal = formatCurrency(calculateEstimateTotal(estimate));

  return {
    handleAddNewSection,
    estimateTotal,
  };
}
