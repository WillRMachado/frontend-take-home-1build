import { useState, useContext } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { ComponentContext } from "@/src/context/ComponentContext";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector/UomSelector";
import React from "react";
import { EstimateMode } from "@/src/common/types/estimate";
import { EstimateFormProps } from "./EstimateForm";

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

type UseEditFormProps = Omit<EstimateFormProps, "mode"> & {
  mode: EstimateMode;
  EstimateFormComponent: React.ComponentType<EstimateFormProps>;
};

export const useEditForm = ({
  mode,
  data,
  onSave,
  onClose,
  onDelete,
  EstimateFormComponent,
}: UseEditFormProps) => {
  const [showSupplierInfo, setShowSupplierInfo] = useState(
    isEstimateRow(data) && data.supplier
  );

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
      React.createElement(EstimateFormComponent, {
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

  const handleCloseSuplier = () => {
    setShowSupplierInfo(false);
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
    isItemMode: mode === EstimateMode.EditItem || mode === EstimateMode.AddItem,
    isEditMode:
      mode === EstimateMode.EditItem || mode === EstimateMode.EditSection,
    supplierInfo: isEstimateRow(data) ? data.supplier : null,
    showSupplierInfo,
    handleCloseSuplier,
  };
};
