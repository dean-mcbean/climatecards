/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/react";
import { typographyVariant } from "./Typography.styles";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "subtitle";

export default function Typography({variant, fontSize, children}: {variant: TypographyVariant, fontSize?: string, children: React.ReactNode}) {
  return (
    <span css={typographyVariant(variant, fontSize)}>
      {children}
    </span>
  );
}