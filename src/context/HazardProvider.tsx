import React, { ReactNode, useEffect } from "react";
import { useTimeContext } from "./TimeProvider";
import { useGameboardContext } from "./GameboardProvider";
import { gridItemWarningBuilder } from "../data/gridItemWarnings/gridItemWarningBuilder";
import { GridItem } from "../types/gameboard";
import { getNeighbouringTiles } from "../utils/gameboard/board_filters";
import { randomInt } from "../utils/generic";


export type HazardContextType = {
  resolveGridItemWarning: (gridItem: GridItem) => void;
  reduceInundation: (gridItem: GridItem) => void;
  reduceBuildingHealth: (gridItem: GridItem, damage?: number) => void;
};


export const HazardContext = React.createContext<HazardContextType>({
  resolveGridItemWarning: () => {},
  reduceInundation: () => {},
  reduceBuildingHealth: () => {}
});


export const HazardProvider = ({ children }: {children: ReactNode}) => {

  const { turn, currentEvent } = useTimeContext();
  const { grid, getMatchingGridItems, updateGridItem, gridDimensions, updateRandomGridItems } = useGameboardContext();

  useEffect(() => {
    const waves = getMatchingGridItems((item) => !!item.waveStrength);
    
    // Handle waves
    waves.forEach((wave) => {

      // Remove old waves
      updateGridItem(wave.y, wave.x, (gridItem) => {
        return { ...gridItem, waveStrength: undefined };
      });

      // Check for collision
      const collision = getMatchingGridItems((item) => item.x === wave.x - 1 && item.y === wave.y && !item.isWater && !item.inundation);
      if (collision.length > 0) {
        // TODO Handle collision
        updateGridItem(wave.y, wave.x - 1, (gridItem) => {
          return { ...gridItem, inundation: 3 };
        });
      } else {
        // Update wave
        updateGridItem(wave.y, wave.x - 1, (gridItem) => {
          return { ...gridItem, waveStrength: wave.waveStrength };
        });
      }
    });

    // Add waves if during a storm
    if (currentEvent?.type === "tsunami") {
      updateRandomGridItems(randomInt(1,2), (gridItem) => {
        return { ...gridItem, waveStrength: 1 };
      }, (gridItem) => {
        return gridItem.x === gridDimensions[0] - 1 && !!gridItem.isWater && !gridItem.waveStrength;
      });

    } else if (currentEvent?.type === "storm") {
      updateRandomGridItems(randomInt(1,3), (gridItem) => {
        return { ...gridItem, warning: gridItemWarningBuilder("flooding", turn + 1) };
      }, (gridItem) => {
        return !gridItem.isWater && !gridItem.inundation;
      });

    } else if (currentEvent?.type === "earthquake") {
      updateRandomGridItems(randomInt(1,2), (gridItem) => {
        return { ...gridItem, warning: gridItemWarningBuilder("landslide", turn + 1) };
      }, (gridItem) => {
        return getNeighbouringTiles({gridItem, grid, filter: (tile) => !!tile.isWater}).length > 0 && !gridItem.isWater;
      });
    }
  }
  , [turn]);

  const resolveGridItemWarning = (gridItem: GridItem) => {
    if (gridItem.warning) {
      if (gridItem.warning.endTurn === turn) {
        updateGridItem(gridItem.y, gridItem.x, (item) => {
          const result = { ...item, warning: undefined };
          switch (item.warning?.type) {
            case "flooding":
              result.inundation = 3;
              break;
            case "landslide":
              if (result.isRaised) {
                result.isRaised = false;
              } else {
                result.isWater = true;
              }
              break;
          }
          return result;
        });
      }
    }
  }

  const reduceInundation = (gridItem: GridItem) => {
    if (gridItem.inundation > 0) {
      updateGridItem(gridItem.y, gridItem.x, (item) => {
        return { ...item, inundation: item.inundation - 1 };
      });
    }
  }

  const reduceBuildingHealth = (gridItem: GridItem, damage: number = 1) => {
    if (gridItem.building) {
      updateGridItem(gridItem.y, gridItem.x, (item) => {
        const newItem = { ...item};
        if (!newItem.building) {
          return newItem;
        }
        newItem.building.health -= damage;
        if (newItem.building.health <= 0) {
          newItem.building = undefined;
        }
        return newItem;
      });
    }
  }


  const contextValue = {
    resolveGridItemWarning,
    reduceInundation,
    reduceBuildingHealth
  };
  
  return (
    <HazardContext.Provider value={contextValue}>
      {children}
    </HazardContext.Provider>
  );
};


export const useHazardContext = () => {
  return React.useContext(HazardContext);
}