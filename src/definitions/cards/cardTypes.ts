import { GameContextType } from "../../context/GameContextProvider/GameContextProvider";

export type Card = {
  id: string;
  title: string;
  flavortext: string;
  effecttext: string;
  type: string;
  cost: number;
  action?: (gameContext: GameContextType) => void;
  validCheck?: (gameContext: GameContextType) => boolean;
}

export type CardList = Card[]
