import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardList } from '../../definitions/cards/cardTypes';
import { useFrames } from '../../hooks/useFrames/useFrames';
import { tileIsEmpty } from '../../definitions/cards/cardUtils';
import { Building, Tile, TileGrid } from '../../definitions/tiles/tileDefinitions';
import { getAdjacentTilesFromTiles } from '../../definitions/tiles/tileUtils';

const framesPerDay = 120;
const cityDimensions = {width: 4, height: 4};
const waveFrequency = 0.4;
const waveDaysToLand = 2;


export type GameContextType = {
  funding: number,
  frame: number,
  day: number,
  time: number,
  hour: number,
  alterFunding: (amount: number) => boolean,
  cardHand: CardList,
  addToCardHand: (card: Card) => void,
  removeFromCardHandByIndex: (index:number) => void
  addBuilding: (x: number, y: number, building: Building) => void
  cityTiles: Array<Array<Tile>>
  getUserToSelectTile: (runAfter: (tile: Tile) => void, validTileFilter?: (tile: Tile) => boolean) => void
  isUserSelectingTile: boolean
  runAfterSelectingTile: React.MutableRefObject<((tile: Tile) => void) | null>
  validSelectableTileFilter: React.MutableRefObject<((tile: Tile) => boolean) | null>
  cityDimensions: {width: number, height: number}
  waves: Array<{[key: string | number]: number}>
  getAdjacentTiles: (tile: Tile) => Array<Tile>
  fastForwardDay: () => void
  forceAlterFunding: (amount: number) => boolean
  addWaterLevel: (x: number, y: number, amount: number) => void
  removeWave: (row_index: number, wave_index: number | string) => void
  getTile: (x: number, y: number) => Tile | undefined
  updateTile: (x: number, y: number, editTile: (tile: Tile) => Tile) => void
};

export const defaultGameContextValues: GameContextType = {
  funding: 0,
  frame: 0,
  day: 0,
  time: 0,
  hour: 0,
  alterFunding: (amount: number) => true,
  cardHand: [] as CardList,
  addToCardHand: (card: Card) => {},
  removeFromCardHandByIndex: (index:number) => {},
  addBuilding: (x: number, y: number, building: Building) => {},
  cityTiles: [],
  getUserToSelectTile: (runAfter: (tile: Tile) => void) => {},
  isUserSelectingTile: false,
  runAfterSelectingTile: {current: null},
  validSelectableTileFilter: {current: (tile: Tile) => {
    return tileIsEmpty(tile);
  }},
  cityDimensions,
  waves: Array.from({ length: cityDimensions.height }, () => ({})),
  getAdjacentTiles: (tile: Tile) => [],
  fastForwardDay: () => {},
  forceAlterFunding: (amount: number) => true,
  addWaterLevel: (x: number, y: number, amount: number) => {},
  removeWave: () => {},
  getTile: (x: number, y: number) => undefined,
  updateTile: (x: number, y: number, editTile: (tile: Tile) => Tile) => {}
};

// Create the GameContext
export const GameContext = createContext(defaultGameContextValues);




// Create the GameContextProvider component
export const GameContextProvider = ({ children }: {children: React.ReactNode }) => {
  const [fastForwarding, setFastForwarding] = useState<boolean>(false);
  const [isUserSelectingTile, setIsUserSelectingTile] = useState(false);
  const paused = useMemo(() => isUserSelectingTile, [isUserSelectingTile]);
  const frame = useFrames(fastForwarding, paused);
  const lastFrame = useRef(0);
  const [cityTiles, setCityTiles] = useState<TileGrid>([]);
  const [funding, setFunding] = useState(10);
  

  // TIME
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (frame % framesPerDay < lastFrame.current % framesPerDay) {
      setDay(day + 1);
      setFastForwarding(false);
    }
    setTime((frame % framesPerDay) / framesPerDay);

    lastFrame.current = frame;
  }, [frame]);
  const fastForwardDay = () => {
    setFastForwarding(true);
  }


  // FUNDING
  const accruedFunding = useRef(0);
  const alterFunding = useCallback((amount: number) => {
    if (funding + accruedFunding.current + amount < 0) return false;
    accruedFunding.current = accruedFunding.current + amount;
    return true
  }, [funding]);
  const forceAlterFunding = (amount: number) => {
    accruedFunding.current = accruedFunding.current + amount;
    return true
  }
  useEffect(() => {
    setFunding(funding + accruedFunding.current);
    accruedFunding.current = 0;
  }, [frame]);
  useEffect(() => {
    if (funding < 0) {
      // Game over
      console.log("GAME OVER")
    } 
  }, [funding]);


  // CARDS
  const [cardHand, setCardHand] = useState<CardList>([]);
  const addToCardHand = (card: Card) => {
    setCardHand([...cardHand, card]);
  }
  const removeFromCardHandByIndex = (index: number) => {
    setCardHand(cardHand.filter((_, i) => i !== index));
  }

  // TILES
  useEffect(() => {
    const newCityTiles = new Array(cityDimensions.width).fill(0).map((_, x) => new Array(cityDimensions.height).fill(0).map((_, y) => ({x, y, waterLevel: 0, sunk: false})));
    setCityTiles(newCityTiles);
  }, []);
  const addBuilding = (x: number, y: number, building: Building) => {
    const newCityTiles = [...cityTiles];
    newCityTiles[x][y].building = building;
    setCityTiles(newCityTiles);
  }
  const getAdjacentTiles = (tile: Tile) => {
    return getAdjacentTilesFromTiles(cityTiles, tile);
  };
  const getTile = (x: number, y: number) => {
    if (x < 0 || x >= cityDimensions.width || y < 0 || y >= cityDimensions.height) return undefined;
    return cityTiles[x][y];
  }
  const updateTile = (x: number, y: number, editTile: (tile: Tile) => Tile) => {
    setCityTiles((prevCityTiles) => {
      const newCityTiles = [...prevCityTiles];
      newCityTiles[x][y] = editTile(newCityTiles[x][y]);
      return newCityTiles;
    });
  }
  const addWaterLevel = (x: number, y: number, amount: number) => {
    setCityTiles((prevCityTiles) => {
      const newCityTiles = [...prevCityTiles];
      let sum = Math.max(Math.floor((newCityTiles[x][y].waterLevel + amount) * 5) / 5, 0);

      while (sum > 5) {
        // Spread water to adjacent tiles
        const spread = sum - 5;
        newCityTiles[x][y].waterLevel = 5;
        if (y > 0) {
          y--;
          sum = Math.max(Math.floor((newCityTiles[x][y].waterLevel + spread) * 5) / 5, 0);
        } else {
          break;
        }
      }

      newCityTiles[x][y].waterLevel = sum;
      return newCityTiles;
    });
  }

  // Waves
  const waveIndex = useRef(0);
  const [waves, setWaves] = useState<GameContextType["waves"]>(defaultGameContextValues.waves);
  const addWave = (row_index?: number) => {
    const currentWaves = [...waves];
    console.log("Adding waves", waves)
    if (row_index === undefined) {
      currentWaves[Math.floor(Math.random() * cityDimensions.height)][waveIndex.current] = 1 / waveDaysToLand;
    } else {
      currentWaves[row_index][waveIndex.current] = 1 / waveDaysToLand;
    }
    waveIndex.current++;
    console.log("Adding wave", currentWaves)
    setWaves(currentWaves);
  }
  const removeWave = (row_index: number, wave_index: string | number) => {
    setWaves((prevWaves) => {
      const newWaves = [...prevWaves];
      delete newWaves[row_index][wave_index];
      return newWaves;
    })
  }
  useEffect(() => {
    // Add a new wave every day
    if (frame % (framesPerDay * waveFrequency) === 0) {
      addWave();
    }
  }, [frame]);


  // USER INTERACTION
  const runAfterSelectingTile = useRef<((tile: Tile) => void) | null>(null);
  const validSelectableTileFilter = useRef<((tile: Tile) => boolean) | null>(null);
  const getUserToSelectTile = (runAfter: (tile: Tile) => void, validTileFilter?: (tile: Tile) => boolean) : void => {
    setIsUserSelectingTile(true);

    if (validTileFilter) {
      validSelectableTileFilter.current = validTileFilter;
    } else {
      validSelectableTileFilter.current = defaultGameContextValues.validSelectableTileFilter.current
    }
    runAfterSelectingTile.current = (tile: Tile) => {
      setIsUserSelectingTile(false);
      runAfter(tile);
    }
  }




  const contextValue: GameContextType = {
    frame,
    day,
    time,
    hour: Math.floor(time * 24),
    fastForwardDay,

    // Funding
    funding,
    alterFunding,
    forceAlterFunding,

    // Cards
    cardHand,
    addToCardHand,
    removeFromCardHandByIndex,

    // Tiles
    cityTiles,
    cityDimensions,
    addBuilding,
    getAdjacentTiles,
    addWaterLevel,
    getTile,
    updateTile,

    // Waves
    waves,
    removeWave,

    // User interaction
    getUserToSelectTile,
    isUserSelectingTile,
    runAfterSelectingTile,
    validSelectableTileFilter,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => {
  return React.useContext(GameContext);
}