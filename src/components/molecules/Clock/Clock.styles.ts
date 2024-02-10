import { css } from "@emotion/react";


export const clockContainer = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: var(--orange);

  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  
  cursor: pointer;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`

export const foreground = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--yellow);
  z-index: 10;
  border-radius: 50%;
  width: 55%;
  height: 55%;
  border: 3px solid var(--orange);
  color: var(--night-blue);
`

export const spinningBackground = (day: number, time: number) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
  transform: rotate(${-day * 360 + -time * 360 + 90}deg);
  z-index: 5;
  position: absolute;
  border-radius: 50%;
  top: 5%;
  left: 5%;
  height: 90%;
  width: 90%;
  overflow: hidden;
  transition: transform 0.2s;
  box-sizing: border-box;
  border: 3px solid var(--yellow);
`

export const spinningBackgroundDay = css`
  width: 100%;
  height: 50%;
  background-color: var(--day-blue);
`

export const spinningBackgroundNight = css`
  width: 100%;
  height: 50%;
  position: absolute;
  top: 50%;
  background-color: var(--night-blue);
`