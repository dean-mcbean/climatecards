
export type GridItemWarning = {
  type: "flooding" | "landslide";
  endTurn: number;
}

export type Building = {
  type: "house" | "bach";
  isRaised?: boolean;
  health: number;
  maxHealth: number;
  icon: JSX.Element;
  population?: number;
  isUnderConstruction?: boolean;
}

export type GridItem = {
  building?: Building;
  inundation: number;
  isWater?: boolean;
  isRaised?: boolean;
  waveStrength?: number;
  warning?: GridItemWarning;
  x: number;
  y: number;
  cache?: {
    adjacentToWater?: boolean;
    adjacentToPopulation?: boolean;
    nextToWater?: boolean;
    nextToPopulation?: boolean;
  };
};