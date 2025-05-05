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

type EditFormProps = {
  mode: "item" | "section";
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDropdownPress: () => void;
  onDelete: () => void;
};

export function EditForm({
  mode,
  data,
  onSave,
  onDropdownPress,
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
    setUom,
    handleSave,
    handleIncrement,
    handleDecrement,
  } = useEditForm({
    mode,
    data,
    onSave,
    onClose,
    onDropdownPress,
    onDelete,
  });

  return (
    <>
      <BottomSheetHeaders
        title="Edit Item"
        leftIcon="x"
        onClickLeftIcon={onClose}
        rightIcon="trash-2"
        onClickRightIcon={onDelete}
      />

      <View style={styles.container}>
        <View style={styles.field}>
          <FloatingLabelInput
            label={mode === "item" ? "Item title" : "Section title"}
            value={title}
            onChangeText={setTitle}
            backgroundColor={colors.layer.solid.light}
          />
        </View>

        {mode === "item" && (
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
                  onChangeText={(text) => setUom(text as UnitOfMeasure)}
                  backgroundColor={colors.layer.solid.light}
                  showChevron
                  onChevronPress={onDropdownPress}
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
          <PrimaryButton onPress={handleSave}>Save item</PrimaryButton>
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
