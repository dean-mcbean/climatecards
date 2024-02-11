import { css } from "@emotion/react";


export const cardContainer =  ({isValid}: {isValid: boolean}) => css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 6px;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 15px;
  background-color: ${isValid ? "var(--green)" : "#999"};
  min-width: 100px;

  cursor: pointer;
  pointer-events: ${isValid ? "all" : "none"};
`