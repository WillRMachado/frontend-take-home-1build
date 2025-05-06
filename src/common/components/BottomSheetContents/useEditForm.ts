import { useState, useContext } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { ComponentContext } from "@/src/context/ComponentContext";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector";
import { EditForm } from "@/src/common/components/BottomSheetContents/EditForm";
import React from "react";
import { EstimateMode } from "@/src/common/types/estimate";

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

interface UseEditFormProps {
  mode: EstimateMode;
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

  const { setBottomSheetChild, openBottomSheet, closeBottomSheet } =
    componentContext;

  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(
    isEstimateRow(data) ? data.price.toString() : ""
  );
  const [quantity, setQuantity] = useState(
    isEstimateRow(data) ? data.quantity.toString() : ""
  );
  const uom: UnitOfMeasure = isEstimateRow(data) ? data.uom : "EA";

  const handleSave = () => {
    if (mode === EstimateMode.EditItem || mode === EstimateMode.AddItem) {
      onSave({
        ...data,
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      });
      closeBottomSheet();
    } else {
      onSave({ title });
      closeBottomSheet();
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
    handleDelete: onDelete,
    handleClose: onClose,
    mode,
  };
};
