/** @jsxImportSource @emotion/react */
import { Card as CardType } from "../../../types/cards";
import { cardContainer, cardContent, cardHeader, costBubble } from "./Card.styles";

interface CardProps {
  card: CardType;
  onCardClick?: (card: CardType) => void;
}

export const Card = ({ card, onCardClick } : CardProps) => {
  return (
    <div css={cardContainer} className="hand" onClick={() => onCardClick && onCardClick(card)}>
      <div css={cardHeader}>
        <div><h2>{card.name}</h2></div>
        <div css={costBubble(card.cost)}>${card.cost}</div>
      </div>
      <div css={cardContent}>
        <p>{card.description}</p>
        <p><b>Effect:</b><br/>{card.effect}</p>
      </div>
    </div>
  );
};