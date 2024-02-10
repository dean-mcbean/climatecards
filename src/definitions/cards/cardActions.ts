import { GameContextType } from "../../context/GameContextProvider/GameContextProvider"

export const gainFunding = (
  gameContext: GameContextType, 
  { amount }: {amount: number}
  ) => {
  gameContext.alterFunding(amount)

  return null
}