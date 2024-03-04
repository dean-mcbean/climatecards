/** @jsxImportSource @emotion/react */
import { useCardContext } from '../../../context/CardProvider';
import { Card } from '../../molecules/Card/Card';
import { Card as CardType } from '../../../types/cards';
import { CardhandPanelContainer, cardhandPanelInner, nextTurnButton } from './CardhandPanel.styles';
import { palette } from '../../../theme/palette';
import { useTimeContext } from '../../../context/TimeProvider';

export const CardhandPanel = () => {
  const { hand } = useCardContext();
  const { nextTurn } = useTimeContext();


  const cardClicked = (card: CardType) => {
    console.log(`Card clicked: ${card.name}`);
  }

  return (
    <div css={CardhandPanelContainer} className="hand">
      <div css={nextTurnButton} onClick={nextTurn}>Next Day</div>
      <div css={cardhandPanelInner}>
        {hand.map((card, index) => (
          <Card key={index} card={card} onCardClick={cardClicked} />
        ))}
      </div>
    </div>
  );
};