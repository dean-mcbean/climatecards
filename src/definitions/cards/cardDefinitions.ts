
import { GameContextType } from "../../context/GameContextProvider/GameContextProvider";
import { gainFunding } from "./cardActions";
import { CardList } from "./cardTypes";
import { allowUserToBuild, tileIsBesideBuildingType, tileIsEmpty, tileIsSeaside } from "./cardUtils";

export const allCards: CardList = [
  {
    id: "1",
    title: "Community Donations",
    flavortext: "Well meaning contributions from the city.",
    effecttext: "Gain 2 funding.",
    type: "Funding",
    cost: 0,
    action: (gameContext: GameContextType) => {
      gainFunding(gameContext, {
        amount: 2
      })
    }
  },
  {
    id: "2",
    title: "Seaside Development",
    flavortext: "Exposed land is better than nothing.",
    effecttext: "Build a house by the sea.",
    type: "Building",
    cost: 4,
    action: (gameContext: GameContextType) => {
      allowUserToBuild(gameContext, {
        type: "house",
        health: 2
      }, (tile) => tileIsEmpty(tile) && tileIsSeaside(gameContext)(tile))
    }
  },
  {
    id: "3",
    title: "Inland Development",
    flavortext: "Protected from the elements.",
    effecttext: "Build a house away from the sea.",
    type: "Building",
    cost: 8,
    action: (gameContext: GameContextType) => {
      allowUserToBuild(gameContext, {
        type: "house",
        health: 2
      }, (tile) => tileIsEmpty(tile) && !tileIsSeaside(gameContext)(tile))
    }
  },
  {
    id: "3",
    title: "Business Subsidy",
    flavortext: "Fund additional business enterprise.",
    effecttext: "Build a business next to an existing house.",
    type: "Building",
    cost: 10,
    action: (gameContext: GameContextType) => {
      allowUserToBuild(gameContext, {
        type: "business",
        health: 2
      }, (tile) => tileIsEmpty(tile) && tileIsBesideBuildingType(gameContext, "house")(tile))
    }
  },
]