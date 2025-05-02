import type { EstimateSection as EstimateSectionType } from "@/data";
import { useState } from "react";
interface UseEstimateSectionProps {
  section: EstimateSectionType;
}

export function useEstimateSection({ section }: UseEstimateSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const price = section.rows.reduce((acc, row) => {
    return acc + row.price * row.quantity;
  }, 0);

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return {
    title: section.title,
    price,
    isOpen,
    toggleOpen,
  };
}
