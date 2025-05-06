import { useState } from "react";
import { UNITS_OF_MEASURE, UomEntry } from "@/src/consts/unitsOfMeasure";
import { UnitOfMeasure } from "@/data";

interface UseUomSelectorProps {
  onSelectUom: (name: UnitOfMeasure) => void;
  onReturn: () => void;
}

export const useUomSelector = ({ onSelectUom, onReturn }: UseUomSelectorProps) => {
  const [search, setSearch] = useState("");

  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(search.toLowerCase());

  const filterUnitsByCategory = (units: UomEntry[]) =>
    units.filter(
      (uom) =>
        matchesSearch(uom.name) ||
        matchesSearch(uom.abbreviation) ||
        matchesSearch(uom.key)
    );

  const filteredUnits = Object.entries(UNITS_OF_MEASURE).reduce(
    (acc, [category, units]) => {
      const filtered = filterUnitsByCategory(units);
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as typeof UNITS_OF_MEASURE
  );

  return {
    search,
    setSearch,
    filteredUnits,
    onSelectUom,
    onReturn,
  };
}; 