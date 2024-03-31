/** @jsxImportSource @emotion/react */
import { useTimeContext } from "../../../context/TimeProvider";
import { currentTurnContainer, subtitle, turnContainer } from "./TurnCounter.styles";


export const TurnCounter = () => {
  const { season, year } = useTimeContext();


  return (
    <div css={turnContainer}>
      <div css={currentTurnContainer}>
        {season}
        <div css={subtitle}>{year}</div>
      </div>
    </div>
  );
};