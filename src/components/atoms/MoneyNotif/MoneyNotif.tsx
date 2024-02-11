/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import Typography from "../Typography/Typography";
import { moneyNotifContainer, moneyNotifParent } from "./MoneyNotif.styles";

export type MoneyNotifProps = {
  id: string | number;
  amount: number;
  handleAnimationEnd: (id: string | number) => void;
  x: number;
  y: number;
}


export function MoneyNotif({id, amount, handleAnimationEnd, x, y} : MoneyNotifProps){

  useEffect(() => {
    setTimeout(() => {
      handleAnimationEnd(id);
    }, 50000)
  }, []);

  const isPositive = amount >= 0;
  const formattedAmount = amount >= 1 ? `${isPositive ? "+" : "-"}${Math.abs(amount)}k` : `${isPositive ? "+" : "-"}${Math.abs(amount) * 1000}`;

  return (
    <div css={moneyNotifParent(x, y)}>
      <div css={moneyNotifContainer(amount, isPositive)}>
        <Typography variant="h4">
          {formattedAmount}
        </Typography>
      </div>
    </div>
  );
}