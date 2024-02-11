/** @jsxImportSource @emotion/react */

import { useEffect, useMemo, useRef } from "react";
import { useGameContext } from "../../../../context/GameContextProvider/GameContextProvider";
import { buildingContainer, sunkContainer, sunkContent, tileContainer, tileSelector, tileWaterLevel, waterLevelContainer } from "./Tile.styles";
import { Tile } from "../../../../definitions/tiles/tileDefinitions";
import { useVFXContext } from "../../../../context/VFXContextProvider/VFXContextProvider";

export function Tile ({tile}: {tile: Tile}) {

  const { validSelectableTileFilter, isUserSelectingTile, runAfterSelectingTile, day, alterFunding, addWaterLevel, getTile, updateTile } = useGameContext();
  const { createMoneyNotif } = useVFXContext();
  const tileRef = useRef<HTMLDivElement>(null);

  // Create a money notification when a house is present
  useEffect(
    () => {
      if (day > 0) {
        if (tile.building?.income !== undefined) {
          createMoneyNotif(tile.building.income, tileRef);
          alterFunding(tile.building.income);
        }
      }
    },
    [day]
  )

  useEffect(() => {
    if (tile.waterLevel > 0 && !tile.sunk) {
      // Spread water to adjacent tiles

      // Remove some of the water level
      addWaterLevel(tile.x, tile.y, -1);
      

      // Spread Water
      if (tile.waterLevel > 1 && tile.y > 0) {
        const neighbourWaterLevel = getTile(tile.x, tile.y - 1)?.waterLevel;
        if (neighbourWaterLevel !== undefined && neighbourWaterLevel < tile.waterLevel) {
          addWaterLevel(tile.x, tile.y - 1, Math.floor((tile.waterLevel - neighbourWaterLevel) / 2));
        }
      }

      // Cost is 20% of the water level
      const cost = Math.round(-0.2 * tile.waterLevel * 100) / 100;
      alterFunding(cost);
      createMoneyNotif(cost, tileRef);
    }
  }, [day]);

  useEffect(() => {
    if (tile.waterLevel === 5 && !tile.sunk) {
      // Sink the tile
      createMoneyNotif(-1, tileRef);
      alterFunding(-1);
      updateTile(tile.x, tile.y, (tile) => ({...tile, sunk: true}));
      
    }
  }, [tile.waterLevel]);


  const showTileSelection = useMemo(() => {
    if (isUserSelectingTile && validSelectableTileFilter.current) {
      return validSelectableTileFilter.current(tile);
    }
    return false;
  }, [isUserSelectingTile, validSelectableTileFilter, tile]);

  const handleClick = () => {
    if (showTileSelection && runAfterSelectingTile.current) {
      runAfterSelectingTile.current(tile);
    }
  }
  

  return ( 
    <div ref={tileRef} css={tileContainer} onClick={handleClick}>
      {showTileSelection && <div css={tileSelector}><div></div></div>}
      <div css={waterLevelContainer}>
      {!tile.sunk && Array.from({ length: 5 }, (_, i) => (
        <div key={i} css={tileWaterLevel(i + 1, i + 1 <= tile.waterLevel)}></div>
      ))}
      </div>
      <div css={buildingContainer(tile.building)}>
        {tile.building?.type}
      </div>
      {tile.sunk && <div css={sunkContainer}>
        <div css={sunkContent}>
        </div>
      </div>}
    </div>
  );
}