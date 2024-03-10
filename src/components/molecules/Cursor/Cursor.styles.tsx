import { css, keyframes } from "@emotion/react";
import { palette } from "../../../theme/palette";


export const cursorParent = css`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
  width: 100%;
  height: 100%;
`;

export const cursorOrigin = (mousePosition: {x: number, y: number}, tileIsHovered: boolean) => css`
  position: absolute;
  top: ${mousePosition.y}px;
  left: ${mousePosition.x}px;
  display: flex;
  width: 0;
  height: 0;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  border-radius: 50%;
  background-color: #f00;
  ${tileIsHovered ? 'transition: top 0.05s ease-in-out, left 0.05s ease-in-out;' : ''}
`;


export const cursorTileShadow = (visible: boolean) => css`
  position: absolute;
  bottom: ${visible ? -15 : 0}px;
  pointer-events: none;
  width: ${visible ? 30 : 0}px;
  height: ${visible ? 30 : 0}px;
  border-radius: 10px;
  background-color: #064;
  opacity: ${visible ? 0.1 : 0};
  transition: opacity 0.2s ease-in-out, bottom 0.2s ease-in-out, width 0.2s ease-in-out, height 0.2s ease-in-out;
`;


const pointerBobAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const cursorTilePointer = (visible: boolean) => css`
  position: absolute;
  bottom: ${visible ? -4 : -20}px;
  pointer-events: none;
  border-radius: 10px;
  opacity: ${visible ? 1 : 0};
  transition: gap 0.4s ease-in-out, bottom 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  animation: ${pointerBobAnimation} 1.5s infinite ease-in-out;

  svg {
    margin-top: -4px;
    height: 24px;
    width: 24px;
    color: ${palette.brown(500)};
  }
`;

export const cursorTilePointerArrow = css`
  height: 40px;
  width: 40px;
`;