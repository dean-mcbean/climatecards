import { css } from "@emotion/react";
import { Building } from "../../../../context/GameContextProvider/GameContextProvider";

export const tileContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 1px solid #0001;
  position: relative;
  width: 10px;
  box-sizing: border-box;
` 

export const buildingContainer = (building?: Building) => css`
  height: 90%;
  width: 90%;
  border-radius: 10px;
  display: ${building ? 'flex' : 'none'};
  background-color: var(--${building && building.type == 'house' ? 'blue' : 'red'});
  justify-content: center;
  align-items: center;
  position: relative;
  top: -4px;
  box-shadow: 0 4px 0px var(--dark-blue);
  color: #000A;
  animation: growin 0.1s;
  overflow: hidden;

  @keyframes growin {
    from { 
      height: 0%;
      width: 0%;
    }
    to   { 
      height: 90%;
      width: 90%;
    }
  }
`

export const tileSelector = css`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 3;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  >div {
    border-radius: 40%;
    opacity: 0.5;
    height: 50%;
    width: 50%;
    background-color: var(--blue);
    transition: opacity 0.1s ease, border-radius 0.1s ease, height 0.1s ease, width 0.1s ease;
  }
  &:hover>div {
    border-radius: 30%;
    opacity: 0.8;
    height: 70%;
    width: 70%;
  }
`

export const tileWaterLevel = (waterLevel: number) => css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${waterLevel*60}%;
  background-color: #73a9ad;
  opacity: 0.8;
  z-index: 2;
  border-radius: 5px 5px 0 0;
  -webkit-transition: height 2s;
  transition: height 2s;
}
`