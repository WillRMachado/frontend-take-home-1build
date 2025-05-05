import { useState } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

interface UseEditFormProps {
  mode: "item" | "section";
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDropdownPress: () => void;
  onDelete: () => void;
}

export const useEditForm = ({
  mode,
  data,
  onSave,
  onClose,
  onDropdownPress,
  onDelete,
}: UseEditFormProps) => {
  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(
    isEstimateRow(data) ? data.price.toString() : ""
  );
  const [quantity, setQuantity] = useState(
    isEstimateRow(data) ? data.quantity.toString() : ""
  );
  const [uom, setUom] = useState<UnitOfMeasure>(
    isEstimateRow(data) ? data.uom : "EA"
  );

  const handleSave = () => {
    if (mode === "item") {
      onSave({
        ...data,
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      });
    } else {
      onSave({ title });
    }
  };

  const handleIncrement = () => {
    setQuantity((value) => (Number(value) + 1).toString());
  };

  const handleDecrement = () => {
    setQuantity((value) => Math.max(0, Number(value) - 1).toString());
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    quantity,
    setQuantity,
    uom,
    setUom,
    handleSave,
    handleIncrement,
    handleDecrement,
    onClose,
    onDropdownPress,
    onDelete,
    mode,
  };
}; 