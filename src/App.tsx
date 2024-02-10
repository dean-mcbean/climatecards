/** @jsxImportSource @emotion/react */

import { appContainer } from "./App.styles";
import CardPanel from "./components/organisms/CardPanel/CardPanel";
import GamePanel from "./components/organisms/GamePanel/GamePanel";
import { GameContextProvider } from "./context/GameContextProvider/GameContextProvider";


export default function App() {
  return (
    <GameContextProvider>
    <div css={appContainer}>
      <GamePanel />
      <CardPanel />
    </div>
    </GameContextProvider>
  );
}