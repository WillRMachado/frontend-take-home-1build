import { useEstimateContext } from "@/src/context/EstimateContext";
import type { EstimateRow } from "@/data";

export interface EstimateItem extends EstimateRow {}

export function useEstimateList() {
  const { estimate } = useEstimateContext();

  return {
    estimate,
  };
}
