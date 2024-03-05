import { css } from "@emotion/react";
import { WeatherEffectOverlayProps } from "./WeatherEffectOverlay";
import { HazardEvent } from "../../../types/events";
import { palette } from "../../../theme/palette";

const weatherColor = (event: HazardEvent | null) => {
  if (event === null) {
    return 'transparent';
  }
  return event.color;
}

export const weatherEffectOverlay = (props: WeatherEffectOverlayProps, currentEvent: HazardEvent | null) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${weatherColor(currentEvent)};
  opacity: ${props.opacity};
  z-index: ${props.zIndex};
  pointer-events: none;
  box-shadow: inset 0 0 200px 200px ${weatherColor(currentEvent)};
  transition: background-color 1s ease-in-out, box-shadow 1s ease-in-out;
`;