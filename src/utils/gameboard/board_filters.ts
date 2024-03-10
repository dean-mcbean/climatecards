import { GridItem } from "../../types/gameboard";
import { getRandomItem } from "../generic";

interface NeighbouringTilesProps {
  gridItem: GridItem;
  grid: GridItem[][];
  filter: (tile: GridItem) => boolean;
}

export const getNeighbouringTiles = ({gridItem, grid, filter = ()=>true}: NeighbouringTilesProps): GridItem[] => {
  const { x, y } = gridItem;
  const neighbours = [
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y - 1 },
    { x: x, y: y + 1 },
  ];
  return neighbours
    .map((coords) => grid[coords.y]?.[coords.x])
    .filter((tile) => tile !== undefined && filter(tile));
}


export function getRandomTiles({grid, numItems, filter = ()=>true}: {grid: GridItem[][], numItems: number, filter?: (tile: GridItem) => boolean}): GridItem[] {
  const list = grid.flat().filter(filter);
  return getRandomItem({list, numItems});
}
