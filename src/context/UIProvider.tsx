import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Cursor } from "../components/molecules/Cursor/Cursor";
import { useGameboardContext } from "./GameboardProvider";
import { GridItem } from "../types/gameboard";

export type UIContextType = {
  setMouseTracking: (tracking: boolean) => void;
  hoveredTile: GridItem | null;
  setHoveredTile: (gridItem: GridItem | null) => void;
  cursorIcon: ReactNode | null;
  setCursorIcon: (icon: ReactNode | null) => void;
  setGameboardTileSelectionFilter: (filter: () => (gridItem: GridItem) => boolean) => void;
  selectableGameboardTilePositions: GameboardTilePositions;
  setOnGameboardTileSelection:(event: () => (gridItem: GridItem | null) => void) => void;
  mouseTracking: boolean;
};

type GameboardTilePositions = { x: number, y: number, gridItem: GridItem }[];

const UIContext = React.createContext<UIContextType>({
  setMouseTracking: () => {},
  setHoveredTile: () => {},
  hoveredTile: null,
  cursorIcon: null,
  setCursorIcon: () => {},
  setGameboardTileSelectionFilter: () => {},
  selectableGameboardTilePositions: [],
  setOnGameboardTileSelection: () => {},
  mouseTracking: false
});

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const hoveredTileRef = useRef<GridItem | null>(null);
  const [hoveredTile, setHoveredTileState] = useState<GridItem | null>(null);
  const [gameboardTilePositions, setGameboardTilePositions] = useState<GameboardTilePositions>([]);
  const [gameboardTileSelectionFilter, setGameboardTileSelectionFilter] = useState(() => (gridItem: GridItem) => true);
  const [onGameboardTileSelection, setOnGameboardTileSelection] = useState(() => (gridItem: GridItem | null) => {});
  const [mouseTracking, setMouseTracking] = useState(false);
  const [cursorIcon, setCursorIcon] = useState<UIContextType['cursorIcon']>(null);

  const setHoveredTile = (gridItem: GridItem | null) => {
    hoveredTileRef.current = gridItem;
    setHoveredTileState(gridItem);
  }

  const { gridDimensions, tileWidth, getMatchingGridItems } = useGameboardContext();

  const updateGameboardTilePositions = useCallback(() => {
    // Update gameboard tile positions here
    const newGameboardTilePositions:GameboardTilePositions = [];
    const matchingGridItems = getMatchingGridItems(gameboardTileSelectionFilter);
    console.log('matchingGridItems',gameboardTileSelectionFilter, matchingGridItems);
    matchingGridItems.forEach((gridItem) => {
      const pos = document.querySelector(`[aria-rowindex="${gridItem.y}"][aria-colindex="${gridItem.x}"]`)?.getBoundingClientRect();
      if (pos) {
        newGameboardTilePositions.push({ x: pos.left + tileWidth / 2, y: pos.top + tileWidth / 2, gridItem: gridItem});
      }
    });
    setGameboardTilePositions(newGameboardTilePositions);
  }, [gridDimensions, tileWidth, getMatchingGridItems, gameboardTileSelectionFilter]);

  const triggerGameboardTileSelectionEvent = useCallback(() => {
    const gridItem = hoveredTileRef.current;
    onGameboardTileSelection(gridItem);

  }, [onGameboardTileSelection, hoveredTile]);

  useEffect(() => {
    updateGameboardTilePositions();
  }, [updateGameboardTilePositions]);

  const contextValue = { 
    setMouseTracking, 
    hoveredTile: hoveredTile, 
    cursorIcon, 
    setCursorIcon, 
    setGameboardTileSelectionFilter, 
    gameboardTileSelectionFilter,
    selectableGameboardTilePositions: gameboardTilePositions,
    setOnGameboardTileSelection,
    mouseTracking,
    setHoveredTile
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
      <Cursor onClick={triggerGameboardTileSelectionEvent} />
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return React.useContext(UIContext);
};
