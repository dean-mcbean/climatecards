import { Card } from "../../types/cards";
import { GridItem } from "../../types/gameboard";
import { buildingBuilder } from "../buildings/buildingBuilder";
import { buildAction, drawCardAction, moneyAction } from "./actions";
import { RiHandCoinFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { RiFundsFill } from "react-icons/ri";

export type CardPresetKey = "suburban_house" | "fundraiser" | "field_research" | "bach" | "donations";

export const cardPresets: Record<CardPresetKey, Card> = {
  "suburban_house": {
    name: "Suburban House",
    description: "Expand the community with new housing.",
    cost: 30,
    effect: "Inland housing.",
    building: buildingBuilder('house'),
    category: 'common',
    type: 'building',
    action: (contexts, card) => {
      buildAction(contexts, card, buildingBuilder('house'), 
      (gridItem: GridItem) => {
        return !gridItem.isWater && !gridItem.building && !gridItem.cache?.adjacentToWater
      });
    }
  },
  "bach": {
    name: "Bach",
    description: "A cheap holiday home made with love.",
    cost: 10,
    effect: "Coastal housing.",
    building: buildingBuilder('bach'),
    category: 'common',
    type: 'building',
    action: (contexts, card) => {
      buildAction(contexts, card, buildingBuilder('bach'), 
      (gridItem: GridItem) => {
        return !gridItem.isWater && !gridItem.building && gridItem.cache?.adjacentToWater
      });
    }
  },
  "donations": {
    name: "Donations",
    description: "Kind donations from the community.",
    cost: 0,
    effect: "Gain 2 funding.",
    category: 'common',
    type: 'funding',
    icon: <RiHandCoinFill />,
    action: (contexts, card) => {
      moneyAction(contexts, card, 2);
    }
  },
  "fundraiser": {
    name: "Fundraiser",
    description: "Run an organised fundraiser.",
    cost: 0,
    effect: "Gain 6 funding.",
    category: 'common',
    type: 'funding',
    icon: <RiFundsFill />,
    action: (contexts, card) => {
      moneyAction(contexts, card, 6);
    }
  },
  "field_research": {
    name: "Field Research",
    description: "Study the local environment.",
    cost: 2,
    effect: "Draw a random card.",
    category: 'common',
    type: 'research',
    icon: <GiNotebook />,
    action: (contexts, card) => {
      drawCardAction(contexts, card);
    }
  }
}
