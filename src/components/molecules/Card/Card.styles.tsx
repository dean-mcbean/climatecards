import { css, keyframes } from "@emotion/react";
import { palette } from "../../../theme/palette";

const fadein = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const cardContainer = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  animation: ${fadein} 0.3s ease-in-out;
  background: linear-gradient(160deg, #598ea0 0%, #487d8f 50%, #2d5a6e 100%);
  box-shadow: inset -3px -3px 1px 3px #18434f90, inset -42px 0px 1px -21px #2d5a6e20, 2px 2px 2px 0px #2d5c6b20;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  width: 150px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  .card-content >  div:first-of-type {
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
    opacity: 1;
    transform: translateY(0px);
  }

  .card-content >  div:last-of-type {
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
    opacity: 0;
    transform: translateY(10px);
  }

  .card-content > div:last-of-type:first-of-type {
    opacity: 1 !important;
    transform: translateY(0px) !important;
  }

  &:hover {
    transform: scale(1.05);

    .card-content > div:first-of-type  {
      opacity: 0;
      transform: translateY(-10px);
    }


    .card-content >  div:last-of-type  {
      opacity: 1;
      transform: translateY(0px);
    }

  }
  
`;

export const cardContent = css`
  z-index: 10;
  border-radius: 0 0 14px 14px;
  flex-grow: 1;
  font-size: 0.75rem;
  margin-top: -12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-shadow: 0px 1px 0px #2d5a6e50, 1px 0px 0px #2d5a6e50;
  position: relative;

  > div {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0.8rem;
    right: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;


    &.card-image {
      align-items: center;

      svg {
        width: 80px;
        height: 80px;
        color: #2a4e68;
      }
    }
  }
`;

export const cardHeader = css`
  color: white;
  z-index: 20;
  font-size: 0.55rem;
  padding: 0 2rem;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font-weight: 500;
  line-height: 1.1;
`

export const costBubble = (cost: number) => css`
`;

export const cardGround = css`
  position: absolute;
  height: 50%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(180deg, #91a967 0%, #688c5c 100%);
  border-top: 3px solid #1c4145;
  z-index: 1;
`;

export const cardFooter = css`
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  justify-content: space-evenly;
`;

export const cardCost = css`
  background: #feb84d;
  font-family: "Baloo Bhaina 2", cursive;
  color: #5a2f12;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.2rem;
  border: 2px solid #0c262f;
  box-shadow: inset -1px -1px 2px 1px #c06728, inset 1px 1px 1px 0px #fff;
  width: 32px;
  height: 32px;
  padding-top: 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const cardConstructionTurns = css`
  background: #4aa7c0;
  color: #11313c;
  font-family: "Baloo Bhaina 2", cursive;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.2rem;
  border: 2px solid #0c262f;
  box-shadow: inset -2px -2px 4px 0px #1b5062, inset 1px 1px 1px 0px #fff;
  width: 32px;
  height: 32px;
  padding-top: 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const cardBevel = css`
  position: absolute;
  top: 2px;
  left: 1px;
  right: 7px;
  bottom: 7px;
  border-radius: 12px;
  border-top: 1px solid #fff5;
  border-left: 1px solid white;
  opacity: 0.2;
`;

export const cardFree = css`
  color: #2a4e68;
  font-family: "Baloo Bhaina 2", cursive;
  font-weight: 800;
  font-size: 1.4rem;
  padding-top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;