import type { EstimateRow } from "@/data";
import { useCallback } from "react";
import { formatCurrency } from "@/src/common/utils/format";

interface UseEstimateItemProps {
  item: EstimateRow;
  onRemove: (id: string) => void;
}

export function useEstimateItem({ item, onRemove }: UseEstimateItemProps) {
  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
  };
} 