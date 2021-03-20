import type { Point } from '../../../_models/map/point.js';
import type { Sector } from '../sector.js';
import { getSectorIndexFromCoords } from './getSectorIndexFromCoords.js';
import { getTotalAxisLength } from './getTotalAxisLength.js';

type Params = {
  readonly sectors: readonly Sector[];
  readonly origin: Point;
  readonly radius: number;
  readonly mapSize: number;
  readonly sectorSize: Point;
};

const transformCoordAroundAxis = (coord: number, mapSize: number): number => {
  const totalAxisLength = getTotalAxisLength(mapSize);
  const over = Math.max(Math.abs(coord) - mapSize, 0) % totalAxisLength;

  if (!over) {
    return coord;
  }

  if (Math.sign(coord) === 1) {
    return -(mapSize + 1) + over;
  } else {
    return mapSize + 1 - over;
  }
};

const createGetXCondition = (minIndexX: number, maxIndexX: number) => {
  if (minIndexX <= maxIndexX) {
    return (s: Sector): boolean =>
      s.index.x >= minIndexX && s.index.x <= maxIndexX;
  } else {
    // e.g. max is 1 and min is 11.. with zoom Level 3, sectorSize is 31 and max sector index is 12
    // so its 11, 12, 0 and 1
    return (s: Sector): boolean =>
      s.index.x <= maxIndexX || s.index.x >= minIndexX;
  }
};

const createGetYCondition = (minIndexY: number, maxIndexY: number) => {
  if (minIndexY <= maxIndexY) {
    return (s: Sector): boolean =>
      s.index.y >= minIndexY && s.index.y <= maxIndexY;
  } else {
    return (s: Sector): boolean =>
      s.index.y <= maxIndexY || s.index.y >= minIndexY;
  }
};

export const filterSectorsInRadius = ({
  sectors,
  origin,
  radius,
  mapSize,
  sectorSize,
}: Params): Sector[] => {
  const minX = transformCoordAroundAxis(origin.x - radius, mapSize);
  const maxX = transformCoordAroundAxis(origin.x + radius, mapSize);
  const minY = transformCoordAroundAxis(origin.y - radius, mapSize);
  const maxY = transformCoordAroundAxis(origin.y + radius, mapSize);

  const minSectorIndex = getSectorIndexFromCoords({
    coords: { x: minX, y: minY },
    mapSize,
    sectorSize,
  });

  const maxSectorIndex = getSectorIndexFromCoords({
    coords: { x: maxX, y: maxY },
    mapSize,
    sectorSize,
  });

  const getXCondition = createGetXCondition(minSectorIndex.x, maxSectorIndex.x);
  const getYCondition = createGetYCondition(minSectorIndex.y, maxSectorIndex.y);

  return sectors.filter((s) => getXCondition(s) && getYCondition(s));
};
