/** @jsxImportSource @emotion/react */

import { appContainer, upperAppContainer } from "./App.styles";
import { CardhandPanel } from "./components/organisms/CardhandPanel/CardhandPanel";
import { Gameboard } from "./components/organisms/Gameboard/Gameboard";
import { UIOverlay } from "./components/organisms/UIOverlay/UIOverlay";
import { CardProvider } from "./context/CardProvider";
import { GameboardProvider } from "./context/GameboardProvider";
import { GameloopProvider } from "./context/GameloopProvider";
import { HazardProvider } from "./context/HazardProvider";
import { TimeProvider } from "./context/TimeProvider";
import { UIProvider } from "./context/UIProvider";


export default function App() {
  return (
    <TimeProvider>
      <GameboardProvider>
        <UIProvider>
          <HazardProvider>
            <CardProvider>
              <GameloopProvider>
                <div css={appContainer}>
                  <div css={upperAppContainer}>
                    <Gameboard />
                    <UIOverlay />
                  </div>
                  <CardhandPanel />
                </div>
              </GameloopProvider>
            </CardProvider>
          </HazardProvider>
        </UIProvider>
      </GameboardProvider>
    </TimeProvider>
  );
}