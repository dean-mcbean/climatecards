import { FaHouse } from "react-icons/fa6";

import { Building } from "../../types/gameboard";

export const buildingPresets: Record<Building['type'], Building> = {
  "house": {
    type: "house",
    health: 2,
    maxHealth: 2,
    icon: <FaHouse />,
    constructionTurns: 3,
    maxConstructionTurns: 3,
  },
}