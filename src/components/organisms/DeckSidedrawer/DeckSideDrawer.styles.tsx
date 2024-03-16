import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const deckSideDrawerOverlay = (expanded: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #13182f4d;
  z-index: 999;
  pointer-events: ${expanded ? 'all' : 'none'};
  opacity: ${expanded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  will-change: z-index, opacity;
`;

export const deckSideDrawer = (expanded: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: ${expanded ? '60%' : '0'};
  min-width: ${expanded ? '300px' : '0'};
  height: 100%;
  background-color: #29394a;
  border-right: 1px solid #006d81;
  box-shadow: 0px 0px 20px 0px #00012d40;
  transition: width 0.3s ease-in-out, min-width 0.3s ease-in-out;
  will-change: width, min-width;
  z-index: 1000;
  overflow: hidden;
  color: white;
  padding: 1rem;

  > h1 {
    font-size: 3rem;
    margin-bottom: 0;
    margin-top: 0;
    color: #b7cfed8a;
  }

  > p {
    font-style: italic;
    margin-top: 0;
    letter-spacing: 1px;
    color: #b7cfed8a;
  }
`;

export const deckSideDrawerCards = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const deckSideDrawerCloseButton = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 2rem;
  color: #b7cfed8a;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #FFF;
  }
`;