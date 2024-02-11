import { css, keyframes } from "@emotion/react";

const swipeIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const swipeOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
`

export const dayAnnouncerContainer = (enter: boolean) => css`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow);
  border: 3px solid var(--orange);
  padding: 8px 16px;
  border-radius: 0.5rem;
  color: var(--night-blue);
  animation: ${enter ? swipeIn : swipeOut} 0.1s ease-in-out; 
  top: 0;
  white-space: nowrap;
`

export const dayParent = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  position: relative;
`