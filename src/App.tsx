/** @jsxImportSource @emotion/react */

import { DeckSideDrawer } from "./components/organisms/DeckSidedrawer/DeckSidedrawer";
import MainGame from "./components/pages/MainGame/MainGame";
import { CardProvider } from "./context/CardProvider";
import { GameboardProvider } from "./context/GameboardProvider";
import { GameloopProvider } from "./context/GameloopProvider";
import { HazardProvider } from "./context/HazardProvider";
import { TimeProvider } from "./context/TimeProvider";
import { UIProvider } from "./context/UIProvider";
import { JPArtboard } from "./libraries/jpart";
import { JPGameBoard } from "./libraries/jpiso/JPGameBoard";


export default function App() {
  return (
    <TimeProvider>
      <GameboardProvider>
        <UIProvider>
          <HazardProvider>
            <CardProvider>
              <GameloopProvider>
                {//<MainGame />
}
                <JPGameBoard  />
                <DeckSideDrawer />
              </GameloopProvider>
            </CardProvider>
          </HazardProvider>
        </UIProvider>
      </GameboardProvider>
    </TimeProvider>
  );
}