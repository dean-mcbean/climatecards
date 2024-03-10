// hehe

import { Building } from "../../types/gameboard"
import { buildingPresets } from "./presets";


export const buildingBuilder = (type: Building['type'], buildingOverride?: Partial<Building>): Building => {
  const matchingPreset = buildingPresets[type];
  return {
    ...matchingPreset,
    ...buildingOverride,
  }
}