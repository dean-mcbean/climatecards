/** @jsxImportSource @emotion/react */
import { useTimeContext } from "../../../context/TimeProvider";
import { HazardEvent } from "../../../types/events";
import { WiSunrise } from "react-icons/wi";
import { TurnStep, turnContainer, previousTurnContainer, upcomingTurnContainer, currentTurnContainer, subtitle, eventStartPointer, turnNum, eventStartContext } from "./TurnCounter.styles";
import { MdKeyboardArrowRight } from "react-icons/md";

const dayRange = 5;


const TurnItem = ({turn, index, upcoming_turn_events} : {
  turn: number;
  index: number;
  upcoming_turn_events?: {0: string, 1: HazardEvent}[];
}) => {
  let turnEvent = null;
  if (upcoming_turn_events && upcoming_turn_events[index]) {
    switch (upcoming_turn_events[index][0]) {
      case 'event_ongoing':
        turnEvent = <><div css={eventStartPointer(upcoming_turn_events[index][1], turn)}>
          <MdKeyboardArrowRight />
        </div></>;
        break;
      case 'event_end':
        turnEvent = (
          <>
            <div css={eventStartPointer(upcoming_turn_events[index][1], turn)}>
              <WiSunrise css={{position: 'relative', top: '4px'}}/>
            <div css={eventStartContext} className="event-context">
              SAFE
              <p>In {index} days</p>
            </div></div>
          </>
        );
        break;
      default:
        const event = upcoming_turn_events[index][1];
        turnEvent = (
          <>
            <div css={eventStartPointer(upcoming_turn_events[index][1], turn)}>{event.icon}
            <div css={eventStartContext} className="event-context">
              {event.name.toUpperCase()}
              <p>In {index} days</p>
            </div></div>
          </>
        );
        break;
    }
  }
  return (
    <div key={turn} css={TurnStep(turn, index, dayRange)}>
      <div css={turnNum}>
        &#x2022;<br/>{turn}
      </div>
      {turnEvent}
    </div>
  )
}

export const TurnCounter = () => {
  const { upcomingEvents, pastEvents, currentEvent, turn } = useTimeContext();

  const upcoming_turn_events = new Array(dayRange + 1).fill(null);
  const trySet = (turnIndex: number, status: string, event: HazardEvent | null) => {
    console.log('trySet', turnIndex, event)
    if (event && upcoming_turn_events[turnIndex - turn] !== undefined) {
      upcoming_turn_events[turnIndex - turn] = [status, event];
    }
  }
  const eventEndedThisTurn = pastEvents.filter((event: HazardEvent) => event.end_turn === turn);
  if (eventEndedThisTurn.length > 0) {
    trySet(turn, 'event_end', eventEndedThisTurn[0]);
  }

  ([currentEvent, ...upcomingEvents]).forEach((event: HazardEvent | null) => {
    if (!event) return;
    console.log(event, turn)
    if (event.start_turn - turn <= dayRange) {
      trySet(event.start_turn, 'event_start', event);
      for (let i = event.start_turn + 1; i <= turn + dayRange + 1; i++) {
        if (i === event.end_turn) {
          trySet(i, 'event_end', event)
          break;
        }else {
          trySet(i, 'event_ongoing', event)
        }
      }
    }
  })

  const previous_turns = []
  const upcoming_turns = []

  console.log(turn)

  for (let i = -dayRange; i < 1; i++) {
    const step_turn = i + turn
    previous_turns.push(TurnItem({turn: step_turn, index: i}))
  }

  for (let i = 0; i <= dayRange + 1; i++) {
    const step_turn = i + turn
    upcoming_turns.push(TurnItem({turn: step_turn, index: i, upcoming_turn_events}))
  }

  return (
    <div css={turnContainer}>
      <div css={previousTurnContainer}>
        {previous_turns}
      </div>
      <div css={currentTurnContainer}>
        DAY&nbsp;
        {turn}
        <div css={subtitle}>HOT HOUSE</div>
      </div>
      <div css={upcomingTurnContainer}>
        {upcoming_turns}
      </div>
    </div>
  );
};