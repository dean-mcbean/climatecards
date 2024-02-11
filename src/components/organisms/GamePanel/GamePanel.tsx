/** @jsxImportSource @emotion/react */

import { useContext } from "react";
import Funding from "../../molecules/Funding/Funding";
import { gamePanel, topUI } from "./GamePanel.styles";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";
import Clock from "../../molecules/Clock/Clock";
import GameBoard from "../GameBoard/GameBoard";
import DayAnnouncer from "../../atoms/DayAnnouncer/DayAnnouncer";

export default function GamePanel() {

  const {time} = useContext(GameContext);

  return (
    <div css={gamePanel(time)}>
      <div css={topUI}>
        <Clock />
        <DayAnnouncer />
        <Funding />
      </div>
      <GameBoard />
    </div>
  );
}