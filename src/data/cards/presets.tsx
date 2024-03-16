import { Card } from "../../types/cards";
import { GridItem } from "../../types/gameboard";
import { buildingBuilder } from "../buildings/buildingBuilder";
import { buildAction, drawCardAction, moneyAction } from "./actions";
import { RiHandCoinFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";

export type CardPresetKey = "housing_development" | "fundraiser" | "field_research" | "bach";

export const cardPresets: Record<CardPresetKey, Card> = {
  "housing_development": {
    name: "Housing Development",
    description: "Expand the community with new housing.",
    cost: 30,
    effect: "Builds a house.",
    building: buildingBuilder('house'),
    category: 'common',
    type: 'building',
    action: (contexts, card) => {
      buildAction(contexts, card, buildingBuilder('house'), 
      (gridItem: GridItem) => {
        return !gridItem.isWater && !gridItem.building
      });
    }
  },
  "bach": {
    name: "Bach",
    description: "A cheap holiday home made with love.",
    cost: 10,
    effect: "Builds a bach.",
    building: buildingBuilder('bach'),
    category: 'common',
    type: 'building',
    action: (contexts, card) => {
      buildAction(contexts, card, buildingBuilder('bach'), 
      (gridItem: GridItem) => {
        return !gridItem.isWater && !gridItem.building
      });
    }
  },
  "fundraiser": {
    name: "Fundraiser",
    description: "Raise funds from the community.",
    cost: 0,
    effect: "Immediately gain 5 funding.",
    category: 'common',
    type: 'funding',
    icon: <RiHandCoinFill />,
    action: (contexts, card) => {
      moneyAction(contexts, card, 5);
    }
  },
  "field_research": {
    name: "Field Research",
    description: "Study the local environment.",
    cost: 4,
    effect: "Draw a random card.",
    category: 'common',
    type: 'research',
    icon: <GiNotebook />,
    action: (contexts, card) => {
      drawCardAction(contexts, card);
    }
  }
}
