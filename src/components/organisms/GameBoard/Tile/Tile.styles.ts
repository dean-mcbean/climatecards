import { css, keyframes } from "@emotion/react";
import { Building } from "../../../../definitions/tiles/tileDefinitions";
import Color from "colorjs.io";

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


export const tileWaterLevel = (waterLevel: number, visible: boolean) => {

  const darkBlue = new Color('#638889');
  const lightBlue = new Color('#8cd7d0');
  const color = Color.mix(lightBlue, darkBlue, waterLevel / 5);
  
  return css`
    background-color: ${color.toString()};
    transition: height 1s ease-in-out;
    opacity: 0.8;
    height: ${visible ? 17.5 : 0}%;
  }
  `
}

export const waterLevelContainer = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  overflow: hidden;
`

export const sunkContainer = css`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  z-index: 1;
  background-color: var(--yellow);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  padding: 2px;
  box-sizing: border-box;
  box-shadow: inset -8px -8px 0 8px #e6e49a, 0 0 0 1px #0001;
`

export const sunkContent = css`
  background-color: #8cd7d0;
  border: 1px solid #7dbcbe;
  box-sizing: border-box;
  height: 80%;
  border-radius: 14px;
  box-shadow: inset -8px -4px 0 4px #7dbcbe, 0 0 0 1px #e6e49a;
`