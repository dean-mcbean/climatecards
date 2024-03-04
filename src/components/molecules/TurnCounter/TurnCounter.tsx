/** @jsxImportSource @emotion/react */
import { useTimeContext } from "../../../context/TimeProvider";
import { HazardEvent } from "../../../types/events";
import { MdSunny } from "react-icons/md";
import { TurnStep, turnContainer, previousTurnContainer, upcomingTurnContainer, currentTurnContainer, subtitle, eventStartPointer, turnNum, eventStartContext } from "./TurnCounter.styles";

const dayRange = 5;


const TurnItem = ({turn, index, dayRange, upcomingEventsByStartTurn, upcomingEventsByEndTurn} : {
  turn: number;
  index: number;
  dayRange: number;
  upcomingEventsByStartTurn: {[key:number]: HazardEvent};
  upcomingEventsByEndTurn: {[key:number]: HazardEvent};
}) => {
  return (
    <div key={turn} css={TurnStep(turn, index, dayRange)}>
      <div css={turnNum}>
        &#x2022;<br/>{turn}
      </div>
      {
        upcomingEventsByStartTurn[turn] && (
          <>
            <div css={eventStartPointer('start')}>{upcomingEventsByStartTurn[turn].icon}
            <div css={eventStartContext} className="event-context">
              {upcomingEventsByStartTurn[turn].name.toUpperCase()}
              <p>In {index} days</p>
            </div></div>
          </>
        )
      }
      {
        upcomingEventsByEndTurn[turn] && (
          <div css={eventStartPointer('end')}>
            <MdSunny />
            <div css={eventStartContext} className="event-context">
              SAFE
              <p>In {index} days</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export const TurnCounter = () => {
  const { upcomingEvents, currentEvent, turn } = useTimeContext();
  const upcomingEventsByStartTurn = upcomingEvents.reduce((acc: {[key:number]: HazardEvent}, event) => {
    acc[event.start_turn] = event;
    return acc;
  }, {});
  const upcomingEventsByEndTurn = upcomingEvents.reduce((acc: {[key:number]: HazardEvent}, event) => {
    acc[event.end_turn] = event;
    return acc;
  }, {});
  if (currentEvent) {
    upcomingEventsByEndTurn[currentEvent.end_turn] = currentEvent;
  }

  const previous_turns = []
  const upcoming_turns = []

  console.log(turn)

  for (let i = -dayRange + 1; i < 1; i++) {
    const step_turn = i + turn
    previous_turns.push(TurnItem({turn: step_turn, index: i, dayRange, upcomingEventsByStartTurn, upcomingEventsByEndTurn})
    )
  }

  for (let i = 0; i <= dayRange + 1; i++) {
    const step_turn = i + turn
    upcoming_turns.push(TurnItem({turn: step_turn, index: i, dayRange, upcomingEventsByStartTurn, upcomingEventsByEndTurn}))
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