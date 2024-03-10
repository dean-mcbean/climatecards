/** @jsxImportSource @emotion/react */
import { Card as CardType } from "../../../types/cards";
import { cardGround, cardContainer, cardContent, cardHeader, costBubble, cardFooter, cardCost, cardConstructionTurns, cardBevel } from "./Card.styles";

interface CardProps {
  card: CardType;
  onCardClick?: (card: CardType) => void;
}

export const Card = ({ card, onCardClick } : CardProps) => {
  return (
    <div css={cardContainer} className="hand" onClick={() => onCardClick && onCardClick(card)}>
      <div css={cardHeader}>
        <div><h2>{card.name}</h2></div>
      </div>
      <div className="card-content" css={cardContent}>
        {card.building && <div className={'card-image'}>
          {card.building.icon}
        </div>}
        <div className={'card-text'}>
          <p>{card.description}</p>
          <p><i>{card.effect}</i></p>
        </div>
      </div>
      <div css={cardFooter}>
        <div css={cardCost}>{card.cost}</div>
        {card.building && <div css={cardConstructionTurns}>{card.building.maxConstructionTurns}</div>}
      </div>
      <div css={cardBevel} />
    </div>
  );
};