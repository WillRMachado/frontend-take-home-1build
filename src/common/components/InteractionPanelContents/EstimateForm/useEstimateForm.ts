import { useState, useEffect } from "react";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import UomSelector from "@/src/common/components/InteractionPanelContents/UomSelector/UomSelector";
import React from "react";
import { EstimateFormProps } from "./EstimateForm";
import { EstimateMode } from "@/src/common/enums";
import { formatCurrency, parsePriceInput } from "@/src/common/utils/format";
import { useEstimateContext } from "@/src/common/hooks/useEstimate";
import { Platform } from "react-native";
import { useToast } from "@/src/common/utils/toast";
import { useComponentsContext } from "@/src/common/hooks/useComponents";

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
  EstimateFormComponent,
}: UseEditFormProps) => {
  const initialState = {
    showSupplierInfo: isEstimateRow(data) && data.supplier,
    isPriceFocused: false,
    title: data.title,
    price: isEstimateRow(data) ? data.price.toString() : "",
    quantity: isEstimateRow(data) ? data.quantity.toString() : "",
  };

  const { show } = useToast();

  const isItemMode =
    mode === EstimateMode.EDIT_ITEM || mode === EstimateMode.ADD_ITEM;

  const isEditMode =
    mode === EstimateMode.EDIT_ITEM || mode === EstimateMode.EDIT_SECTION;

  const renderFormDefaultProps = {
    mode,
    data,
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

  const {
    addItem,
    addSection,
    deleteItem,
    updateItem,
    updateSection,
    deleteSection,
  } = useEstimateContext();

  const componentContext = useComponentsContext();

  const { setBottomSheetChild, closeBottomSheet } = componentContext;

  const uom: UnitOfMeasure = isEstimateRow(data) ? data.uom : "EA";

  const handlePriceChange = (text: string) => {
    const numericValue = parsePriceInput(text);

    console.log("🚀 ~ handlePriceChange ~ numericValue:", text, numericValue);

    if (text === "") return setPrice("");

    if (numericValue !== "") {
      setPrice(numericValue);
    }
  };

  const displayPrice = isPriceFocused
    ? price
    : formatCurrency(parseFloat(price || "0"));

  const handlePriceFocus = () => setIsPriceFocused(true);
  const handlePriceBlur = () => setIsPriceFocused(false);

  const handleUpdateData = () => {
    if (mode === EstimateMode.ADD_SECTION) return addSection({ title });

    if (mode === EstimateMode.ADD_ITEM) {
      const sectionId = (data as any).sectionId;
      if (!sectionId) {
        throw new Error("Cannot add item: sectionId is required");
      }
      const newItem = {
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      };
      return addItem(sectionId, newItem);
    }

    if (mode === EstimateMode.EDIT_ITEM) {
      return updateItem(data.id, {
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      });
    }

    if (mode === EstimateMode.EDIT_SECTION) {
      return updateSection(data.id, { title });
    }
  };

  const handleSave = () => {
    handleUpdateData();
    closeBottomSheet();
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
    console.log("🚀 ~ renderEditFormOnSheet ~ updatedData:", updatedData, data);
    return reRenderFormNewProps({
      data: {
        ...data,
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        ...updatedData,
      },
    });
  };

  const handleSelectNewUom = (newUom: UnitOfMeasure) => {
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
      mode: isItemMode ? EstimateMode.ADD_SECTION : EstimateMode.ADD_ITEM,
    });
  };

  const handleBlurDropdown = () => {
    setIsUomDropdownOpen(false);
    setUomSearch("");
  };

  const handleClose = () => {
    closeBottomSheet();
  };

  const handleDelete = () => {
    if (isItemMode) {
      deleteItem(data?.id);
      show("Item deleted");
    } else {
      deleteSection(data.id);
      show("Section deleted");
    }

    closeBottomSheet();
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
    handleDropdownPress,
    handleDelete,
    handleClose,
    mode,
    isItemMode,
    isEditMode,
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
