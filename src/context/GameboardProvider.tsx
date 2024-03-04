import React, { ReactNode } from "react";
import { GridItem } from "../types/gameboard";
import { generateTerrain } from "../utils/gameboard/terrain";
import { generateVillage } from "../utils/gameboard/village";

const gridDimensions = [9, 5];

type GameboardContextType = {
  grid: GridItem[][];
  updateGridItem: (row: number, col: number, updateFunc: (gridItem: GridItem) => GridItem) => void;
  initGrid: () => void;
  getGridItem: (row: number, col: number) => GridItem | undefined;
  getMatchingGridItems: (filter: (item: GridItem) => boolean) => GridItem[];
  gridDimensions: number[];
};

export const GameboardContext = React.createContext<GameboardContextType>({
  grid: [],
  updateGridItem: () => {},
  initGrid: () => {},
  getGridItem: () => {return undefined},
  getMatchingGridItems: () => {return []},
  gridDimensions: gridDimensions,
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

  const getMatchingGridItems = (filter: (item: GridItem) => boolean) => {
    const matchingItems: GridItem[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (filter(item)) {
          matchingItems.push(item);
        }
      });
    });
    return matchingItems;
  }

  const initGrid = () => {
    const newGrid = generateTerrain({ landInset: 2, waterInset: 2, gridDimensions });

    setGrid(generateVillage({population: 4, grid: newGrid}));
  }

  const contextValue = { grid, updateGridItem, initGrid, getGridItem, getMatchingGridItems, gridDimensions };

  return (
    <GameboardContext.Provider value={contextValue}>
      {children}
    </GameboardContext.Provider>
  );
};

export const useGameboardContext = () => {
  return React.useContext(GameboardContext);
};
