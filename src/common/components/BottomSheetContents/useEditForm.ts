import { useState, useContext } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { ComponentContext } from "@/src/context/ComponentContext";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import React from "react";

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

interface UseEditFormProps {
  mode: "item" | "section";
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDelete: () => void;
}

export const useEditForm = ({
  mode,
  data,
  onSave,
  onClose,
  onDelete,
}: UseEditFormProps) => {
  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, openBottomSheet } = componentContext;

  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(
    isEstimateRow(data) ? data.price.toString() : ""
  );
  const [quantity, setQuantity] = useState(
    isEstimateRow(data) ? data.quantity.toString() : ""
  );
  const uom: UnitOfMeasure = isEstimateRow(data) ? data.uom : "EA";

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

  const renderEditFormOnSheet = (
    updatedData?: Partial<EstimateRow | EstimateSection>
  ) => {
    return setBottomSheetChild(
      React.createElement(EditForm, {
        mode,
        data: { ...data, ...updatedData },
        onSave,
        onClose,
        onDelete,
        onDropdownPress: handleDropdownPress,
      })
    );
  };

  const renderUomSelectorOnSheet = () => {
    return setBottomSheetChild(
      React.createElement(UomSelector, {
        selectUom: (newUom: UnitOfMeasure) => {
          renderEditFormOnSheet({ uom: newUom });
        },
        onReturn: () => {
          renderEditFormOnSheet();
        },
      })
    );
  };

  const handleDropdownPress = () => {
    renderUomSelectorOnSheet();
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    quantity,
    setQuantity,
    uom,
    handleSave,
    handleIncrement,
    handleDecrement,
    onClose,
    handleDropdownPress,
    onDelete,
    mode,
  };
};
