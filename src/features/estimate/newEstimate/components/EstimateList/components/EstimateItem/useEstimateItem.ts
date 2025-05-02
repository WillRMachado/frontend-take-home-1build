import type { EstimateRow } from "@/data";

interface UseEstimateItemProps {
  item: EstimateRow;
  onRemove: (id: string) => void;
}

export function useEstimateItem({ item, onRemove }: UseEstimateItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return {
    description: item.title,
    quantity: item.quantity,
    unitPrice: formatCurrency(item.price),
    total: formatCurrency(item.price * item.quantity),
    handleRemove,
  };
} 