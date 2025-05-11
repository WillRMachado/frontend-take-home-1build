import type { EstimateRow } from "@/data";
import { useCallback, useState } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/common/hooks/useEstimate";
import React from "react";
import { EstimateForm } from "@/src/common/components/InteractionPanelContents/EstimateForm/EstimateForm";
import { EstimateMode } from "@/src/common/enums";
import { useToast } from "@/src/common/utils/toast";
import { useComponentsContext } from "@/src/common/hooks/useComponents";

interface UseEstimateItemProps {
  item: EstimateRow;
}

interface FormattedEstimateItem {
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  handleRemove: () => void;
  supplierLogoUrl?: string;
  handleEdit: (partialItem?: Partial<EstimateRow>) => void;
  shouldAnimate: boolean;
  handleSwipeComplete: () => void;
}

export function useEstimateItem({
  item,
}: UseEstimateItemProps): FormattedEstimateItem {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { deleteItem } = useEstimateContext();
  const componentContext = useComponentsContext();
  const { show } = useToast();

  const { setBottomSheetChild, openBottomSheet } = componentContext;

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
    show("Item deleted");
  }, [item.id, deleteItem, show]);

  const handleSwipeComplete = useCallback(() => {
    setShouldAnimate(true);
  }, []);

  const getEditForm = useCallback(
    (partialItem?: Partial<EstimateRow>): React.ReactElement => {
      return React.createElement(EstimateForm, {
        mode: EstimateMode.EDIT_ITEM,
        data: { ...item, ...partialItem },
      });
    },
    [item, handleRemove]
  );

  const handleEdit = useCallback(
    (partialItem?: Partial<EstimateRow>) => {
      setBottomSheetChild(getEditForm(partialItem));
      openBottomSheet();
    },
    [openBottomSheet, setBottomSheetChild, getEditForm]
  );

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
    supplierLogoUrl: item.supplier?.logoUrl,
    handleEdit,
    shouldAnimate,
    handleSwipeComplete,
  };
}
