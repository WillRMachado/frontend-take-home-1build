import { Estimate } from "@/data";

export function calculateSectionTotal(
  section: Estimate["sections"][0]
): number {
  if (!Array.isArray(section.rows)) return 0;
  return section.rows.reduce(
    (total, row) => total + (row?.price || 0) * (row?.quantity || 0),
    0
  );
}

export function calculateEstimateTotal(estimate: Estimate): number {
  if (!Array.isArray(estimate.sections)) return 0;
  return estimate.sections.reduce(
    (total, section) => total + calculateSectionTotal(section),
    0
  );
}
