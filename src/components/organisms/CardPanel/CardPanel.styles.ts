import { css } from "@emotion/react";


export const cardPanelContainer = css`
  display: flex;
  justify-content: center;
  background-color: var(--dark-blue);
  height: 200px;
`

export const newCardButton = css`
  padding: 1rem 2rem;
  border: none;
  background-color: var(--dark-green);
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    background-color: var(--green);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
`
export const deckContainer = css`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 10px;
  gap: 10px;
  flex-grow: 1;
  justify-content: center;
  overflow-x: auto;
`