/** @jsxImportSource @emotion/react */

import { useGameloopContext } from "../../../context/GameloopProvider";
import { CardhandPanel } from "../../organisms/CardhandPanel/CardhandPanel";
import { Gameboard } from "../../organisms/Gameboard/Gameboard";
import { UIOverlay } from "../../organisms/UIOverlay/UIOverlay";
import { UnlockCardPanel } from "../../organisms/UnlockCardPanel/UnlockCardPanel";
import { appContainer, upperAppContainer } from "./MainGame.styles";


export default function MainGame() {

  const { gameState } = useGameloopContext();

  if (gameState.status === "unlockCard") {
    return (
      <div css={appContainer}>
        <UnlockCardPanel/>
      </div>
    )
  }

  return (
  <div css={appContainer}>
    <div css={upperAppContainer}>
      <Gameboard />
      <UIOverlay />
    </div>
    <CardhandPanel />
  </div>
  )
}