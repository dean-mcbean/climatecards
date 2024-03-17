import React, { ReactNode, useCallback, useEffect } from "react";
import { Card } from "../types/cards";
import { cardBuilder, copyCard, randomCardPreset } from "../data/cards/cardBuilder";

export type CardContextType = {
  deck: Card[];
  hand: Card[];
  drawCard: () => void;
  initDeck: () => void;
  removeCardFromHand: (card: Card) => void;
  getCardBoundingBox: (card: Card) => DOMRect | null;
  refreshHand: () => void;
  addCardToDeck: (card: Card) => void;
};

export const CardContext = React.createContext<CardContextType>({
  deck: [],
  hand: [],
  drawCard: () => {},
  initDeck: () => {},
  removeCardFromHand: () => {},
  getCardBoundingBox: () => null,
  refreshHand: () => {},
  addCardToDeck: () => {},
});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [deck, setDeck] = React.useState<Card[]>([]);
  const [hand, setHand] = React.useState<Card[]>([]);
  const [handSize, setHandSize] = React.useState<number>(3);

  const addCardToDeck = (card: Card) => {
    setDeck((prevDeck) => [...prevDeck, card]);
  };

  const drawCard = useCallback(() => {
    // Pull a random card from deck and add it to the hand
    setDeck((prevDeck) => {
      if (prevDeck.length === 0) {
        return prevDeck;
      }
      const randomIndex = Math.floor(Math.random() * prevDeck.length);
      const randomCard = copyCard(prevDeck[randomIndex]);
      setHand((prevHand) => [...prevHand, randomCard].sort((a, b) => -a.type.localeCompare(b.type) || a.cost - b.cost));
      return prevDeck;
    });
  }, [deck, hand]);

  const refreshHand = useCallback(() => {
    setHand([]);
    for (let i = 0; i < handSize; i++) {
      drawCard();
    }
    setHand((prevHand) => {
      prevHand;
      console.log(prevHand);
      return prevHand;
    });
  }, [drawCard, handSize]);

  const initDeck = useCallback(() => {
    // Create a deck of cards
    const newDeck: Card[] = [];
    newDeck.push(cardBuilder('donations'));
    newDeck.push(cardBuilder("field_research"));
    newDeck.push(cardBuilder("bach"));
    setDeck(newDeck);
  }, []);

  const removeCardFromHand = useCallback((card: Card) => {
    setHand((prevHand) => prevHand.filter((c) => c.id !== card.id));
  }, []);

  const getCardBoundingBox = (card: Card) => {
    const element = document.getElementById(`card-${card.id}`);
    console.log(element, card, `card-${card.id}`)
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect;
    }
    return null;
  }

  const contextValue = { deck, hand, drawCard, initDeck, removeCardFromHand, getCardBoundingBox, refreshHand, addCardToDeck };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return React.useContext(CardContext);
};
