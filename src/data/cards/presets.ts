import { Card } from "../../types/cards";
import { buildingBuilder } from "../buildings/buildingBuilder";
import { buildAction } from "./actions";

export const cardPresets: {[key: string]: Card} = {
  "1": {
    id: 1,
    name: "Housing Development",
    description: "More houses, more funding!",
    cost: 2,
    effect: "Build a house",
    building: buildingBuilder('house'),
    category: 'common',
    action: (contexts) => {
      buildAction(contexts, cardPresets["1"]);
    }
  },
  "2": {
    id: 2,
    name: "Fundraiser",
    description: "Raise funds from the community.",
    cost: 0,
    effect: "This card does something else",
    category: 'common',
    action: (contexts) => {
      console.log("Raising funds");
    }
  },
  "3": {
    id: 3,
    name: "Card 3",
    description: "This is card 3",
    cost: 3,
    effect: "This card does something different",
    category: 'common',
    action: (contexts) => {
      console.log("Card 3");
    }
  }
}