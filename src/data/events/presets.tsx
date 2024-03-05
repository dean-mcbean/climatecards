import { HazardEvent } from "../../types/events";
import { WiRain } from "react-icons/wi";
import { MdOutlineTsunami  } from "react-icons/md";
import { RiEarthquakeLine } from "react-icons/ri";
import { palette } from "../../theme/palette";

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
    duration_range: [3, 6],
    color: palette.blue(600, 0.6)
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
    duration_range: [1, 3],
    color: palette.green(600, 0.5)
  },
  "earthquake": {
    id: 2,
    type: "earthquake",
    description: "Drop, cover, and hold on!",
    name: "Earthquake",
    effect: "This is a earthquake",
    start_turn: 0,
    end_turn: 0,
    icon: <RiEarthquakeLine />,
    duration_range: [1, 2],
    color: palette.red(400, 0.25)
  },
}