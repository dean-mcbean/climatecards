import React, { ReactNode, useCallback, useEffect } from "react";
import { useTimeContext } from "./TimeProvider";
import { useCardContext } from "./CardProvider";
import { useGameboardContext } from "./GameboardProvider";
import { Building, GridItem } from "../types/gameboard";
import { useUIContext } from "./UIProvider";
import { Card } from "../types/cards";


type GameloopState = {
  status: string;
  building?: Building;
  activeCard?: Card;
};

export type GameloopContextType = {
  gameState: GameloopState;
  funding: number;
  startBuildingGameState: (building: Building, activeCard: Card, filter: (gridItem: GridItem) => boolean) => void;
  addFunding: (amount: number) => void;
  trySpendFunding: (amount: number) => boolean;
};

export const GameloopContext = React.createContext<GameloopContextType>({
  gameState: { status: "idle" },
  funding: 0,
  startBuildingGameState: () => {},
  addFunding: () => {},
  trySpendFunding: () => false,
});

export const GameloopProvider = ({ children }: { children: ReactNode }) => {
  const { turn } = useTimeContext();
  const { initDeck, drawCard } = useCardContext();
  const {initGrid, updateGridItem, getPopulation} = useGameboardContext();
  const { setMouseTracking, setCursorIcon, setGameboardTileSelectionFilter, setOnGameboardTileSelection, createFundingFlyingCoins } = useUIContext();
  const [gameState, setGameState] = React.useState<GameloopState>({
    status: "idle",
  });
  const [funding, setFunding] = React.useState(0);
  const addFunding = (amount: number) => setFunding((prev_funding) => prev_funding + amount);
  const trySpendFunding = (amount: number) => {
    if (funding >= amount) {
      setFunding((prev_funding) => prev_funding - amount);
      return true;
    }
    return false;
  }


  const startBuildingGameState = useCallback((building: Building, activeCard: Card, gridItemFilter?: (gridItem: GridItem) => boolean) => {
    console.log("startBuildingGameState")
    setGameState({ status: "building", building, activeCard });
    if (gridItemFilter) {
      setGameboardTileSelectionFilter(() => gridItemFilter);
    }
    setMouseTracking(true);
    setCursorIcon(building.icon);
    setOnGameboardTileSelection(() => (gridItem: GridItem | null) => {
      console.log(gridItem, 'onGameboardTileSelection')
      if (gridItem) {
        updateGridItem(gridItem.y, gridItem.x, (gridItem) => {
          return { ...gridItem, building };
        });
        setGameState({ status: "idle" });
        setMouseTracking(false);
        setCursorIcon(null);
      }
    });
  }, [setGameState, setMouseTracking, setCursorIcon, setGameboardTileSelectionFilter, setOnGameboardTileSelection, updateGridItem]);

  // Initialize game state here
  useEffect(() => {
    initGrid();
    initDeck();
    drawCard();
    drawCard();
  }, []);

  useEffect(() => {
    // Core gameloop logic here
    drawCard();
    
    // Earn Funding
    let pop = getPopulation()
    setFunding((prev_funding) => prev_funding + pop);
    createFundingFlyingCoins();

  }, [turn]);

  const contextValue = { 
    gameState, 
    startBuildingGameState,
    funding,
    addFunding,
    trySpendFunding
  };

  return (
    <GameloopContext.Provider value={contextValue}>
      {children}
    </GameloopContext.Provider>
  );
};

export const useGameloopContext = () => {
  return React.useContext(GameloopContext);
};
