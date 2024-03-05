// hehe

import { Building } from "../../types/gameboard"
import { buildingPresets } from "./presets";


export const buildingBuilder = (type: Building['type'], isRaised?: boolean, health?: number): Building => {
  const matchingPreset = buildingPresets[type];
  return {
    type,
    isRaised: isRaised === undefined ? matchingPreset.isRaised : isRaised,
    health: health === undefined ? matchingPreset.health : health,
    maxHealth: matchingPreset.maxHealth
  }
}