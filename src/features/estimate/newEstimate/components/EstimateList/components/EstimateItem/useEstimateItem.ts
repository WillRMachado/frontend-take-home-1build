import type { EstimateRow } from "@/data";
import { useCallback } from "react";
import { formatCurrency } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";

interface UseEstimateItemProps {
  item: EstimateRow;
}

export function useEstimateItem({ item }: UseEstimateItemProps) {
  const { deleteItem } = useEstimateContext();

  const handleRemove = useCallback(() => {
    deleteItem(item.id);
  }, [item.id, deleteItem]);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
  };
} 