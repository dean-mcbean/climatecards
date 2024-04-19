/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import JPShape from "./JPShape"
import JPGroup from "./JPGroup";
import JPAnimationGroup from "./JPAnimationGroup";

export type JPObject = JPGroup | JPShape | JPAnimationGroup;

interface JPCanvasProps {
  objects: JPObject[]
  frame: number
  type: 'animated' | 'static'
}


export const JPCanvas = ({ objects, frame, type }: JPCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each shape on the canvas
      objects.forEach(object => {
        object.draw(ctx, 0);
      });
    }
  }, [objects]);

  useEffect(() => {
    if (type !== 'animated') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each shape on the canvas
      objects.forEach(object => {
        object.draw(ctx, frame);
      });
    }
  }, [objects, frame]);

  return (
    <canvas ref={canvasRef} height={800} width={1000} />
  )
}
