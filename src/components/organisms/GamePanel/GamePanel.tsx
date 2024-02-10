/** @jsxImportSource @emotion/react */

import { useContext } from "react";
import Funding from "../../molecules/Funding/Funding";
import { gamePanel, topLeftUI, topRightUI } from "./GamePanel.styles";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";
import Clock from "../../molecules/Clock/Clock";
import GameBoard from "../GameBoard/GameBoard";

export default function GamePanel() {

  const {time} = useContext(GameContext);

  return (
    <div css={gamePanel(time)}>
      <div css={topLeftUI}>
        <Clock />
      </div>
      <div css={topRightUI}>
        <Funding />
      </div>
      <GameBoard />
    </div>
  );
}