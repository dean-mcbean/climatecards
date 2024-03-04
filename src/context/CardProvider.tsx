import React, { ReactNode, useCallback, useEffect } from "react";
import { Card } from "../types/cards";
import { randomCardPreset } from "../data/cards/cardBuilder";

type CardContextType = {
  deck: Card[];
  hand: Card[];
  drawCard: () => void;
  initDeck: () => void;
};

export const CardContext = React.createContext<CardContextType>({
  deck: [],
  hand: [],
  drawCard: () => {},
  initDeck: () => {},
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
      const randomCard = prevDeck[randomIndex];
      setHand((prevHand) => [...prevHand, randomCard]);
      const newDeck = [...prevDeck];
      newDeck.splice(randomIndex, 1);
      return newDeck;
    });
  }, [deck]);

  const initDeck = useCallback(() => {
    // Create a deck of cards
    const newDeck: Card[] = [];
    for (let i = 0; i < 10; i++) {
      newDeck.push(randomCardPreset());
    }
    setDeck(newDeck);
  }, []);

  const contextValue = { deck, hand, drawCard, initDeck };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return React.useContext(CardContext);
};
