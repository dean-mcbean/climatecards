/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useTimeContext } from "../../../context/TimeProvider";
import { countdownContainer } from "./Countdown.styles";
import { palette } from "../../../theme/palette";

interface CountdownProps {
  max: number;
  value: number;
  color: string;
  backgroundColor: string;
  onFinish?: () => void;
}

export const Countdown = ({ max, value, color, backgroundColor, onFinish }: CountdownProps) => {
  const [offset, setOffset] = useState(0);
  const radius = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;

  useEffect(() => {
    const strokeDashoffset = ((max - value) / max) * circumference;
    setOffset(strokeDashoffset);
  }, [value, max, circumference]);

  return (
    <div css={countdownContainer(value !== 0, backgroundColor)}>
      <svg width="16px" height="16px">
        <circle
          r={radius}
          cx="8"
          cy="8"
          fill="transparent"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
      </svg>
    </div>
  );
};
