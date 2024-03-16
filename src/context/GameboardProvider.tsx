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

  const updateGridItem = (row: number, col: number, updateFunc: (gridItem: GridItem) => GridItem) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = {
        ...updateFunc(prevGrid[row][col]),
        x: col,
        y: row,
      };
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
    const newGrid = generateTerrain({ landInset: 2, waterInset: 2, gridDimensions });

    setGrid(generateVillage({population: 1, grid: newGrid}));
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
