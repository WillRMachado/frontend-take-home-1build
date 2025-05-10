import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "../../Button/Button";
import { EstimateRow, EstimateSection } from "@/data";
import { FloatingLabelInput } from "../../FloatingLabelInput";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { BottomSheetHeaders } from "@/src/common/components/BottomSheetContents/BottomSheetHeaders";
import { useEditForm } from "./useEstimateForm";
import SupplierInfo from "@/src/common/components/SupplierInfo";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { EstimateMode } from "@/src/common/enums";
import { formatCurrency } from "@/src/common/utils/format";
import ThemeSwitch from "../../ThemeSwitch";
import Switcher from "../../Switcher";
import { useTheme } from "@/src/common/hooks/useTheme";
import { UNITS_OF_MEASURE } from "@/src/consts/unitsOfMeasure";
import { numbersBaseTokens } from "@/src/common/theme/tokens/base/numbers";
import UomSelector from "../UomSelector/UomSelector";

export type EstimateFormProps = {
  mode: EstimateMode;
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDelete: () => void;
};

export function EstimateForm({
  mode: initialMode,
  data,
  onSave,
  onClose,
  onDelete,
}: EstimateFormProps) {
  const colors = useThemedColors();
  const styles = useStyles();

  const {
    title,
    setTitle,
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
    showSupplierInfo,
    supplierInfo,
    handleCloseSuplier,
    toggleItemMode,
    isUomDropdownOpen,
    handleBlurDropdown,
    handleSelectNewUom,
    uomSearch,
    setUomSearch,
    handleFocusDropdown,
  } = useEditForm({
    mode: initialMode,
    data,
    onSave,
    onClose,
    onDelete,
    EstimateFormComponent: EstimateForm,
  });

  return (
    <>
      {!isEditMode && (
        <Switcher
          isActive={!isItemMode}
          onToggle={toggleItemMode}
          primaryComponent={
            <Text
              style={
                isItemMode
                  ? styles.switcherTextActive
                  : styles.switcherTextDeactivated
              }
            >
              Add Item
            </Text>
          }
          secondaryComponent={
            <Text
              style={
                !isItemMode
                  ? styles.switcherTextActive
                  : styles.switcherTextDeactivated
              }
            >
              Add Group
            </Text>
          }
        />
      )}

      {isEditMode && (
        <Text style={styles.editModeTitle}>
          {`Edit ${isItemMode ? "Item" : "Section"}`}
        </Text>
      )}

      <View style={styles.fieldsContainer}>
        <FloatingLabelInput
          label={isItemMode ? "Item title" : "Section title"}
          value={title}
          onChangeText={setTitle}
          backgroundColor={colors.layer.solid.light}
        />

        {isItemMode && (
          <>
            <FloatingLabelInput
              label="Cost"
              value={displayPrice}
              onChangeText={handlePriceChange}
              keyboardType="decimal-pad"
              backgroundColor={colors.layer.solid.light}
              onFocus={handlePriceFocus}
              onBlur={handlePriceBlur}
            />

            <FloatingLabelInput
              label="Unit"
              value={isUomDropdownOpen ? uomSearch : uom}
              backgroundColor={colors.layer.solid.light}
              showChevron
              isOpen={isUomDropdownOpen}
              onChangeText={setUomSearch}
              onBlur={handleBlurDropdown}
              onFocus={handleFocusDropdown}
              dropdownList={
                <UomSelector
                  key={uomSearch}
                  selectUom={handleSelectNewUom}
                  searchTerm={uomSearch}
                />
              }
              onChevronPress={handleDropdownPress}
            />

            <FloatingLabelInput
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              showStepper
              backgroundColor={colors.layer.solid.light}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            {showSupplierInfo && supplierInfo && (
              <SupplierInfo
                supplier={supplierInfo}
                onClose={handleCloseSuplier}
              />
            )}
          </>
        )}

        <View style={styles.formActions}>
          {isEditMode && (
            <Button variant="destructive" onPress={handleDelete}>
              Delete
            </Button>
          )}
          <Button onPress={handleSave}>
            {isEditMode ? "Done" : isItemMode ? "Add Item" : "Add Section"}
          </Button>
        </View>
      </View>
    </>
  );
}

const useStyles = createThemedStyles(
  ({ numbersAliasTokens, colors, customFonts }) => ({
    fieldsContainer: {
      paddingVertical: numbersAliasTokens.spacing.md,
      gap: numbersAliasTokens.spacing.sm,
    },
    header: {
      marginBottom: numbersAliasTokens.spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.outline.medium,
      borderRadius: numbersAliasTokens.borderRadius.sm,
      padding: numbersAliasTokens.spacing.xs,
      marginTop: numbersAliasTokens.spacing.xs,
    },
    formActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: numbersAliasTokens.spacing.sm,
    },
    button: {
      minWidth: numbersAliasTokens.sizing.container["2xs"],
    },
    supplierContainer: {
      backgroundColor: colors.layer.solid.light,
      borderRadius: numbersAliasTokens.borderRadius.md,
      padding: numbersAliasTokens.spacing.sm,
      marginVertical: numbersAliasTokens.spacing.sm,
    },
    supplierLabel: {
      color: colors.text.secondary,
      fontSize: numbersAliasTokens.spacing.sm,
      marginBottom: numbersAliasTokens.spacing["3xs"],
    },
    supplierLink: {
      flexDirection: "row",
      alignItems: "center",
    },
    supplierName: {
      color: colors.text.primary,
      textDecorationLine: "underline",
      fontSize: numbersAliasTokens.spacing.md,
      flex: 1,
    },
    supplierLogo: {
      width: numbersAliasTokens.sizing.icon.md,
      height: numbersAliasTokens.sizing.icon.md,
      marginLeft: numbersAliasTokens.spacing.sm,
      borderRadius: numbersAliasTokens.borderRadius.xs,
    },
    uomDropdown: {
      position: "absolute",
      top: 56,
      left: 0,
      right: 0,
      // zIndex: ,
      backgroundColor: colors.layer.solid.light,
      borderRadius: numbersAliasTokens.borderRadius.lg,
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.outline.medium,
      // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: numbersAliasTokens.spacing.xs,
      maxHeight: 320,
      // overflow: "scroll"
      overflow: "hidden",
      // elevation: 10000,
      // border: "1px solid red",
      // zIndex: 100,
    },
    uomSearchInput: {
      borderWidth: numbersAliasTokens.borderWidth.xs,
      borderColor: colors.outline.medium,
      borderRadius: numbersAliasTokens.borderRadius.sm,
      padding: numbersAliasTokens.spacing.xs,
      marginBottom: numbersAliasTokens.spacing.xs,
      fontSize: numbersBaseTokens.typography.size[3],
      color: colors.text.primary,
      backgroundColor: colors.layer.solid.light,
    },
    uomCategory: {
      color: colors.text.tertiary,
      fontWeight: "bold",
      marginTop: numbersAliasTokens.spacing.sm,
      marginBottom: numbersAliasTokens.spacing["2xs"],
      paddingHorizontal: numbersAliasTokens.spacing.sm,
    },
    uomOption: {
      paddingHorizontal: numbersAliasTokens.spacing.sm,
      paddingVertical: numbersAliasTokens.spacing.xs,
      borderRadius: numbersAliasTokens.borderRadius.sm,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
    },
    uomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    uomName: {
      color: colors.text.primary,
      fontSize: numbersBaseTokens.typography.size[3],
    },
    uomAbbreviation: {
      color: colors.text.secondary,
      fontSize: numbersBaseTokens.typography.size[3],
      marginLeft: numbersAliasTokens.spacing.sm,
    },

    editModeTitle: {
      ...customFonts.regular.text.md,
      color: colors.text.primary,
      marginBottom: numbersAliasTokens.spacing.xs,
    },

    switcherTextActive: {
      ...customFonts.regular.text.sm,
      color: colors.text.primary,
    },
    switcherTextDeactivated: {
      ...customFonts.regular.text.sm,
      color: colors.text.secondary,
    },
  })
);
