import { Card } from "../../types/cards";

export const cardPresets: {[key: string]: Card} = {
  "1": {
    id: 1,
    name: "Coastal Housing Development",
    description: "This is card 1",
    cost: 0,
    effect: "This card does something"
  },
  "2": {
    id: 2,
    name: "Card 2",
    description: "This is card 2",
    cost: 2,
    effect: "This card does something else"
  },
  "3": {
    id: 3,
    name: "Card 3",
    description: "This is card 3",
    cost: 3,
    effect: "This card does something different"
  }
}