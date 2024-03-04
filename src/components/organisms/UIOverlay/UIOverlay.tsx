/** @jsxImportSource @emotion/react */

import { TurnCounter } from "../../molecules/TurnCounter/TurnCounter";
import { UIContainer } from "./UIOverlay.styles";

export const UIOverlay = () => {
  
  return (
    <div css={UIContainer}>
      <TurnCounter />
    </div>
  );
};