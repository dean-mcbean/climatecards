import { FaHouse } from "react-icons/fa6";
import { BsFillHouseHeartFill } from "react-icons/bs";

import { Building } from "../../types/gameboard";

export const buildingPresets: Record<Building['type'], Building> = {
  "house": {
    type: "house",
    health: 1,
    maxHealth: 1,
    icon: <FaHouse />,
    constructionTurns: 4,
    maxConstructionTurns: 4,
    population: 2,
  },
  "bach": {
    type: "bach",
    health: 1,
    maxHealth: 1,
    icon: <BsFillHouseHeartFill />,
    constructionTurns: 6,
    maxConstructionTurns: 6,
    population: 1,
  },
}