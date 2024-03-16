import { FlyingCoinProps } from "../../components/atoms/FlyingCoin/FlyingCoin";
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
  uiContext,
  cardContext,
}, card: Card, amount: number) => {
  console.log("Adding money");
  const { addFunding } = gameloopContext;
  addFunding(amount);

  const cardPos = cardContext.getCardBoundingBox(card);
  
  if (cardPos === null) return;
  const coins: Partial<FlyingCoinProps>[] = []
  for (let i = 0; i < amount; i++) {
    coins.push({
      start_location: {x: cardPos.left + cardPos.width / 2, y: cardPos.top + cardPos.height / 2},
      duration: 600
    });
  }
  uiContext.createFlyingCoins(coins);
}

export const drawCardAction: CardAction = ({ cardContext, }, card: Card) => { 
  console.log("Drawing a card"); 
  const { drawCard } = cardContext;
   drawCard(); 
}