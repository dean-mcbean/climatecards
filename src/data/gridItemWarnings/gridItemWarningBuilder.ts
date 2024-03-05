import { GridItemWarning } from "../../types/gameboard"

export const gridItemWarningBuilder = (type: GridItemWarning['type'], endTurn: number): GridItemWarning => {
  return {
    type,
    endTurn
  }
}