import { css, keyframes } from "@emotion/react";
import { Bezier } from "bezier-js";

const flyingAnimation = (start_location: { x: number; y: number }, end_location: { x: number; y: number }) => {
  const minY = Math.min(start_location.y, end_location.y);
  const randomXOffset = Math.random() * 150 - 75;
  const randomYOffset = Math.random() * 80 - 40;
  const b = new Bezier([
    start_location.x,
    start_location.y,
    start_location.x + randomXOffset,
    minY - 150 + randomYOffset,
    end_location.x + randomXOffset,
    minY - 150 + randomYOffset,
    end_location.x,
    end_location.y,
  ]);

  let keyframesString = "";
  for (let t = 0; t <= 1; t += 0.1) {
    const point = b.get(t);
    keyframesString += `
      ${Math.round(t * 100)}% {
        transform: translate(${point.x}px, ${point.y}px) translate(-50%, -50%);
        ${t === 0 || t === 1 ? "opacity: 0;" : "opacity: 1;"}
      }
    `;
  }

  return keyframes`${keyframesString}`;
};

export const flyingCoinContainer = (startposition: { x: number; y: number }, endposition: { x: number; y: number }, duration: number) => css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 48px;
  height: 48px;
  will-change: transform, opacity;
  z-index: 100;
  animation: ${flyingAnimation(startposition, endposition)} ${duration / 1000}s linear 1 both;
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
  color: #b15b00BB;
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