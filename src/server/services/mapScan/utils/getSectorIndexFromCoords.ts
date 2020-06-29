import { Point } from '../../../_models/map/point';

type Params = {
  readonly coords: Point;
  readonly sectorSize: Point;
  readonly mapSize: number;
};

export const getSectorIndexFromCoords = ({
  coords,
  sectorSize,
  mapSize,
}: Params): Point => {
  const x = Math.trunc((coords.x + mapSize) / sectorSize.x);
  const y = Math.trunc((coords.y + mapSize) / sectorSize.y);

  return { x, y };
};
