import React from "react";
import { View } from "react-native";
import { PrimaryButton } from "../PrimaryButton";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { FloatingLabelInput } from "../FloatingLabelInput";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";
import { BottomSheetHeaders } from "@/src/common/components/BottomSheetHeaders";
import { useEditForm } from "./useEditForm";
import { EstimateMode } from "@/src/common/types/estimate";

type EditFormProps = {
  mode: EstimateMode;
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDelete: () => void;
};

export function EditForm({
  mode: initialMode,
  data,
  onSave,
  onClose,
  onDelete,
}: EditFormProps) {
  const styles = useStyles();
  const colors = useThemedColors();

  const {
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
    handleDropdownPress,
    handleDelete,
    handleClose,
    mode,
  } = useEditForm({
    mode: initialMode,
    data,
    onSave,
    onClose,
    onDelete,
  });

  const isItemMode =
    mode === EstimateMode.EditItem || mode === EstimateMode.AddItem;
  const isEditMode =
    mode === EstimateMode.EditItem || mode === EstimateMode.EditSection;

  return (
    <>
      <BottomSheetHeaders
        title={`${isEditMode ? "Edit" : "Add"} ${
          isItemMode ? "Item" : "Section"
        }`}
        leftIcon="x"
        onClickLeftIcon={handleClose}
        rightIcon="trash-2"
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
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <FloatingLabelInput
                  label="Cost"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                  backgroundColor={colors.layer.solid.light}
                />
              </View>
              <View style={{ width: 100 }}>
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
          </>
        )}

        <View style={styles.formActions}>
          <PrimaryButton onPress={handleSave}>
            Save {isItemMode ? "item" : "section"}
          </PrimaryButton>
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
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
}));
