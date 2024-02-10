/** @jsxImportSource @emotion/react */

import { useContext, useEffect } from "react";
import { beachBase, beachRow, gameBoard, gameBoardBase, groundBase, landBase, seaBase, seaRow, tileRow } from "./GameBoard.styles";
import { GameContext, GameContextType } from "../../../context/GameContextProvider/GameContextProvider";
import { Tile } from "./Tile/Tile";
import { Wave } from "./Wave/Wave";

const runMorningEvents = (context: GameContextType) => {
  console.log(`Good morning! It's day ${context.day}`);

  const { cityTiles, alterFunding } = context;

  // Funding cycle
  cityTiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.building?.type === 'house') {
        alterFunding(1);
      } else if (tile.building?.type === 'business') {
        alterFunding(2);
      }
    });
  });

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
          {context.waves.map((waveRow, index) => 
            <div css={seaRow} key={index}>
              {waveRow.map((wave, index) => 
                wave !== null ? <Wave key={index} wavePosition={wave}></Wave> : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}