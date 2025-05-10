import { useEstimateContext } from "@/src/common/hooks/useEstimate";

export function useEstimateTitle() {
  const { estimate, updateTitle } = useEstimateContext();

  return {
    title: estimate.title,
    updateTitle,
  };
}
