/** @jsxImportSource @emotion/react */
import { Ref, forwardRef, useRef } from "react";
import { Card as CardType } from "../../../types/cards";
import {  cardContainer, cardContent, cardHeader, cardFooter, cardCost, cardConstructionTurns, cardBevel, cardFree } from "./Card.styles";
import { TbCoinFilled } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiDollarCircle } from "react-icons/bi";

interface CardProps {
  card: CardType;
  onCardClick?: (card: CardType, cardPosition?: DOMRect) => void;
}

export const Card = ({ card, onCardClick }: CardProps) => {

  return (
    <div id={`card-${card.id}`} css={cardContainer(card.type)} className="hand" onClick={() => onCardClick && onCardClick(card)}>
      <div css={cardHeader}>
        <div><h2>{card.name}</h2></div>
      </div>
      <div className="card-content" css={cardContent(card.type)}>
        {card.building ? <div className={'card-image'}>
          {card.building.icon}
        </div> : card.icon ? <div className={'card-image'}>
          {card.icon}
        </div> : null}
        <div className={'card-text'}>
          <p>{card.description}</p>
          <p><i>{card.effect}</i></p>
        </div>
      </div>
      <div css={cardFooter(card.type)}>
        {card.cost > 0 ? <div css={cardCost(card.type)}><BiDollarCircle />{card.cost}</div> : <div css={cardFree(card.type)}>FREE</div>}
        {card.building && <div css={cardConstructionTurns(card.type)}>{card.building.maxConstructionTurns}<FaClockRotateLeft /></div>}
      </div>
      <div css={cardBevel} />
    </div>
  );
};