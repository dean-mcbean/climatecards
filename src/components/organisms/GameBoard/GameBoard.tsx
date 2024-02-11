/** @jsxImportSource @emotion/react */

import { useContext, useEffect } from "react";
import { beachBase, beachRow, gameBoard, gameBoardBase, groundBase, landBase, seaBase, seaRow, tileRow } from "./GameBoard.styles";
import { GameContext, GameContextType } from "../../../context/GameContextProvider/GameContextProvider";
import { Tile } from "./Tile/Tile";
import { Wave } from "./Wave/Wave";

const runMorningEvents = (context: GameContextType) => {
  console.log(`Good morning! It's day ${context.day}`);

}

export default function GameBoard() {
  const context = useContext(GameContext);

  useEffect(() => {
    if (context.day > 0) runMorningEvents(context)
  }, [context.day]);

  return (
    <div css={gameBoard}>
      <div css={gameBoardBase}>
        <div css={groundBase}></div>
        <div css={landBase}>
          {context.cityTiles.map((tileList, index) => {
            return (
              <div css={tileRow} key={index}>
                {tileList.map((tile, index) => {
                  return (
                    <Tile key={index} tile={tile} />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div css={beachBase}>
          {context.cityTiles.map((_, index) => 
            <div css={beachRow} key={index}></div>
          )}
        </div>
        <div css={seaBase}>
          {context.waves.map((waveRow, row_index) => 
            <div css={seaRow} key={row_index}>
              {Object.entries(waveRow).map(([wave_id, waveSpeed]) =>
                <Wave key={wave_id} waveSpeed={waveSpeed} row={row_index} wave_id={wave_id} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}