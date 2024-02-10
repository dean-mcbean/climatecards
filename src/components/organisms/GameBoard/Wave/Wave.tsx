/** @jsxImportSource @emotion/react */

import {  innerWave, waveContainer } from "./Wave.styles";

export function Wave ({wavePosition}: {wavePosition: number}) {
  return (
    <div css={waveContainer(wavePosition)}>
      <div css={innerWave}></div>
    </div>
  );
}