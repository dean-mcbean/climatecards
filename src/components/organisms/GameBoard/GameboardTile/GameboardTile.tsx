/** @jsxImportSource @emotion/react */

import { useTimeContext } from "../../../../context/TimeProvider";
import { GridItem } from "../../../../types/gameboard";
import { GameboardTileContainer, buildingContainer, buildingHealth, buildingHealthPip, buildingShadow, gameboardTile, gameboardTileDepth, inundationContainer, inundationCountdown, warningContainer, waveContainer } from "./GameboardTile.styles";
import { FaHouse } from 'react-icons/fa6';
import { MdTsunami } from "react-icons/md";
import { MdOutlineWaves } from "react-icons/md";
import { GiEdgeCrack } from "react-icons/gi";
import { useHazardContext } from "../../../../context/HazardProvider";
import { useEffect } from "react";

export const GameboardTile = ({gridItem}: {gridItem: GridItem}) => {

  const { turn } = useTimeContext();
  const { resolveGridItemWarning, reduceInundation, reduceBuildingHealth } = useHazardContext();

  if (gridItem.warning) console.log(gridItem.warning);
  const building = gridItem.building ? (
    <div css={buildingContainer}>
      <div css={buildingHealth(gridItem)}>
        {gridItem.building.maxHealth && 
        Array.from({ length: gridItem.building.maxHealth }, (_, index) => (
          <div key={index} css={buildingHealthPip(gridItem, index)} />
        ))}
      </div>
      {gridItem.building.type == 'house' ? <FaHouse /> : null}
      <div css={buildingShadow(gridItem)}></div>
    </div>
  ) : null;

  const wave = gridItem.waveStrength ? (
    <div key={turn} css={waveContainer}>
      <MdTsunami />
    </div>
  ) : null;

  const inundation =  (
    <div css={inundationContainer(gridItem.inundation)}>
      <div css={inundationCountdown(gridItem.inundation)}>{gridItem.inundation}</div>
    </div>
  );
  
  let warning = gridItem.warning ? (
    <div css={warningContainer(gridItem.warning)}>
      {gridItem.warning.type == 'flooding' ? <MdOutlineWaves /> : gridItem.warning.type == 'landslide' ? <GiEdgeCrack /> : null}
    </div>
  ) : null;

  // End the warning if it's the current turn
  if (gridItem.warning) {
    console.log(gridItem.warning);
    if (gridItem.warning.endTurn === turn) {
      console.log('remove warning');
      resolveGridItemWarning(gridItem);
      warning = null;
    }
  }

  // Daily checks
  useEffect(() => {
    if (gridItem.warning) {
      if (gridItem.warning.endTurn === turn) {
        resolveGridItemWarning(gridItem);
      }
    }
    if (gridItem.inundation) {
      if (gridItem.inundation === 1) {
        reduceBuildingHealth(gridItem);
      }
      reduceInundation(gridItem);
    }
  }, [turn]);

  return (
    <div css={GameboardTileContainer(gridItem)}>
      <div css={gameboardTile(gridItem)}>
        {wave}
        {building}
        {inundation}
        {warning}
      </div>
      <div css={gameboardTileDepth(gridItem)}>
      </div>
    </div>
  );
};