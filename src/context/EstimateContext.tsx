import { createContext, useMemo } from "react";
import type { Estimate, EstimateRow, EstimateSection } from "@/data";
import { PropsWithChildren, useState } from "react";
import { sampleEstimate } from "@/data";
import { EstimateMode } from "@/src/common/enums";
import { uuid } from "../common/lib/imports";
export type EditMode =
  | {
      type: EstimateMode.EDIT_ITEM | EstimateMode.ADD_ITEM;
      data: EstimateRow;
    }
  | {
      type: EstimateMode.EDIT_SECTION | EstimateMode.ADD_SECTION;
      data: EstimateSection;
    }
  | null;

interface EstimateContextValue {
  estimate: Estimate;
  updateTitle: (title: string) => void;
  updateSection: (sectionId: string, updates: Partial<EstimateSection>) => void;
  updateItem: (rowId: string, updates: Partial<EstimateRow>) => void;
  deleteItem: (rowId: string) => void;
  deleteSection: (sectionId: string) => void;
  addItem: (sectionId: string, item: Omit<EstimateRow, "id">) => void;
  addSection: (section: { title: string }) => void;
}

export const EstimateContext = createContext<EstimateContextValue | null>(null);

export function EstimateProvider({ children }: PropsWithChildren) {
  const [estimate, setEstimate] = useState<Estimate>(sampleEstimate);

  const updateTitle = (title: string) => {
    setEstimate((prev) => ({
      ...prev,
      title,
      updatedAt: new Date(),
    }));
  };

  const updateSection = (
    sectionId: string,
    updateSection: Partial<EstimateSection>
  ) => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updateSection } : section
      ),
    }));
  };

  const updateItem = (rowId: string, updateItem: Partial<EstimateRow>) => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) => ({
        ...section,
        rows: section.rows.map((row) =>
          row.id === rowId ? { ...row, ...updateItem } : row
        ),
      })),
    }));
  };

  const deleteItem = (rowId: string) => {
    const sectionWithItem = estimate.sections.find((section) =>
      section.rows.some((row) => row.id === rowId)
    );

    if (sectionWithItem && sectionWithItem.rows.length === 1)
      return deleteSection(sectionWithItem.id);

    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) => ({
        ...section,
        rows: section.rows.filter((row) => row.id !== rowId),
      })),
    }));
  };

  const deleteSection = (sectionId: string) => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
  };

  const addItem = (sectionId: string, item: Omit<EstimateRow, "id">) => {
    const newItem = {
      ...item,
      id: uuid.v4(),
    };

    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, rows: [...section.rows, newItem] }
          : section
      ),
    }));
  };

  const addSection = (section: { title: string }) => {
    const newSection: EstimateSection = {
      id: `section-${uuid.v4()}`,
      title: section.title,
      rows: [],
    };
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: [...prev.sections, newSection],
    }));
  };

  const value = useMemo(
    () => ({
      estimate,
      updateTitle,
      updateSection,
      updateItem,
      deleteItem,
      deleteSection,
      addItem,
      addSection,
    }),
    [
      estimate,
      updateTitle,
      updateSection,
      updateItem,
      deleteItem,
      deleteSection,
      addItem,
      addSection,
    ]
  );

  return (
    <EstimateContext.Provider value={value}>
      {children}
    </EstimateContext.Provider>
  );
}
