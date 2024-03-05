import { Building } from "../../types/gameboard";




export const buildingPresets: Record<Building['type'], Building> = {
  "house": {
    type: "house",
    health: 2,
    maxHealth: 2,
  },
  "school": {
    type: "school",
    health: 3,
    maxHealth: 3,
  },
  "hospital": {
    type: "hospital",
    health: 4,
    maxHealth: 4,
  },
  "office": {
    type: "office",
    health: 3,
    maxHealth: 3,
  }
}