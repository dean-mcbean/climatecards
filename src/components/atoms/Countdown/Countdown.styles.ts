import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const countdownContainer = (visible: boolean, backgroundColor: string) => css`
  position: absolute;
  top: 0;
  right: 0;
  height: ${visible ? 16 : 0}px;
  width: ${visible ? 16 : 0}px;
  opacity: ${visible ? 1 : 0};
  border-radius: 50% 50% 50% 0;
  z-index: 100;
  background-color: ${backgroundColor};
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out, opacity 0.2s ease-in-out;

  svg {
    height: 100%;
    width: 100%;
  }
`