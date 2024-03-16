/** @jsxImportSource @emotion/react */
import { useCardContext } from '../../../context/CardProvider';
import { Card } from '../../molecules/Card/Card';
import { Card as CardType } from '../../../types/cards';
import { CardhandPanelContainer, cardContainer, cardhandPanelInner, dashboardContainer, moneyButton, nextTurnButton, openDeckButton, populationButton } from './CardhandPanel.styles';
import { useTimeContext } from '../../../context/TimeProvider';
import { useGameboardContext } from '../../../context/GameboardProvider';
import { useGameloopContext } from '../../../context/GameloopProvider';
import { useHazardContext } from '../../../context/HazardProvider';
import { useUIContext } from '../../../context/UIProvider';
import { useMemo, useState } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCoinsFill } from "react-icons/ri";
import { FlyingCoinProps } from '../../atoms/FlyingCoin/FlyingCoin';
import { TbCardsFilled } from "react-icons/tb";

export const CardhandPanel = () => {
  const cardContext = useCardContext();
  const timeContext = useTimeContext();
  const gameboardContext = useGameboardContext();
  const gameloopContext = useGameloopContext();
  const hazardContext = useHazardContext();
  const uiContext = useUIContext();

  const { hand, removeCardFromHand, getCardBoundingBox } = cardContext;
  const { nextTurn } = timeContext;
  const { trySpendFunding } = gameloopContext;
  const { setDeckSideDrawerExpanded } = uiContext;

  const population = useMemo(() => gameboardContext.getPopulation(), [gameboardContext]);

  const [removedCardIds, setRemovedCardIds] = useState<number[]>([]);

  const cardClicked = (card: CardType) => {
    if (!trySpendFunding(card.cost)) {
      return;
    }
    
    card.action({
      cardContext,
      gameboardContext,
      gameloopContext,
      hazardContext,
      timeContext,
      uiContext
    }, card)

    const cardBoundingBox = getCardBoundingBox(card);

    if (cardBoundingBox) {
      const coins: Partial<FlyingCoinProps>[] = [];
      for (let i = 0; i < card.cost; i++) {
        coins.push({
          duration: 600,
          end_location: { x: cardBoundingBox.left + cardBoundingBox.width / 2, y: cardBoundingBox.top + cardBoundingBox.height / 2 }
        });
      }
      uiContext.createFlyingCoins(coins);
    }

    if (card.id) setRemovedCardIds((ids) => [...ids, card.id as number]);
    setTimeout(() => removeCardFromHand(card), 1000);
  }

  return (
    <div css={CardhandPanelContainer} className="hand">
      <div css={openDeckButton} onClick={() => setDeckSideDrawerExpanded(true)}><TbCardsFilled />View Deck</div>
      <div css={dashboardContainer}>
        <div id="funding" css={moneyButton}><span>{gameloopContext.funding}</span><RiCoinsFill /></div>
        <div css={nextTurnButton} onClick={nextTurn}>NEXT DAY</div>
        <div css={populationButton}><span>{population}</span><BsFillPeopleFill /></div>
      </div>
      <div css={cardhandPanelInner}>
        {hand.map((card, index) => (
          <div key={card.id} css={cardContainer(index, !!card.id && !!removedCardIds.includes(card.id))}>
            <Card card={card} onCardClick={cardClicked} />
          </div>
        ))}
      </div>
    </div>
  );
};