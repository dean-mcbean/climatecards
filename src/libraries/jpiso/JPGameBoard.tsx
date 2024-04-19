/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useGameboardContext } from "../../context/GameboardProvider";
import { JPArtboard } from "../jpart"
import { JPObject } from "../jpart/components/JPCanvas";
import JPAnimationGroup from "../jpart/components/JPAnimationGroup";
import { gridItemToObject } from "./tile/tile";
import { neighboringGridItems } from "./utils";

interface JPGameBoardProps {
}


export const JPGameBoard = () => {

  const { grid } = useGameboardContext();

  const [objects, setObjects] = useState<JPObject[]>([]);

  const [seed, setSeed] = useState<number>(0);

  useEffect(() => {
    setSeed(Math.round(Math.random() * 100000));
  }, []);


  useEffect(() => {
    const newObjects = grid.map((row, rowIndex) => {
      return row.map((gridItem, colIndex) => {
        return gridItemToObject(gridItem, neighboringGridItems(gridItem, grid), seed);
      });
    });
    const animationGroup = new JPAnimationGroup(30);
    for (let newObject of newObjects.flat()) {
      animationGroup.addChild(newObject);
    }
    setObjects([animationGroup]);
  }, [grid]);

  return (
    <JPArtboard canvases={[{id: '1', type: 'static'}]} objects={objects} />
  )
}