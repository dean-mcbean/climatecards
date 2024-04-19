import { GridItem } from "../../../types/gameboard";
import JPShape from "../../jpart/components/JPShape";
import { GILower, colorPaletteForGriditem, gridItemUnits, intp } from "../utils";

const tileCoords = {
  topCorner: {
    x: 50,
    y: 10 - gridItemUnits / 2,
  },
  rightCorner: {
    x: 50 + gridItemUnits,
    y: 10,
  },
  bottomCorner: {
    x: 50,
    y: 10 + gridItemUnits /2,
  },
  leftCorner: {
    x: 50 - gridItemUnits,
    y: 10,
  }
}

function coloredCorners(seed: number, x: number, y: number) {
  x += seed;
  y += seed;
  x *= 2;
  y *= 2;
  const sinewave_x = Math.sin(x/2) * Math.sin(x/3);
  const sinewave_y = Math.sin(y/2) * Math.sin(y/3);
  return ((sinewave_x + sinewave_y + 2) / 4) > 0.5;
}

function crossPointGen(seed: number, x: number, y: number) {
  return 0.5;
  x += 1111 + seed;
  y += 1111 + seed;
  const sinewave_x = Math.sin(x/2) * Math.sin(x/3);
  const sinewave_y = Math.sin(y/2) * Math.sin(y/3);
  return Math.floor((sinewave_x + sinewave_y + 2) / 4 * 3) / 4 + 0.25;
}

function getSideCoords(side: 'top' | 'right' | 'bottom' | 'left', crossPoint: number) {
  let left = {x:0, y:0}
  let right = {x:0, y:0}
  switch (side) {
    case 'top':
      left = {...tileCoords.topCorner}
      right = {...tileCoords.rightCorner};
      break;
    case 'right':
      left = {...tileCoords.rightCorner};
      right = {...tileCoords.bottomCorner};
      break;
    case 'bottom':
      left = {...tileCoords.bottomCorner};
      right = {...tileCoords.leftCorner};
      break;
    case 'left':
      left = {...tileCoords.leftCorner};
      right = {...tileCoords.topCorner};
      break;
  }
  const x = intp(left.x, right.x, crossPoint);
  const y = intp(left.y, right.y, crossPoint);
  return {x, y}
}

function projectCoordsOntoTile(ux: number, uy: number, rotations: number = 0) {
  let temp_x = 0, temp_y = 0;
  switch (rotations) {
    case 0:
      temp_x = ux;
      temp_y = uy;
      break;
    case 1:
      temp_x = 1 - uy;
      temp_y = ux;
      break;
    case 2:
      temp_x = 1 - ux;
      temp_y = 1 - uy;
      break;
    case 3:
      temp_x = uy;
      temp_y = 1 - ux;
      break;
  } 
  const x = 50 + (temp_x - temp_y) * gridItemUnits;
  const y = 10 + (temp_x + temp_y) * gridItemUnits / 2 - gridItemUnits / 2;
  //console.log("WHAT", ux, uy, x, y, rotations)
  return {x, y}
}
const pcot = projectCoordsOntoTile;

function generateTilePattern (gridItem: GridItem, neighboringGridItems: {[key: string]: GridItem | undefined}, seed: number) {
  const colorPalette = colorPaletteForGriditem(gridItem);

  const shapes = []

  // set math random seed
  if (gridItem.isRaised) seed += 898989;

  const lightCorners = [
    coloredCorners(seed, gridItem.x, gridItem.y),
    coloredCorners(seed, gridItem.x + 1, gridItem.y),
    coloredCorners(seed, gridItem.x + 1, gridItem.y + 1),
    coloredCorners(seed, gridItem.x, gridItem.y + 1),
  ]

  const crossPoints = [
    crossPointGen(seed, gridItem.x + 23232, gridItem.y + 23232),
    crossPointGen(seed, gridItem.x + 1, gridItem.y),
    crossPointGen(seed, gridItem.x + 23232, gridItem.y + 1 + 23232),
    crossPointGen(seed, gridItem.x, gridItem.y),
  ]
  console.log(lightCorners, gridItem)

  if (!lightCorners.some(c => c)) return [];

  const unitShapes = []
  let rotations = 0;
  if (lightCorners.every(c => c)) {
    unitShapes.push([
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 1},
    ])

  } else {

    while (!lightCorners[0] || lightCorners[3]) {
      lightCorners.push(lightCorners.shift() as boolean);
      crossPoints.push(crossPoints.shift() as number);
      rotations++;
    }
    console.log(rotations)
  
    if (Object.values(lightCorners).filter(c => c).length === 1) {
      unitShapes.push([
        {x: 0, y: 0},
        {x: crossPoints[0], y: 0},
        {x: crossPoints[0], y: crossPoints[3], r: 6},
        {x: 0, y: crossPoints[3]},
      ])
    } else if (Object.values(lightCorners).filter(c => c).length === 2) {
      if (lightCorners[1]) {
        // light corners are adjacent
        unitShapes.push([
          {x: 0, y: 0},
          {x: 1, y: 0},
          {x: 1, y: crossPoints[1]},
          {x: crossPoints[0], y: crossPoints[1], r: 4},
          {x: crossPoints[0], y: crossPoints[3], r: 4},
          {x: 0, y: crossPoints[3]},
        ])
      } else {
        // light corners are opposite
        unitShapes.push([
          {x: 0, y: 0},
          {x: crossPoints[0], y: 0},
          {x: crossPoints[0], y: crossPoints[3], r: 6},
          {x: 0, y: crossPoints[3]},
        ])
        unitShapes.push([
          {x: 1, y: 1},
          {x: crossPoints[2], y: 1},
          {x: crossPoints[2], y: crossPoints[1], r: 6},
          {x: 1, y: crossPoints[1]},
        ])
      }
    } else if (Object.values(lightCorners).filter(c => c).length === 3) {
      unitShapes.push([
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: crossPoints[2], y: 1},
        {x: crossPoints[2], y: crossPoints[3], r: 8},
        {x: 0, y: crossPoints[3]},
      ])
    } else if (Object.values(lightCorners).filter(c => c).length === 4) {
      unitShapes.push([
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
      ])
    }

  }

  //unrotate
  //console.log(unitShapes, rotations)
  for (let unitShape of unitShapes) {
    const shape = new JPShape({style: {
      fill: colorPalette.light + '80',
      stroke: 'transparent',
    }});
    for (let point of unitShape) {
      //console.log('point', point)
      const {x, y} = pcot(point.x, point.y, rotations);
      //console.log(x,y)
      shape.setPoint({index: shape.path.length, x, y, type: 'round', radius: point.r || 0});
    }
    shapes.push(shape);
  }
  console.log(unitShapes)


  return shapes;
}



export function getTerrainPattern (gridItem: GridItem, neighboringGridItems: {[key: string]: GridItem | undefined}, seed: number) {

  const shapes = generateTilePattern(gridItem, neighboringGridItems, seed);

  // set math random seed



  /* if (lightCorners.topLeft) {
    const topLeft = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    topLeft.setPoint({ index: 0, x: 40, y: -5, type: 'sharp'});
    topLeft.setPoint({ index: 1, x: 50, y: 0, type: 'round', radius: 20});
    topLeft.setPoint({ index: 2, x: 60, y: -5, type: 'sharp'});
    topLeft.setPoint({ index: 3, x: 50, y: -10, type: 'sharp'});
    shapes.push(topLeft);
  }
  if (lightCorners.bottomRight) {
    const bottomRight = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    bottomRight.setPoint({ index: 0, x: 60, y: 25, type: 'sharp'});
    bottomRight.setPoint({ index: 1, x: 50, y: 20, type: 'round', radius: 20});
    bottomRight.setPoint({ index: 2, x: 40, y: 25, type: 'sharp'});
    bottomRight.setPoint({ index: 3, x: 50, y: 30, type: 'sharp'});
    shapes.push(bottomRight);
  }
  if (lightCorners.bottomLeft) {
    const bottomLeft = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    bottomLeft.setPoint({ index: 0, x: 20, y: 5, type: 'sharp'});
    bottomLeft.setPoint({ index: 1, x: 30, y: 10, type: 'round', radius: 4});
    bottomLeft.setPoint({ index: 2, x: 20, y: 15, type: 'sharp'});
    bottomLeft.setPoint({ index: 3, x: 10, y: 10, type: 'sharp'});
    shapes.push(bottomLeft);
  }
  if (lightCorners.topRight) {
    const topRight = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    topRight.setPoint({ index: 0, x: 80, y: 5, type: 'sharp'});
    topRight.setPoint({ index: 1, x: 70, y: 10, type: 'round', radius: 4});
    topRight.setPoint({ index: 2, x: 80, y: 15, type: 'sharp'});
    topRight.setPoint({ index: 3, x: 90, y: 10, type: 'sharp'});
    shapes.push(topRight);
  } */
  

  return shapes
}