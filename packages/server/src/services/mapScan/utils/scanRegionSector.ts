import type { Page } from 'puppeteer-core';

import type { Point } from '../../../_models/map/point.js';
import type { RegionTile } from '../../../_models/map/villageTile.js';
import { sendAjaxRequest } from '../../../utils/sendAjaxRequest.js';
import { maxZoomLevel } from '../mapScanService.js';
import { getPointId } from './getPointId.js';
import { getSectorSize } from './getSectorSize.js';

type Tile = {
  readonly title?: string;
  readonly position: {
    readonly x: string;
    readonly y: string;
  };
  readonly text: string;
};

type Response = {
  readonly tiles: readonly Tile[];
};

type Result = {
  readonly regionTiles: Record<string, RegionTile>;
};

type Params = {
  readonly sector: Point;
  readonly zoomLevel: number;
  readonly mapSize: number;
  readonly page: Page;
};

/*
 * @param {number} zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
 */
export const scanRegionSector = async ({
  sector,
  zoomLevel,
  mapSize,
  page,
}: Params): Promise<Result> => {
  const response = await sendAjaxRequest<Response>(
    'mapPositionData',
    {
      data: {
        ignorePositions: [],
        x: sector.x,
        y: sector.y,
        zoomLevel: Math.max(Math.min(zoomLevel, maxZoomLevel), 1),
      },
    },
    page,
  );

  let tiles = response.tiles.map((t) => ({
    ...t,
    position: {
      x: +t.position.x,
      y: +t.position.y,
    },
  }));

  const sectorSize = getSectorSize(zoomLevel);
  const isXOver = sector.x + sectorSize.x / 2 > mapSize;
  const isYOver = sector.y + sectorSize.y / 2 > mapSize;

  if (isXOver || isYOver) {
    // Remove duplicates.
    tiles = tiles.filter(
      (t) => Math.sign(t.position.x) === 1 && Math.sign(t.position.y) === 1,
    );
  }

  const regionTiles = tiles.reduce((allRegionTiles, tile) => {
    return {
      ...allRegionTiles,
      [getPointId(tile.position)]: {
        x: tile.position.x,
        y: tile.position.y,
        name: /{k\.regionTooltip} (.*)/.exec(tile.title ?? '')?.[1],
      } as RegionTile,
    };
  }, {} as Record<string, RegionTile>);

  return {
    regionTiles,
  };
};
