import { GridItem } from "../../types/gameboard";

type GenerateTerrainProps = {
  landInset: number;
  waterInset: number;
  gridDimensions: number[];
}

export const generateTerrain = ({landInset, waterInset, gridDimensions}: GenerateTerrainProps): GridItem[][] => {
  const coastRange = gridDimensions[0] - landInset - waterInset;
  const newGrid: GridItem[][] = [];
  for (let i = 0; i < gridDimensions[1]; i++) {
    const row: GridItem[] = [];
    for (let j = 0; j < gridDimensions[0]; j++) {
      row.push({ x: j, y: i, isWater: j >= landInset });
    }
    newGrid.push(row);
  }

  // Generate isWater properties random distances from the right side of the grid
  for (let i = 0; i < gridDimensions[1]; i++) {
    const distance = Math.floor(Math.random() * coastRange * 3) + 1;
    const current = { y: i, x: landInset };
    for (let j = 0; j < distance; j++) {
      newGrid[current.y][current.x].isWater = false;
      let direction = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }][Math.floor(Math.random() * 3)];

      if (current.y === 0 && direction.y === -1) {
        direction = { x: 0, y: 0 };
      } else if (current.y === gridDimensions[1] - 1 && direction.y === 1) {
        direction = { x: 0, y: 0 };
      }
      if (current.x === gridDimensions[0] - 1 - waterInset) {
        direction = { x: 0, y: 0 };
      }

      current.x += direction.x;
      current.y += direction.y;
    }
  }
  // Generate raised land
  let previousDepth = Math.floor(Math.random() * (landInset)) + 1;
  for (let i = 0; i < gridDimensions[1]; i++) {
    let distance = previousDepth + Math.floor(Math.random() * 3) - 1;
    if (distance < 1) {
      distance = previousDepth + Math.floor(Math.random() * 2);
    } else if (distance > landInset + 1) {
      distance = previousDepth + Math.floor(Math.random() * 2) - 1;
    }
    console.log(distance, previousDepth)
    for (let j = 0; j < distance; j++) {
      newGrid[i][j].isRaised = true;
    }
  }

  return newGrid;
}