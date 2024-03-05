/** @jsxImportSource @emotion/react */

import React from 'react';
import { weatherEffectOverlay } from './WeatherEffectOverlay.styles';
import { useTimeContext } from '../../../context/TimeProvider';

export type WeatherEffectOverlayProps = {
  opacity: string;
  zIndex: string;
}

export const WeatherEffectOverlay = (props: WeatherEffectOverlayProps) => {

  const { currentEvent } = useTimeContext();

  return (
    <div css={weatherEffectOverlay(props, currentEvent)} />
  );
}