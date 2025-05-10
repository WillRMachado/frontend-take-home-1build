import { useState, useContext, useEffect } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { ComponentContext } from "@/src/context/ComponentContext";
import UomSelector from "@/src/common/components/BottomSheetContents/UomSelector/UomSelector";
import React from "react";
import { EstimateFormProps } from "./EstimateForm";
import { EstimateMode } from "@/src/common/enums";
import { formatCurrency, parsePriceInput } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/context/EstimateContext";
import { Platform } from "react-native";

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
  const initialState = {
    showSupplierInfo: isEstimateRow(data) && data.supplier,
    isPriceFocused: false,
    title: data.title,
    price: isEstimateRow(data) ? data.price.toString() : "",
    quantity: isEstimateRow(data) ? data.quantity.toString() : "",
  };

  const renderFormDefaultProps = {
    mode,
    data,
    onSave,
    onClose,
    onDelete,
  };

  const [showSupplierInfo, setShowSupplierInfo] = useState(
    initialState.showSupplierInfo
  );
  const [isPriceFocused, setIsPriceFocused] = useState(
    initialState.isPriceFocused
  );
  const [title, setTitle] = useState(initialState.title);
  const [price, setPrice] = useState(initialState.price);
  const [quantity, setQuantity] = useState(initialState.quantity);

  const [uomSearch, setUomSearch] = useState("");

  const [isUomDropdownOpen, setIsUomDropdownOpen] = useState(false);

  const resetInitialState = () => {
    setTitle(initialState.title);
    setPrice(initialState.price);
    setQuantity(initialState.quantity);
    setShowSupplierInfo(initialState.showSupplierInfo);
    setIsPriceFocused(initialState.isPriceFocused);
    setUomSearch("");
    setIsUomDropdownOpen(false);
  };

  useEffect(() => {
    resetInitialState();
    return () => {
      resetInitialState();
    };
  }, [mode, data]);

  const { addItem, addSection } = useEstimateContext();

  const componentContext = useContext(ComponentContext);

  if (!componentContext) {
    throw new Error("ComponentContext must be used within a ComponentProvider");
  }

  const { setBottomSheetChild, closeBottomSheet } = componentContext;

  const uom: UnitOfMeasure = isEstimateRow(data) ? data.uom : "EA";

  const handlePriceChange = (text: string) => {
    const numericValue = parsePriceInput(text);
    if (numericValue !== "") {
      setPrice(numericValue);
    }
  };

  const displayPrice = isPriceFocused
    ? price
    : price
    ? formatCurrency(parseFloat(price))
    : "";

  const handlePriceFocus = () => setIsPriceFocused(true);
  const handlePriceBlur = () => setIsPriceFocused(false);

  const handleSave = () => {
    if (mode === EstimateMode.EDIT_ITEM || mode === EstimateMode.ADD_ITEM) {
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

  const reRenderFormNewProps = (updatedData?: Partial<UseEditFormProps>) => {
    return setBottomSheetChild(
      React.createElement(EstimateFormComponent, {
        ...renderFormDefaultProps,
        ...updatedData,
      })
    );
  };

  const renderEditFormOnSheet = (
    updatedData?: Partial<EstimateRow | EstimateSection>
  ) => {
    return reRenderFormNewProps({
      data: { ...data, ...updatedData },
    });
  };

  const handleSelectNewUom = (newUom: UnitOfMeasure) => {
    console.log("🚀 ~ handleSelectNewUom ~ newUom:", newUom);
    renderEditFormOnSheet({ uom: newUom });
    setIsUomDropdownOpen(false);
  };

  const renderUomSelectorOnSheet = () => {
    return setBottomSheetChild(
      React.createElement(UomSelector, {
        selectUom: (newUom: UnitOfMeasure) => {
          handleSelectNewUom(newUom);
        },
        onReturn: () => {
          renderEditFormOnSheet();
        },
      })
    );
  };

  const handleDropdownPress = () => {
    Platform.OS === "web"
      ? setIsUomDropdownOpen((value) => !value)
      : renderUomSelectorOnSheet();
  };

  const handleFocusDropdown = () => {
    setIsUomDropdownOpen(true);
    setUomSearch("");
  };

  const handleCloseSuplier = () => {
    setShowSupplierInfo(false);
  };

  const toggleItemMode = () => {
    return reRenderFormNewProps({
      mode:
        mode === EstimateMode.ADD_SECTION
          ? EstimateMode.ADD_ITEM
          : EstimateMode.ADD_SECTION,
      onSave:
        mode === EstimateMode.ADD_ITEM
          ? (updates) => {
              addSection({ ...data, ...updates });
            }
          : (updates) => {
              if (!isEstimateRow(data) || !data.sectionId) {
                throw new Error("sectionId is required when adding an item");
              }
              addItem(data.sectionId, { ...data, ...updates });
            },
    });
  };

  const handleBlurDropdown = () => {
    console.log("🚀 ~ handleBlurDropdown ~ uomSearch:", uomSearch);
    setIsUomDropdownOpen(false);
    setUomSearch("");
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    displayPrice,
    handlePriceChange,
    handlePriceFocus,
    handlePriceBlur,
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
    isItemMode:
      mode === EstimateMode.EDIT_ITEM || mode === EstimateMode.ADD_ITEM,
    isEditMode:
      mode === EstimateMode.EDIT_ITEM || mode === EstimateMode.EDIT_SECTION,
    supplierInfo: isEstimateRow(data) ? data.supplier : null,
    showSupplierInfo,
    handleCloseSuplier,
    toggleItemMode,
    isUomDropdownOpen,
    handleSelectNewUom,
    handleBlurDropdown,
    uomSearch,
    setUomSearch,
    handleFocusDropdown,
  };
};
