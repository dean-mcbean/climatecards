import { Card } from "../../types/cards"
import { CardPresetKey, cardPresets } from "./presets"

let cardCount = 0;

const buildCardFromPreset = (preset: Card): Card => {
  cardCount++;
  return {
    ...preset,
    id: cardCount
  }
}

export const randomCardPreset = (): Card => {
  const keys = Object.keys(cardPresets) as CardPresetKey[]
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return buildCardFromPreset(cardPresets[randomKey])
}

export const cardBuilder = (preset: CardPresetKey): Card => {
  return buildCardFromPreset(cardPresets[preset])
}

export const copyCard = (card: Card): Card => {
  cardCount++;
  return {
    ...card,
    id: cardCount
  }
}