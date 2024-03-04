/** @jsxImportSource @emotion/react */

import { ActiveHazard } from "../../molecules/ActiveHazard/ActiveHazard";
import { TurnCounter } from "../../molecules/TurnCounter/TurnCounter";
import { UIContainer } from "./UIOverlay.styles";

export const UIOverlay = () => {
  
  return (
    <div css={UIContainer}>
      <TurnCounter />
      <ActiveHazard />
    </div>
  );
};