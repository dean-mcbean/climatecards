import React, { ReactNode, useEffect } from "react";
import { HazardEvent } from "../types/events";
import { randomHazardEvent } from "../data/events/eventBuilder";
import { palette } from "../theme/palette";


export type TimeContextType = {
  turn: number;
  nextTurn: () => void;
  upcomingEvents: HazardEvent[];
  currentEvent: HazardEvent | null;
  pastEvents: HazardEvent[];
  dayOfWeek: string;
  week: number;
};


export const TimeContext = React.createContext<TimeContextType>({
  turn: 0,
  nextTurn: () => {},
  upcomingEvents: [],
  currentEvent: null,
  pastEvents: [],
  dayOfWeek: "Monday",
  week: 1
});


export const TimeProvider = ({ children }: {children: ReactNode}) => {
  const [turn, setTurn] = React.useState(1);
  const [dayOfWeek, setDayOfWeek] = React.useState("Monday");
  const [week, setWeek] = React.useState(1);
  const nextTurn = () => {
    setTurn((prevTurn) => {
      prevTurn += 1;

      // Check for upcoming events
      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        if (nextEvent.start_turn === prevTurn) {
          setCurrentEvent(nextEvent);
          setUpcomingEvents((prevEvents) => prevEvents.slice(1));
          palette.setFilter(nextEvent.color, 0.05);
        }
      }

      // Check for current event ending
      if (currentEvent !== null && currentEvent.end_turn === prevTurn) {
        setPastEvents((prevEvents) => [...prevEvents, currentEvent]);
        setCurrentEvent(null);
        palette.clearFilter();
      }

      // Update day of week
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setDayOfWeek(days[prevTurn % 7]);

      // Update week
      setWeek(Math.floor(prevTurn / 7) + 1);

      return prevTurn;
    });

  }
  const [upcomingEvents, setUpcomingEvents] = React.useState<HazardEvent[]>([]);
  const [currentEvent, setCurrentEvent] = React.useState<HazardEvent | null>(null);
  const [pastEvents, setPastEvents] = React.useState<HazardEvent[]>([]);

  const contextValue = { 
    turn, 
    nextTurn, 
    upcomingEvents, 
    currentEvent, 
    pastEvents,
    dayOfWeek,
    week
  };

  useEffect(() => {
    if (upcomingEvents.length === 0) {
      let min_turn = turn;
      if (currentEvent) {
        min_turn = currentEvent.end_turn;
      }
      const randomTurns = Math.floor(Math.random() * 4) + 2 + min_turn;
      const newEvent: HazardEvent = randomHazardEvent({
          start_turn: randomTurns,
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