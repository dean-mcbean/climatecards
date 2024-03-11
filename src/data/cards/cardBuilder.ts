import { Card } from "../../types/cards"
import { cardPresets } from "./presets"

let cardCount = 0;

const buildCardFromPreset = (preset: Card): Card => {
  cardCount++;
  return {
    ...preset,
    id: cardCount
  }
}

export const randomCardPreset = (): Card => {
  const keys = Object.keys(cardPresets)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return buildCardFromPreset(cardPresets[randomKey])
}