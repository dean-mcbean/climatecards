import { GridItem } from "../../../types/gameboard";
import JPGroup from "../../jpart/components/JPGroup";
import JPShape from "../../jpart/components/JPShape";
import { GILower, colorPaletteForGriditem, cornerProperties, gridItemPixels, gridItemUnits, heightOfGridItem } from "../utils";
import { getTerrainPattern } from "./grasspattern";

export function createBeachWaves (gridItem: GridItem, neighboringGridItems: {[key: string]: GridItem | undefined}) {

  const colorPalette = colorPaletteForGriditem(gridItem);

  const shapes = []

  
  if (GILower(gridItem, neighboringGridItems.top)) {
    const topWaves = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    topWaves.setPoint({ index: 0, x: 40, y: -5, type: 'sharp'});
    topWaves.setPoint({ index: 1, x: 80, y: 15, type: 'sharp'});
    topWaves.setPoint({ index: 2, x: 90, y: 10, type: 'sharp'});
    topWaves.setPoint({ index: 3, x: 50, y: -10, type: 'sharp'});
    shapes.push(topWaves);
  }

  if (GILower(gridItem, neighboringGridItems.left)) {
    const leftWaves = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    leftWaves.setPoint({ index: 0, x: 10, y: 10, type: 'sharp'});
    leftWaves.setPoint({ index: 1, x: 50, y: -10, type: 'sharp'});
    leftWaves.setPoint({ index: 2, x: 60, y: -5, type: 'sharp'});
    leftWaves.setPoint({ index: 3, x: 20, y: 15, type: 'sharp'});
    shapes.push(leftWaves);
  }

  if (GILower(gridItem, neighboringGridItems.topLeft) && !GILower(gridItem, neighboringGridItems.top) && !GILower(gridItem, neighboringGridItems.left)) {
    const topLeftWaves = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    topLeftWaves.setPoint({ index: 0, x: 40, y: -5, type: 'sharp'});
    topLeftWaves.setPoint({ index: 1, x: 50, y: 0, type: 'round', radius: 20});
    topLeftWaves.setPoint({ index: 2, x: 60, y: -5, type: 'sharp'});
    topLeftWaves.setPoint({ index: 3, x: 50, y: -10, type: 'sharp'});
    shapes.push(topLeftWaves);
    const topLeftWaves2 = new JPShape({style: {
      fill: colorPalette.light,
      stroke: 'transparent',
    }});
    topLeftWaves2.setPoint({ index: 0, x: 40, y: -15, type: 'sharp'});
    topLeftWaves2.setPoint({ index: 1, x: 50, y: -10, type: 'round', radius: 20});
    topLeftWaves2.setPoint({ index: 2, x: 60, y: -15, type: 'sharp'});
    topLeftWaves2.setPoint({ index: 3, x: 50, y: -10, type: 'sharp'});
    shapes.push(topLeftWaves2);
  }

  return shapes;
}

export function gridItemToObject (gridItem: GridItem, neighboringGridItems: {[key: string]: GridItem | undefined}, seed: number = 0): JPGroup | JPShape {


  const colorPalette = colorPaletteForGriditem(gridItem);
  const cornerProps = cornerProperties(gridItem, neighboringGridItems);
  const cornerInset = {
    top: cornerProps.top.lower || cornerProps.top.higher ? 4 : 0,
    right: cornerProps.right.lower ? 8 : 0,
    bottom: cornerProps.bottom.lower ? 4 : 0,
    left: cornerProps.left.lower ? 8 : 0,
  }

  const height = (heightOfGridItem(gridItem) + 1) * gridItemPixels * 3;
  
  const leftSide = new JPShape({style: {
    fill: colorPalette.dark,
    stroke: 'transparent',
  }});
  leftSide.setPoint({ index: 0, x: 50 - gridItemUnits + cornerInset.left, y: 10, type: 'sharp'});
  leftSide.setPoint({ index: 1, x: 50, y: 30 - cornerInset.bottom, type: 'sharp'});
  leftSide.setPoint({ index: 2, x: 50, y: 30 + height, type: 'sharp'});
  leftSide.setPoint({ index: 3, x: 50 - gridItemUnits + cornerInset.left, y: 10 + height, type: 'round', radius: cornerProps.left.lower ? 12 : 0});

  const rightSide = new JPShape({style: {
    fill: colorPalette.dark,
    stroke: 'transparent',
  }});
  rightSide.setPoint({ index: 0, x: 50 + gridItemUnits - cornerInset.right, y: 10, type: 'sharp'});
  rightSide.setPoint({ index: 1, x: 50, y: 30 - cornerInset.bottom, type: 'sharp'});
  rightSide.setPoint({ index: 2, x: 50, y: 30 + height, type: 'sharp'});
  rightSide.setPoint({ index: 3, x: 50 + gridItemUnits - cornerInset.right, y: 10 + height, type: 'sharp' });

  const topSide = new JPShape({style: {
    fill: colorPalette.main,
    stroke: 'transparent',
  }});
  topSide.setPoint({ index: 0, x: 50 - gridItemUnits, y: 10, type: 'round', radius: cornerProps.left.lower ? 6 : 0});
  topSide.setPoint({ index: 1, x: 50, y: 30, type: 'round', radius: cornerProps.bottom.lower ? 12 : 0});
  topSide.setPoint({ index: 2, x: 50 + gridItemUnits, y: 10, type: 'round', radius: cornerProps.right.lower ? 6 : 0});
  topSide.setPoint({ index: 3, x: 50, y: -10, type: 'round', radius: cornerProps.top.lower ? 12 : 0});

  const testGroup = new JPGroup();
  const ypos = (gridItem.y + gridItem.x) * gridItemPixels + (gridItem.isRaised ? -gridItemPixels : 0) - (gridItem.isWater ? 0 : gridItemPixels);
  const xpos = 2 * (gridItem.x - gridItem.y) * gridItemPixels;
  testGroup.setPosition(xpos + 100, 50 + ypos);
  testGroup.addChild(leftSide);
  testGroup.addChild(rightSide);
  testGroup.addChild(topSide);

  if (!gridItem.isWater) {
    for (let shape of getTerrainPattern(gridItem, neighboringGridItems, seed)) {
      testGroup.addChild(shape);
      console.log(shape,topSide, 'sja[e]')
    }
  }

  if (gridItem.isWater) {
    for (let wave of createBeachWaves(gridItem, neighboringGridItems)) {
      testGroup.addChild(wave);
    }
  };

  return testGroup
}
