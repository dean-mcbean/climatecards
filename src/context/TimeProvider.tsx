import React, { ReactNode, useEffect } from "react";
import { HazardEvent } from "../types/events";
import { randomHazardEvent } from "../data/events/eventBuilder";
import { palette } from "../theme/palette";
import { HazardName, hazardNames } from "../data/hazards/presets";


export type TimeContextType = {
  turn: number;
  nextTurn: () => void;
  season: string;
  year: number;
  hazard: HazardName | null;
};


export const TimeContext = React.createContext<TimeContextType>({
  turn: 0,
  nextTurn: () => {},
  season: "Summer",
  year: 2000,
  hazard: null,
});


export const TimeProvider = ({ children }: {children: ReactNode}) => {
  const [turn, setTurn] = React.useState(1);
  const [season, setSeason] = React.useState("Summer");
  const [year, setYear] = React.useState(2000);
  const [hazard, setHazard] = React.useState<HazardName | null>(null);

  const nextTurn = () => {
    setTurn((prevTurn) => {
      prevTurn += 1;

      // Set the hazard
      setHazard([...hazardNames, null][Math.floor(Math.random() * (hazardNames.length + 1))]);

      // Update season
      const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];
      setSeason(seasons[prevTurn % 4]);

      // Update year
      if (prevTurn % 4 === 0) {
        setYear((prevYear) => prevYear + 1);
      }

      return prevTurn;
    });

  }
  const contextValue = { 
    turn, 
    nextTurn, 
    season,
    year,
    hazard
  };
  
  return (
    <TimeContext.Provider value={contextValue}>
      {children}
    </TimeContext.Provider>
  );
};


export const useTimeContext = () => {
  return React.useContext(TimeContext);
}