import { css } from "@emotion/react";
import { Building } from "../../../../context/GameContextProvider/GameContextProvider";

export const waveContainer = (wavePosition: number) => css`
  background-color: var(--blue);
  width: 20px;
  position: absolute;
  left: ${wavePosition * 100}%;
  transition: left 0.2s;
  top: -20px;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  animation: fadein 3s;

  @keyframes fadein {
    from, 50% { opacity: 0; }
    to   { opacity: 1; }
  }
` 

export const innerWave = css`
  width: 100%;
  background-color: #6d9da0;
  border-radius: 10px 10px 0 0;
  position: absolute;
  bottom: 0;
  height: 10px;
  border-radius: 10px 10px 0 0;
  z-index: 1;
`

export const innerWave2 = css`
  background-color: var(--dark-blue);
  border-radius: 10px 10px 0 0;
  position: absolute;
  bottom: 0;
  height: 8px;
  width:10px;
  left: 0;
  border-radius: 8px 8px 0 0;
  z-index: 1;
`

export const waveFoam = css`
  background-color: #ccefff36;
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 4px;
  left: 0px;
`