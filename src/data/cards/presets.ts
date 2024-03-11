import { Card } from "../../types/cards";
import { GridItem } from "../../types/gameboard";
import { buildingBuilder } from "../buildings/buildingBuilder";
import { buildAction, drawCardAction, moneyAction } from "./actions";

export const cardPresets: {[key: string]: Card} = {
  "1": {
    name: "Housing Development",
    description: "Expand the community with new housing.",
    cost: 4,
    effect: "Builds a house.",
    building: buildingBuilder('house'),
    category: 'common',
    action: (contexts) => {
      buildAction(contexts, cardPresets["1"], buildingBuilder('house'), 
      (gridItem: GridItem) => {
        return !gridItem.isWater && !gridItem.building
      });
    }
  },
  "2": {
    name: "Fundraiser",
    description: "Raise funds from the community.",
    cost: 0,
    building: buildingBuilder('house'),
    effect: "Immediately gain 5 funding.",
    category: 'common',
    action: (contexts) => {
      console.log("Raising funds");
      moneyAction(contexts, cardPresets["2"], 5);
    }
  },
  "3": {
    name: "Field Research",
    description: "Study the local environment.",
    cost: 2,
    effect: "Draw a random card.",
    category: 'common',
    action: (contexts) => {
      console.log("Card 3");
      drawCardAction(contexts, cardPresets["3"]);
    }
  }
}