import { EstimateSection } from "@/data";

interface UseAddItemButtonProps {
  section: EstimateSection;
}

export const useAddItemButton = ({ section }: UseAddItemButtonProps) => {
  const handleAddItem = () => {
    console.log("Add item clicked for section:", section.id);
  };

  return {
    handleAddItem,
  };
}; 