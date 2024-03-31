import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const deckSideDrawerOverlay = (expanded: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #13182f80;
  z-index: 999;
  pointer-events: ${expanded ? 'all' : 'none'};
  opacity: ${expanded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  will-change: z-index, opacity;
`;

export const deckSideDrawer = (expanded: boolean) => css`
  position: fixed;
  top: 5%;
  left: 5%;
  bottom: 5%;
  right: 5%;
  background-color: #0f5a71;
  border-right: 1px solid #006d81;
  box-shadow: 0px 0px 20px 0px #00012d40;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  will-change: width, min-width;
  z-index: 1000;
  overflow: hidden;
  color: white;
  padding: 1rem 2rem;
  border-radius: 24px;
  pointer-events: ${expanded ? 'all' : 'none'};
  opacity: ${expanded ? 1 : 0};
  transform: ${expanded ? 'translateY(0)' : 'translateY(100px)'};
  transform-origin: bottom left;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 3rem;
    margin-bottom: 0;
    margin-top: 0;
    color: white;
  }

  > p {
    font-style: italic;
    margin-top: 0;
    letter-spacing: 1px;
    color: white;
  }
`;

export const deckSideDrawerCards = css`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  overflow-y: auto; 
  flex-grow: 1;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: start;
  justify-items: stretch;

  > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-grow: 1;
    flex-wrap: wrap;

    > h2 {
      width: 100%;
    }
  }
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