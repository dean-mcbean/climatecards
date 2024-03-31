/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { flyingCoinContainer, flyingCoinScaleWrapper } from "./FlyingCoin.styles";
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
  useEffect(() => {
    setTimeout(() => {
      onFinish?.(coin_id);
    }, duration);
  }, []);

  return (
    <div key={coin_id} css={flyingCoinContainer(start_location, end_location, duration)}>
      <div css={flyingCoinScaleWrapper}>
        <TbCoinFilled />
      </div>
    </div>
  );
};