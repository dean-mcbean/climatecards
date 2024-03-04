import React, { ReactNode, useEffect } from "react";
import { HazardEvent } from "../types/events";
import { randomHazardEvent } from "../data/events/eventBuilder";


type TimeContextType = {
  turn: number;
  nextTurn: () => void;
  upcomingEvents: HazardEvent[];
  currentEvent: HazardEvent | null;
  pastEvents: HazardEvent[];
};


export const TimeContext = React.createContext<TimeContextType>({
  turn: 0,
  nextTurn: () => {},
  upcomingEvents: [],
  currentEvent: null,
  pastEvents: [],
});


export const TimeProvider = ({ children }: {children: ReactNode}) => {
  const [turn, setTurn] = React.useState(1);
  const nextTurn = () => {
    setTurn((prevTurn) => {
      prevTurn += 1;

      // Check for upcoming events
      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        if (nextEvent.start_turn === prevTurn) {
          setCurrentEvent(nextEvent);
          setUpcomingEvents((prevEvents) => prevEvents.slice(1));
          console.log('set')
        }
      }

      // Check for current event ending
      console.log(currentEvent, prevTurn)
      if (currentEvent !== null && currentEvent.end_turn === prevTurn) {
        setPastEvents((prevEvents) => [...prevEvents, currentEvent]);
        setCurrentEvent(null);
      }

      return prevTurn;
    });

  }

  const [upcomingEvents, setUpcomingEvents] = React.useState<HazardEvent[]>([]);
  const [currentEvent, setCurrentEvent] = React.useState<HazardEvent | null>(null);
  const [pastEvents, setPastEvents] = React.useState<HazardEvent[]>([]);

  const contextValue = { turn, nextTurn, upcomingEvents, currentEvent, pastEvents};

  useEffect(() => {
    if (upcomingEvents.length === 0) {
      const randomTurns = Math.floor(Math.random() * 3) + 6;
      const newEvent: HazardEvent = randomHazardEvent({
          start_turn: turn + randomTurns,
          end_turn: turn + randomTurns + 3,
        });
      setUpcomingEvents((prevEvents) => [...prevEvents, newEvent]);
    }

  }, [turn, setUpcomingEvents]);

  console.log(upcomingEvents)
  
  return (
    <TimeContext.Provider value={contextValue}>
      {children}
    </TimeContext.Provider>
  );
};


export const useTimeContext = () => {
  return React.useContext(TimeContext);
}