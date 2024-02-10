import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardList } from '../../definitions/cards/cardTypes';
import { useFrames } from '../../hooks/useFrames/useFrames';
import { TileContext, TileContextType, defaultTileContext, getCityDimensions } from './GameSubContexts/TileContext';
import { Tile } from '../../definitions/tiles/tileDefinitions';
import { tileIsEmpty } from '../../definitions/cards/cardUtils';
import { TimeContext } from './GameSubContexts/TimeContext';

const waveFrequency = 1;
const waveTicksToLand = 241;


export type GameContextType = {
  funding: number,
  alterFunding: (amount: number) => boolean,
  cardHand: CardList,
  isUserSelectingTile: boolean
  runAfterSelectingTile: React.MutableRefObject<((tile: Tile) => void) | null>
  addToCardHand: (card: Card) => void,
  validSelectableTileFilter: React.MutableRefObject<((tile: Tile) => boolean) | null>
  removeFromCardHandByIndex: (index:number) => void
  waves: Array<Array<number | null>>
  getUserToSelectTile: (runAfter: (tile: Tile) => void, validTileFilter?: (tile: Tile) => boolean) => void
} & TileContextType;

export const defaultGameContextValues: GameContextType = {
  funding: 0,
  getUserToSelectTile: (runAfter: (tile: Tile) => void) => {},
  alterFunding: (amount: number) => true,
  validSelectableTileFilter: {current: (tile: Tile) => {
    return tileIsEmpty(tile);
  }},
  cardHand: [] as CardList,
  isUserSelectingTile: false,
  runAfterSelectingTile: {current: null},
  addToCardHand: (card: Card) => {},
  removeFromCardHandByIndex: (index:number) => {},
  waves: Array(getCityDimensions().height).fill([]),
  ...defaultTileContext,
};

// Create the GameContext
export const GameContext = createContext(defaultGameContextValues);




// Create the GameContextProvider component
export const GameContextProvider = ({ children }: {children: React.ReactNode }) => {
  
  const [paused, setPaused] = useState(false);

  const [isUserSelectingTile, setIsUserSelectingTile] = useState(false);

  // TIME


  // FUNDING
  const [funding, setFunding] = useState(10);
  const accruedFunding = useRef(0);
  const alterFunding = useCallback((amount: number) => {
    if (funding + accruedFunding.current + amount < 0) return false;
    accruedFunding.current = accruedFunding.current + amount;
    return true
  }, [funding]);
  useEffect(() => {
    setFunding(funding + accruedFunding.current);
    accruedFunding.current = 0;
  }, [timeFrames]);

  // CARDS
  const [cardHand, setCardHand] = useState<CardList>([]);
  const addToCardHand = (card: Card) => {
    setCardHand([...cardHand, card]);
  }
  const removeFromCardHandByIndex = (index: number) => {
    setCardHand(cardHand.filter((_, i) => i !== index));
  }


  // Waves
  const [waves, setWaves] = useState<GameContextType["waves"]>(defaultGameContextValues.waves);
  const addWave = (row_index?: number) => {
    const currentWaves = [...waves];
    if (row_index === undefined) {
      currentWaves[Math.floor(Math.random() * cityDimensions.height)].push(1);
    } else {
      currentWaves[row_index].push(1);
    }
    setWaves(currentWaves);
  }
  useEffect(() => {
    // Add a new wave every day
    if (timeFrames % (framesPerDay * waveFrequency) === 0) {
      addWave();
    }
    // Move waves
    const newWaves = waves.map((row) => {
      return row.map((wave) => {
        if (wave !== null) return wave - 1 / waveTicksToLand;
        return null;
      });
    });
    // Check if landed
    newWaves.forEach((row, row_index) => {
      row.forEach((wave, wave_index) => {
        if (wave !== null && wave < 0) {
          // Landed
          const newCityTiles = [...cityTiles];
          newCityTiles[row_index][cityDimensions.width-1].waterLevel = newCityTiles[row_index][cityDimensions.width-1].waterLevel + 1;

          let reverseSeaLevelIndex = 0;
          let carryoverSeaLevel = 1;
          while (newCityTiles[row_index][cityDimensions.width-1-reverseSeaLevelIndex].waterLevel > 1) {
            carryoverSeaLevel = newCityTiles[row_index][cityDimensions.width-1-reverseSeaLevelIndex].waterLevel - 1;
            newCityTiles[row_index][cityDimensions.width-1-reverseSeaLevelIndex].waterLevel = 1;
            reverseSeaLevelIndex++;
            if (reverseSeaLevelIndex === cityDimensions.width) break;
            newCityTiles[row_index][cityDimensions.width-1-reverseSeaLevelIndex].waterLevel += carryoverSeaLevel;
          }
          setCityTiles(newCityTiles);
          newWaves[row_index][wave_index] = null;
        }
      });
    });
    // Apply changes
    setWaves(newWaves);


  }, [timeFrames]);


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
    ...TimeContext(paused),
    ...TileContext(),

    // Funding
    funding,
    alterFunding,

    // Cards
    cardHand,
    addToCardHand,
    removeFromCardHandByIndex,

    // Waves
    waves,

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