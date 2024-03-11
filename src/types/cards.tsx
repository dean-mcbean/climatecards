import { CardContextType } from "../context/CardProvider";
import { GameboardContextType } from "../context/GameboardProvider";
import { GameloopContextType } from "../context/GameloopProvider";
import { HazardContextType } from "../context/HazardProvider";
import { TimeContextType } from "../context/TimeProvider";
import { UIContextType } from "../context/UIProvider";
import { Building } from "./gameboard";


export type AllContexts = {
  cardContext: CardContextType;
  gameboardContext: GameboardContextType;
  gameloopContext: GameloopContextType;
  hazardContext: HazardContextType;
  timeContext: TimeContextType;
  uiContext: UIContextType;
};

export type Card = {
  id?: number;
  name: string;
  description: string;
  cost: number;
  effect: string;
  building?: Building;
  category: 'common' | 'produced';
  action: (contexts: AllContexts) => void;
};

export type CardAction = (contexts: AllContexts, card: Card, ...props: any[]) => void;