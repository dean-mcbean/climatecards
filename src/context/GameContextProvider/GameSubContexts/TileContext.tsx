import { useEffect, useState } from "react";
import { tileIsEmpty } from "../../../definitions/cards/cardUtils";
import { Building, Tile, TileGrid } from "../../../definitions/tiles/tileDefinitions"
import { getAdjacentTiles as utilGetAdjacentTiles } from "../../../definitions/tiles/tileUtils";

const cityDimensions = {width: 4, height: 4};

export const getCityDimensions = () => {
  return cityDimensions;
}

export type TileContextType = {
  addBuilding: (x: number, y: number, building: Building) => void
  tiles: TileGrid
  getAdjacentTiles: (tile: Tile) => Array<Tile>
  cityDimensions: {width: number, height: number}
}

export const defaultTileContext: TileContextType = {
  addBuilding: (x: number, y: number, building: Building) => {},
  tiles: [],
  cityDimensions,
  getAdjacentTiles: (tile: Tile) => [],
}

export const TileContext = (): TileContextType => {
  
  // TILES
  const [tiles, setTiles] = useState<TileGrid>([]);

  useEffect(() => {
    const newCityTiles = new Array(cityDimensions.width).fill(0).map((_, x) => new Array(cityDimensions.height).fill(0).map((_, y) => ({x, y, waterLevel: 0})));
    setTiles(newCityTiles);
  }, []);

  const addBuilding = (x: number, y: number, building: Building) => {
    const newCityTiles = [...tiles];
    newCityTiles[x][y].building = building;
    setTiles(newCityTiles);
  }

  const getAdjacentTiles = (tile: Tile) => utilGetAdjacentTiles(tiles, tile)

  return {
    tiles,
    cityDimensions,
    addBuilding,
    getAdjacentTiles,
  }
}