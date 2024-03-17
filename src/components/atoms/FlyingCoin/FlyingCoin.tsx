/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flyingCoinContainer, flyingCoinScaleWrapper } from "./FlyingCoin.styles";
import { Bezier } from "bezier-js";
import { TbCoinFilled } from "react-icons/tb";

export interface FlyingCoinProps {
  coin_id?: string;
  start_location: {
    x: number;
    y: number;
  };
  end_location: {
    x: number;
    y: number;
  };
  duration: number;
  onFinish?: (id?: string) => void;
}

export const FlyingCoin = ({ coin_id, start_location, end_location, duration, onFinish }: FlyingCoinProps) => {
  const positionRef = useRef(start_location);
  const [_, setRender] = useState(0); // This state is used to trigger re-renders
  const finished = useRef(false);

  const minY = useMemo(() => Math.min(start_location.y, end_location.y), [start_location, end_location]);

  const randomXOffset = useMemo(() => Math.random() * 150 - 75, []);
  const randomYOffset = useMemo(() => Math.random() * 80 - 40, []);

  const b = useMemo(() => 
    new Bezier([start_location.x, start_location.y, start_location.x + randomXOffset, minY - 100 + randomYOffset, end_location.x + randomXOffset, minY - 100 + randomYOffset, end_location.x, end_location.y]), 
  [start_location, end_location]);


  const startTimeRef = useRef(Date.now());

  const progressAnimation = useCallback(() => {
    const t = (Date.now() - startTimeRef.current) / duration;
    if (t > 1) {
      if (!finished.current) {
        finished.current = true;
        setRender(prev => prev + 1); // Trigger a re-render
      }
      console.log("RUNNING NOW", coin_id)
      onFinish?.(coin_id);
      return;
    };
    positionRef.current = b.get(t);
    setRender(prev => prev + 1); // Trigger a re-render

    requestAnimationFrame(progressAnimation);
  }, [b, duration]);

  const startAnimation = useCallback(() => {
    startTimeRef.current = Date.now();
    progressAnimation();
  }, [progressAnimation]);

  const hasStarted = useRef(false);
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    startAnimation();
  }, [startAnimation]);

  return (
    <div key={coin_id} css={flyingCoinContainer(positionRef.current, finished.current)}>
      <div css={flyingCoinScaleWrapper}>
        <TbCoinFilled />
      </div>
    </div>
  );
};