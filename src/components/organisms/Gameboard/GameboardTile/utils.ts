import { GridItem } from "../../../../types/gameboard";
import { TileNeighbors } from "../Gameboard";

export const measureElevationOfGridItem = (gridItem?: GridItem) => {
  if (!gridItem) return -1;
  if (gridItem.isWater) return 0;
  if (gridItem.isRaised) return 2;
  return 1;
}

const hasDifferentElevations = (me: GridItem, neighbor1?: GridItem, neighbor2?: GridItem) => {
  if (!neighbor1 || !neighbor2) return false;
  const neighbor1Elevation = measureElevationOfGridItem(neighbor1);
  const neighbor2Elevation = measureElevationOfGridItem(neighbor2);
  const meElevation = measureElevationOfGridItem(me);

  return (neighbor1Elevation < meElevation && neighbor2Elevation < meElevation);
};

export type RoundedCorners = {
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
};

export const getRoundedCornersFromNeighbours = (me: GridItem, neighbours: TileNeighbors): RoundedCorners => {
  const roundedCorners = {
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false
  };

  if (hasDifferentElevations(me, neighbours.top, neighbours.left)) {
    roundedCorners.topLeft = true;
  }
  if ( hasDifferentElevations(me, neighbours.top, neighbours.right)) {
    roundedCorners.topRight = true;
  }
  if (hasDifferentElevations(me, neighbours.bottom, neighbours.left)) {
    roundedCorners.bottomLeft = true;
  }
  if (hasDifferentElevations(me, neighbours.bottom, neighbours.right)) {
    roundedCorners.bottomRight = true;
  }

  return roundedCorners;
}
