/** @jsxImportSource @emotion/react */
import Typography from "../../atoms/Typography/Typography";
import { clockContainer, foreground, spinningBackground, spinningBackgroundDay, spinningBackgroundNight } from "./Clock.styles";
import { Card } from "../../../definitions/cards/cardTypes";
import { useContext } from "react";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";


export default function Clock({card}: {card?: Card}) {

  const {time, day, fastForwardDay} = useContext(GameContext);

  return (
    <div css={clockContainer} onClick={fastForwardDay}>
      <div css={spinningBackground(day, time)}>
        <div css={spinningBackgroundDay}>
        </div>
        <div css={spinningBackgroundNight}>
        </div>
      </div>
      <div css={foreground}>
        <Typography variant="h3">{day}</Typography>
      </div>
    </div>
  );
}