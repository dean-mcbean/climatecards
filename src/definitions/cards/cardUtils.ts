import { Building, GameContextType, Tile, useGameContext } from "../../context/GameContextProvider/GameContextProvider";

export const allowUserToBuild = (context: GameContextType, building: Building, validTileFilter?: (tile: Tile) => boolean) => {
  const { getUserToSelectTile, addBuilding } = context;
  getUserToSelectTile((tile: Tile) => {
    // User has selected the tile, now add bu ilding
    addBuilding(tile.x, tile.y, building);
  }, validTileFilter);
}

export const tileIsEmpty = (tile: Tile) => {
  return !tile.building && tile.waterLevel === 0;
}
export const tileIsSeaside = (context: GameContextType) => {
  return (tile: Tile) => {
    return tile.y == context.cityDimensions.width - 1;
  }
}
export const tileIsBesideBuildingType = (context: GameContextType, buildingType: Building['type']) => {
  return (tile: Tile) => {
    return context.getAdjacentTiles(tile).some(t => t.building && t.building.type === buildingType);
  }
}