/** @jsxImportSource @emotion/react */

import { useGameboardContext } from "../../../context/GameboardProvider";
import { GridItem } from "../../../types/gameboard";
import { depthItem, gameBoardDepth, gameboardContainer, gameboardContainerParent, rowContainer, gameboardContainerOverlay } from "./Gameboard.styles";
import { GameboardTile } from "./GameboardTile/GameboardTile";

export type TileNeighbors = {top?: GridItem, bottom?: GridItem, left?: GridItem, right?: GridItem};

export const Gameboard = () => {
  const { grid, tileWidth } = useGameboardContext();
  
  if (grid.length == 0) {
    return null;
  }
  
  const getNeighbors = (rowIndex: number, colIndex: number) => {
    const neighbors: TileNeighbors = {};
    
    // Check top neighbor
    if (rowIndex > 0) {
      neighbors.top = grid[rowIndex - 1][colIndex];
    }
    
    // Check bottom neighbor
    if (rowIndex < grid.length - 1) {
      neighbors.bottom = grid[rowIndex + 1][colIndex];
    }
    
    // Check left neighbor
    if (colIndex > 0) {
      neighbors.left = grid[rowIndex][colIndex - 1];
    }

    // Check right neighbor
    if (colIndex < grid[rowIndex].length - 1) {
      neighbors.right = grid[rowIndex][colIndex + 1];
    }
    
    return neighbors;
  };
  
  return (
    <div css={gameboardContainerOverlay}>
      <div css={gameboardContainerParent}>
        <div css={gameboardContainer}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} css={rowContainer}>
              {row.map((gridItem, colIndex) => (
                <GameboardTile
                  key={colIndex}
                  gridItem={gridItem}
                  neighbors={getNeighbors(rowIndex, colIndex)}
                />
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