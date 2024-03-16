/** @jsxImportSource @emotion/react */

import { deckSideDrawer, deckSideDrawerCards, deckSideDrawerCloseButton, deckSideDrawerOverlay } from './DeckSideDrawer.styles';
import { useUIContext } from '../../../context/UIProvider';
import { useCardContext } from '../../../context/CardProvider';
import { Card } from '../../molecules/Card/Card';
import { IoClose } from "react-icons/io5";


export const DeckSideDrawer = () => {

  const { deckSideDrawerExpanded, setDeckSideDrawerExpanded } = useUIContext();
  const { deck } = useCardContext();

  console.log(deck);

  return (
    <div css={deckSideDrawerOverlay(deckSideDrawerExpanded)} >
      <div css={deckSideDrawer(deckSideDrawerExpanded)} >
        <h1>Deck</h1>
        <p>This is your deck of potential actions! Any time you draw a card, it's chosen randomly from these options.</p>
        <div css={deckSideDrawerCloseButton} onClick={() => setDeckSideDrawerExpanded(false)}><IoClose /></div>
        <div css={deckSideDrawerCards} >
          {deck.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}