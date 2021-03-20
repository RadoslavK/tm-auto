import type { Point } from '../../../_models/map/point.js';
import type { Sector } from '../sector.js';

type Params = {
  readonly mapSize: number;
  readonly sectorSize: Point;
};

export const getAllSectors = ({
  mapSize,
  sectorSize,
}: Params): readonly Sector[] => {
  const sectors: Sector[] = [];

  const halfX = Math.trunc(sectorSize.x / 2);
  const halfY = Math.trunc(sectorSize.y / 2);

  let x = -mapSize + halfX;
  let xIndex = 0;

  do {
    let y = -mapSize + halfY;
    let yIndex = 0;

    do {
      sectors.push({
        x,
        y,
        index: {
          x: xIndex,
          y: yIndex,
        },
      });

      y += sectorSize.y;
      yIndex++;
    } while (y <= mapSize);

    x += sectorSize.x;
    xIndex++;
  } while (x <= mapSize);

  return sectors;
};
