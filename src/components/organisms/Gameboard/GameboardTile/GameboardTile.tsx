/** @jsxImportSource @emotion/react */

import { useTimeContext } from "../../../../context/TimeProvider";
import { GridItem } from "../../../../types/gameboard";
import { GameboardTileContainer, buildingContainer, buildingHealth, buildingHealthPip, buildingShadow, gameboardTile, gameboardTileDepth, inundationBuilding, inundationContainer, inundationCountdown, selectionContainer, warningContainer, waveContainer } from "./GameboardTile.styles";
import { MdTsunami } from "react-icons/md";
import { GiEdgeCrack } from "react-icons/gi";
import { useHazardContext } from "../../../../context/HazardProvider";
import { useEffect, useMemo, useState } from "react";
import { useGameboardContext } from "../../../../context/GameboardProvider";
import { useGameloopContext } from "../../../../context/GameloopProvider";
import { useUIContext } from "../../../../context/UIProvider";
import { ImCross } from "react-icons/im";
import { LuConstruction } from "react-icons/lu";
import { Countdown } from "../../../atoms/Countdown/Countdown";
import { palette } from "../../../../theme/palette";
import { FaDroplet } from "react-icons/fa6";


export const GameboardTile = ({gridItem}: {gridItem: GridItem}) => {

  const { turn } = useTimeContext();
  const { gameState } = useGameloopContext();
  const { reduceInundation, reduceBuildingHealth } = useHazardContext();
  const { hoveredTile, selectableGameboardTilePositions } = useUIContext();
  const {tileWidth, updateGridItem} = useGameboardContext();
  const [countdown, setCountdown] = useState({
    value: 0,
    max: 0,
    color: 'black',
    backgroundColor: 'white'
  });

  if (gridItem.warning) console.log(gridItem.warning);
  const building = gridItem.building && !gridItem.inundation ? (
    <div css={buildingContainer}>
      {!gridItem.building.isUnderConstruction && <div css={buildingHealth(gridItem)}>
        {gridItem.building.maxHealth && 
        Array.from({ length: gridItem.building.maxHealth }, (_, index) => (
          <div key={index} css={buildingHealthPip(gridItem, index)} />
        ))}
      </div>
      }
      {!gridItem.building.isUnderConstruction ? gridItem.building.icon : <LuConstruction />}
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
      <div css={inundationCountdown(gridItem.inundation)}>
      </div>
      <div css={inundationBuilding(gridItem.inundation)}>
        {gridItem.building ? 
        !gridItem.building.isUnderConstruction ? 
        gridItem.building.icon : <LuConstruction /> : null}
      </div>
    </div>
  );
  
  let warning = gridItem.warning ? (
    <div css={warningContainer(gridItem.warning)}>
      {gridItem.warning.type == 'flooding' ? <FaDroplet /> : gridItem.warning.type == 'landslide' ? <GiEdgeCrack /> : null}
    </div>
  ) : null;

  // End the warning if it's the current turn
  if (gridItem.warning) {
    console.log(gridItem.warning);
    if (gridItem.warning.endTurn === turn) {
      warning = null;
    }
  }

  const isSelectable = useMemo(() => {
    return selectableGameboardTilePositions.some((pos) => pos.gridItem.x === gridItem.x && pos.gridItem.y === gridItem.y);
  }, [selectableGameboardTilePositions]);

  // Selection decor if user is selecting
  let selection = <div css={selectionContainer('hidden')}>
  </div>;
  if (gameState.status === "building") {
    if (isSelectable){
      if (hoveredTile && hoveredTile.x === gridItem.x && hoveredTile.y === gridItem.y) {
        selection = (
        <div css={selectionContainer('highlight')}>
        </div>
        );
      } else {
        selection = (
          <div css={selectionContainer('outline')}>
          </div>
        );
      }
    } else {
      selection = (
        <div css={selectionContainer('dim')}>
          <ImCross />
        </div>
      );
    }
  }

  // Daily checks
  useEffect(() => {
    // Progress Inundation
    if (gridItem.inundation) {
      if (gridItem.inundation === 1) {
        reduceBuildingHealth(gridItem);
      }
      reduceInundation(gridItem);
    }
    // Progress Building Construction
    if (gridItem.building) {
      const isUnderConstruction = gridItem.building.isUnderConstruction;
      if (isUnderConstruction) {
        updateGridItem(gridItem.y, gridItem.x, (gridItem: GridItem) => {
          if (gridItem.building) {
            return { ...gridItem, building: { ...gridItem.building, isUnderConstruction: false } };
          }
          return gridItem;
        });
      }
    }

  }, [turn]);

  return (
    <div css={GameboardTileContainer(tileWidth)}>
      <div className="gameboard-tile" aria-rowindex={gridItem.y} aria-colindex={gridItem.x} css={gameboardTile(gridItem)}>
        {wave}
        {building}
        {inundation}
        {warning}
        {selection}
        <Countdown {...countdown}/>
      </div>
      <div css={gameboardTileDepth(gridItem)}>
      </div>
    </div>
  );
};