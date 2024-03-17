import React, { ReactNode, useCallback } from "react";
import { GridItem } from "../types/gameboard";
import { generateTerrain } from "../utils/gameboard/terrain";
import { generateVillage } from "../utils/gameboard/village";
import { getRandomTiles } from "../utils/gameboard/board_filters";

const gridDimensions = [9, 5];
const tileWidth = 50;

export type GameboardContextType = {
  grid: GridItem[][];
  updateGridItem: (row: number, col: number, updateFunc: (gridItem: GridItem) => GridItem) => void;
  initGrid: () => void;
  getGridItem: (row: number, col: number) => GridItem | undefined;
  getMatchingGridItems: (filter: (item: GridItem) => boolean) => GridItem[];
  gridDimensions: number[];
  updateRandomGridItems: (numItems: number, updateFunc: (gridItem: GridItem) => GridItem, filter: (gridItem: GridItem) => boolean) => void;
  tileWidth: number;
  getPopulation: () => number;
};

export const GameboardContext = React.createContext<GameboardContextType>({
  grid: [],
  updateGridItem: () => {},
  initGrid: () => {},
  getGridItem: () => {return undefined},
  getMatchingGridItems: () => {return []},
  gridDimensions: gridDimensions,
  updateRandomGridItems: () => {},
  tileWidth: tileWidth,
  getPopulation: () => 0,
});

export const GameboardProvider = ({ children }: { children: ReactNode }) => {
  const [grid, setGrid] = React.useState<GridItem[][]>([]);

  const verifyGridItem = (gridItem: GridItem) => {
    if (gridItem.isWater) {
      gridItem.inundation = 0;
      gridItem.building = undefined;
    }
    if (gridItem.building?.health) {
      if (gridItem.building.health <= 0) {
        gridItem.building = undefined;
      }
    }
    return gridItem;
  }

  const getAdjacentTiles = (row: number, col: number) => {
    const surroundingTiles = [
      { x: col - 1, y: row },
      { x: col + 1, y: row },
      { x: col, y: row - 1 },
      { x: col, y: row + 1 },
    ];
    return surroundingTiles.filter((tile) => {
      return tile.x >= 0 && tile.x < gridDimensions[0] && tile.y >= 0 && tile.y < gridDimensions[1];
    });
  }

  const getSurroundingTiles = (row: number, col: number) => {
    const surroundingTiles = [
      { x: col - 1, y: row },
      { x: col + 1, y: row },
      { x: col, y: row - 1 },
      { x: col, y: row + 1 },
      { x: col - 1, y: row - 1 },
      { x: col + 1, y: row - 1 },
      { x: col - 1, y: row + 1 },
      { x: col + 1, y: row + 1 },
    ];
    return surroundingTiles.filter((tile) => {
      return tile.x >= 0 && tile.x < gridDimensions[0] && tile.y >= 0 && tile.y < gridDimensions[1];
    });
  }

  const updateGridItemAdjacencyCache = (row: number, col: number, tempGrid?: GridItem[][]) => {
    const gridToUse = tempGrid || grid;
    const adjacentTiles = getAdjacentTiles(row, col);
    let adjacentToWater = false;
    let adjacentToPopulation = false;
    adjacentTiles.forEach((tile) => {
      if (gridToUse[tile.y][tile.x].isWater) {
        adjacentToWater = true;
      }
      if (gridToUse[tile.y][tile.x].building?.population) {
        adjacentToPopulation = true;
      }
    });
    return { adjacentToWater, adjacentToPopulation };
  }

  const updateGridItemSurroundingCache = (row: number, col: number, tempGrid?: GridItem[][]) => {
    const gridToUse = tempGrid || grid;
    const surroundingTiles = getSurroundingTiles(row, col);
    let nextToWater = false;
    let nextToPopulation = false;
    surroundingTiles.forEach((tile) => {
      if (gridToUse[tile.y][tile.x].isWater) {
        nextToWater = true;
      }
      if (gridToUse[tile.y][tile.x].building?.population) {
        nextToPopulation = true;
      }
    });
    return { nextToWater, nextToPopulation };
  }

  const updateGridItem = (row: number, col: number, updateFunc: (gridItem: GridItem) => GridItem) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = {
        ...verifyGridItem(updateFunc(prevGrid[row][col])),
        x: col,
        y: row,
      };

      //update surrounding cache on surrounding tiles
      const surroundingTiles = getSurroundingTiles(row, col);
      surroundingTiles.forEach((tile) => {
        newGrid[tile.y][tile.x] = {
          ...newGrid[tile.y][tile.x],
          cache: {...newGrid[tile.y][tile.x].cache, ...updateGridItemSurroundingCache(tile.y, tile.x)},
        };
      });
      //update adjacency cache on adjacent tiles
      const adjacentTiles = getAdjacentTiles(row, col);
      adjacentTiles.forEach((tile) => {
        newGrid[tile.y][tile.x] = {
          ...newGrid[tile.y][tile.x],
          cache: {...newGrid[tile.y][tile.x].cache, ...updateGridItemAdjacencyCache(tile.y, tile.x)},
        };
      });

      return newGrid;
    });
  };

  const getGridItem = (row: number, col: number) => {
    return grid[row][col];
  }

  const getMatchingGridItems = useCallback((filter: (item: GridItem) => boolean) => {
    const matchingItems: GridItem[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (filter(item)) {
          matchingItems.push(item);
        }
      });
    });
    return matchingItems;
  }, [grid]);

  const updateRandomGridItems = (numItems: number, updateFunc: (gridItem: GridItem) => GridItem, filter: (gridItem: GridItem) => boolean = () => true) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const randomItems = getRandomTiles({ grid: newGrid, numItems, filter });
      randomItems.forEach((item) => {
        newGrid[item.y][item.x] = {
          ...updateFunc(item),
          x: item.x,
          y: item.y,
        };
      });
      return newGrid;
    });
  }

  const getPopulation = () => {
    return grid.reduce((acc, row) => {
      return acc + row.reduce((acc, item) => {
        if (item.building?.population && item.building?.constructionTurns === 0) {
          return acc + item.building.population;
        }
        return acc;
      }, 0);
    }, 0);
  }

  const initGrid = () => {
    let newGrid = generateTerrain({ landInset: 2, waterInset: 2, gridDimensions });

    newGrid = generateVillage({population: 1, grid: newGrid});

    //update cache
    const newGridWithCache = [...newGrid];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        newGridWithCache[rowIndex][colIndex] = {
          ...item,
          cache: {
            ...updateGridItemSurroundingCache(rowIndex, colIndex, newGridWithCache),
            ...updateGridItemAdjacencyCache(rowIndex, colIndex, newGridWithCache),
          },
        };
      });
    });

    setGrid(newGridWithCache);
  }

  const contextValue = { grid, updateGridItem, initGrid, getGridItem, getMatchingGridItems, gridDimensions, updateRandomGridItems, tileWidth, getPopulation };

  return (
    <GameboardContext.Provider value={contextValue}>
      {children}
    </GameboardContext.Provider>
  );
};

export const useGameboardContext = () => {
  return React.useContext(GameboardContext);
};
