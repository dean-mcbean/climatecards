import { Card } from "../../types/cards"
import { CardPresetKey, cardPresets } from "./presets"

let cardCount = 0;

const buildCardFromPresetKey = (presetKey: CardPresetKey): Card => {
  cardCount++;
  return {
    ...cardPresets[presetKey],
    id: cardCount,
    presetKey
  }
}

export const randomCardPreset = (): Card => {
  const keys = Object.keys(cardPresets) as CardPresetKey[]
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return buildCardFromPresetKey(randomKey)
}

export const cardBuilder = (preset: CardPresetKey): Card => {
  return buildCardFromPresetKey(preset)
}

export const getCardPresetKeys = () => {
  return Object.keys(cardPresets) as CardPresetKey[];
}

export const copyCard = (card: Card): Card => {
  cardCount++;
  return {
    ...card,
    id: cardCount
  }
}