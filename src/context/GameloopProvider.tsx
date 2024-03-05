import React, { ReactNode, useEffect } from "react";
import { useTimeContext } from "./TimeProvider";
import { useCardContext } from "./CardProvider";
import { useGameboardContext } from "./GameboardProvider";


type GameloopState = {
  status: string;
};

const initialState: GameloopState = {
  status: "",
};

const GameloopContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

export const GameloopProvider = ({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useGameloopContext();
  const { turn } = useTimeContext();
  const { initDeck, deck, drawCard } = useCardContext();
  const {initGrid} = useGameboardContext();

  // Initialize game state here
  useEffect(() => {
    initGrid();
    initDeck();
    drawCard();
    drawCard();
  }, []);

  useEffect(() => {
    // Core gameloop logic here
    

  }, [turn]);

  return (
    <GameloopContext.Provider value={{ state, dispatch }}>
      {children}
    </GameloopContext.Provider>
  );
};

export const useGameloopContext = () => {
  return React.useContext(GameloopContext);
};
