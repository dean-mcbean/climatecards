import { Card, CardAction } from "../../types/cards";
import { Building, GridItem } from "../../types/gameboard";
import { buildingBuilder } from "../buildings/buildingBuilder";

export const buildAction: CardAction = ({
  gameloopContext,
}, card: Card) => {
  console.log("Building a building");
  const { startBuildingGameState } = gameloopContext;
  if (card.building) startBuildingGameState(card.building, card, (gridItem: GridItem) => {
    return !gridItem.isWater && !gridItem.building
  });
}