/** @jsxImportSource @emotion/react */

import { useTimeContext } from "../../../../context/TimeProvider";
import { GridItem } from "../../../../types/gameboard";
import { GameboardTileContainer, buildingContainer, buildingHealth, buildingHealthPip, buildingShadow, gameboardTile, gameboardTileDepth, gridItemColor, gridItemShadowColor, inundationBuilding, inundationContainer, inundationCountdown, selectionContainer, warningContainer, waveContainer } from "./GameboardTile.styles";
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
import { TileNeighbors } from "../Gameboard";
import { getProjectedRoundedCornersFromNeighbours, getRoundedCornersFromNeighbours } from "./utils";
import { svgPathBuilder } from "../../../../utils/svg";

export const tileExtrusion = 12;

export const GameboardTile = ({gridItem, neighbors}: {gridItem: GridItem, neighbors: TileNeighbors}) => {

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

  const roundedCorners = useMemo(() => {
    return getRoundedCornersFromNeighbours(gridItem, neighbors);
  }
  , [gridItem, neighbors]);

  const projectedRoundedCorners = useMemo(() => {
    return getProjectedRoundedCornersFromNeighbours(gridItem, neighbors);
  }
  , [gridItem, neighbors]);

  const TE = tileExtrusion;
  const TW = tileWidth;

  // Build beach
  const topIsBeach = gridItem.isWater && neighbors.top && !neighbors.top.isWater;
  let beachSVG = null;
  if (topIsBeach) {
    const leftBeach = svgPathBuilder()
    const midBeach = svgPathBuilder()
    const rightBeach = svgPathBuilder()
    if (projectedRoundedCorners.topLeft) {
      leftBeach.moveTo(0, TE + TE).arc(TE, TE, 0, 0, 1, TE, TE / 2 + TE / 2).lineTo(TE, TE + TE / 2).arc(TE, TE, 0, 0, 0, 0, TE * 2 + TE / 2).fillColor('#fac2a2');
    } else {
      leftBeach.moveTo(0, TE).lineTo(TE, TE).lineTo(TE, TE + TE / 2).lineTo(0, TE + TE / 2).fillColor('#fac2a2');
    }
    midBeach.moveTo(TE, TE).lineTo(TW - TE, TE).lineTo(TW - TE, TE + TE / 2).lineTo(TE, TE + TE / 2).fillColor('#fac2a2');
    if (projectedRoundedCorners.topRight) {
      rightBeach.moveTo(TW, TE + TE).arc(TE, TE, 0, 0, 0, TW - TE, TE).lineTo(TW - TE, TE + TE / 2).arc(TE, TE, 0, 0, 1, TW, TE * 2 + TE / 2).fillColor('#fac2a2');
    } else if (neighbors.topRight?.isWater) {
      rightBeach.moveTo(TW, 0).arc(TE, TE, 0, 0, 1, TW - TE, TE).lineTo(TW - TE, TE + TE / 2).arc(TE, TE, 0, 0, 0, TW, 0).fillColor('#fac2a2');
    } else {
      rightBeach.moveTo(TW - TE, TE).lineTo(TW, TE).lineTo(TW, TE + TE / 2).lineTo(TW - TE, TE + TE / 2).fillColor('#fac2a2');
    }


    beachSVG = (
      <>
        {leftBeach.getSVGString()}
        {midBeach.getSVGString()}
        {rightBeach.getSVGString()}
      </>
    );
  }

  return (
    <div css={GameboardTileContainer(tileWidth)}>
      <div className="gameboard-tile" aria-rowindex={gridItem.y} aria-colindex={gridItem.x} css={gameboardTile(gridItem, roundedCorners)}>
        {wave}
        {building}
        {inundation}
        {warning}
        {selection}
        <svg height={tileWidth} width={tileWidth} css={{position: `absolute`, top: -TE, left: 0}}>
        {projectedRoundedCorners.topLeft && neighbors.top && 
        <>
          {svgPathBuilder().moveTo(0, 0).lineTo(TE, 0).arc(TE, TE, 0, 0, 0, 0, TE).fillColor(gridItemColor(neighbors.top)).getSVGString()}
          {svgPathBuilder().moveTo(0, TE).lineTo(TE, TE).arc(TE, TE, 0, 0, 0, 0, TE * 2).fillColor(gridItemShadowColor(neighbors.top)).getSVGString()
          }
        </>
        }
        {projectedRoundedCorners.topRight && neighbors.top &&
        <>
          {svgPathBuilder().moveTo(TW, 0).lineTo(TW - TE, 0).arc(TE, TE, 0, 0, 1, TW, TE).fillColor(gridItemColor(neighbors.top)).getSVGString()}
          {svgPathBuilder().moveTo(TW, TE).lineTo(TW - TE, TE).arc(TE, TE, 0, 0, 1, TW, TE * 2).fillColor(gridItemShadowColor(neighbors.top)).getSVGString()
          }
        </>
        }
        {projectedRoundedCorners.bottomLeft && neighbors.bottom &&
        <>
          {svgPathBuilder().moveTo(0, TW).lineTo(0, TW - TE).arc(TE, TE, 0, 0, 0, TE, TW).fillColor(gridItemColor(neighbors.bottom)).getSVGString()}
        </>
        }
        {projectedRoundedCorners.bottomRight && neighbors.bottom &&
        <>
          {svgPathBuilder().moveTo(TW, TW).lineTo(TW, TW - TE).arc(TE, TE, 0, 0, 1, TW - TE, TW).fillColor(gridItemColor(neighbors.bottom)).getSVGString()}
        </>
        }
        {beachSVG}
        </svg>
        <Countdown {...countdown}/>
      </div>
      <div css={gameboardTileDepth(gridItem, roundedCorners, neighbors.bottom)}>
        <svg height={tileWidth} width={tileWidth} css={{position: `absolute`, bottom: 0, left: 0}}>
        {roundedCorners.bottomRight && (neighbors.bottom ?
        <>
          {svgPathBuilder().moveTo(TW, TW).lineTo(TW, TW - TE).arc(TE, TE, 0, 0, 1, TW - TE, TW).fillColor(gridItemColor(neighbors.bottom)).getSVGString()}
        </>
        : neighbors.right &&
        <>
          {svgPathBuilder().moveTo(TW, TW).lineTo(TW, TW - TE).lineTo(TW - TE, TW).fillColor(gridItemShadowColor(gridItem)).getSVGString()}
        </>
        )}
        {roundedCorners.bottomLeft && (neighbors.bottom ?
        <>
          {svgPathBuilder().moveTo(0, TW).lineTo(0, TW - TE).arc(TE, TE, 0, 0, 0, TE, TW).fillColor(gridItemColor(neighbors.bottom)).getSVGString()}
        </>
        : neighbors.left &&
        <>
          {svgPathBuilder().moveTo(0, TW).lineTo(0, TW - TE).lineTo(TE, TW).fillColor(gridItemShadowColor(gridItem)).getSVGString()}
        </>
        )}
        </svg>
      </div>
    </div>
  );
};