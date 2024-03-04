import { HazardEvent } from "../../types/events";
import { IoThunderstorm } from "react-icons/io5";

export const hazardEventPresets: {[key: string]: HazardEvent} = {
  "storm": {
    id: 1,
    type: "storm",
    description: "A storm. It's a storm.",
    name: "Storm",
    effect: "This is a storm",
    start_turn: 0,
    end_turn: 0,
    icon: <IoThunderstorm />
  },
}