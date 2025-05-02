import { numbersBaseTokens } from "../base/numbers";

export type TShirtSize =
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type IconSizeVariant = Extract<TShirtSize, "xs" | "sm" | "md" | "lg" | "xl">;
type IconSize = Record<IconSizeVariant, number>;

type ContainerSizeVariant = Extract<
  TShirtSize,
  "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
>;
type ContainerSize = Record<ContainerSizeVariant, number>;

type BorderRadiusVariant =
  | Extract<TShirtSize, "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl">
  | "pill";

type BorderRadius = Record<BorderRadiusVariant, number>;

type BorderWidthVariant = Extract<TShirtSize, "xs" | "sm" | "md" | "lg" | "xl">;
type BorderWidth = Record<BorderWidthVariant, number>;

type OutlineHeightVariant = Extract<
  IconSizeVariant,
  "xs" | "sm" | "md" | "lg" | "xl"
>;
type OutlineHeight = Record<OutlineHeightVariant, number>;

type Spacing = Record<TShirtSize, number>;

interface NumbersAliasTokens {
  sizing: {
    icon: IconSize;
    container: ContainerSize;
  };
  borderRadius: BorderRadius;
  outlineHeight: OutlineHeight;
  spacing: Spacing;
  borderWidth: BorderWidth;
}

export const numbersAliasTokens = {
  sizing: {
    icon: {
      xs: numbersBaseTokens.globalScale["3"],
      sm: numbersBaseTokens.globalScale["4"],
      md: numbersBaseTokens.globalScale["5"],
      lg: numbersBaseTokens.globalScale["6"],
      xl: numbersBaseTokens.globalScale["8"],
    },
    container: {
      "2xs": 300,
      xs: 450,
      sm: 600,
      md: 750,
      lg: 900,
      xl: 1050,
      "2xl": 1200,
    },
  },
  borderRadius: {
    xs: numbersBaseTokens.globalScale["1"],
    sm: numbersBaseTokens.globalScale["2"],
    md: numbersBaseTokens.globalScale["3"],
    lg: numbersBaseTokens.globalScale["4"],
    xl: numbersBaseTokens.globalScale["5"],
    "2xl": numbersBaseTokens.globalScale["6"],
    "3xl": numbersBaseTokens.globalScale["7"],
    pill: 10000,
  },
  borderWidth: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  outlineHeight: {
    xs: 1,
    sm: 1.5,
    md: 2,
    lg: 3,
    xl: 4,
  },
  spacing: {
    "3xs": numbersBaseTokens.globalScale["1"],
    "2xs": numbersBaseTokens.globalScale["2"],
    xs: numbersBaseTokens.globalScale["3"],
    sm: numbersBaseTokens.globalScale["4"],
    md: numbersBaseTokens.globalScale["5"],
    lg: numbersBaseTokens.globalScale["6"],
    xl: numbersBaseTokens.globalScale["7"],
    "2xl": numbersBaseTokens.globalScale["8"],
    "3xl": numbersBaseTokens.globalScale["10"],
    "4xl": numbersBaseTokens.globalScale["12"],
    "5xl": numbersBaseTokens.globalScale["14"],
    "6xl": numbersBaseTokens.globalScale["16"],
  },
} as const satisfies NumbersAliasTokens;
