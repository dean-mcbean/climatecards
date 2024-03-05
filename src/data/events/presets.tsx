import { HazardEvent } from "../../types/events";
import { WiRain } from "react-icons/wi";
import { MdOutlineTsunami  } from "react-icons/md";

export const hazardEventPresets: Record<HazardEvent['type'], HazardEvent> = {
  "storm": {
    id: 1,
    type: "storm",
    description: "Beware of heavy rain and potential flooding!",
    name: "Storm",
    effect: "This is a storm",
    start_turn: 0,
    end_turn: 0,
    icon: <WiRain />,
    duration_range: [3, 6]
  },
  "tsunami": {
    id: 2,
    type: "tsunami",
    description: "Evacuate to higher ground immediately.",
    name: "Tsunami",
    effect: "This is a tsunami",
    start_turn: 0,
    end_turn: 0,
    icon: <MdOutlineTsunami  />,
    duration_range: [1, 3]
  },
}