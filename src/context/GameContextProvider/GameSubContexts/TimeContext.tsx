import { useEffect, useRef, useState } from "react";
import { useFrames } from "../../../hooks/useFrames/useFrames";
import { DailySchedule } from "../../../definitions/time/timeDefinitions";

const framesPerDay = 120;
const scheduleFramesPerDay = 30;

export type TimeContextType = {
  frame: number,
  day: number,
  time: number,
  fastForwardDay: () => void
}

export const defaultTimeContext: TimeContextType = {
  frame: 0,
  day: 0,
  time: 0,
  fastForwardDay: () => {},
}

export const TimeContext = (paused: boolean): TimeContextType => {
  const [fastForwarding, setFastForwarding] = useState<boolean>(false);
  const frame = useFrames(fastForwarding ? 60 : undefined);

  const [timeFrames, setTimeFrames] = useState(1); // Frames that are not paused
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (timeFrames % framesPerDay === 0) {
      setDay(day + 1);
      setFastForwarding(false);
    }
    setTime((timeFrames % framesPerDay) / framesPerDay);
  }, [timeFrames, paused]);

  useEffect(() => {
    if (!paused) {
      setTimeFrames(timeFrames + 1);
    }
  }, [frame, paused]);
  
  const fastForwardDay = () => {
    setFastForwarding(true);
  }

  // Schedule
  const dailyEventsCount = useRef(0);
  const [dailySchedule, setDailySchedule] = useState<DailySchedule>({}); // [callback, frequency]
  const scheduleDailyEvent = (callback: () => void, {frequencyPerDay}:{frequencyPerDay?: number}): number => {
    const id = dailyEventsCount.current;
    dailyEventsCount.current++;
    const ticksBetweenTriggers = frequencyPerDay ? scheduleFramesPerDay / frequencyPerDay : scheduleFramesPerDay;
    const newDailySchedule = {...dailySchedule, id: {
        callback,
        ticksBetweenTriggers,
        ticksTillNextTrigger: ticksBetweenTriggers
      }};
    setDailySchedule(newDailySchedule);
    return id;
  }
  const unscheduleDailyEvent = (id: number) => {
    const newDailySchedule = {...dailySchedule};
    delete newDailySchedule[id];
    setDailySchedule(newDailySchedule);
  }

  // Schedule effects
  useEffect(() => {
    const newDailySchedule = {...dailySchedule};
    Object.entries(dailySchedule).forEach(([id, event]) => {
      if (event.ticksTillNextTrigger === 0) {
        event.callback();
        event.ticksTillNextTrigger = event.ticksBetweenTriggers;
      } else {
        event.ticksTillNextTrigger--;
      }
      newDailySchedule[id] = event;
    });
    setDailySchedule(newDailySchedule);
  }, [frame]);

  return {
    frame,
    day,
    time,
    fastForwardDay,
  }
}