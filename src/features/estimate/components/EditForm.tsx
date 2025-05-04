import React from "react";
import { View } from "react-native";
import { PrimaryButton } from "../../../common/components/PrimaryButton";
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data";
import { useState } from "react";
import { FloatingLabelInput } from "../../../common/components/FloatingLabelInput";
import createThemedStyles, {
  useThemedColors,
} from "@/src/common/theme/utils/createThemedStyles";

type EditFormProps = {
  mode: "item" | "section";
  data: EstimateRow | EstimateSection;
  onSave: (updates: any) => void;
  onClose: () => void;
};

function isEstimateRow(data: any): data is EstimateRow {
  return "price" in data && "quantity" in data && "uom" in data;
}

export function EditForm({ mode, data, onSave, onClose }: EditFormProps) {
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

  const styles = useStyles();
  const colors = useThemedColors();

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

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>
        Edit {mode === "item" ? "Item" : "Section"}
      </Text> */}

      <View style={styles.field}>
        <FloatingLabelInput
          label={mode === "item" ? "Item title" : "Section title"}
          value={title}
          onChangeText={setTitle}
          backgroundColor={colors.outline.medium}
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
                backgroundColor={colors.outline.medium}
              />
            </View>
            <View style={{ width: 100 }}>
              <FloatingLabelInput
                label="Unit"
                value={uom}
                onChangeText={(text) => setUom(text as UnitOfMeasure)}
                backgroundColor={colors.outline.medium}
              />
            </View>
          </View>
          <View style={styles.field}>
            <FloatingLabelInput
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              showStepper
              backgroundColor={colors.outline.medium}
              onIncrement={() => setQuantity((q) => (Number(q) + 1).toString())}
              onDecrement={() =>
                setQuantity((q) => Math.max(0, Number(q) - 1).toString())
              }
            />
          </View>
        </>
      )}

      <View style={styles.formActions}>
        <PrimaryButton onPress={handleSave}>Save item</PrimaryButton>
      </View>
    </View>
  );
}

const useStyles = createThemedStyles(({ numbersAliasTokens, colors }) => ({
  container: {
    paddingVertical: numbersAliasTokens.spacing.md,
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
