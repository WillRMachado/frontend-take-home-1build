import React from "react";
import { View } from "react-native";
import { Button } from "../../Button/Button";
import { EstimateRow, EstimateSection } from "@/data";
import { FloatingLabelInput } from "../../FloatingLabelInput/FloatingLabelInput";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { BottomSheetHeaders } from "@/src/common/components/InteractionPanelContents/InteractionPanelHeaders";
import { useEditForm } from "./useEstimateForm";
import SupplierInfo from "@/src/common/components/SupplierInfo";
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";
import { EstimateMode } from "@/src/common/enums";

export type EstimateFormProps = {
  mode: EstimateMode;
  data: EstimateRow | EstimateSection;
};

export function EstimateForm({ mode: initialMode, data }: EstimateFormProps) {
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
    isItemMode,
    isEditMode,
    showSupplierInfo,
    supplierInfo,
    handleCloseSuplier,
  } = useEditForm({
    mode: initialMode,
    data,
    EstimateFormComponent: EstimateForm,
  });

  return (
    <>
      <BottomSheetHeaders
        title={`${isEditMode ? "Edit" : "Add"} ${
          isItemMode ? "Item" : "Group"
        }`}
        leftIcon="x"
        onClickLeftIcon={handleClose}
        rightIcon={isEditMode ? "trash-2" : undefined}
        onClickRightIcon={handleDelete}
      />

      <View style={styles.container}>
        <View style={styles.field}>
          <FloatingLabelInput
            label={isItemMode ? "Item title" : "Section title"}
            value={title}
            onChangeText={setTitle}
            backgroundColor={colors.layer.solid.light}
          />
        </View>

        {isItemMode && (
          <>
            <View
              style={{
                flexDirection: "row",
                gap: numbersAliasTokens.spacing.sm,
              }}
            >
              <View style={{ flex: 1 }}>
                <FloatingLabelInput
                  label="Cost"
                  value={displayPrice}
                  onChangeText={handlePriceChange}
                  keyboardType="decimal-pad"
                  backgroundColor={colors.layer.solid.light}
                  onFocus={handlePriceFocus}
                  onBlur={handlePriceBlur}
                />
              </View>
              <View
                style={{
                  width: "45%",
                }}
              >
                <FloatingLabelInput
                  label="Unit"
                  value={uom}
                  backgroundColor={colors.layer.solid.light}
                  showChevron
                  onChevronPress={handleDropdownPress}
                />
              </View>
            </View>
            <View style={styles.field}>
              <FloatingLabelInput
                label="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                showStepper
                backgroundColor={colors.layer.solid.light}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </View>
            {showSupplierInfo && supplierInfo && (
              <SupplierInfo
                supplier={supplierInfo}
                onClose={handleCloseSuplier}
              />
            )}
          </>
        )}

        <View style={styles.formActions}>
          <Button onPress={handleSave}>
            Save {isItemMode ? "item" : "section"}
          </Button>
        </View>
      </View>
    </>
  );
}

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  container: {
    paddingBottom: numbersAliasTokens.spacing.md,
    paddingHorizontal: numbersAliasTokens.spacing.sm,
  },
  header: {
    marginBottom: numbersAliasTokens.spacing.xs,
  },
  field: {
    marginBottom: numbersAliasTokens.spacing.xs,
    marginTop: numbersAliasTokens.spacing.xs,
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
}));
