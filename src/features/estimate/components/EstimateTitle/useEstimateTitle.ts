import { useEstimateContext } from "@/src/context/EstimateContext";

export function useEstimateTitle() {
  const { estimate, updateTitle } = useEstimateContext();

  return {
    title: estimate.title,
    updateTitle,
  };
}
