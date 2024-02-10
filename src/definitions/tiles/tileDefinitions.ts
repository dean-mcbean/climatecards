
export type Tile = {
  x: number,
  y: number,
  building?: Building,
  waterLevel: number,
}

export type TileGrid = Array<Array<Tile>>

export type Building = {
  type: string
  health: number
}
