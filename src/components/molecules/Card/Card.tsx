/** @jsxImportSource @emotion/react */
import { BsFillPeopleFill } from "react-icons/bs";
import { Card as CardType } from "../../../types/cards";
import {  cardContainer, cardContent, cardHeader, cardFooter, cardCost, cardBevel, cardOverflowHide, cardCostShadow, cardContentItem, cardContentItems, cardContentImage } from "./Card.styles";
import { FaClock } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";

interface CardProps {
  card: CardType;
  onCardClick?: (card: CardType, cardPosition?: DOMRect) => void;
}

export const Card = ({ card, onCardClick }: CardProps) => {

  return (
    <div id={`card-${card.id}`} css={cardContainer(card.type)} className="hand" onClick={() => onCardClick && onCardClick(card)}>
      {card.cost > 0 ? <div css={cardCost(card.type)}>{card.cost}</div> : null}
      <div css={cardOverflowHide}>
        {card.cost > 0 ? <div css={cardCostShadow(card.type)}></div> : null}
        <div css={cardHeader}>
          <div><h2>{card.name}</h2></div>
        </div>
        <div className="card-content" css={cardContent(card.type)}>
          {card.building ? 
          <div className={'card-image'}>
            <div css={cardContentImage}>
              {card.building.icon}
            </div> 
            <div css={cardContentItems}>
              <div css={cardContentItem}>{card.building.maxHealth}<FaShieldAlt /></div>
              <div css={cardContentItem}>{card.building.population}<BsFillPeopleFill /></div>
            </div> 
          </div>
          : 
          card.icon ? 
          <div className={'card-image'}  css={cardContentImage}>
            {card.icon}
          </div> 
          : null
          }
          <div className={'card-text'}>
            <p>{card.description}</p>
          </div>
        </div>
        <div css={cardFooter(card.type)}>
          <p><i>{card.effect}</i></p>
        </div>
      </div>
      <div css={cardBevel} />
    </div>
  );
};