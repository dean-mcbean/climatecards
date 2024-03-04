import { GridItem } from "../../types/gameboard";

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