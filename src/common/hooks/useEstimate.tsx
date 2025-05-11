import { EstimateContext } from "@/src/context/EstimateContext";
import { useContext } from "react";

export const useEstimateContext = () => {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error("useEstimate must be used within an EstimateProvider");
  }
  return context;
}
