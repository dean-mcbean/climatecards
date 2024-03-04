/** @jsxImportSource @emotion/react */

import { GridItem } from "../../../../types/gameboard";
import { GameboardTileContainer, buildingContainer, buildingShadow, gameboardTile, gameboardTileDepth } from "./GameboardTile.styles";
import { FaHouse } from 'react-icons/fa6';


export const GameboardTile = ({gridItem}: {gridItem: GridItem}) => {


  const building = gridItem.building ? (
    <div css={buildingContainer}>
      {gridItem.building == 'house' ? <FaHouse /> : null}
      <div css={buildingShadow(gridItem)}></div>
    </div>
  ) : null;

  return (
    <div css={GameboardTileContainer(gridItem)}>
      <div css={gameboardTile(gridItem)}>
        {building}
      </div>
      <div css={gameboardTileDepth(gridItem)}>
      </div>
    </div>
  );
};