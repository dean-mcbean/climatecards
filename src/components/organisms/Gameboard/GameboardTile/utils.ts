import { GridItem } from "../../../../types/gameboard";
import { TileNeighbors } from "../Gameboard";

export const measureElevationOfGridItem = (gridItem?: GridItem) => {
  if (!gridItem) return -1;
  if (gridItem.isWater) return 0;
  if (gridItem.isRaised) return 2;
  return 1;
}

const hasLowerElevations = (me: GridItem, neighbor1?: GridItem, neighbor2?: GridItem) => {
  const neighbor1Elevation = measureElevationOfGridItem(neighbor1);
  const neighbor2Elevation = measureElevationOfGridItem(neighbor2);
  const meElevation = measureElevationOfGridItem(me);

  return (neighbor1Elevation < meElevation && neighbor2Elevation < meElevation);
};

const hasHigherElevations = (me: GridItem, neighbor1?: GridItem, neighbor2?: GridItem) => {
  const neighbor1Elevation = measureElevationOfGridItem(neighbor1);
  const neighbor2Elevation = measureElevationOfGridItem(neighbor2);
  const meElevation = measureElevationOfGridItem(me);

  return (neighbor1Elevation > meElevation && neighbor2Elevation > meElevation);
}

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

  if (hasLowerElevations(me, neighbours.top, neighbours.left)) {
    roundedCorners.topLeft = true;
  }
  if ( hasLowerElevations(me, neighbours.top, neighbours.right)) {
    roundedCorners.topRight = true;
  }
  if (hasLowerElevations(me, neighbours.bottom, neighbours.left)) {
    roundedCorners.bottomLeft = true;
  }
  if (hasLowerElevations(me, neighbours.bottom, neighbours.right)) {
    roundedCorners.bottomRight = true;
  }

  return roundedCorners;
}


export const getProjectedRoundedCornersFromNeighbours = (me: GridItem, neighbours: TileNeighbors): RoundedCorners => {
  const roundedCorners = {
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false
  };

  if (hasHigherElevations(me, neighbours.top, neighbours.left)) {
    roundedCorners.topLeft = true;
  }
  if (hasHigherElevations(me, neighbours.top, neighbours.right)) {
    roundedCorners.topRight = true;
  }
  if (hasHigherElevations(me, neighbours.bottom, neighbours.left)) {
    roundedCorners.bottomLeft = true;
  }
  if (hasHigherElevations(me, neighbours.bottom, neighbours.right)) {
    roundedCorners.bottomRight = true;
  }

  return roundedCorners;
}