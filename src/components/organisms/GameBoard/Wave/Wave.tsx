/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { useGameContext } from "../../../../context/GameContextProvider/GameContextProvider";
import {  innerWave, waveContainer } from "./Wave.styles";
import { useVFXContext } from "../../../../context/VFXContextProvider/VFXContextProvider";

export function Wave ({waveSpeed, row, wave_id}: {waveSpeed: number, row: number, wave_id: string | number}) {
  //console.log("Wave", waveSpeed, row)
  const { day, time, forceAlterFunding, addWaterLevel, cityDimensions, removeWave } = useGameContext();
  const { createMoneyNotif } = useVFXContext();
  const landed = useRef(false);
  const startTime = useRef(day + time);

  const waveRef = useRef<HTMLDivElement>(null);

  const [wavePosition, setWavePosition] = useState(1);

  useEffect(() => {
    if (row == 0 && wave_id == 0) console.log("Wave", day + time, wavePosition - waveSpeed * (day + time - startTime.current))
    setWavePosition(1 - waveSpeed * (day + time - startTime.current));

    if (wavePosition < 0 && landed.current === false) {
      // Landing on the beach
      console.log("Landed", row, cityDimensions.width-1, 1)
      addWaterLevel(row, cityDimensions.width-1, 1);
      removeWave(row, wave_id);
      landed.current = true;
    }
  }, [day, time]);




  return (
    <div ref={waveRef} css={waveContainer(wavePosition)}>
      <div css={innerWave}></div>
    </div>
  );
}