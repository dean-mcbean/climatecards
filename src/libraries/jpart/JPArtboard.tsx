/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { artboardCanvas, artboardContainer } from "./JPArtboard.styles";
import { JPCanvas, JPObject } from "./components/JPCanvas";
import JPShape from "./components/JPShape";
import JPGroup from "./components/JPGroup";
import JPAnimationGroup from "./components/JPAnimationGroup";

type CanvasType = {
  id: string;
  type: 'animated' | 'static';
}

interface JPArtboardProps {
  canvases: CanvasType[];
  objects: JPObject[];
}

export const JPArtboard = ({ objects, canvases }: JPArtboardProps) => {


  const [frame, setFrame] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div css={artboardContainer}>
      {canvases.map((canvas) => (
        <div key={canvas.id} css={artboardCanvas}>
          <JPCanvas objects={objects} frame={frame} type={canvas.type} />
        </div>
      ))}
    </div>
  );
}

/* , animations: [
      {
        attribute: 'y',
        start: 30,
        end: 50,
        type: 'sine'
      }
    ] } */