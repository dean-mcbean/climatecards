import { css } from "@emotion/react";
import { TypographyVariant } from "./Typography";


export const typographyVariant = (variant: TypographyVariant, fontSize?: string) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: ${fontSize || "2.5rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `
    case "h2":
      return css`
        font-size: ${fontSize || "2rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `
    case "h3":
      return css`
        font-size: ${fontSize || "1.5rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `
    case "h4":
      return css`
        font-size: ${fontSize || "1.25rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `
    case "h5":
      return css`
        font-size: ${fontSize || "1rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `
    case "h6":
      return css`
        font-size: ${fontSize || "0.875rem"};
        font-weight: bold;
        font-family: 'Protest Riot', sans-serif;
      `

    case "p":
      return css`
        font-size: ${fontSize || "1rem"};
        font-weight: normal;
        margin: 0;
      `

    case "subtitle":
      return css`
        font-size: ${fontSize || "1rem"};
        font-weight: normal;
        font-style: italic;
      `
  }
}