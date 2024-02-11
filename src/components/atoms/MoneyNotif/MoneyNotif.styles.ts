import { css, keyframes } from "@emotion/react";

const bobUp = keyframes`
  from {
    transform: scale(0) translateY(0px) rotate(180deg);
    opacity: 0;
  }
  6% {
    transform: scale(1.4) translateY(0px) rotate(0deg);
    opacity: 1;
  }
  12% {
    transform: scale(1);
  }
  95% {
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(-100px);
    opacity: 0;
  }
`

export const moneyNotifContainer = (amount: number, isPositive: boolean) => css`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: var(--${isPositive ? 'bright-gold' : 'bright-red'});
  box-shadow: 0px 4px 0px -2px #0002;
  padding: 4px 8px;
  border-radius: 5rem;
  color: var(--night-blue);
  animation: ${bobUp} 3s ease-in-out forwards;
  white-space: nowrap;
`

export const moneyNotifParent = (x: number, y: number) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${y}px;
  left: ${x}px;
  z-index: 10;
  pointer-events: none;
`