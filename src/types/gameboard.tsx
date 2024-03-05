
export type GridItemWarning = {
  type: "flooding" | "landslide";
  endTurn: number;
}

export type Building = {
  type: "house" | "school" | "hospital" | "office";
  isRaised?: boolean;
  health: number;
  maxHealth: number;
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
};