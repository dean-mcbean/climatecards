/** @jsxImportSource @emotion/react */
import { useGameContext } from "../../../context/GameContextProvider/GameContextProvider";
import Typography from "../Typography/Typography";
import { dayAnnouncerContainer, dayParent } from "./DayAnnouncer.styles";


export default function DayAnnouncer() {

  const { day } = useGameContext();

  return (
    <div css={dayParent}>
    <div css={dayAnnouncerContainer(day % 2 == 0)}>
      <Typography variant="h3">Day {day}</Typography>
    </div>
    <div css={dayAnnouncerContainer(day % 2 == 1)}>
        <Typography variant="h3">Day {day}</Typography>
    </div>
    </div>
  );
}