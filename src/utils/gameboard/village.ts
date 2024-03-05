import { buildingBuilder } from "../../data/buildings/buildingBuilder";
import { GridItem } from "../../types/gameboard";
import { getNeighbouringTiles } from "./board_filters";

type GenerateVillageProps = {
  population: number;
  grid: GridItem[][];
}

export const generateVillage = ({population, grid}: GenerateVillageProps): GridItem[][] => {
  const newGrid = [...grid];

  let remainingPopulation = population;
  let attempts = 0;
  while (remainingPopulation > 0 && attempts < 100) {
    let origin = [Math.floor(grid.length * Math.random()), grid[0].length - 1];
    while (grid[origin[0]][origin[1]].isWater) {
      if (origin[1] === 0) {
        break;
      }
      origin[1] -= 1;
    }

    let houseItem = grid[origin[0]][origin[1]]
    if (origin[1] === 0 || houseItem.building || houseItem.isRaised || houseItem.isWater) {
      attempts += 1;
      continue;
    }
    
    let houseOptions: GridItem[] = []
    for (let i = 0; i < remainingPopulation; i++) {
      newGrid[houseItem.y][houseItem.x].building = buildingBuilder('house');
      remainingPopulation -= 1;
      houseOptions = getNeighbouringTiles({gridItem: houseItem, grid: newGrid, filter: (tile) => !tile.isWater && !tile.isRaised && !tile.building});
      console.log(houseItem, houseOptions)
      if (houseOptions.length === 0) {
        break;
      }
      const randomIndex = Math.floor(Math.random() * houseOptions.length);
      houseItem = houseOptions[randomIndex];
      houseOptions = houseOptions.slice(randomIndex, 1);
    }
    attempts += 1;
  }
  if (attempts === 100) {
    console.error("Failed to place all houses");
  }

  return newGrid;
}