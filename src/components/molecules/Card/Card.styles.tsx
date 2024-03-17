import { css, keyframes } from "@emotion/react";
import { Card } from "../../../types/cards";

const cardTypeColors: { [key in Card['type']]: any } = {
  'building': {
    background: '#f16134',
    border: '#bb4622',
    hardShadow: '#813325',
    text: '#631e11',
  },
  'funding': {
    background: '#fd9d21',
    border: '#c36300',
    hardShadow: '#a74700',
    text: '#7d3e00',
  },
  'research': {
    background: '#4aa7c0',
    border: '#00739b',
    hardShadow: '#125f6f',
    text: '#003f4f',
  }
}

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

export const cardContainer = (type: string) => {
  const colors = cardTypeColors[type as Card['type']];
  
  return css`
  display: flex;
  height: 100%;
  flex-direction: column;
  animation: ${fadein} 0.4s ease-in-out 0.2s backwards;
  background: linear-gradient(160deg, ${colors.background} 0%, ${colors.border} 100%);
  box-shadow: inset -3px -3px 1px 3px ${colors.hardShadow}BB, inset -42px 0px 1px -21px ${colors.border}20, 2px 2px 2px 0px #2d5c6b20, 0px 6px 6px 0px #0242;
  border-radius: 14px 14px 8px 8px;
  position: relative;
  width: 150px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  height: 250px;
  position: relative;

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
    z-index: 100;
    box-shadow: inset -3px -3px 1px 3px ${colors.hardShadow}, inset -42px 0px 1px -21px ${colors.border}20, 2px 2px 2px 0px #2d5c6b20, 0px 10px 10px 0px #0244;

    .card-content > div:first-of-type  {
      opacity: 0;
      transform: translateY(-10px);
    }


    .card-content >  div:last-of-type  {
      opacity: 1;
      transform: translateY(0px);
    }

  }
  
`
};

export const cardContent = (type: string) => {
  const colors = cardTypeColors[type as Card['type']];
  
  return css`
  z-index: 10;
  border-radius: 0 0 14px 14px;
  flex-grow: 1;
  font-size: 0.85rem;
  margin-top: -12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.hardShadow};
  text-shadow: 0px 1px 0px ${colors.border}50, 1px 0px 0px ${colors.border}50;
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
    }
    &.card-text {
      color: white;
    }
  }
`;
}

export const cardContentImage = css`
  svg {
    width: 80px;
    height: 80px;
  }
`;

export const cardContentItems = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 2px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 1.5rem;
  box-sizing: border-box;
  gap: 4px 0;
`;

export const cardContentItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const cardHeader = css`
  color: white;
  z-index: 20;
  font-size: 0.65rem;
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

export const cardFooter = (type: string) => {
  const colors = cardTypeColors[type as Card['type']];
  
  return css`
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: ${colors.text};
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  
  p {
    margin-top: 4px;
  }
`
};

export const cardCost = (type: string) => {
  
  return css`
  position: absolute;
  top: -4px;
  left: -4px;
  background: #ffb443;
  font-family: "Baloo Bhaina 2", cursive;
  color: #a35400;
  border-radius: 30px;
  font-weight: 800;
  font-size: 1.2rem;
  min-width: 32px;
  height: 32px;
  padding: 4px 0 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  flex-grow:1;
  max-width: 50%;
  box-shadow: inset -2px -4px 1px -2px #cd7c00, inset -24px -24px 16px -22px #cd7c00BB;
  z-index: 20;
`;
}


export const cardOverflowHide = css`
  overflow: hidden;
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: 14px 14px 8px 8px;
  display: flex;
  height: 100%;
  flex-direction: column;
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


export const cardCostShadow = (type: string) => {
  const colors = cardTypeColors[type as Card['type']];
  
  return css`
  position: absolute;
  top: -5px;
  left: -5px;
  background: ${colors.border}20;
  border-radius: 30px;
  min-width: 34px;
  height: 34px;
  max-width: 50%;
  z-index: 10;
`;
}