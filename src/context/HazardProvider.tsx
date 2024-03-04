import React, { ReactNode, useEffect } from "react";
import { useTimeContext } from "./TimeProvider";
import { useGameboardContext } from "./GameboardProvider";
import { get } from "http";


type HazardContextType = {
};


export const HazardContext = React.createContext<HazardContextType>({
});


export const HazardProvider = ({ children }: {children: ReactNode}) => {

  const { turn, currentEvent } = useTimeContext();
  const { getMatchingGridItems, updateGridItem, gridDimensions } = useGameboardContext();

  useEffect(() => {
    const waves = getMatchingGridItems((item) => !!item.waveStrength);
    
    // Handle waves
    waves.forEach((wave) => {

      // Remove old waves
      updateGridItem(wave.y, wave.x, (gridItem) => {
        return { ...gridItem, waveStrength: undefined };
      });

      // Check for collision
      const collision = getMatchingGridItems((item) => item.x === wave.x - 1 && item.y === wave.y && !item.isWater);
      if (collision.length > 0) {
        // TODO Handle collision
      } else {
        // Update wave
        updateGridItem(wave.y, wave.x - 1, (gridItem) => {
          return { ...gridItem, waveStrength: wave.waveStrength };
        });
      }
    });

    // Add waves if during a storm
    if (currentEvent?.name === "storm") {
      const newWaves = getMatchingGridItems((item) => {
        return item.x == gridDimensions[0] - 1 && !!item.isWater && !item.waveStrength && Math.random() > 0.5;
      });
      newWaves.forEach((wave) => {
        updateGridItem(wave.y, wave.x, (gridItem) => {
          return { ...gridItem, waveStrength: 1 };
        });
      });
    }
  }
  , [turn]);

  const contextValue = {};
  
  return (
    <HazardContext.Provider value={contextValue}>
      {children}
    </HazardContext.Provider>
  );
};


export const useHazardContext = () => {
  return React.useContext(HazardContext);
}