import { GridItem } from "../../types/gameboard"

export const gridItemPixels = 6.5
export const gridItemUnits = gridItemPixels * 6.154
export const middleOfCanvas = 500

export function colorPaletteForGriditem (gridItem: GridItem) {
  if (gridItem.isWater) {
    return {
      light: '#edf0ff',
      dark: '#a2afcc',
      main: '#cbdbff'
    }
  } else if (gridItem.isRaised) {
    return {
      light: '#fbd69d',
      dark: '#e69c5d',
      main: '#feb95f'
    }
  } else {
    return {
      light: '#c6e0b2',
      dark: '#72b380',
      main: '#99cc84'
    }
  }
}

export function heightOfGridItem (gridItem: GridItem | undefined) {
  return gridItem ? (gridItem.isWater ? 0 : gridItem.isRaised ? 2 : 1) : -1;
}

export function GILower (gridItem: GridItem | undefined, gridItem2: GridItem | undefined) {
  return heightOfGridItem(gridItem) < heightOfGridItem(gridItem2);
}

export function GIHigher (gridItem: GridItem | undefined, gridItem2: GridItem | undefined) {
  return heightOfGridItem(gridItem) > heightOfGridItem(gridItem2);
}

export function cornerProperties (g: GridItem, n: {[key: string]: GridItem | undefined}) {
  return {
    top: {
      higher: GIHigher(n.topLeft, g) && GIHigher(n.top, g) && GIHigher(n.left, g),
      lower: GILower(n.topLeft, g) && GILower(n.top, g) && GILower(n.left, g),
    },
    right: {
      higher: GIHigher(n.topRight, g) && GIHigher(n.top, g) && GIHigher(n.right, g),
      lower: GILower(n.topRight, g) && GILower(n.top, g) && GILower(n.right, g),
    },
    bottom: {
      higher: GIHigher(n.bottomRight, g) && GIHigher(n.bottom, g) && GIHigher(n.right, g),
      lower: GILower(n.bottomRight, g) && GILower(n.bottom, g) && GILower(n.right, g),
    },
    left: {
      higher: GIHigher(n.bottomLeft, g) && GIHigher(n.bottom, g) && GIHigher(n.left, g),
      lower: GILower(n.bottomLeft, g) && GILower(n.bottom, g) && GILower(n.left, g),
    },
  }
}

export function neighboringGridItems (gridItem: GridItem, grid: GridItem[][]) {
  return {
    top: gridItem.y > 0 ? grid[gridItem.y - 1][gridItem.x] : undefined,
    bottom: gridItem.y < grid.length - 1 ? grid[gridItem.y + 1][gridItem.x] : undefined,
    left: gridItem.x > 0 ? grid[gridItem.y][gridItem.x - 1] : undefined,
    right: gridItem.x < grid[0].length - 1 ? grid[gridItem.y][gridItem.x + 1] : undefined,
    topLeft: gridItem.y > 0 && gridItem.x > 0 ? grid[gridItem.y - 1][gridItem.x - 1] : undefined,
    topRight: gridItem.y > 0 && gridItem.x < grid[0].length - 1 ? grid[gridItem.y - 1][gridItem.x + 1] : undefined,
    bottomLeft: gridItem.y < grid.length - 1 && gridItem.x > 0 ? grid[gridItem.y + 1][gridItem.x - 1] : undefined,
    bottomRight: gridItem.y < grid.length - 1 && gridItem.x < grid[0].length - 1 ? grid[gridItem.y + 1][gridItem.x + 1] : undefined,
  }
}

export function intp (a: number, b: number, t: number) {
  return (1 - t) * a + t * b;
}