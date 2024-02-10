/** @jsxImportSource @emotion/react */

import { useMemo } from "react";
import { Tile, useGameContext } from "../../../../context/GameContextProvider/GameContextProvider";
import { buildingContainer, tileContainer, tileSelector, tileWaterLevel } from "./Tile.styles";

export function Tile ({tile}: {tile: Tile}) {

  const { validSelectableTileFilter, isUserSelectingTile, runAfterSelectingTile } = useGameContext();

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
    <div css={tileContainer} onClick={handleClick}>
      {showTileSelection && <div css={tileSelector}><div></div></div>}
      <div css={tileWaterLevel(tile.waterLevel)}></div>
      <div css={buildingContainer(tile.building)}>
        {tile.building?.type}
      </div>
    </div>
  );
}