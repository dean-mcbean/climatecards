/** @jsxImportSource @emotion/react */
import { useCardContext } from '../../../context/CardProvider';
import { Card } from '../../molecules/Card/Card';
import { Card as CardType } from '../../../types/cards';
import { CardhandPanelContainer, cardhandPanelInner, dashboardContainer, moneyButton, nextTurnButton, populationButton } from './CardhandPanel.styles';
import { useTimeContext } from '../../../context/TimeProvider';
import { useGameboardContext } from '../../../context/GameboardProvider';
import { useGameloopContext } from '../../../context/GameloopProvider';
import { useHazardContext } from '../../../context/HazardProvider';
import { useUIContext } from '../../../context/UIProvider';
import { useMemo, useRef } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCoinsFill } from "react-icons/ri";

export const CardhandPanel = () => {
  const cardContext = useCardContext();
  const timeContext = useTimeContext();
  const gameboardContext = useGameboardContext();
  const gameloopContext = useGameloopContext();
  const hazardContext = useHazardContext();
  const uiContext = useUIContext();

  const { hand, removeCardFromHand } = cardContext;
  const { nextTurn } = timeContext;

  const population = useMemo(() => gameboardContext.getPopulation(), [gameboardContext]);


  const cardClicked = (card: CardType) => {
    console.log(`Card clicked: ${card.name}`);
    card.action({
      cardContext,
      gameboardContext,
      gameloopContext,
      hazardContext,
      timeContext,
      uiContext
    })
    removeCardFromHand(card)
  }

  return (
    <div css={CardhandPanelContainer} className="hand">
      <div css={dashboardContainer}>
        <div css={moneyButton}><span>{gameloopContext.funding}</span><RiCoinsFill /></div>
        <div css={nextTurnButton} onClick={nextTurn}>NEXT DAY</div>
        <div css={populationButton}><span>{population}</span><BsFillPeopleFill /></div>
      </div>
      <div css={cardhandPanelInner}>
        {hand.map((card, index) => (
          <Card key={card.id} card={card} onCardClick={cardClicked} />
        ))}
      </div>
    </div>
  );
};