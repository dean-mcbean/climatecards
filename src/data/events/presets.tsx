import { HazardEvent } from "../../types/events";
import { WiRain } from "react-icons/wi";

export const hazardEventPresets: {[key: string]: HazardEvent} = {
  "storm": {
    id: 1,
    type: "storm",
    description: "A few days of heavy waves, and strong winds.",
    name: "Storm",
    effect: "This is a storm",
    start_turn: 0,
    end_turn: 0,
    icon: <WiRain />
  },
}