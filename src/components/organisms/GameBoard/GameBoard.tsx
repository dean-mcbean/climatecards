/** @jsxImportSource @emotion/react */

import { useGameboardContext } from "../../../context/GameboardProvider";
import { WeatherEffectOverlay } from "../../molecules/WeatherEffectOverlay/WeatherEffectOverlay";
import { depthItem, gameBoardDepth, gameboardContainer, gameboardContainerParent, rowContainer, gameboardContainerOverlay } from "./Gameboard.styles";
import { GameboardTile } from "./GameboardTile/GameboardTile";

export const Gameboard = () => {
  const { grid, tileWidth } = useGameboardContext();
  
  if (grid.length == 0) {
    return null;
  }
  return (
    <div css={gameboardContainerOverlay}>
      <div css={gameboardContainerParent}>
        <div css={gameboardContainer}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} css={rowContainer}>
              {row.map((gridItem, colIndex) => (
                <GameboardTile key={colIndex} gridItem={gridItem} />
              ))}
            </div>
          ))}
        </div>
        <div css={gameBoardDepth}>
          {grid[grid.length - 1].map((gridItem, colIndex) => (
            <div key={colIndex} css={depthItem(gridItem, tileWidth)}/>
          ))}
        </div>
      </div>
    </div>
  );
};