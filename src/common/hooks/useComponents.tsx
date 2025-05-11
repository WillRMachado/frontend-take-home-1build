import { ComponentContext } from "@/src/context/ComponentContext";
import { useContext } from "react";

export const useComponentsContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponents must be used within an ComponentProvider");
  }
  return context;
}
