/** @jsxImportSource @emotion/react */

import { useTimeContext } from "../../../context/TimeProvider";
import { activeHazardContainer, activeHazardContent, activeHazardHeader } from "./ActiveHazard.styles";
import { IoIosSunny } from "react-icons/io";

export const ActiveHazard = () => {
  const { currentEvent } = useTimeContext();
  if (!currentEvent) return (
    <div css={activeHazardContainer}>
      <div css={activeHazardHeader(false)}><IoIosSunny css={{
        position: 'relative',
        top: '5px',
      }} /> Safe</div>
      <div css={activeHazardContent(false)}>
      </div>
    </div>
  )

  return (
    <div css={activeHazardContainer}>
      <div css={activeHazardHeader(true)}>{currentEvent?.icon}{currentEvent?.name}</div>
      <div css={activeHazardContent(true)}>
        {currentEvent?.description}
      </div>
    </div>
  )
}