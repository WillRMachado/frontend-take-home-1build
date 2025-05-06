import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers";

export type LazyImageSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | number
  | "auto"
  | undefined;

export function getIconSize(size: LazyImageSize): number | "auto" {
  if (size === "auto" || size === undefined) return "auto";
  if (typeof size === "number") return size;
  return (
    numbersAliasTokens.sizing.icon[size] || numbersAliasTokens.sizing.icon.md
  );
}
