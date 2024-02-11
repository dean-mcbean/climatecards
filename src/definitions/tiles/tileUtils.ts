import { Tile, TileGrid } from "./tileDefinitions";

export const applyToTiles = (tiles: TileGrid, setTiles: (tiles: TileGrid) => void, fn: (tile: Tile) => Tile) => {
  const newTiles = [...tiles];
  newTiles.forEach((row) => {
    row.forEach((tile) => {
      newTiles[tile.y][tile.x] = fn(tile);
    });
  });
  setTiles(newTiles);
}

export const getAdjacentTilesFromTiles = (tiles: TileGrid, tile: Tile) => {
  const adjacentTiles = [];
  const { x, y } = tile;
  const directions = [-1, 0, 1];
  const height = tiles.length;
  const width = tiles[0].length;

  for (let dx of directions) {
    for (let dy of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !(dx === 0 && dy === 0)
      ) {
        adjacentTiles.push(tiles[newX][newY]);
      }
    }
  }

  return adjacentTiles;
};

export const checkAnyTilesMatch = (tiles: TileGrid, test: (tile: Tile) => boolean) => {
  return tiles.some((row) => row.some((tile) => test(tile)));
}

export const checkAllTilesMatch = (tiles: TileGrid, test: (tile: Tile) => boolean) => {
  return tiles.every((row) => row.every((tile) => test(tile)));
}