import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Cursor } from "../components/molecules/Cursor/Cursor";
import { useGameboardContext } from "./GameboardProvider";
import { GridItem } from "../types/gameboard";
import { FlyingCoin, FlyingCoinProps } from "../components/atoms/FlyingCoin/FlyingCoin";

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
  createFlyingCoins: (coinlist: Partial<FlyingCoinProps>[]) => void;
  createFundingFlyingCoins: () => void;
  deckSideDrawerExpanded: boolean;
  setDeckSideDrawerExpanded: (expanded: boolean) => void;
  unlockCardPanelExpanded: boolean;
  setUnlockCardPanelExpanded: (expanded: boolean) => void;
};

type Position = { x: number, y: number };
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
  mouseTracking: false,
  createFlyingCoins: () => {},
  createFundingFlyingCoins: () => {},
  deckSideDrawerExpanded: false,
  setDeckSideDrawerExpanded: () => {},
  unlockCardPanelExpanded: false,
  setUnlockCardPanelExpanded: () => {},
});

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const hoveredTileRef = useRef<GridItem | null>(null);
  const [hoveredTile, setHoveredTileState] = useState<GridItem | null>(null);

  const [deckSideDrawerExpanded, setDeckSideDrawerExpanded] = useState(false);
  const [unlockCardPanelExpanded, setUnlockCardPanelExpanded] = useState(false);

  // Known positions
  const [gameboardTilePositions, setGameboardTilePositions] = useState<GameboardTilePositions>([]);
  const [fundingPosition, setFundingPosition] = useState<Position | null>(null);

  // Game stuff
  const [gameboardTileSelectionFilter, setGameboardTileSelectionFilter] = useState(() => (gridItem: GridItem) => true);
  const [onGameboardTileSelection, setOnGameboardTileSelection] = useState(() => (gridItem: GridItem | null) => {});
  const [mouseTracking, setMouseTracking] = useState(false);
  const [cursorIcon, setCursorIcon] = useState<UIContextType['cursorIcon']>(null);
  const [flyingCoins, setFlyingCoins] = useState<FlyingCoinProps[]>([]);

  const setHoveredTile = (gridItem: GridItem | null) => {
    hoveredTileRef.current = gridItem;
    setHoveredTileState(gridItem);
  }

  const { gridDimensions, tileWidth, getMatchingGridItems } = useGameboardContext();

  const triggerGameboardTileSelectionEvent = useCallback(() => {
    const gridItem = hoveredTileRef.current;
    console.log('triggerGameboardTileSelectionEvent', gridItem);
    onGameboardTileSelection(gridItem);

  }, [onGameboardTileSelection, hoveredTile]);

  const createFlyingCoins = (coinlist: Partial<FlyingCoinProps>[]) => {
    for (let i = 0; i < coinlist.length; i++) {
      if (flyingCoins.length + i + 1 > 16) break;
      coinlist[i].coin_id = `${Date.now()}-${i}`;
      if (!coinlist[i].start_location && fundingPosition) coinlist[i].start_location = fundingPosition;
      if (!coinlist[i].end_location && fundingPosition) coinlist[i].end_location = fundingPosition;
      if (!coinlist[i].duration) coinlist[i].duration = 800;
      coinlist[i].onFinish = (id) => {
        setFlyingCoins((coins) => {
          console.log(coins, id)
          return coins.filter((coin) => coin.coin_id !== id);
        });
      }
    }
    coinlist = coinlist.splice(0, 16 - flyingCoins.length);
    setFlyingCoins((coins) => {
      return [...coins, ...coinlist as FlyingCoinProps[]];
    });
  }

  const createFundingFlyingCoins = useCallback(() => {
    // Create flying coins from every populated gameboard tile to funding
    if (!fundingPosition) return
    const newFlyingCoins: Partial<FlyingCoinProps>[] = [];
    const matchingGridItems = getMatchingGridItems((gridItem) => !!gridItem.building?.population && gridItem.building?.population > 0 && !gridItem.building?.isUnderConstruction);
    matchingGridItems.forEach((gridItem) => {
      const pos = document.querySelector(`[aria-rowindex="${gridItem.y}"][aria-colindex="${gridItem.x}"]`)?.getBoundingClientRect();
      if (pos && gridItem.building?.population) {
        for (let i = 0; i < gridItem.building?.population; i++) {
          newFlyingCoins.push(
            {
              start_location: { x: pos.left + tileWidth / 2, y: pos.top + tileWidth / 2},
            }
          );
        }
      }
    });
    createFlyingCoins(newFlyingCoins);
  }, [fundingPosition, tileWidth, getMatchingGridItems]);

  // Update positions
  const updateGameboardTilePositions = useCallback((filter?: (gridItem: GridItem) => boolean) => {
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

  useEffect(() => {
    updateGameboardTilePositions();
  }, [updateGameboardTilePositions]);

  const updateFundingPosition = useCallback(() => {
    const pos = document.querySelector(`#funding`)?.getBoundingClientRect();
    if (pos) {
      setFundingPosition({ x: pos.left + pos.width / 2, y: pos.top + pos.height / 2 });
    }
  }, [document]);

  useEffect(() => {
    updateFundingPosition();
  }, [updateFundingPosition]);

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
    setHoveredTile,
    createFlyingCoins,
    createFundingFlyingCoins,
    deckSideDrawerExpanded,
    setDeckSideDrawerExpanded,
    unlockCardPanelExpanded,
    setUnlockCardPanelExpanded
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
      <Cursor onClick={triggerGameboardTileSelectionEvent} />
      { flyingCoins.map((coin, index) => {
        return <FlyingCoin key={coin.coin_id} coin_id={coin.coin_id} start_location={coin.start_location} end_location={coin.end_location} duration={coin.duration} onFinish={coin.onFinish}/>;
      })}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return React.useContext(UIContext);
};
