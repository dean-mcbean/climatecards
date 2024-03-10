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
};

export const GameloopContext = React.createContext<GameloopContextType>({
  gameState: { status: "idle" },
  funding: 0,
  startBuildingGameState: () => {},
});

export const GameloopProvider = ({ children }: { children: ReactNode }) => {
  const { turn } = useTimeContext();
  const { initDeck, drawCard } = useCardContext();
  const {initGrid, updateGridItem, getMatchingGridItems} = useGameboardContext();
  const { setMouseTracking, setCursorIcon, setGameboardTileSelectionFilter, setOnGameboardTileSelection } = useUIContext();
  const [gameState, setGameState] = React.useState<GameloopState>({
    status: "idle",
  });
  const [funding, setFunding] = React.useState(0);


  const startBuildingGameState = useCallback((building: Building, activeCard: Card, gridItemFilter?: (gridItem: GridItem) => boolean) => {
    setGameState({ status: "building", building, activeCard });
    if (gridItemFilter) {
      console.log('icon', building.icon, gridItemFilter);
      setGameboardTileSelectionFilter(() => gridItemFilter);
    }
    setMouseTracking(true);
    setCursorIcon(building.icon);
    setOnGameboardTileSelection(() => (gridItem: GridItem | null) => {
      if (gridItem) {
        updateGridItem(gridItem.y, gridItem.x, (gridItem) => {
          return { ...gridItem, building };
        });
        setGameState({ status: "idle" });
        setMouseTracking(false);
        setCursorIcon(null);
      }
    });
    console.log("Building", building, "started");
  }, [setGameState, setMouseTracking, setCursorIcon, setGameboardTileSelectionFilter]);

  // Initialize game state here
  useEffect(() => {
    initGrid();
    initDeck();
    drawCard();
    drawCard();
  }, []);

  useEffect(() => {
    // Core gameloop logic here
    
    // Earn Funding
    let funding = 0;
    getMatchingGridItems((gridItem) => gridItem.building?.type === "house").forEach((gridItem) => {
      funding += 1;
    });
    setFunding((prev_funding) => funding + prev_funding);

  }, [turn]);

  const contextValue = { 
    gameState, 
    startBuildingGameState,
    funding
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
