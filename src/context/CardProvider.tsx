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
};

export const CardContext = React.createContext<CardContextType>({
  deck: [],
  hand: [],
  drawCard: () => {},
  initDeck: () => {},
  removeCardFromHand: () => {},
  getCardBoundingBox: () => null,
});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [deck, setDeck] = React.useState<Card[]>([]);
  const [hand, setHand] = React.useState<Card[]>([]);

  const drawCard = useCallback(() => {
    // Pull a random card from deck and add it to the hand
    setDeck((prevDeck) => {
      if (prevDeck.length === 0) {
        return prevDeck;
      }
      const randomIndex = Math.floor(Math.random() * prevDeck.length);
      const randomCard = copyCard(prevDeck[randomIndex]);
      setHand((prevHand) => [...prevHand, randomCard]);
      return prevDeck;
    });
  }, [deck]);

  const initDeck = useCallback(() => {
    // Create a deck of cards
    const newDeck: Card[] = [];
    newDeck.push(cardBuilder("housing_development"));
    newDeck.push(cardBuilder('fundraiser'));
    newDeck.push(cardBuilder("field_research"));
    newDeck.push(cardBuilder("bach"));
    setDeck(newDeck);
  }, []);

  console.log(deck)

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

  const contextValue = { deck, hand, drawCard, initDeck, removeCardFromHand, getCardBoundingBox };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return React.useContext(CardContext);
};
