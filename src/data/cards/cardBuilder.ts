import { Card } from "../../types/cards"
import { cardPresets } from "./presets"

export const randomCardPreset = (): Card => {
  const keys = Object.keys(cardPresets)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return cardPresets[randomKey]
}