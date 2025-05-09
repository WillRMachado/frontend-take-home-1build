import { createContext, useContext, useMemo } from "react"
import type { Estimate, EstimateRow, EstimateSection } from "@/data"
import { PropsWithChildren, useState } from "react"
import { sampleEstimate } from "@/data"

export type EditMode =
	| {
			type: "item"
			data: EstimateRow
	  }
	| {
			type: "section"
			data: EstimateSection
	  }
	| null

interface EstimateContextValue {
	estimate: Estimate
	editMode: EditMode
	updateTitle: (title: string) => void
	updateSection: (
		sectionId: string,
		updates: Partial<EstimateSection>
	) => void
	updateItem: (rowId: string, updates: Partial<EstimateRow>) => void
	deleteItem: (rowId: string) => void
	selectItem: (item: EstimateRow) => void
	selectSection: (section: EstimateSection) => void
	clearSelection: () => void
	addItem: (sectionId: string, item: EstimateRow) => void
	addSection: (section: EstimateSection) => void
}

export const EstimateContext = createContext<EstimateContextValue | null>(null)

export function EstimateProvider({ children }: PropsWithChildren) {
	const [estimate, setEstimate] = useState<Estimate>(sampleEstimate)
	const [editMode, setEditMode] = useState<EditMode>(null)

	const updateTitle = (title: string) => {
		setEstimate((prev) => ({
			...prev,
			title,
			updatedAt: new Date(),
		}))
	}

	const updateSection = (
		sectionId: string,
		updateSection: Partial<EstimateSection>
	) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) =>
				section.id === sectionId
					? { ...section, ...updateSection }
					: section
			),
		}))
		setEditMode(null)
	}

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
		}))
		setEditMode(null)
	}

	const deleteItem = (rowId: string) => {
		setEstimate((prev) => {
			const updateRows = prev.sections.map((section) => ({
				...section,
				rows: section.rows.filter((row) => row.id !== rowId)
			}));

			const cleanedSections = updateRows.filter(section => section.rows.length > 0);

			return {
				...prev,
				updatedAt: new Date(),
				sections: cleanedSections
			}
		})
		setEditMode(null)
	}

	const addItem = (sectionId: string, item: EstimateRow) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) =>
				section.id === sectionId
					? { ...section, rows: [...section.rows, item] }
					: section
			),
		}))
		setEditMode(null)
	}

	const selectItem = (item: EstimateRow) => {
		setEditMode({ type: "item", data: item })
	}

	const selectSection = (section: EstimateSection) => {
		setEditMode({ type: "section", data: section })
	}

	const clearSelection = () => {
		setEditMode(null)
	}

	const addSection = (section: EstimateSection) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: [...prev.sections, section],
		}))
		setEditMode(null)
	}

	const value = useMemo(
		() => ({
			estimate,
			editMode,
			updateTitle,
			updateSection,
			updateItem,
			deleteItem,
			selectItem,
			selectSection,
			clearSelection,
			addItem,
			addSection,
		}),
		[
			estimate,
			editMode,
			updateTitle,
			updateSection,
			updateItem,
			deleteItem,
			selectItem,
			selectSection,
			clearSelection,
			addItem,
			addSection,
		]
	)

	return (
		<EstimateContext.Provider value={value}>
			{children}
		</EstimateContext.Provider>
	)
}

export function useEstimateContext() {
	const context = useContext(EstimateContext)
	if (!context) {
		throw new Error("useEstimate must be used within an EstimateProvider")
	}
	return context
}
