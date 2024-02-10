/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Typography from "../../atoms/Typography/Typography";
import { cardContainer } from "./Card.styles";
import { Card } from "../../../definitions/cards/cardTypes";
import { useContext } from "react";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";

export default function Card({cardIndexInHand, card}: {cardIndexInHand: number, card: Card}) {

  const gameContext = useContext(GameContext);

  const activateCard = () => {
    if (gameContext.alterFunding(-card.cost)) {
      if (card.action) card.action(gameContext);
      gameContext.removeFromCardHandByIndex(cardIndexInHand);
    }
  }

  return (
    <div
      css={cardContainer}
      onClick={activateCard}
    >
      <Typography variant="h4">{card.title}</Typography>
      <Typography variant="subtitle" fontSize="0.8rem">{card.type}</Typography>
      <Typography variant="p" fontSize="0.8rem">{card.flavortext}</Typography>
      <Typography variant="p" fontSize="0.8rem">{card.effecttext}</Typography>
      <Typography variant="p">Cost: ${card.cost}k</Typography>
    </div>
  );
}