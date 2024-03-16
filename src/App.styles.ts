import { css } from "@emotion/react";
import { palette } from "./theme/palette";

export const appContainer = css`
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  background: ${palette.gradient.skyBlue()};
  `

export const upperAppContainer = css`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: stretch;
  flex-grow: 1;
  position: relative;
`