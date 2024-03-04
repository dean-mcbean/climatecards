
import { HazardEvent } from "../../types/events"
import { hazardEventPresets } from "./presets"

export const randomHazardEvent = ({start_turn, end_turn}: {start_turn: number, end_turn: number}): HazardEvent => {
  const keys = Object.keys(hazardEventPresets)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  const hazard = {... hazardEventPresets[randomKey]}
  hazard.start_turn = start_turn
  hazard.end_turn = end_turn
  return hazard
}