import { css, keyframes } from "@emotion/react";

export const flyingCoinContainer = (position: { x: number; y: number }, finished: boolean) => css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 24px;
  height: 24px;
  transform: translate(${position.x - 12}px, ${position.y - 12}px) rotate(${position.y * 4}deg);
  will-change: transform, opacity;
  z-index: 100;
  opacity: ${finished ? 0 : 1};
`;

const expand = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

export const flyingCoinScaleWrapper = css`
  width: 100%;
  height: 100%;
  background-color: #ffba1f;
  color: #d27f33;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${expand} 0.2s ease-in-out both;
  transform-origin: 50% 50%;
  will-change: transform;

  svg {
    height: 100%;
    width: 100%;
  }
`;