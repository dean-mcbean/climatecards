/** @jsxImportSource @emotion/react */
import { useCallback, useContext } from "react";
import Card from "../../molecules/Card/Card";
import { cardPanelContainer, deckContainer, newCardButton } from "./CardPanel.styles";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";
import { allCards } from "../../../definitions/cards/cardDefinitions";

export default function CardPanel() {
  const {cardHand, addToCardHand, alterFunding} = useContext(GameContext);

  const drawCard = useCallback(() => {
    // draw a card from the deck
    if (alterFunding(-1)) {
      allCards.sort(() => Math.random() - 0.5);
      const newCard = allCards[0];
      addToCardHand(newCard);
    }

  }, [addToCardHand]);

  return (
    <div css={cardPanelContainer}>
      <div css={deckContainer}>
        {cardHand.map((card, index) => <Card cardIndexInHand={index} card={card} key={index} />)}
      </div>
      <div css={newCardButton} onClick={drawCard}>
        $1k<br/>+
      </div>
    </div>
  );
}