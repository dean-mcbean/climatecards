import { css } from "@emotion/react";

export const gameBoard = css`
` 

export const gameBoardBase = css`
  display: flex;
  justify-content: center;
  height: 300px;
  position: relative;
`

export const groundBase = css`
  background-color: var(--green-shade);
  height: 300px;
  position: absolute;
  top: 10px;
  width: 100%;
  z-index: 0;
  box-shadow: -4px 8px 2px 0 rgba(0, 0, 0, 0.3);
`

export const landBase = css`
  background-color: var(--green);
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
  top: -10px;
`
export const seaBase = css`
  background-color: var(--dark-blue);
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10px;
  z-index: 1;
`

export const beachBase = css`
  background-color: var(--yellow);
  height: 300px;
  width: 30px;
  display: flex;
  flex-direction: column;
  transform: skewY(30deg);
  z-index: 2;
`

export const tileRow = css`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 10px;
`

export const seaRow = css`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-grow: 1;
  height: 10px;
  border: 1px solid #0001;
  box-sizing: border-box;
  position: relative;
`

export const beachRow = css`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 10px;
  border: 1px solid #0001;
  box-sizing: border-box;
`