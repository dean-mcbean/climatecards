/** @jsxImportSource @emotion/react */

import { useCardContext } from '../../../context/CardProvider';
import { unlockCardPanel, unlockCardPanelContainer, unlockableCardContainer } from './UnlockCardPanel.styles';
import { useTimeContext } from '../../../context/TimeProvider';
import { cardBuilder, getCardPresetKeys } from '../../../data/cards/cardBuilder';
import { useEffect, useState } from 'react';
import { Card as CardType } from '../../../types/cards';
import { Card } from '../../molecules/Card/Card';
import { dashboardButton } from '../CardhandPanel/CardhandPanel.styles';
import { useGameloopContext } from '../../../context/GameloopProvider';


export const UnlockCardPanel = () => {
  const { week } = useTimeContext();
  const { deck } = useCardContext();
  const { resolveCardUnlock } = useGameloopContext();
  const [unlockableCards, setUnlockableCards] = useState<CardType[]>([]);

  useEffect(() => {
    const allCardPresetKeys = getCardPresetKeys();

    const options = allCardPresetKeys.filter((presetKey) => !deck.find((card) => card.presetKey === presetKey));

    const availableCards: CardType[] = options.map((presetKey) => {
      return cardBuilder(presetKey);
    }).sort(() => Math.random() - 0.5).splice(0, 3);

    setUnlockableCards(availableCards);
  }, []);

  return (
    <div css={unlockCardPanel(true)} >
      <div css={unlockCardPanelContainer} >
        <h1>Survived {week - 1} Week{week - 1 > 1 ? 's' : ''}</h1>
        <p>Choose a new card to add to your deck!</p>
        <div css={unlockableCardContainer}>
          {unlockableCards.map((card) => (
            <Card key={card.id} card={card} onCardClick={resolveCardUnlock} />
          ))}
        </div>
        <p>OR</p>
        <div css={dashboardButton} onClick={() => resolveCardUnlock()}>
          Skip
        </div>
      </div>
    </div>
  );
}