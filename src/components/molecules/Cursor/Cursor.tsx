/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useUIContext } from '../../../context/UIProvider';
import { cursorOrigin, cursorParent, cursorTilePointer, cursorTilePointerArrow, cursorTileShadow } from './Cursor.styles';
import { TiArrowSortedDown } from "react-icons/ti";
import { GridItem } from '../../../types/gameboard';
import { useGameboardContext } from '../../../context/GameboardProvider';

export type CursorProps = {
  onClick?: (gridItem: GridItem | null) => void;
}

export const Cursor = ({onClick}: CursorProps) => {

  const { setHoveredTile, cursorIcon, mouseTracking, selectableGameboardTilePositions } = useUIContext();
  const { tileWidth } = useGameboardContext();

  const mousePosition = useRef({ x: 0, y: 0 });
  const hoveredTile = useRef<GridItem| null>(null);
  const [mousePositionState, setMousePositionState] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const mouseRefEvent = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const mouseStateEvent = useCallback((e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    // Find the nearest gameboardTilePosition
    let nearestTilePosition = { x: 0, y: 0 };
    let minDistance = Number.MAX_VALUE;
    let nearestTile= null;
    hoveredTile.current = null;

  
    selectableGameboardTilePositions.forEach(({gridItem, x, y}) => {
        const distance = Math.max(
          Math.abs(mouseX - x),
          Math.abs(mouseY - y)
        );
  
        if (distance < minDistance) {
          minDistance = distance;
          nearestTilePosition = { x, y };
          nearestTile = gridItem;
        }
    });

  
    // Round the mouse position if within 50px
    if (minDistance <= tileWidth) {
      setMousePositionState(nearestTilePosition);
      hoveredTile.current = nearestTile;
      setHoveredTile(nearestTile);
    } else {
      setMousePositionState({ x: mouseX, y: mouseY });
      setHoveredTile(null);
    }
  
    setCursorVisible(true);
  }, [selectableGameboardTilePositions]);


  const triggerClickEvent = useCallback(() => {
    if (onClick) {
      onClick(hoveredTile.current);
    }
    setCursorVisible(false);
  }, [onClick, hoveredTile]);

  
  useEffect(() => {
    // Core UI logic here
    window.addEventListener("mousemove", mouseRefEvent);
    if (mouseTracking) {
      window.addEventListener("mousemove", mouseStateEvent);
      window.addEventListener("click", triggerClickEvent);
      if (!cursorVisible) {
        setMousePositionState(mousePosition.current);
        setCursorVisible(true);
      }
    }
    return () => {
      window.removeEventListener("mousemove", mouseRefEvent);
      window.removeEventListener("mousemove", mouseStateEvent);
      window.removeEventListener("click", triggerClickEvent);
    };
  }
  , [mouseTracking, mouseRefEvent, mouseStateEvent, triggerClickEvent]);


  return (
    <div css={cursorParent} >
      <div css={cursorOrigin(mousePositionState, !!hoveredTile.current)} >
        <div css={cursorTilePointer(cursorVisible && !!hoveredTile.current)}>
          {cursorIcon}
          <TiArrowSortedDown css={cursorTilePointerArrow} />
        </div>
        <div css={cursorTileShadow(cursorVisible && !!hoveredTile.current)}></div>
      </div>
    </div>
  );
}