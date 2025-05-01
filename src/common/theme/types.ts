import { THEMES } from "@/src/common/enums";

export type ThemeScheme = (typeof THEMES)[keyof typeof THEMES];
