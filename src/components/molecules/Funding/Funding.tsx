/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { GameContext } from "../../../context/GameContextProvider/GameContextProvider";
import { fundingContainer } from "./Funding.styles";

export default function Funding() {

  const { funding } = useContext(GameContext)

  return (
    <div css={fundingContainer}>
      ${funding}k
    </div>
  );
}