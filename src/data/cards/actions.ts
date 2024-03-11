import { Card, CardAction } from "../../types/cards";
import { Building, GridItem } from "../../types/gameboard";
import { buildingBuilder } from "../buildings/buildingBuilder";

export const buildAction: CardAction = ({
  gameloopContext,
}, card: Card, building: Building, gridItemFilter: (gridItem: GridItem) => boolean) => {
  console.log("Building a building");
  const { startBuildingGameState } = gameloopContext;
  if (card.building) startBuildingGameState(building, card, gridItemFilter);
}

export const moneyAction: CardAction = ({
  gameloopContext,
}, card: Card, amount: number) => {
  console.log("Adding money");
  const { addFunding } = gameloopContext;
  addFunding(amount);
}

export const drawCardAction: CardAction = ({ cardContext, }, card: Card) => { 
  console.log("Drawing a card"); 
  const { drawCard } = cardContext;
   drawCard(); 
}